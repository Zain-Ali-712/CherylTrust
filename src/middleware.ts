import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth";

// Protect all /admin routes except /admin/login
export async function middleware(request: NextRequest) {
    const isAuthPage = request.nextUrl.pathname.startsWith("/admin/login");
    const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

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

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
