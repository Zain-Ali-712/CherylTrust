import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth";

// Protect all /admin routes except /admin/login
export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    
    // Admin Routes
    const isAuthPage = pathname.startsWith("/admin/login");
    const isAdminRoute = pathname.startsWith("/admin");

    // Client Routes
    const isClientAuthPage = pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register");
    const isClientDashboard = pathname.startsWith("/client");
    const isCheckout = pathname.startsWith("/checkout");
    const isBooking = pathname.startsWith("/book");

    const fullPath = pathname + request.nextUrl.search;

    if (isAdminRoute && !isAuthPage) {
        const token = request.cookies.get("admin_token")?.value;

        if (!token) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }

        const verifiedToken = await verifyToken(token);
        if (!verifiedToken) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    if (isAuthPage) {
        const token = request.cookies.get("admin_token")?.value;
        if (token) {
            const verifiedToken = await verifyToken(token);
            if (verifiedToken) {
                // If logged in, redirect away from login page
                return NextResponse.redirect(new URL("/admin/testimonials", request.url));
            }
        }
    }

    // --- CLIENT AUTH INTERCEPTS ---
    if (isClientDashboard || isCheckout || isBooking) {
        const token = request.cookies.get("client_token")?.value;
        if (!token) {
            return NextResponse.redirect(new URL(`/auth/login?redirect=${encodeURIComponent(fullPath)}`, request.url));
        }
        const verifiedToken = await verifyToken(token);
        if (!verifiedToken || verifiedToken.role !== "client") {
            return NextResponse.redirect(new URL(`/auth/login?redirect=${encodeURIComponent(fullPath)}`, request.url));
        }
    }

    if (isClientAuthPage) {
        const token = request.cookies.get("client_token")?.value;
        if (token) {
            const verifiedToken = await verifyToken(token);
            if (verifiedToken && verifiedToken.role === "client") {
                return NextResponse.redirect(new URL("/client/dashboard", request.url));
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/client/:path*", "/checkout/:path*", "/auth/:path*", "/book/:path*"],
};
