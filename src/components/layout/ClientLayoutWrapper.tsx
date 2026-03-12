"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    // Exclude Navbar and Footer from all /admin routes
    const isAdminRoute = pathname?.startsWith("/admin");

    return (
        <div className="flex flex-col min-h-screen">
            {!isAdminRoute && <Navbar />}
            <div className="flex-grow">{children}</div>
            {!isAdminRoute && <Footer />}
        </div>
    );
}
