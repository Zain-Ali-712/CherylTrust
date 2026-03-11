import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiGlobe, FiMapPin, FiCheckCircle } from "react-icons/fi";
import { MdSelfImprovement, MdColorLens } from "react-icons/md";
import { TbMassage } from "react-icons/tb";
import { GiLightBulb } from "react-icons/gi";
import HomeCTA from "@/components/home/HomeCTA";

export const metadata: Metadata = {
    title: "About Cheryl McDonough | Trust Technique Practitioner NZ",
    description:
        "Meet Cheryl McDonough — Certified Trust Technique Practitioner & ConTact C.A.R.E Bodyworker in Wellington NZ, specialising in fear, aggression, and anxiety in dogs and horses.",
};

const tools = [
    {
        Icon: MdSelfImprovement,
        name: "Trust Technique®",
        desc: "A mindfulness-based method of creating a deep, connected relationship between humans and animals, this empowers behavioural change. Available globally via Teams or FaceTime.",
        tag: "Global Online + In Person",
    },
    {
        Icon: GiLightBulb,
        name: "ConTact C.A.R.E",
        desc: "Natural hands on body treatment to restore balance, release pressure and relieve pain. Gentle and effective care for your animal. Available in person only",
        tag: "In Person only",
    },
    {
        Icon: TbMassage,
        name: "Musculoskeletal Unwinding",
        desc: "A blending of acupressure, Kinesiology, massage, meridian balancing, ortho bionomy and energy therapy for deep physical healing.",
        tag: "In Person — Wellington NZ",
    },
    {
        Icon: MdColorLens,
        name: "Red Light Therapy",
        desc: "Non-invasive red light treatment that accelerates healing from injuries, surgery, or old scars. Relieves pain and increases blood flow.",
        tag: "In Person — Wellington NZ",
    },
];

const credentials = [
    "Certified Trust Technique® Practitioner",
    "ConTact C.A.R.E Bodyworker",
    "Emotion Code Releasing Practitioner",
    "Red Light Therapy Therapist",
    "Equine & Canine Bodywork Specialist",
    "Over 9 years of hands-on animal therapy",
];

export default function AboutPage() {
    return (
        <main className="bg-warm-white bg-noise min-h-screen">
            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                HERO SECTION (Matching Home Page)
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <section
                className="relative w-full overflow-hidden"
                style={{ height: "100vh", minHeight: 600, maxHeight: 920 }}
            >
                {/* Background image */}
                <Image
                    src="/Kash.jpg"
                    alt="Cheryl with horse"
                    fill
                    priority
                    className="object-cover"
                    style={{ objectPosition: "center 20%" }}
                />

                {/* Gradient overlay – matching home page */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(108deg, rgba(18, 30, 40, 0.93) 0%, rgba(28, 43, 54, 0.52) 52%, rgba(28,43,54,0.2) 100%)",
                    }}
                />

                {/* Bottom fade */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10"
                    style={{ background: "linear-gradient(to bottom, transparent, #f8f5f164)" }}
                />

                {/* Content */}
                <div
                    className="absolute inset-0 flex flex-col justify-center hero-content z-20"
                    style={{
                        paddingLeft: "clamp(1.25rem, 7vw, 7rem)",
                        paddingRight: "clamp(1.25rem, 7vw, 7rem)",
                        bottom: "6rem",
                        paddingTop: "6rem"
                    }}
                >
                    {/* Eyebrow */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-5 h-px bg-accent/70" />
                        <span className="text-[0.72rem] font-bold tracking-[0.22em] uppercase font-sans text-accent/85">
                            About Cheryl
                        </span>
                    </div>

                    {/* Headline */}
                    <h1
                        className="font-serif font-normal text-white leading-[1.1] max-w-[650px] mb-5 tracking-[-0.01em]"
                        style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
                    >
                        Finding Peace Through<br />
                        <span className="text-accent">Connection.</span>
                    </h1>

                    {/* Subtext */}
                    <p
                        className="text-white/75 font-sans leading-[1.8] max-w-[500px] text-[0.95rem] sm:text-base mb-8"
                    >
                        Certified Trust Technique® Practitioner  — helping animals and their people develop a new relationship that supports changing behaviours, builds trust, and offers deep emotional healing. Physical issues can also be addressed with bodywork using ConTact C.A.R.E which is a gentle hands on approach to releasing pressure, and alleviating pain, and improving well being.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Link href="/trust-technique" className="inline-flex items-center gap-3 px-8 py-3.5 text-[0.75rem] font-bold tracking-[0.2em] uppercase font-sans no-underline transition-all duration-300 bg-accent text-dark border border-accent hover:bg-white hover:border-white shadow-md">
                            Explore Services <FiArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                STORY & CREDENTIALS SECTION
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <section className="py-20 lg:py-[7.5rem]">
                <div className="max-w-[1280px] mx-auto px-[clamp(1.25rem,6vw,4rem)]">
                    <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-start">

                        {/* LEFT: Visual & Credentials */}
                        <div className="relative w-full max-w-[500px] lg:max-w-none mx-auto lg:mx-0">
                            {/* Accent Background */}
                            <div className="absolute top-8 -right-8 bottom-12 w-full bg-bg-light/60 rounded-2xl z-0" />

                            {/* Real Image */}
                            <div className="relative z-10 w-[92%] aspect-[3/4] rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(28,43,54,0.12)] border-4 border-white">
                                <Image src="/Aboutme.jpg" alt="Cheryl McDonough" fill className="object-cover object-[center_20%]" />
                            </div>

                            {/* Credentials Floating Box */}
                            <div className="relative z-20 -mt-16 ml-auto w-[90%] bg-dark p-7 lg:p-8 rounded-xl shadow-2xl border border-white/10">
                                <h3 className="text-[0.65rem] font-bold text-accent tracking-[0.2em] uppercase font-sans mb-5 border-b border-white/10 pb-3">
                                    Qualifications
                                </h3>
                                <div className="flex flex-col gap-3.5">
                                    {credentials.map((c) => (
                                        <div key={c} className="flex items-start gap-3">
                                            <FiCheckCircle size={14} className="text-primary-light shrink-0 mt-[2px]" />
                                            <span className="text-[0.8rem] text-white/80 font-sans leading-[1.5]">{c}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Her Story */}
                        <div className="lg:pt-10">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-5 h-px bg-primary-dark" />
                                <span className="text-[0.7rem] font-bold tracking-[0.22em] uppercase font-sans text-primary-dark">Her Journey</span>
                            </div>

                            <h2 className="font-serif font-normal text-dark leading-[1.12] mb-8 tracking-[-0.01em]"
                                style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}>
                                A Deep Passion for<br />
                                <span className="text-primary-dark">Animal Healing</span>
                            </h2>

                            <div className="prose prose-lg prose-p:text-dark/65 prose-p:font-sans prose-p:leading-[1.85] prose-p:text-[0.95rem] mb-10">
                                <p className="mb-5">
                                    Cheryl McDonough is a certified Trust Technique® practitioner and ConTact C.A.R.E bodyworker who has dedicated her practice to helping animals and their people find peace, trust, and deep connection. Working from Wellington, New Zealand, she serves clients both in person and globally online.
                                </p>
                                <p className="mb-5">
                                    Helping animals find skeletal relief from pain and restrictions with <strong>ConTact C.A.R.E</strong>, musculoskeletal relief with <strong>Fascia Release</strong>, and <strong>Red Light Therapy</strong>.
                                </p>
                                <p className="mb-5">
                                    Her emotional journey with her rescue dogs has led her to specialise in dog reactiveness and emotional trauma, she has extensive training in it. The cases that feel impossible are the ones she welcomes with excitement to help, these are the dogs she works with everyday.
                                </p>
                                <p className="mb-5">
                                    Her holistic toolkit includes the Trust Technique®, ConTact C.A.R.E., Musculoskeletal Unwinding, Emotion Code release, and Red Light Therapy.
                                </p>
                                <p>
                                    Cheryl works with many animals, specialising in <strong>cats, dogs, and horses</strong>. Her approach is always private, compassionate, and personalised, focusing on working <em>with</em> the animal, not <em>on</em> them.
                                </p>
                            </div>

                            {/* Coverage badges */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-12">
                                <div className="flex items-center gap-3 px-5 py-3.5 bg-bg-light/40 border border-primary-dark/10 rounded-lg">
                                    <FiGlobe size={18} className="text-primary-dark shrink-0" />
                                    <span className="text-[0.8rem] font-bold text-dark font-sans tracking-[0.05em]">Online Globally</span>
                                </div>
                                <div className="flex items-center gap-3 px-5 py-3.5 bg-bg-light/40 border border-primary-dark/10 rounded-lg">
                                    <FiMapPin size={18} className="text-primary-dark shrink-0" />
                                    <span className="text-[0.8rem] font-bold text-dark font-sans tracking-[0.05em]">In Person (Wellington, NZ)</span>
                                </div>
                            </div>

                            <Link href="/contact" className="inline-flex items-center gap-3 px-8 py-3.5 text-[0.75rem] font-bold tracking-[0.2em] uppercase font-sans no-underline text-white bg-primary-dark border border-primary-dark hover:bg-dark hover:border-dark transition-all duration-300 shadow-md">
                                Contact Cheryl <FiArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                THE TOOLKIT / SERVICES GRID
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <section className="py-20 lg:py-28 bg-dark text-white relative overflow-hidden">
                <div className="absolute inset-0">
                    <Image src="/pink.jpg" alt="Holistic modalities" fill className="object-cover opacity-[0.12] mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/95 to-dark/90" />
                </div>

                <div className="max-w-[1000px] mx-auto px-[clamp(1.25rem,6vw,4rem)] relative z-10">
                    <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-white/10 pb-10">
                        <div>
                            <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase font-sans text-accent inline-block mb-4">The Toolkit</span>
                            <h2 className="font-serif font-normal text-white leading-[1.15] tracking-[-0.01em]"
                                style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}>
                                Holistic Modalities
                            </h2>
                        </div>
                        <p className="text-[1rem] text-white/60 max-w-[24rem] font-sans leading-[1.8]">
                            Every animal is unique. A diverse range of physical and emotional therapies to create exactly the right support plan.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 lg:gap-y-20">
                        {tools.map((tool, idx) => {
                            return (
                                <div key={tool.name} className="group relative flex flex-col items-start bg-transparent">
                                    <div className="text-[4rem] lg:text-[6rem] leading-none font-serif text-accent/20 font-bold group-hover:text-accent/50 transition-colors duration-500 mb-2 lg:mb-4">
                                        0{idx + 1}
                                    </div>
                                    <h3 className="font-serif font-bold text-[1.4rem] md:text-[1.75rem] text-white mb-3">
                                        {tool.name}
                                    </h3>
                                    <p className="text-white/60 font-sans leading-[1.8] text-[0.95rem] mb-6 flex-1">
                                        {tool.desc}
                                    </p>
                                    <span className="text-[0.6rem] font-bold tracking-[0.15em] uppercase font-sans text-accent/80 border border-accent/20 px-5 py-2.5 rounded-full inline-block mt-auto group-hover:bg-accent/10 transition-colors">
                                        {tool.tag}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                QUOTE SECTION (Side-by-side but Shorter)
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <section className="py-20 bg-bg-section relative">
                <div className="max-w-[1280px] mx-auto px-[clamp(1.25rem,6vw,4rem)]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                        {/* LEFT: Image (Shorter aspect ratio) */}
                        <div className="relative w-full aspect-[4/3] sm:aspect-video lg:aspect-[5/4] rounded-[2rem] overflow-hidden shadow-2xl border-4 md:border-8 border-white/60">
                            <Image src="/kiri.jpg" alt="Cheryl teaching Trust Technique" fill className="object-cover object-center" />
                        </div>

                        {/* RIGHT: Quote Box */}
                        <div className="relative bg-white border border-primary-dark/10 rounded-[2rem] p-8 md:p-12 shadow-[0_30px_60px_rgba(28,43,54,0.05)] overflow-hidden">
                            {/* Decorative Elements */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-dark/5 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

                            <span className="relative inline-block font-serif text-[5rem] text-primary-dark/10 leading-none h-12 mb-4">&quot;</span>

                            <blockquote className="relative z-10 font-serif text-[clamp(1.15rem,2.2vw,1.4rem)] leading-[1.65] font-normal text-dark/90 mb-8 tracking-[-0.01em]">
                                Using the Trust Technique&reg; takes away the &apos;make / dominance / I&apos;m the boss&apos; conversations and replaces it with trust, confidence, peace and love. It truly is a special way of working with your animal.
                            </blockquote>

                            <div className="flex items-center gap-4 relative z-10">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 shrink-0 relative">
                                    <Image src="/Aboutme.jpg" alt="Cheryl" fill className="object-cover object-top" />
                                </div>
                                <div>
                                    <div className="font-bold text-[0.95rem] text-dark font-sans tracking-[0.02em]">Cheryl McDonough</div>
                                    <div className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-primary-dark mt-0.5">Founding Practitioner</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <HomeCTA />

        </main>
    );
}
