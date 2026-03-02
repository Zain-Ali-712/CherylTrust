"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";

export default function HeroSection() {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setLoaded(true), 80);
        return () => clearTimeout(t);
    }, []);

    const anim = (delay: number): React.CSSProperties => ({
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.9s ease ${delay}ms, transform 0.9s ease ${delay}ms`,
    });

    return (
        <section
            className="relative w-full overflow-hidden"
            style={{ height: "100vh", minHeight: 600, maxHeight: 920 }}
        >
            {/* Background image */}
            <Image
                src="/Kiri1.jpg"
                alt="A dog in a peaceful setting"
                fill
                priority
                className="object-cover"
                style={{ objectPosition: "center 15%" }}
            />

            {/* Gradient overlay – slightly darker for better contrast */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(108deg, rgba(18, 30, 40, 0.93) 0%, rgba(28, 43, 54, 0.52) 52%, rgba(28,43,54,0.2) 100%)",
                }}
            />

            {/* Bottom fade */}
            <div
                className="absolute bottom-0 left-0 right-0 h-40"
                style={{ background: "linear-gradient(to bottom, transparent, #f8f5f164)" }}
            />

            {/* Content – with responsive top padding to clear navbar */}
            <div
                className="absolute inset-0 flex flex-col justify-center hero-content"
                style={{
                    paddingLeft: "clamp(1.25rem, 7vw, 7rem)",
                    paddingRight: "clamp(1.25rem, 7vw, 7rem)",
                    bottom: "8rem", // less bottom space on mobile, adjusted via media query
                }}
            >
                {/* Eyebrow */}
                <div className="flex items-center gap-3 mb-6" style={anim(0)}>
                    <div className="w-5 h-px bg-accent/70" />
                    <span className="text-[0.72rem] font-bold tracking-[0.22em] uppercase font-sans text-accent/85">
                        Wellington, NZ &nbsp;·&nbsp; Trust Technique® Practitioner
                    </span>
                </div>

                {/* Headline */}
                <h1
                    className="font-serif font-normal text-white leading-[1.1] max-w-[580px] mb-5 tracking-[-0.01em]"
                    style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", ...anim(120) }}
                >
                    Building Trust,<br />
                    <span className="text-accent">One Animal</span>
                    <br />
                    at a Time.
                </h1>

                {/* Subtext */}
                <p
                    className="text-white/75 font-sans leading-[1.8] max-w-[420px] mb-10 text-[0.95rem] sm:text-base"
                    style={anim(220)}
                >
                    Helping dogs, horses, and all animals overcome fear, anxiety, and
                    aggression — in person or online worldwide.
                </p>

                {/* Dark‑themed buttons */}
                <div className="flex flex-wrap gap-4" style={anim(320)}>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-9 py-3.5 text-[0.72rem] font-bold tracking-[0.22em] uppercase font-sans no-underline transition-all duration-300 bg-dark text-white border border-dark hover:bg-dark/80 hover:border-dark/80"
                    >
                        Enquire & Book <FiArrowRight size={13} />
                    </Link>
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 px-9 py-3.5 text-[0.72rem] font-bold tracking-[0.22em] uppercase font-sans no-underline transition-all duration-300 text-dark/90 border border-dark/30 hover:text-dark hover:border-dark/70 hover:bg-dark/5"
                    >
                        Explore Services
                    </Link>
                </div>
            </div>

            {/* Responsive adjustments */}
            <style jsx>{`
        @media (max-width: 768px) {
          .hero-content {
            padding-top: 10rem; /* extra space for mobile nav */
            bottom: 6rem;
          }
          h1 {
            font-size: clamp(2rem, 8vw, 2.8rem) !important;
          }
          p {
            font-size: 0.9rem !important;
            max-width: 100% !important;
          }
          .hero-content > div:last-child {
            gap: 0.75rem;
          }
          .hero-content a {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
            font-size: 0.65rem;
          }
        }
        @media (min-width: 769px) {
          .hero-content {
            padding-top: 9rem; /* desktop top padding */
          }
        }
      `}</style>
        </section>
    );
}