"use client";

import { useState } from "react";
import Link from "next/link";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const businesses = [
    {
        id: "tt",
        name: "Trust Technique",
        subservices: [
            { id: "tt-2", num: "01", title: "Dog Behaviour & Rehabilitation", available: "In-Person · Wellington", tagline: "Deep behaviour work for complex cases", desc: "Work with Cheryl one-on-one to focus on lasting change, whatever the issue. Her specialty is reactive and anxious dogs, helping you support your dog to respond differently. For new puppies or newly adopted dogs, you can proactively prevent common issues by booking a Set-Up Session, ensuring your dog thrives in their new environment and routine.", bullets: ["Aggression, biting & resource guarding", "Separation anxiety & car sickness", "Trauma & PTSD recovery", "Rescue & new puppy setup"] },
            { id: "tt-3", num: "02", title: "Horse & Large Animal Sessions", available: "Paddock Visits & Online", tagline: "Trust Technique® and body work at your paddock", desc: "Work with Cheryl one-on-one to focus on lasting change for you and your horse, supporting a true connection and peacefulness whether in the paddock, in hand, or while riding.", bullets: ["Spooking, floating, tacking issues", "Laminitis recovery consultation", "Pre-season musculoskeletal sessions", "Online support available worldwide"] },
            { id: "tt-4", num: "03", title: "Musculoskeletal Unwinding", available: "In-Person · Wellington Area", tagline: "A complete body reset for dogs & horses", desc: "Acupressure, kinesiology, meridian balancing, ortho-bionomy, massage, and energy therapy — releasing deep physical and emotional tension held in the body.", bullets: ["Fascia & deep trauma release", "Skeleton alignment work", "Pre/post surgery support", "Arthritis & chronic pain management"] },
            { id: "tt-5", num: "04", title: "Red Light Therapy", available: "In-Person · Wellington Area", tagline: "Non-invasive healing using therapeutic light", desc: "Therapeutic wavelengths to accelerate recovery from injury, surgery, or old scars. Relieves pain from arthritis, muscle soreness, and joint issues without any medication.", bullets: ["Acute injury & surgery recovery", "Arthritis & joint pain relief", "Circulation boost to damaged tissue", "Safe, non-invasive, no side effects"] },
            { id: "tt-6", num: "05", title: "Emotion Code Releasing", available: "Online Globally & In-Person", tagline: "Release trapped emotional energy anywhere in the world", desc: "Identify and release trapped emotions driving stress, anxiety, and behavioural issues. Entirely online — effective for animals anywhere in the world.", bullets: ["Targets root emotional causes", "Fully effective via video call", "Complements all physical therapies", "Works for dogs, horses, cats & more"] },
        ]
    },
    {
        id: "cheryl",
        name: "Cheryl - Trust Technique NZ",
        subservices: [
            { id: "ch-1", num: "01", title: "Trust Technique - Foundation Program", available: "Dogs & Horses", tagline: "Deep connection", desc: "A comprehensive program teaching you and your dog to share a deep connection, eliminating fear-based reactions and building a confident and stable relationship.", bullets: ["Eliminate fear-based reactions", "Build deep connection", "Comprehensive coaching", "For both dogs and horses"] },
            { id: "ch-2", num: "02", title: "Trust Technique Consult for Clients", available: "Private Coaching", tagline: "Tailored to your needs", desc: "Continued one-on-one coaching tailored to behavioural challenges such as canine: lead work, trauma, aggression, and adoption transitions; and equine: catching, new horse, floating, etc.", bullets: ["Targeted behavioral help", "Spooking and floating issues", "Adoption transitions", "Private 1-on-1 focus"] },
            { id: "ch-3", num: "03", title: "New Puppy / Newly Adopted Dog Set-Up Session", available: "Dog Services", tagline: "Start your relationship off right", desc: "Start your new relationship off right. Help your new dog thrive with a personalised routine and environment plan, creating a calm and effective introduction to your home and daily life.", bullets: ["Home introduction", "Family integration", "Peaceful boundaries", "Set up for success"] },
            { id: "ch-4", num: "04", title: "Emergency Assistance Consult", available: "Acute Support", tagline: "When you need it most", desc: "Immediate support and guidance for sudden behavioural issues, injuries, or acute crisis situations.", bullets: ["Immediate guidance", "Sudden behavioral changes", "Post-injury trauma", "Acute crisis support"] }
        ]
    },
    {
        id: "contact-care",
        name: "ConTact C.A.R.E",
        subservices: [
            { id: "cc-1", num: "01", title: "ConTact C.A.R.E for Dogs", available: "Small Animals", tagline: "Practical physical relief", desc: "A practical method for releasing trapped physical pressure and tension in dogs and other small animals.", bullets: ["Releases trapped pressure", "Improves comfort", "Non-invasive bodywork", "For dogs & small animals"] },
            { id: "cc-2", num: "02", title: "ConTact C.A.R.E for Horses", available: "Large Animals", tagline: "Equine physical tension release", desc: "Releasing trapped energetic trauma and physical pressure. Horses hold immense emotional memory; clearing this creates space for physical healing.", bullets: ["Releases energetic trauma", "Clears physical pressure", "Creates healing space", "For horses & large animals"] }
        ]
    },
    {
        id: "adventure",
        name: "Adventure Park Cheryl",
        subservices: [
            { id: "adv-1", num: "01", title: "Adventure Park Cheryl Membership", available: "Yearly Access", tagline: "Exclusive park access", desc: "Join our private membership for responsible dog owners. Grants you access to book Adventure Park Cheryl, Swim Spot, and farm walks.", bullets: ["Private booking access", "Secure environment", "Seasonal Swim Spot", "All breeds welcome"] },
            { id: "adv-2", num: "02", title: "Distraction-Free Dog Time", available: "Private Booking", tagline: "Safe and private spaces", desc: "Minimize distractions and triggers to maximize quality time with your dog in an enclosed environment with no other dogs to worry about.", bullets: ["No off-leash surprises", "Ideal for reactive dogs", "Stress-free exercise", "Fully deer-fenced"] },
            { id: "adv-3", num: "03", title: "Off-Leash Enrichment", available: "Adventure Park Cheryl", tagline: "Explore, sniff, and play", desc: "Exploration and off-lead fun activities that enrich your dog's day. Features include a confidence course, a sensory garden, and agility jumps.", bullets: ["Confidence course included", "Sensory garden exploration", "Agility jumps", "Mental and physical fun"] },
            { id: "adv-4", num: "04", title: "Safe Play Space", available: "Wainuiomata", tagline: "Relax in the countryside", desc: "Fully deer fenced and double-gated entry so you can relax and truly enjoy the beautiful Wellington countryside with your best friend.", bullets: ["Double-gated entry", "High deer fencing", "Peace of mind", "Beautiful farm scenery"] }
        ]
    }


];

export default function ServicesOverview() {
    const [activeBusId, setActiveBusId] = useState(0);
    const [activeSubId, setActiveSubId] = useState(0);

    const { ref: headRef, style: headStyle } = useScrollReveal({ delay: 0 });
    const { ref: bodyRef, style: bodyStyle } = useScrollReveal({ delay: 100 });

    const activeBusiness = businesses[activeBusId];
    const s = activeBusiness.subservices[activeSubId];

    return (
        <section id="services-overview" className="bg-bg-section py-16">
            <div className="max-w-[1280px] mx-auto" style={{ paddingLeft: "clamp(1.25rem,6vw,4rem)", paddingRight: "clamp(1.25rem,6vw,4rem)" }}>

                {/* Centered header */}
                <div ref={headRef} style={headStyle} className="text-center mb-10">
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
                        A holistic approach to animal wellbeing — in Wellington or online globally. Select an area below to explore exactly what we provide.
                    </p>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center items-center gap-2 mb-8">
                    {businesses.map((bus, idx) => (
                        <button
                            key={bus.id}
                            onClick={() => {
                                setActiveBusId(idx);
                                setActiveSubId(0);
                            }}
                            className={`px-5 py-2.5 rounded-full border text-[0.8rem] font-bold font-sans tracking-wide transition-all ${activeBusId === idx
                                ? "bg-dark text-white border-dark shadow-md"
                                : "bg-white text-dark/70 border-dark/10 hover:bg-dark hover:text-white"
                                }`}
                        >
                            {bus.name}
                        </button>
                    ))}
                </div>

                {/* Two-panel interactive layout */}
                <div ref={bodyRef} className="rounded-2xl overflow-hidden shadow-2xl shadow-dark/5 bg-white border border-dark/10"
                    style={{ ...bodyStyle, display: "flex", flexDirection: "column", minHeight: "420px" }}>

                    {/* Left & Right Grid */}
                    <div className="flex flex-col lg:grid lg:grid-flow-col w-full h-full" style={{ gridTemplateColumns: "1fr 1.35fr" }}>

                        {/* LEFT: Clickable List of Subservices */}
                        <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-dark/10 bg-white">
                            {activeBusiness.subservices.map((sv, i) => (
                                <button key={sv.id} onClick={() => setActiveSubId(i)}
                                    className={`flex items-center gap-4 px-7 py-[1.375rem] border-b border-dark/[0.07] cursor-pointer text-left transition-all duration-200
                                ${i === activeSubId
                                            ? "bg-dark text-white shadow-md relative z-10"
                                            : "bg-transparent text-dark hover:bg-dark/[.03]"}`}>
                                    {/* Accent line for active */}
                                    {i === activeSubId && <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent" />}

                                    <span className={`text-[0.6rem] font-bold tracking-[0.1em] font-sans shrink-0 w-5 transition-colors pl-1 ${i === activeSubId ? "text-accent" : "text-dark/25"
                                        }`}>
                                        {sv.num}
                                    </span>
                                    <div className="flex-1 min-w-0 pl-1">
                                        <p className={`text-[0.875rem] font-bold font-sans leading-[1.3] mb-0.5 transition-colors ${i === activeSubId ? "text-white" : "text-dark/70"
                                            }`}>
                                            {sv.title}
                                        </p>
                                        <p className={`text-[0.65rem] font-semibold tracking-[0.12em] uppercase font-sans transition-colors ${i === activeSubId ? "text-white/60" : "text-dark/40"
                                            }`}>
                                            {sv.available}
                                        </p>
                                    </div>
                                    {i === activeSubId && <FiArrowRight size={14} className="text-accent shrink-0 mr-2" />}
                                </button>
                            ))}
                        </div>

                        {/* RIGHT: Active Subservice Detail */}
                        <div className="bg-white flex flex-col flex-1 relative overflow-hidden">
                            {/* Header section  */}
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

                            {/* Body section  */}
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

                            {/* Footer section  */}
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