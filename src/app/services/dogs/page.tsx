import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import HomeCTA from "@/components/home/HomeCTA";
import { FaPaw } from "react-icons/fa";

export const metadata: Metadata = {
    title: "Dog Behaviour & Training | Cheryl McDonough Trust Technique NZ",
    description: "Expert dog rehabilitation in Wellington, NZ. Specialising in aggression, rescue dogs, separation anxiety, and fear using the Trust Technique.",
};


const dogTherapies = [
    {
        title: "Trust Technique - Foundation Programme",
        desc: "A comprehensive program teaching you and your dog to share a deep nervous system connection, eliminating fear-based reactions and building unshakeable confidence.",
    },
    {
        title: "Puppy / New adopted dog set up",
        desc: "Start your new relationship off right. Learn how to introduce your new dog to your home, family, and other animals with peace and clarity.",
    },
    {
        title: "Trust Technique Consult for Clients",
        desc: "Private coaching tailored to specific behavioral challenges, trauma, aggression, PTSD, and adoption transitions.",
    },
    {
        title: "ConTact C.A.R.E for Dogs *and other small animals",
        desc: "A practical method for releasing trapped physical pressure and tension. We ensure the body is as comfortable as the mind.",
    },
    {
        title: "Emergency Assistance Consult",
        desc: "Immediate support and guidance for sudden behavioral issues, injuries, or when you are navigating an acute crisis.",
    }
];

export default function DogServicesPage() {
    return (
        <main className="bg-warm-white bg-noise min-h-screen">
            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                HERO SECTION
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <section
                className="relative w-full overflow-hidden"
                style={{ height: "100vh", minHeight: 600, maxHeight: 920 }}
            >
                {/* Background image */}
                <Image
                    src="/Mitch.jpg"
                    alt="Dog resting calmly"
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
                            Dog Behaviour & Rehabilitation
                        </span>
                    </div>

                    {/* Headline */}
                    <h1
                        className="font-serif font-normal text-white leading-[1.1] max-w-[700px] mb-5 tracking-[-0.01em]"
                        style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
                    >
                        From Fearful & Reactive to <span className="text-accent">Calm & Connected.</span>
                    </h1>

                    {/* Subtext */}
                    <p
                        className="text-white/75 font-sans leading-[1.8] max-w-[500px] text-[0.95rem] sm:text-base mb-8"
                    >
                        We specialise in the cases that feel impossible. Overcome deep-seated trauma, anxiety, and aggression without force or dominance.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Link href="/contact" className="inline-flex items-center gap-2 px-9 py-3.5 text-[0.72rem] font-bold tracking-[0.22em] uppercase font-sans no-underline transition-all duration-300 bg-accent text-dark border border-accent hover:bg-white hover:border-white">
                            Book a Consultation <FiArrowRight size={13} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                BEHAVIOUR IS COMMUNICATION (Side-by-side Layout)
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <section className="py-20 lg:py-24 bg-bg-section">
                <div className="max-w-[1280px] mx-auto px-[clamp(1.25rem,6vw,4rem)]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                        {/* LEFT: Text Content */}
                        <div className="order-2 lg:order-1 lg:pr-6">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-6 h-px bg-primary-dark" />
                                <span className="text-[0.75rem] font-bold tracking-[0.22em] uppercase font-sans text-primary-dark">Understanding the Root</span>
                            </div>
                            <h2 className="font-serif font-normal text-dark leading-[1.12] mb-6 tracking-[-0.01em]" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                                Behaviour is <br /><span className="text-primary-dark italic">Communication</span>
                            </h2>
                            <div className="space-y-6 text-dark/75 font-sans leading-[1.8] text-[0.95rem] md:text-base">
                                <p>
                                    When a dog lunges, barks continuously, or panics when left alone, they aren&apos;t trying to be &quot;bad&quot; or dominant. They are overwhelmed, fearful, or trapped in high anxiety.
                                </p>
                                <p>
                                    Regular obedience training frequently suppresses these symptoms without addressing the emotional distress causing them. At Cheryl - Trust Technique NZ, we don&apos;t use commands, corrections, or force. We teach you how to lower your dog&apos;s &quot;thinking levels&quot; so they process their environment safely.
                                </p>
                            </div>
                        </div>

                        {/* RIGHT: Image and Tags */}
                        <div className="order-1 lg:order-2">
                            {/* Shorter Image */}
                            <div className="relative w-full aspect-[5/3] sm:aspect-video rounded-3xl overflow-hidden shadow-xl border-4 border-white mb-6">
                                <Image src="/adopt3.jpg" alt="Dog therapy in nature" fill className="object-cover" style={{ objectPosition: "center 40%" }} />
                            </div>

                            {/* Tags moved below image */}
                            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                                {[
                                    "Reactivity & Aggression", "Separation Anxiety", "Fear & Trauma", "Resource Guarding"
                                ].map((issue, idx) => (
                                    <div key={idx} className="flex items-center gap-3 bg-white border border-dark/10 shadow-sm px-4 py-3 rounded-xl">
                                        <FaPaw className="text-primary-dark/80 flex-shrink-0" size={14} />
                                        <span className="text-[0.75rem] font-bold text-dark/80 tracking-wide">{issue}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                OUR CANINE THERAPIES (Alternating Image & Text)
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <section className="py-24 lg:py-32 bg-warm-white">
                <div className="max-w-[1280px] mx-auto px-[clamp(1.25rem,6vw,4rem)]">

                    <div className="text-center mb-20">
                        <h2 className="font-serif font-normal text-dark leading-[1.12] tracking-[-0.01em]" style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}>
                            Holistic Canine Therapy
                        </h2>
                        <div className="w-16 h-1 bg-primary-dark/20 mx-auto rounded-full mt-6" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {dogTherapies.map((therapy, idx) => (
                            <div key={idx} className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-dark/5 hoverError:-translate-y-1 hover:shadow-2xl transition-all duration-300 flex flex-col">
                                <div className="text-primary-dark/20 font-serif font-bold text-5xl mb-6">0{idx + 1}</div>
                                <h3 className="font-serif font-normal text-2xl text-dark mb-4 tracking-[-0.01em]">{therapy.title}</h3>
                                <p className="text-dark/70 font-sans leading-[1.8] text-[0.95rem] mb-8 flex-grow">
                                    {therapy.desc}
                                </p>
                                <Link href="/contact" className="inline-flex items-center gap-2 text-primary-dark font-bold font-sans uppercase tracking-widest text-xs hover:text-dark transition-colors mt-auto">
                                    Enquire <FiArrowRight size={14} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <HomeCTA />
        </main>
    );
}
