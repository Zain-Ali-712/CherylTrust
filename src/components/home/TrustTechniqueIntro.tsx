"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const pillData = [
    { label: "No dominance", desc: "Peace over pressure" },
    { label: "Mindfulness-based", desc: "Calm thinking, calm animal" },
    { label: "Proven globally", desc: "Used in 40+ countries" },
    { label: "From session one", desc: "Felt immediately" },
];

export default function TrustTechniqueIntro() {
    const { ref: leftRef, style: leftStyle } = useScrollReveal({ delay: 0 });
    const { ref: rightRef, style: rightStyle } = useScrollReveal({ delay: 150 });

    return (
        <section className="bg-warm-white border-t border-dark/[0.06] border-b border-dark/[0.06] py-20">
            <div className="max-w-[1280px] mx-auto" style={{ paddingLeft: "clamp(1.25rem,6vw,4rem)", paddingRight: "clamp(1.25rem,6vw,4rem)" }}>
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">

                    {/* LEFT */}
                    <div ref={leftRef} style={leftStyle} className="flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-5 h-px bg-primary-dark" />
                            <span className="text-[0.72rem] font-bold tracking-[0.22em] uppercase font-sans text-primary-dark">The Method</span>
                        </div>

                        <h2 className="font-serif font-normal text-dark leading-[1.15] mb-5 tracking-[-0.01em]"
                            style={{ fontSize: "clamp(1.75rem,3vw,2.5rem)" }}>
                            What is the<br />
                            <span className="text-primary-dark">Trust Technique</span>
                            <sup className="text-primary-dark text-[0.65em]">®</sup>?
                        </h2>

                        <div className="h-px bg-dark/[0.07] mb-5" />

                        <p className="text-[0.9rem] text-dark/55 font-sans leading-[1.85] mb-3.5">
                            Created by James French, the Trust Technique® reduces the thinking level in both you and your animal at the same time — building a genuine shared state of peace.
                        </p>
                        <p className="text-[0.9rem] text-dark/55 font-sans leading-[1.85] mb-8">
                            No commands, no dominance — just a real, felt connection from the very first session.
                        </p>

                        <Link href="/services"
                            className="inline-block w-fit px-8 py-3 text-[0.72rem] font-bold tracking-[0.2em] uppercase font-sans no-underline text-primary-dark border border-primary-dark hover:bg-primary-dark hover:text-white transition-all duration-300">
                            Learn More
                        </Link>
                    </div>

                    {/* RIGHT — Image Top, Compact Tags Bottom */}
                    <div ref={rightRef} style={rightStyle} className="flex flex-col relative lg:pl-10 lg:pr-4">

                        {/* Connecting background element */}
                        <div className="absolute top-1/3 left-0 right-10 h-px bg-primary-dark/20 -translate-y-1/2 hidden lg:block z-0" />

                        {/* Top Section: Image */}
                        <div className="relative z-10 w-full mb-8">
                            <div className="relative w-full aspect-[5/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                                <Image src="/red.jpg" alt="Trust Technique session with horse" fill className="object-cover transition-transform duration-1000 hover:scale-105" />
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-dark/10 to-transparent" />

                                {/* Pull quote moved into image overlay for compactness */}
                                <div className="absolute bottom-6 left-6 right-6">
                                    <p className="font-serif text-[1.05rem] md:text-[1.2rem] text-white leading-[1.4] italic tracking-[0.01em]">
                                        &quot;Both you and your animal heal and grow together.&quot;
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Section: Compact Horizontal Tags */}
                        <div className="relative z-10 flex flex-wrap gap-2.5 md:gap-3">
                            {pillData.map((pill) => (
                                <div key={pill.label}
                                    className="flex flex-col justify-center px-4 py-2.5 bg-white border border-dark/[0.06] shadow-sm rounded-lg hover:shadow-md hover:border-primary-dark/30 transition-all duration-300">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                        <h4 className="text-[0.75rem] font-bold font-sans text-dark uppercase tracking-[0.05em]">{pill.label}</h4>
                                    </div>
                                    <p className="text-[0.65rem] font-sans text-dark/50 pl-3.5 leading-[1.3]">{pill.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
