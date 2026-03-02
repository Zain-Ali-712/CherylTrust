import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import HomeCTA from "@/components/home/HomeCTA";
import { FaHorse } from "react-icons/fa";

export const metadata: Metadata = {
    title: "Horse Sessions & Equine Therapy | Cheryl McDonough Trust Technique NZ",
    description: "Holistic equine therapy in Wellington NZ. Addressing spooking, floating issues, laminitis recovery, and musculoskeletal tension using the Trust Technique and bodywork.",
};

const horseIssues = [
    "Spooking, bolt-offs, and general high anxiety riding",
    "Difficulty with floating, trailer loading, or farrier visits",
    "Pre-season preparation and musculoskeletal unwinding",
    "Laminitis recovery and pain management",
    "Rescue horses that have shut down or show aggression",
    "General tension, girthiness, or resistance to tacking",
];

const horseTherapies = [
    {
        title: "Trust Technique®",
        desc: "Teaching you and your horse to share a deep nervous system connection, eliminating fear-based reactions and building unshakeable confidence.",
    },
    {
        title: "Musculoskeletal Unwinding",
        desc: "A blend of acupressure, Kinesiology, ortho bionomy, and massage to release deep fascial tension and skeleton misalignment.",
    },
    {
        title: "Red Light Therapy",
        desc: "Therapeutic wavelengths applied to accelerate healing for acute injuries, joint issues, or post-surgery recovery right in your paddock.",
    },
    {
        title: "Emotion Code Releasing",
        desc: "Releasing trapped energetic trauma. Horses hold immense emotional memory in their bodies; clearing this creates space for physical healing.",
    },
];

export default function HorseServicesPage() {
    return (
        <main className="bg-warm-white bg-noise min-h-screen">
            <section
                className="relative w-full overflow-hidden"
                style={{ height: "100vh", minHeight: 600, maxHeight: 920 }}
            >
                {/* Background image */}
                <Image
                    src="/horseHero.jpg"
                    alt="Equine Therapy"
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
                            Equine Therapy & Sessions
                        </span>
                    </div>

                    {/* Headline */}
                    <h1
                        className="font-serif font-normal text-white leading-[1.1] max-w-[700px] mb-5 tracking-[-0.01em]"
                        style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
                    >
                        Healing for the <span className="text-accent">Whole Horse.</span>
                    </h1>

                    {/* Subtext */}
                    <p
                        className="text-white/75 font-sans leading-[1.8] max-w-[500px] text-[0.95rem] sm:text-base mb-8"
                    >
                        Whether it&apos;s deep-seated trauma, spooking, or physical tension holding your horse back — our holistic bodywork and Trust Technique sessions create profound shifts.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Link href="/contact" className="inline-flex items-center gap-2 px-9 py-3.5 text-[0.72rem] font-bold tracking-[0.22em] uppercase font-sans no-underline transition-all duration-300 bg-accent text-dark border border-accent hover:bg-white hover:border-white">
                            Book a Paddock Visit <FiArrowRight size={13} />
                        </Link>
                    </div>
                </div>
            </section>


            <section className="py-20 lg:py-28">
                <div className="max-w-[1280px] mx-auto px-[clamp(1.25rem,6vw,4rem)]">

                    {/* Top Row: Interleaved Image & Text */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center mb-24">
                        <div className="relative w-full aspect-[4/3] lg:aspect-[5/4] rounded-2xl overflow-hidden shadow-2xl border border-dark/5 lg:order-2">
                            <Image src="/Horse.jpg" alt="Connecting with a horse" fill className="object-cover object-[center_30%]" />
                        </div>

                        <div className="lg:order-1">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-5 h-px bg-primary-dark" />
                                <span className="text-[0.7rem] font-bold tracking-[0.22em] uppercase font-sans text-primary-dark">Mind & Body Connection</span>
                            </div>
                            <h2 className="font-serif font-normal text-dark leading-[1.12] mb-6 tracking-[-0.01em]"
                                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                                Releasing Tension, <span className="text-primary-dark">Building Trust</span>
                            </h2>
                            <div className="prose prose-lg prose-p:text-dark/65 prose-p:font-sans prose-p:leading-[1.85] prose-p:text-[0.95rem] mb-10">
                                <p className="mb-5">
                                    Horses are prey animals with highly sensitive nervous systems. When a horse &quot;acts up&quot;—whether that&apos;s spooking, refusing to load, or exhibiting resistance under saddle—it is rarely stubbornness. It is almost always a manifestation of physical pain or emotional overwhelm.
                                </p>
                                <p>
                                    Our approach bridges this gap. By combining deep musculoskeletal unwinding with the emotional safety of the Trust Technique&reg;, we don&apos;t just &quot;fix&quot; the problem; we help the horse release the underlying trauma and physical patterns holding them back.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 lg:py-28 bg-dark text-white relative overflow-hidden">
                <div className="absolute inset-0">
                    <Image src="/pink.jpg" alt="Equine modalities" fill className="object-cover opacity-[0.12] mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/95 to-dark/80" />
                </div>

                <div className="max-w-[1280px] mx-auto px-[clamp(1.25rem,6vw,4rem)] relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-[0.7rem] font-bold tracking-[0.2em] uppercase font-sans text-accent inline-block mb-4 bg-accent/10 px-4 py-2 rounded-full">Equine Modalities</span>
                        <h2 className="font-serif font-normal text-white leading-[1.12] tracking-[-0.01em] mb-6"
                            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}>
                            A Complete Recovery Plan
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {horseTherapies.map((therapy, idx) => (
                            <div key={idx} className="group p-8 lg:p-10 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-primary-light/30 transition-all duration-500">
                                <div className="text-5xl text-primary-light/20 font-serif font-bold mb-6 group-hover:text-primary-light/40 transition-colors">0{idx + 1}</div>
                                <h3 className="font-serif font-bold text-[1.4rem] text-white mb-4">{therapy.title}</h3>
                                <p className="text-white/60 font-sans leading-[1.75] text-[0.95rem]">{therapy.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            <section className="py-20 lg:py-28 bg-bg-section">
                <div className="max-w-[1280px] mx-auto px-[clamp(1.25rem,6vw,4rem)]">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="font-serif font-normal text-dark leading-[1.12] mb-4 tracking-[-0.01em]"
                                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                                Common Equine Challenges
                            </h2>
                            <p className="text-dark/65 font-sans leading-[1.8] mb-6">Issues we frequently work to resolve:</p>
                            <div className="w-16 h-1 bg-primary-dark/20 mx-auto rounded-full" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {horseIssues.map((issue, idx) => (
                                <div key={idx} className="group relative flex items-start gap-4 p-6 bg-white border border-dark/[0.06] rounded-xl hover:border-transparent hover:shadow-[0_15px_30px_rgba(28,43,54,0.06)] transition-all duration-300 overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary-dark to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="w-12 h-12 rounded-full bg-bg-light/80 flex items-center justify-center border border-primary-dark/10 shrink-0 group-hover:bg-primary-dark/5 transition-colors duration-300">
                                        <FaHorse size={20} className="text-primary-dark/70 group-hover:text-primary-dark transition-colors" />
                                    </div>
                                    <div className="pt-2">
                                        <span className="text-[0.95rem] text-dark/80 font-sans font-medium leading-[1.6]">{issue}</span>
                                    </div>
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

