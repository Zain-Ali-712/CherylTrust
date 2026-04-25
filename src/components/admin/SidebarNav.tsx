"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiMessageSquare, FiUsers, FiCalendar, FiClock, FiSettings, FiActivity, FiTag } from "react-icons/fi";

const navItems = [
    { href: "/admin", label: "Dashboard", icon: FiActivity, exact: true },
    { href: "/admin/testimonials", label: "Testimonials", icon: FiMessageSquare },
    { href: "/admin/clients", label: "Clients", icon: FiUsers },
    { href: "/admin/calendar", label: "Calendar", icon: FiCalendar },
    { href: "/admin/bookings", label: "Bookings", icon: FiClock },
    { href: "/admin/promotions", label: "Promotions", icon: FiTag },
    { href: "/admin/vouchers", label: "Vouchers", icon: FiActivity },
    { href: "/admin/settings", label: "Settings", icon: FiSettings },
];

export default function SidebarNav() {
    const pathname = usePathname();

    const isActive = (item: typeof navItems[0]) => {
        if (item.exact) return pathname === item.href;
        return pathname.startsWith(item.href);
    };

    return (
        <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
                const active = isActive(item);
                const Icon = item.icon;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-sans font-medium
                            ${active
                                ? "bg-brand text-white"
                                : "text-white/70 hover:bg-white/10 hover:text-white"
                            }`}
                    >
                        <Icon size={18} />
                        <span>{item.label}</span>
                    </Link>
                );
            })}
            <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white mt-4">
                <FiHome size={18} />
                <span className="font-sans text-sm">Return to Website</span>
            </Link>
        </nav>
    );
}
