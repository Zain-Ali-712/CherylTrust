import { FiLogOut } from "react-icons/fi";
import { logout } from "@/actions/auth";
import SidebarNav from "@/components/admin/SidebarNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-bg-light">
            {/* Sidebar */}
            <aside className="w-64 bg-dark text-white flex flex-col shrink-0">
                <div className="p-6 border-b border-white/10">
                    <h2 className="font-serif font-bold text-xl tracking-wide">Cheryl Admin</h2>
                </div>
                <SidebarNav />
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
