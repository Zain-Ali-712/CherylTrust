"use client";

import Link from "next/link";
import { GiPawPrint } from "react-icons/gi";
import { FiFacebook, FiInstagram, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Cheryl" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact & Book" },
    { href: "/donate", label: "Donate" },
];

const serviceLinks = [
    { href: "/services#trust-technique", label: "Trust Technique® Sessions" },
    { href: "/services#dog-behaviour", label: "Dog Behaviour & Rehab" },
    { href: "/services#horse", label: "Horse Sessions" },
    { href: "/services#body-therapy", label: "Body Therapy (Canine)" },
    { href: "/services#red-light", label: "Red Light Therapy" },
    { href: "/services#emotion-code", label: "Emotion Code Releasing" },
];

const socials = [
    { icon: <FiFacebook size={15} />, href: "#" },
    { icon: <FiInstagram size={15} />, href: "#" },
    { icon: <FiMail size={15} />, href: "mailto:ponyblue_1@hotmail.com" },
];

export default function Footer() {
    return (
        <footer className="bg-dark-footer border-t border-white/[0.04]">
            <div className="max-w-[1280px] mx-auto pt-20 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1.4fr_1.4fr] gap-12 lg:gap-8"
                style={{ paddingLeft: "clamp(1.25rem,6vw,4rem)", paddingRight: "clamp(1.25rem,6vw,4rem)" }}>

                {/* Brand */}
                <div>
                    <Link href="/" className="flex items-center gap-2.5 no-underline mb-7">
                        <div className="w-8 h-8 border border-primary-light/30 flex items-center justify-center shrink-0">
                            <GiPawPrint size={16} className="text-primary-light" />
                        </div>
                        <div>
                            <div className="font-serif font-bold text-base text-white leading-[1.1]">Cheryl</div>
                            <div className="text-[0.6rem] font-semibold tracking-[0.1em] uppercase font-sans text-primary-light">Trust Technique NZ</div>
                        </div>
                    </Link>
                    <p className="text-[0.95rem] text-white/80 font-sans leading-[1.8] mb-8 max-w-[280px]">
                        Certified and insured Trust Technique® Practitioner & ConTact C.A.R.E bodyworker, helping people build peaceful, trusting relationships with their animals.
                    </p>
                    <div className="flex gap-3">
                        {socials.map((s, i) => (
                            <a key={i} href={s.href}
                                className="w-[34px] h-[34px] border border-primary-light/30 flex items-center justify-center text-primary-light/90 no-underline hover:border-primary-light/70 hover:text-white transition-all duration-200">
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Navigation */}
                <div>
                    <p className="text-[0.7rem] font-bold tracking-[0.22em] uppercase font-sans text-primary-light/90 mb-6">Navigation</p>
                    <div className="flex flex-col gap-3">
                        {quickLinks.map((l) => (
                            <Link key={l.href} href={l.href} className="text-[0.9rem] text-white/80 font-sans no-underline hover:text-white transition-colors duration-200">
                                {l.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Services */}
                <div>
                    <p className="text-[0.7rem] font-bold tracking-[0.22em] uppercase font-sans text-primary-light/90 mb-6">Services</p>
                    <div className="flex flex-col gap-3">
                        {serviceLinks.map((l) => (
                            <Link key={l.href} href={l.href} className="text-[0.9rem] text-white/80 font-sans no-underline hover:text-white transition-colors duration-200">
                                {l.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Contact */}
                <div>
                    <p className="text-[0.7rem] font-bold tracking-[0.22em] uppercase font-sans text-primary-light/90 mb-6">Get in Touch</p>
                    <div className="flex flex-col gap-4 mb-8">
                        {[
                            { icon: <FiMail size={13} />, content: <a href="mailto:ponyblue_1@hotmail.com" className="text-white/80 no-underline hover:text-white transition-colors">ponyblue_1@hotmail.com</a> },
                            { icon: <FiPhone size={13} />, content: <a href="tel:021822186" className="text-white/80 no-underline hover:text-white transition-colors">021 822 186</a> },
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <span className="text-primary-light/90 pt-0.5 shrink-0">{item.icon}</span>
                                <span className="text-[0.9rem] text-white/80 font-sans leading-[1.6]">{item.content}</span>
                            </div>
                        ))}
                    </div>
                    <Link href="/contact"
                        className="inline-block px-7 py-3 text-[0.7rem] font-bold tracking-[0.2em] uppercase font-sans no-underline text-dark bg-primary-light hover:bg-white transition-all duration-300">
                        Book Appointment
                    </Link>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/[0.08]">
                <div className="max-w-[1280px] mx-auto py-6 flex items-center justify-between flex-wrap gap-4"
                    style={{ paddingLeft: "clamp(1.25rem,6vw,4rem)", paddingRight: "clamp(1.25rem,6vw,4rem)" }}>
                    <p className="text-[0.75rem] font-sans text-white/60 tracking-[0.05em]">
                        © {new Date().getFullYear()} Cheryl — Trust Technique NZ. All rights reserved.
                    </p>
                    <p className="text-[0.75rem] font-sans text-white/60">
                        Wellington, New Zealand &nbsp;·&nbsp; Serving clients worldwide
                    </p>
                </div>
            </div>
        </footer>
    );
}
