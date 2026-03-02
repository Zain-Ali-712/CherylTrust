"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const panels = [
    {
        title: "Dogs", tagline: "Behaviour · Rehabilitation · Body Therapy",
        points: ["Aggression & fear behaviour", "Anxiety & PTSD recovery", "Red Light & body therapy", "Rescue & new puppy setup"],
        href: "/services/dogs", image: "/Foster-story1-3.jpg", stat: { val: "100+", label: "Dogs Helped" },
    },
    {
        title: "Horses", tagline: "Paddock Sessions · Musculoskeletal Care",
        points: ["Trust Technique® at your paddock", "Laminitis recovery guidance", "Musculoskeletal unwinding", "Pre-season sessions"],
        href: "/services/horses", image: "/horse.jpg", stat: { val: "NZ", label: "Wellington & Online" },
    },
];

function CarePanel({ p, index }: { p: typeof panels[0]; index: number }) {
    const { ref, style } = useScrollReveal({ delay: index * 100 });

    return (
        <div ref={ref} style={style} className="care-panel relative overflow-hidden min-h-[520px] rounded-2xl group flex-1">
            <Image src={p.image} alt={p.title} fill className="care-img object-cover transition-transform duration-[850ms] ease-out group-hover:scale-105" />

            {/* Overlay – slightly darker for better contrast */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(28,43,54,0.98) 25%, rgba(28,43,54,0.55) 65%, rgba(28,43,54,0.2) 100%)" }} />

            {/* Content – now with consistent side padding */}
            <div className="absolute inset-0 z-10 flex flex-col justify-end"
                style={{ padding: "clamp(1.5rem, 5vw, 3rem)" }}>

                {/* Stat badge – refined with dark blue background on hover */}
                <div className="care-stat absolute top-7 right-7 text-right bg-primary-dark/20 backdrop-blur-sm px-4 py-2 rounded-sm border border-primary-dark/10 opacity-80 group-hover:opacity-100 transition-opacity">
                    <p className="font-serif font-bold text-[1.75rem] text-white leading-none">{p.stat.val}</p>
                    <p className="text-[0.6rem] font-bold tracking-[0.18em] uppercase text-white/70 font-sans mt-1">{p.stat.label}</p>
                </div>

                {/* Eyebrow */}
                <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-4 h-px bg-accent/70" />
                    <span className="text-[0.62rem] font-bold tracking-[0.2em] uppercase font-sans text-accent/80">{p.tagline}</span>
                </div>

                {/* Title */}
                <h3 className="font-serif font-normal text-white leading-[1.08] tracking-[-0.01em] mb-5"
                    style={{ fontSize: "clamp(2rem,3vw,2.5rem)" }}>
                    {p.title}
                </h3>

                <div className="h-px bg-white/10 mb-6" />

                {/* 2-col bullets – fade on hover (stack on very small screens, then 2-col) */}
                <div className="care-bullets grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2.5 mb-8 opacity-70 group-hover:opacity-100 transition-opacity">
                    {p.points.map((pt) => (
                        <div key={pt} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent/90 shrink-0 mt-[0.4rem]" />
                            <span className="text-[0.82rem] text-white/80 font-sans leading-[1.45]">{pt}</span>
                        </div>
                    ))}
                </div>

                <Link href={p.href}
                    className="inline-flex items-center gap-2 w-fit px-7 py-[0.7rem] text-[0.72rem] font-bold tracking-[0.2em] uppercase font-sans no-underline text-white border border-white/30 hover:bg-accent hover:text-dark hover:border-accent transition-all duration-300">
                    Learn More <FiArrowRight size={12} />
                </Link>
            </div>
        </div>
    );
}

export default function CareTeaser() {
    const { ref: headRef, style: headStyle } = useScrollReveal({ delay: 0 });

    return (
        <section className="bg-dark">
            {/* Header – consistent horizontal padding */}
            <div ref={headRef}
                className="text-center pt-20 pb-16 px-4 sm:px-6 lg:px-8"
                style={{ ...headStyle, paddingLeft: "clamp(1.25rem,6vw,4rem)", paddingRight: "clamp(1.25rem,6vw,4rem)" }}>
                <div className="flex items-center justify-center gap-3.5 mb-5">
                    <div className="w-5 h-px bg-accent/50" />
                    <span className="text-[0.72rem] font-bold tracking-[0.22em] uppercase font-sans text-accent/70">Specialist Care</span>
                    <div className="w-5 h-px bg-accent/50" />
                </div>
                <h2 className="font-serif font-normal text-white leading-[1.12] tracking-[-0.01em] mb-4"
                    style={{ fontSize: "clamp(2rem,4vw,2.875rem)" }}>
                    Expert Care for <span className="text-primary-light">Every Animal</span>
                </h2>
                <p className="text-[0.875rem] text-white/45 font-sans max-w-[400px] mx-auto leading-[1.8]">
                    Whether you have a dog or a horse, Cheryl brings the same depth of expertise, patience, and heart.
                </p>
            </div>

            {/* Two image panels – wrapped in container with spacing */}
            <div className="max-w-[1280px] mx-auto pb-20"
                style={{ paddingLeft: "clamp(1.25rem,6vw,4rem)", paddingRight: "clamp(1.25rem,6vw,4rem)" }}>
                <div className="flex flex-col md:grid md:grid-cols-2 gap-6 lg:gap-8">
                    {panels.map((p, i) => <CarePanel key={p.title} p={p} index={i} />)}
                </div>
            </div>
        </section>
    );
}