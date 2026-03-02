"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function HomeCTA() {
    const { ref, style } = useScrollReveal({ delay: 0 });

    return (
        <section className="relative overflow-hidden">
            <Image src="/kiri1.jpg" alt="Cheryl with an animal" fill
                className="object-cover" style={{ objectPosition: "center 40%" }} />

            {/* Dark overlay - reduced opacity as requested */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(108deg, rgba(28,43,54,0.85) 0%, rgba(28,43,54,0.65) 55%, rgba(28,43,54,0.4) 100%)" }} />

            {/* Content */}
            <div ref={ref} style={{ ...style, paddingLeft: "clamp(1.25rem,6vw,4rem)", paddingRight: "clamp(1.25rem,6vw,4rem)" }}
                className="relative z-10 max-w-[1280px] mx-auto py-16 md:py-24">

                <div className="flex flex-col md:grid md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-center">

                    {/* Left */}
                    <div>
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-5 h-px bg-accent/45" />
                            <span className="text-[0.72rem] font-bold tracking-[0.22em] uppercase font-sans text-accent/60">Ready to begin?</span>
                        </div>

                        <h2 className="font-serif font-normal text-white leading-[1.12] tracking-[-0.01em] mb-5"
                            style={{ fontSize: "clamp(1.875rem,3.5vw,2.875rem)" }}>
                            Let&apos;s find the right path<br />
                            <span className="text-primary-light">for your animal.</span>
                        </h2>

                        <div className="h-px bg-white/[0.08] mb-5 max-w-[500px]" />

                        <p className="text-[0.9rem] text-white/45 font-sans leading-[1.85] max-w-[460px]">
                            Whether you have an anxious dog, a fearful horse, or a rescue animal with a difficult past — Cheryl can help. Sessions available in Wellington or online globally. Reach out for a free initial consultation.
                        </p>
                    </div>

                    {/* Right — stacked buttons */}
                    <div className="flex flex-col gap-3.5 w-full md:w-auto">
                        <Link href="/contact"
                            className="inline-flex items-center justify-center gap-2 px-9 py-[0.875rem] text-[0.72rem] font-bold tracking-[0.2em] uppercase font-sans no-underline text-white border border-white/50 hover:bg-white hover:text-dark transition-all duration-300 whitespace-nowrap">
                            Enquire &amp; Book <FiArrowRight size={13} />
                        </Link>
                        <Link href="/services"
                            className="block px-9 py-[0.875rem] text-[0.72rem] font-semibold tracking-[0.2em] uppercase font-sans no-underline text-center text-white/38 border border-white/12 hover:text-white/85 hover:border-white/32 transition-all duration-300 whitespace-nowrap">
                            View Services
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
