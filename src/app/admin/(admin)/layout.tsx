import { FiLogOut } from "react-icons/fi";
import { logout } from "@/actions/auth";
import SidebarNav from "@/components/admin/SidebarNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-bg-light">
            {/* Sidebar */}
            <aside className="w-64 bg-dark text-white flex flex-col shrink-0 overflow-hidden">
                <div className="p-6 border-b border-white/10 flex justify-between items-center gap-2">
                    <h2 className="font-serif font-bold text-xl text-white tracking-wide">Cheryl Admin</h2>
                    <form action={logout}>
                        <button type="submit" title="Logout" className="flex items-center gap-2 p-2 rounded-lg hover:bg-red-500/20 text-white/70 hover:text-red-400 transition-colors">
                            <FiLogOut size={20} />
                        </button>
                    </form>
                </div>
                <SidebarNav />
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
