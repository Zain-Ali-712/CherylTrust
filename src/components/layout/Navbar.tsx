"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    {
        href: "#", label: "Services", subLinks: [
            { href: "/services/dogs", label: "Dog Behaviour" },
            { href: "/services/horses", label: "Horse Sessions" },
        ]
    },
    { href: "/trust-technique", label: "Trust Technique" },
    { href: "/canine-club", label: "Canine Club" },
    { href: "/donate", label: "Donate" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 60);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 
            ${isScrolled ? "bg-warm-white/95 backdrop-blur-xl shadow-[0_1px_0_rgba(28,43,54,0.08)]" : "bg-transparent"}`}>
            <div className="max-w-[1280px] mx-auto flex items-center justify-between h-[4.75rem]"
                style={{ paddingLeft: "clamp(1.25rem,5vw,3.5rem)", paddingRight: "clamp(1.25rem,5vw,3.5rem)" }}>

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 no-underline">
                    <div className={`w-[34px] h-[34px] flex items-center justify-center border transition-all duration-300 overflow-hidden
                        ${isScrolled ? "border-primary-dark bg-primary-dark" : "border-white/30 bg-white/10"}`}>
                        <Image src="/logo.png" alt="Cheryl Trust" width={22} height={22} className="object-contain" />
                    </div>
                    <div>
                        <div className={`font-serif font-bold text-base leading-[1.1] transition-colors duration-300 ${isScrolled ? "text-dark" : "text-white"}`}>
                            Cheryl Trust
                        </div>
                        <div className={`text-[0.62rem] font-semibold tracking-[0.1em] uppercase font-sans transition-colors duration-300 ${isScrolled ? "text-muted" : "text-white/50"}`}>
                            Trust Technique NZ
                        </div>
                    </div>
                </Link>

                {/* Desktop nav */}
                <div className="hidden lg:flex items-center gap-1 relative">
                    {navLinks.map((link) => {
                        const active = pathname === link.href || (link.subLinks && link.subLinks.some(sub => pathname === sub.href));

                        if (link.subLinks) {
                            return (
                                <div key={link.href} className="group relative">
                                    <Link href={link.href}
                                        className={`px-3.5 py-2 text-[0.75rem] font-semibold tracking-[0.15em] uppercase font-sans no-underline transition-all duration-200 whitespace-nowrap border-b-[1.5px] inline-flex items-center gap-1.5
                                        ${active
                                                ? isScrolled ? "text-primary-dark border-primary-dark" : "text-white border-white"
                                                : isScrolled ? "text-dark/50 border-transparent hover:text-dark" : "text-white/60 border-transparent hover:text-white"
                                            }`}>
                                        {link.label}
                                        <svg className="w-3 h-3 opacity-60 transition-transform group-hover:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                    </Link>

                                    {/* Dropdown Menu */}
                                    <div className="absolute top-full left-0 pt-4 w-56 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                                        <div className={`rounded-xl shadow-xl border overflow-hidden backdrop-blur-md p-2
                                            ${isScrolled ? "bg-white/95 border-dark/5" : "bg-dark/95 border-white/10"}`}>
                                            {link.subLinks.map(sub => (
                                                <Link key={sub.href} href={sub.href}
                                                    className={`block px-4 py-3 text-[0.75rem] font-semibold tracking-[0.1em] uppercase font-sans no-underline rounded-lg transition-colors
                                                    ${pathname === sub.href
                                                            ? (isScrolled ? "bg-primary-dark/10 text-primary-dark" : "bg-white/10 text-white")
                                                            : (isScrolled ? "text-dark/70 hover:bg-dark/5 hover:text-dark" : "text-white/70 hover:bg-white/5 hover:text-white")
                                                        }`}>
                                                    {sub.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <Link key={link.href} href={link.href}
                                className={`px-3.5 py-2 text-[0.75rem] font-semibold tracking-[0.15em] uppercase font-sans no-underline transition-all duration-200 whitespace-nowrap border-b-[1.5px]
                                ${active
                                        ? isScrolled ? "text-primary-dark border-primary-dark" : "text-white border-white"
                                        : isScrolled ? "text-dark/50 border-transparent hover:text-dark" : "text-white/60 border-transparent hover:text-white"
                                    }`}>
                                {link.label}
                            </Link>
                        );
                    })}
                    <Link href="/contact"
                        className={`ml-4 px-5 py-2.5 text-[0.75rem] font-bold tracking-[0.15em] uppercase font-sans no-underline transition-all duration-300 whitespace-nowrap border
                        ${isScrolled
                                ? "text-primary-dark border-primary-dark hover:bg-primary-dark hover:text-white"
                                : "text-white border-white/45 hover:bg-primary-dark hover:border-primary-dark"
                            }`}>
                        Enquire &amp; Book
                    </Link>
                </div>

                {/* Hamburger */}
                <button
                    className={`mobile-menu-btn p-2 bg-transparent border-0 cursor-pointer transition-colors ${isScrolled ? "text-dark" : "text-white"}`}
                    onClick={() => setIsMobileOpen(!isMobileOpen)} aria-label="Toggle menu">
                    {isMobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                </button>
            </div>

            {/* Mobile panel */}
            {isMobileOpen && (
                <div className="bg-warm-white border-t border-dark/[0.08] lg:hidden"
                    style={{ padding: "0.75rem clamp(1.25rem,5vw,3.5rem) 1.5rem" }}>
                    {navLinks.map((link) => (
                        <div key={link.href}>
                            <Link href={link.href} onClick={() => !link.subLinks && setIsMobileOpen(false)}
                                className={`flex items-center justify-between py-3.5 text-[0.75rem] font-bold tracking-[0.18em] uppercase font-sans no-underline border-b border-dark/[0.07]
                                ${(pathname === link.href || (link.subLinks && link.subLinks.some(s => pathname === s.href))) ? "text-primary-dark" : "text-dark/50"}`}>
                                {link.label}
                            </Link>
                            {/* Mobile Sublinks */}
                            {link.subLinks && (
                                <div className="pl-4 border-b border-dark/[0.07] pb-2 bg-dark/[0.02]">
                                    {link.subLinks.map(sub => (
                                        <Link key={sub.href} href={sub.href} onClick={() => setIsMobileOpen(false)}
                                            className={`block py-3 text-[0.7rem] font-semibold tracking-[0.15em] uppercase font-sans no-underline
                                            ${pathname === sub.href ? "text-primary-dark" : "text-dark/50"}`}>
                                            — {sub.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <Link href="/contact" onClick={() => setIsMobileOpen(false)}
                        className="block mt-5 py-3.5 text-center text-[0.75rem] font-bold tracking-[0.2em] uppercase font-sans no-underline text-white bg-primary-dark">
                        Enquire &amp; Book
                    </Link>
                </div>
            )}
        </nav>
    );
}
