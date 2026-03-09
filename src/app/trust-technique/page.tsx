import type { Metadata } from "next";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import HomeCTA from "@/components/home/HomeCTA";


export const metadata: Metadata = {
    title: "The Trust Technique® | Cheryl McDonough NZ",
    description: "Learn about the Trust Technique®: A mindfulness-based method of creating deep, peaceful communication between humans and animals.",
};

const benefits = [
    "Overcome deeply ingrained fears and phobias",
    "Resolve aggressive and reactive behaviours safely",
    "Help rescue animals settle without overwhelming them",
    "Speed up physical healing by removing emotional blockages",
    "Create a bond based on mutual respect, not dominance",
    "Learn to manage your own anxiety around your animal",
];

const steps = [
    {
        number: "01",
        title: "Trust Technique: Introducing Creative Reaction",
        desc: "This first acknowledgement of how animals are highly sensitive to our feelings starts a completely different conversation and changes everything.",
    },
    {
        number: "02",
        title: "Shared Emotional Environment",
        desc: "From here we explore the shared emotional environment between you and your animal and learn how to support them through fear or reactivity.",
    },
    {
        number: "03",
        title: "Building Trust",
        desc: "In this shared calm space you learn to work with your animal without judgement. Situations your animal would normally react to are introduced at a pace they can handle, gradually replacing anxiety and fear with trust. This approach works with any animal and can be a powerful turning point for both you and your dog.",
    },
];

export default function TrustTechniquePage() {
    return (
        <main className="bg-warm-white bg-noise min-h-screen">
            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                HERO SECTION (Matching Home/About Page)
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <section
                className="relative w-full overflow-hidden"
                style={{ height: "100vh", minHeight: 600, maxHeight: 920 }}
            >
                {/* Background image */}
                <Image
                    src="/Red.jpg"
                    alt="Cheryl sitting peacefully with an animal"
                    fill
                    priority
                    className="object-cover"
                    style={{ objectPosition: "center 30%" }}
                />

                {/* Gradient overlay – matching home page */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(108deg, rgba(18, 30, 40, 0.93) 0%, rgba(28, 43, 54, 0.52) 52%, rgba(28,43,54,0.2) 100%)",
                    }}
                />

                {/* Bottom fade - matching home page exactly */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10"
                    style={{ background: "linear-gradient(to bottom, transparent, #f8f5f164)" }}
                />

                {/* Content */}
                <div
                    className="absolute inset-0 flex flex-col justify-center z-20 hero-content mt-[140px]"
                    style={{
                        paddingLeft: "clamp(1.25rem, 7vw, 7rem)",
                        paddingRight: "clamp(1.25rem, 7vw, 7rem)",
                        bottom: "8rem"
                    }}
                >
                    {/* Eyebrow */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-5 h-px bg-accent/70" />
                        <span className="text-[0.72rem] font-bold tracking-[0.22em] uppercase font-sans text-accent/85">
                            The Methodology
                        </span>
                    </div>

                    {/* Headline */}
                    <h1
                        className="font-serif font-normal text-white leading-[1.1] max-w-[700px] mb-5 tracking-[-0.01em]"
                        style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
                    >
                        The Trust<br />
                        <span className="text-accent">Technique&reg;</span>
                    </h1>

                    {/* Subtext */}
                    <p
                        className="text-white/75 font-sans leading-[1.8] max-w-[500px] text-[0.95rem] sm:text-base mb-8"
                    >
                        A profoundly gentle, mindfulness-based approach that resolves behavioural issues by replacing fear with trust. No force, no dominance—just pure connection.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <a href="#how-it-works" className="inline-flex items-center gap-2 px-9 py-3.5 text-[0.72rem] font-bold tracking-[0.22em] uppercase font-sans no-underline transition-all duration-300 bg-accent text-dark border border-accent hover:bg-white hover:border-white">
                            See How it Works <FiArrowRight size={13} />
                        </a>
                    </div>
                </div>
            </section>

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                WHAT IS IT SECTION (Visual Layout)
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <section className="py-20 lg:py-28">
                <div className="max-w-[1280px] mx-auto px-[clamp(1.25rem,6vw,4rem)]">

                    {/* Top Row: Interleaved Image & Text */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center mb-24">
                        <div className="relative w-full aspect-[4/3] lg:aspect-[5/4] rounded-2xl overflow-hidden shadow-2xl border border-dark/5 lg:order-2">
                            <Image src="/Trust.jpg" alt="Cheryl working with a dog" fill className="object-cover object-top" />
                        </div>

                        <div className="lg:order-1">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-5 h-px bg-primary-dark" />
                                <span className="text-[0.7rem] font-bold tracking-[0.22em] uppercase font-sans text-primary-dark">Understanding the Approach</span>
                            </div>
                            <h2 className="font-serif font-normal text-dark leading-[1.12] mb-6 tracking-[-0.01em]"
                                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                                What is the <span className="text-primary-dark">Trust Technique?</span>
                            </h2>
                            <div className="prose prose-lg prose-p:text-dark/65 prose-p:font-sans prose-p:leading-[1.85] prose-p:text-[0.95rem] mb-10">
                                <p className="mb-5">
                                    Developed by James French, the Trust Technique&reg; is based on the theory that animals and humans share feelings. When an animal is reacting with aggression, fear, or anxiety, they are operating at high &quot;thinking levels&quot;. Often, as their owners, we subconsciously match these levels with our own frustration or worry.
                                </p>
                                <p>
                                    I am the <strong>only certified domestic and large animal Trust Technique Practitioner in New Zealand.</strong> Because animals are so sensitive to our emotional states, they begin to mirror this peace. Over time, we use this shared bubble of safety to help the animal overcome deep-seated traumas and triggers.
                                </p>
                            </div>

                            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-[0_10px_30px_rgba(28,43,54,0.04)] border border-dark/5">
                                <p className="font-serif font-bold text-lg text-dark mb-4 italic">
                                    &quot;It takes away the &apos;make / dominance / I&apos;m the boss&apos; conversations and replaces it with trust, confidence, peace and love.&quot;
                                </p>
                                <div className="text-[0.85rem] font-bold uppercase tracking-[0.1em] text-primary-dark font-sans">
                                    — Cheryl McDonough
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                HOW IT WORKS (THE 3 PRINCIPLES)
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <section id="how-it-works" className="py-20 lg:py-28 bg-dark text-white relative overflow-hidden">
                <div className="absolute inset-0">
                    <Image src="/kiri1.jpg" alt="Mindfulness with animals" fill className="object-cover opacity-[0.12] mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/95 to-dark/80" />
                </div>
                <div className="max-w-[1280px] mx-auto px-[clamp(1.25rem,6vw,4rem)] relative z-10">

                    <div className="text-center mb-16 lg:mb-24">
                        <span className="text-[0.7rem] font-bold tracking-[0.2em] uppercase font-sans text-accent inline-block mb-4 bg-accent/10 px-4 py-2 rounded-full">The Core Process</span>
                        <h2 className="font-serif font-normal text-white leading-[1.12] tracking-[-0.01em] mb-6"
                            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                            How It Works
                        </h2>
                        <p className="text-[1rem] text-white/60 font-sans max-w-2xl mx-auto leading-[1.8]">
                            The technique relies on three core principles that build upon one another to create lasting behavioural change.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pl-4 md:pl-0">
                        {steps.map((step, idx) => (
                            <div key={idx} className="relative">
                                {/* Connector Line (Desktop only) */}
                                {idx !== steps.length - 1 && (
                                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-white/10" />
                                )}

                                <div className="text-[3rem] font-serif font-bold text-primary-light/20 mb-6 leading-none relative z-10">
                                    {step.number}
                                </div>
                                <h3 className="font-serif font-bold text-2xl text-white mb-4">{step.title}</h3>
                                <p className="text-white/60 font-sans leading-[1.7] text-[0.95rem]">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                WHY CHOOSE US (Elegant List)
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <section className="py-20 lg:py-28 bg-bg-section">
                <div className="max-w-[1280px] mx-auto px-[clamp(1.25rem,6vw,4rem)]">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="font-serif font-normal text-dark leading-[1.12] mb-4 tracking-[-0.01em]"
                                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
                                Why Choose This Method?
                            </h2>
                            <div className="w-16 h-1 bg-primary-dark/20 mx-auto rounded-full" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                            {benefits.map((benefit, idx) => (
                                <div key={idx} className="flex items-start gap-4 p-4 border-b border-dark/5 hover:bg-white/50 transition-colors">
                                    <div className="text-primary-dark font-serif text-2xl font-bold italic leading-none shrink-0 mt-1">
                                        0{idx + 1}
                                    </div>
                                    <span className="text-[1.05rem] text-dark/80 font-sans leading-[1.6]">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            <HomeCTA />

        </main>
    );
}
