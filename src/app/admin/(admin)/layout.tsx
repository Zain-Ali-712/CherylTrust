import Link from "next/link";
import { FiHome, FiMessageSquare, FiLogOut } from "react-icons/fi";
import { logout } from "@/actions/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-bg-light">
            {/* Sidebar */}
            <aside className="w-64 bg-dark text-white flex flex-col">
                <div className="p-6 border-b border-white/10">
                    <h2 className="font-serif font-bold text-xl tracking-wide">Cheryl Admin</h2>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/admin/testimonials" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                        <FiMessageSquare />
                        <span className="font-sans font-medium">Testimonials</span>
                    </Link>
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white">
                        <FiHome />
                        <span className="font-sans text-sm">Return to Website</span>
                    </Link>
                </nav>
                <div className="p-4 border-t border-white/10">
                    <form action={logout}>
                        <button type="submit" className="flex w-full items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/20 text-white/70 hover:text-red-400 transition-colors">
                            <FiLogOut />
                            <span className="font-sans text-sm">Logout</span>
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto w-full">
                <div className="p-8 lg:p-12 max-w-5xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
