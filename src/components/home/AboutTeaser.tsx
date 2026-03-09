"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const stats = [
    { val: "9+", label: "Years Experience" },
    { val: "1500+", label: "Animals Helped" },
    { val: "3", label: "Years ConTact C.A.R.E" },
    { val: "NZ", label: "Wellington Based" },
];

const credentials = [
    "Certified Trust Technique® Practitioner",
    "Equine & Canine Body Therapist – ConTact C.A.R.E",
];

export default function AboutTeaser() {
    const { ref: leftRef, style: leftStyle } = useScrollReveal({ delay: 0 });
    const { ref: rightRef, style: rightStyle } = useScrollReveal({ delay: 140 });

    return (
        <section className="bg-warm-white py-16 lg:py-24 overflow-hidden">
            <div className="max-w-[1280px] mx-auto" style={{ paddingLeft: "clamp(1.25rem,6vw,4rem)", paddingRight: "clamp(1.25rem,6vw,4rem)" }}>
                <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-[5rem] items-center">

                    {/* LEFT: photo + accent bg + badge + stats */}
                    <div ref={leftRef} style={leftStyle} className="relative flex flex-col w-full max-w-[500px] lg:max-w-none mx-auto lg:mx-0">

                        {/* Blue accent bg panel */}
                        <div className="absolute top-0 left-0 bg-primary-dark/5 rounded-2xl z-0" style={{ width: "90%", bottom: "5rem", transform: "translate(-5%, -5%)" }} />

                        {/* Photo */}
                        <div className="about-img-wrap relative z-10 overflow-hidden border-2 border-white shadow-xl cursor-pointer ml-auto w-[90%] lg:w-[85%]"
                            style={{ marginTop: "2rem", aspectRatio: "3/4" }}>
                            <Image src="/Aboutme.jpg" alt="Cheryl McDonough" fill sizes="(max-width: 1024px) 90vw, 40vw"
                                className="about-img object-cover object-top transition-transform duration-700 hover:scale-105" />
                        </div>

                        {/* Name badge - Moved to top left as requested */}
                        <div className="absolute z-20 bg-primary-dark p-5 max-w-[180px] shadow-lg" style={{ top: "4rem", left: "-1rem" }}>
                            <p className="font-serif font-bold text-[1.15rem] text-white leading-[1.2]">Cheryl</p>
                            <p className="font-serif font-bold text-[1.15rem] text-white leading-[1.2] mb-1.5">McDonough</p>
                            <p className="text-[0.55rem] font-bold tracking-[0.15em] uppercase font-sans text-accent">Animal Behaviourist and Bodyworker</p>
                        </div>

                        {/* Stats strip - Rebuilt as a rich dark contrast element */}
                        <div className="relative z-10 mt-8 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/20 rounded-xl overflow-hidden shadow-2xl">
                            {stats.map((s) => (
                                <div key={s.label} className="bg-dark/95 py-5 text-center px-3 transition-colors duration-300 hover:bg-dark group">
                                    <p className="font-serif font-bold text-[1.5rem] text-white leading-none group-hover:text-accent transition-colors">{s.val}</p>
                                    <p className="text-[0.55rem] font-bold tracking-[0.15em] uppercase font-sans text-primary-light mt-2 opacity-80">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: text */}
                    <div ref={rightRef} style={rightStyle} className="flex flex-col justify-center pt-2 lg:pt-4">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-5 h-px bg-primary" />
                            <span className="text-[0.72rem] font-bold tracking-[0.22em] uppercase font-sans text-primary">About Cheryl</span>
                        </div>

                        <h2 className="font-serif font-normal text-dark leading-[1.12] mb-6 tracking-[-0.01em]"
                            style={{ fontSize: "clamp(1.875rem,4vw,2.75rem)" }}>
                            The person behind<br />
                            <span className="text-primary-dark">the Trust Technique</span>
                            <sup className="text-primary-dark text-[0.65em]">®</sup>
                        </h2>

                        {/* Separator line */}
                        <div className="h-px bg-gradient-to-r from-primary-dark/30 to-transparent mb-7" />

                        <p className="text-[0.95rem] text-dark/60 font-sans leading-[1.8] mb-4">
                            Cheryl is a certified and insured Trust Technique® Practitioner and ConTact C.A.R.E bodyworker based in Wellington, New Zealand — helping animals and their people find genuine peace, connection, and lasting change.
                        </p>
                        <p className="text-[0.95rem] text-dark/60 font-sans leading-[1.8] mb-8 lg:mb-10">
                            She addresses fear, aggression, and anxiety at their root using a holistic toolkit: Trust Technique®, Emotion Code Releasing, body therapy, and Red Light treatment.
                        </p>

                        {/* Credentials with hover accent */}
                        <div className="flex flex-col gap-2.5 mb-10">
                            {credentials.map((c, i) => (
                                <div key={c} className={`flex items-center gap-4 px-5 py-3.5 border transition-all duration-300 hover:border-l-[4px] hover:border-primary-dark group ${i === 0 ? "bg-bg-light/60 border-transparent" : "bg-transparent border-dark/[0.06]"
                                    }`}>
                                    <FiCheckCircle size={14} className="text-primary-dark shrink-0 group-hover:scale-110 transition-transform" />
                                    <span className={`text-[0.85rem] font-sans text-dark ${i === 0 ? "font-semibold" : "font-medium"}`}>{c}</span>
                                </div>
                            ))}
                        </div>

                        <Link href="/about"
                            className="group inline-flex items-center gap-3 w-fit px-9 py-3.5 text-[0.75rem] font-bold tracking-[0.2em] uppercase font-sans no-underline text-white bg-primary-dark border border-primary-dark hover:bg-dark hover:border-dark transition-all duration-300 shadow-md hover:shadow-xl">
                            Meet Cheryl <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={14} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}