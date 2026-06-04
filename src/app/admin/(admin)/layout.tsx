"use client";
import { useState } from "react";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { logout } from "@/actions/auth";
import SidebarNav from "@/components/admin/SidebarNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <div className="flex h-screen bg-bg-light relative overflow-hidden flex-col lg:flex-row">
            {/* Mobile Header / Top Bar */}
            <header className="lg:hidden flex items-center justify-between bg-dark text-white p-4 shrink-0 border-b border-white/10 z-20">
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => setIsMobileOpen(true)} 
                        className="p-2 -ml-2 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors" 
                        title="Open Menu"
                    >
                        <FiMenu size={24} />
                    </button>
                    <span className="font-serif font-bold text-lg text-white">Cheryl Admin</span>
                </div>
                <form action={logout}>
                    <button type="submit" title="Logout" className="flex items-center gap-2 p-2 rounded-lg hover:bg-red-500/20 text-white/70 hover:text-red-400 transition-colors">
                        <FiLogOut size={20} />
                    </button>
                </form>
            </header>

            {/* Sidebar Backdrop Overlay on Mobile */}
            {isMobileOpen && (
                <div 
                    className="fixed inset-0 z-30 bg-black/50 transition-opacity lg:hidden" 
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar Drawer */}
            <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-dark text-white flex flex-col transform transition-transform duration-300 ease-in-out shrink-0 overflow-hidden lg:static lg:translate-x-0 ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="p-6 border-b border-white/10 flex justify-between items-center gap-2 shrink-0">
                    <h2 className="font-serif font-bold text-xl text-white tracking-wide">Cheryl Admin</h2>
                    <div className="flex items-center gap-1">
                        <form action={logout} className="lg:block hidden">
                            <button type="submit" title="Logout" className="flex items-center gap-2 p-2 rounded-lg hover:bg-red-500/20 text-white/70 hover:text-red-400 transition-colors">
                                <FiLogOut size={20} />
                            </button>
                        </form>
                        <button 
                            onClick={() => setIsMobileOpen(false)} 
                            className="lg:hidden p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors" 
                            title="Close Menu"
                        >
                            <FiX size={20} />
                        </button>
                    </div>
                </div>
                <SidebarNav onLinkClick={() => setIsMobileOpen(false)} />
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto w-full min-w-0">
                <div className="p-4 sm:p-8 lg:p-12 max-w-5xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
