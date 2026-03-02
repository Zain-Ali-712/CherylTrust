"use client";

import { useState } from "react";
import Link from "next/link";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const services = [
    { id: "tt", num: "01", title: "Trust Technique® Sessions", available: "Online & In-Person", tagline: "Peace over pressure — for all animals", desc: "Mindfulness-based communication that reduces anxiety in both you and your animal simultaneously. Works at the emotional root of any behaviour — not just the surface symptom.", bullets: ["Works without force, fear, or commands", "Results felt from the very first session", "Available globally via video call", "Suitable for all species"] },
    { id: "dog", num: "02", title: "Dog Behaviour & Rehabilitation", available: "In-Person · Wellington", tagline: "Deep behaviour work for complex cases", desc: "Intensive rehabilitation for dogs with entrenched trauma, aggression, or anxiety. Includes full immersion where your dog stays with Cheryl for focused, deep recovery.", bullets: ["Aggression, biting & resource guarding", "Separation anxiety & car sickness", "Trauma & PTSD recovery", "Rescue & new puppy setup"] },
    { id: "horse", num: "03", title: "Horse & Large Animal Sessions", available: "Paddock Visits & Online", tagline: "Trust Technique® and body work at your paddock", desc: "Cheryl visits your paddock or connects online for horses, donkeys, llamas, and large animals — addressing everything from spooking to musculoskeletal recovery.", bullets: ["Spooking, floating, tacking issues", "Laminitis recovery consultation", "Pre-season musculoskeletal sessions", "Online support available worldwide"] },
    { id: "body", num: "04", title: "Musculoskeletal Unwinding", available: "In-Person · Wellington Area", tagline: "A complete body reset for dogs & horses", desc: "Acupressure, kinesiology, meridian balancing, ortho-bionomy, massage, and energy therapy — releasing deep physical and emotional tension held in the body.", bullets: ["Fascia & deep trauma release", "Skeleton alignment work", "Pre/post surgery support", "Arthritis & chronic pain management"] },
    { id: "red", num: "05", title: "Red Light Therapy", available: "In-Person · Wellington Area", tagline: "Non-invasive healing using therapeutic light", desc: "Therapeutic wavelengths to accelerate recovery from injury, surgery, or old scars. Relieves pain from arthritis, muscle soreness, and joint issues without any medication.", bullets: ["Acute injury & surgery recovery", "Arthritis & joint pain relief", "Circulation boost to damaged tissue", "Safe, non-invasive, no side effects"] },
    { id: "emotion", num: "06", title: "Emotion Code Releasing", available: "Online Globally & In-Person", tagline: "Release trapped emotional energy anywhere in the world", desc: "Identify and release trapped emotions driving stress, anxiety, and behavioural issues. Entirely online — effective for animals anywhere in the world.", bullets: ["Targets root emotional causes", "Fully effective via video call", "Complements all physical therapies", "Works for dogs, horses, cats & more"] },
];

export default function ServicesOverview() {
    const [active, setActive] = useState(0);
    const { ref: headRef, style: headStyle } = useScrollReveal({ delay: 0 });
    const { ref: bodyRef, style: bodyStyle } = useScrollReveal({ delay: 100 });
    const s = services[active];

    return (
        <section id="services-overview" className="bg-bg-section py-16">
            <div className="max-w-[1280px] mx-auto" style={{ paddingLeft: "clamp(1.25rem,6vw,4rem)", paddingRight: "clamp(1.25rem,6vw,4rem)" }}>

                {/* Centered header */}
                <div ref={headRef} style={headStyle} className="text-center mb-14">
                    <div className="flex items-center justify-center gap-3 mb-5">
                        <div className="w-5 h-px bg-primary" />
                        <span className="text-[0.72rem] font-bold tracking-[0.22em] uppercase font-sans text-primary">What We Offer</span>
                        <div className="w-5 h-px bg-primary" />
                    </div>
                    <h2 className="font-serif font-normal text-dark leading-[1.15] mb-4 tracking-[-0.01em]"
                        style={{ fontSize: "clamp(2rem,4vw,2.875rem)" }}>
                        Services Tailored to <span className="text-primary-dark">Your Animal</span>
                    </h2>
                    <p className="text-[0.9rem] text-dark/48 font-sans leading-[1.8] max-w-[440px] mx-auto">
                        A holistic approach to animal wellbeing — in Wellington or online globally.
                    </p>
                </div>

                {/* Two-panel interactive layout */}
                <div ref={bodyRef} className="rounded-2xl overflow-hidden shadow-2xl shadow-dark/5 bg-white border border-dark/10"
                    style={{ ...bodyStyle, display: "flex", flexDirection: "column", minHeight: "420px" }}>

                    {/* We'll use CSS to apply grid on lg screens */}
                    <div className="flex flex-col lg:grid lg:grid-flow-col w-full h-full" style={{ gridTemplateColumns: "1fr 1.35fr" }}>

                        {/* LEFT: clickable list – selected item gets full dark background */}
                        <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-dark/10 bg-white">
                            {services.map((sv, i) => (
                                <button key={sv.id} onClick={() => setActive(i)}
                                    className={`flex items-center gap-4 px-7 py-[1.375rem] border-b border-dark/[0.07] cursor-pointer text-left transition-all duration-200
                                ${i === active
                                            ? "bg-dark text-white shadow-md relative z-10"
                                            : "bg-transparent text-dark hover:bg-dark/[0.03]"}`}>
                                    {/* Accent line for active */}
                                    {i === active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent" />}

                                    <span className={`text-[0.6rem] font-bold tracking-[0.1em] font-sans shrink-0 w-5 transition-colors pl-1 ${i === active ? "text-accent" : "text-dark/25"
                                        }`}>
                                        {sv.num}
                                    </span>
                                    <div className="flex-1 min-w-0 pl-1">
                                        <p className={`text-[0.875rem] font-bold font-sans leading-[1.3] mb-0.5 transition-colors ${i === active ? "text-white" : "text-dark/70"
                                            }`}>
                                            {sv.title}
                                        </p>
                                        <p className={`text-[0.65rem] font-semibold tracking-[0.12em] uppercase font-sans transition-colors ${i === active ? "text-white/60" : "text-dark/40"
                                            }`}>
                                            {sv.available}
                                        </p>
                                    </div>
                                    {i === active && <FiArrowRight size={14} className="text-accent shrink-0 mr-2" />}
                                </button>
                            ))}
                        </div>

                        {/* RIGHT: active service detail – clean, readable white design */}
                        <div className="bg-white flex flex-col flex-1 relative overflow-hidden">
                            {/* Header section – Clean White with elegant typography */}
                            <div className="p-6 md:p-8 pb-5 border-b border-dark/20">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="font-serif font-bold text-[3rem] text-dark/10 leading-none">{s.num}</span>
                                    <div className="h-px flex-1 bg-gradient-to-r from-dark/20 to-transparent" />
                                </div>
                                <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase font-sans text-primary-dark mb-3 inline-block bg-primary-dark/5 px-3 py-1.5 rounded-sm">{s.available}</p>
                                <h3 className="font-serif font-bold text-dark leading-[1.15] mb-3 tracking-[-0.01em]"
                                    style={{ fontSize: "clamp(1.75rem,3vw,2.25rem)" }}>
                                    {s.title}
                                </h3>
                                <p className="text-[0.95rem] font-semibold font-sans text-primary-dark">{s.tagline}</p>
                            </div>

                            {/* Body section – High readability */}
                            <div className="p-6 md:p-8 pt-6 pb-6 flex-1 bg-bg-light/5">
                                <p className="text-[1.05rem] text-dark/70 font-sans leading-[1.8] mb-6 max-w-[95%]">{s.desc}</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5">
                                    {s.bullets.map((b) => (
                                        <div key={b} className="flex items-start gap-3.5">
                                            <div className="mt-[5px] shrink-0 bg-primary-dark/10 p-1 rounded-full">
                                                <FiCheck size={11} className="text-primary-dark" />
                                            </div>
                                            <span className="text-[0.9rem] text-dark/75 font-medium font-sans leading-[1.6]">{b}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer section – Dark separator */}
                            <div className="bg-primary-dark/5 p-5 md:px-8 border-t border-dark/20 flex flex-wrap items-center justify-between gap-4">
                                <Link href="/contact"
                                    className="inline-flex items-center justify-center gap-2 px-7 py-3 text-[0.72rem] font-bold tracking-[0.2em] uppercase font-sans no-underline text-white bg-primary-dark border border-primary-dark hover:bg-dark hover:border-dark transition-all duration-300">
                                    Book This Service <FiArrowRight size={13} />
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}