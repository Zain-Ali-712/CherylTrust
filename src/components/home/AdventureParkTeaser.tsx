import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiCheck } from "react-icons/fi";

const features = [
    "Distraction-free private spaces",
    "Off-leash enrichment activities",
    "Fully deer fenced & secure",
    "Access to swimming hole & agility jumps"
];

export default function AdventureParkTeaser() {
    return (
        <section className="py-20 lg:py-28 bg-dark text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />

            {/* Accent gradient in background */}
            <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-[1280px] mx-auto px-[clamp(1.25rem,6vw,4rem)] relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left: Image Grid */}
                    <div className="relative">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4 pt-12">
                                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl feature-image-wrapper">
                                    <Image src="/club1.jpg" alt="Dog running" fill className="object-cover transition-transform duration-700 hover:scale-105" />
                                </div>
                                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl feature-image-wrapper">
                                    <Image src="/club2.jpg" alt="Dog resting" fill className="object-cover transition-transform duration-700 hover:scale-105" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl feature-image-wrapper">
                                    <Image src="/club3.jpg" alt="Dog park" fill className="object-cover transition-transform duration-700 hover:scale-105" />
                                </div>
                                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl feature-image-wrapper bg-accent/20 border border-accent/20 flex flex-col justify-end p-6">
                                    <div className="w-12 h-12 bg-accent text-dark rounded-full flex items-center justify-center mb-4 text-xs font-bold shadow-lg">
                                        Members
                                    </div>
                                    <p className="font-serif text-2xl text-white leading-tight">Join the exclusive adventure club</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Content */}
                    <div className="lg:pl-8">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-5 h-px bg-accent/70" />
                            <span className="text-[0.7rem] font-bold tracking-[0.22em] uppercase font-sans text-accent/85">Exclusive Access</span>
                        </div>

                        <h2 className="font-serif font-normal text-white leading-[1.12] mb-6 tracking-[-0.01em]" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                            Canine <span className="text-accent italic">Adventure Park.</span>
                        </h2>

                        <p className="text-[1.05rem] text-white/70 font-sans leading-[1.8] mb-8">
                            A private paradise for responsible dog owners. Exclusive access to an acre of private, deer fenced country bliss for you and your dog, in Wainuiomata, Wellington.
                        </p>

                        <ul className="space-y-4 mb-10">
                            {features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                                        <FiCheck size={12} className="text-accent" />
                                    </div>
                                    <span className="font-sans text-white/80 text-[1rem]">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <Link href="/adventure-park" className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-dark font-sans font-bold text-[0.8rem] tracking-[0.2em] uppercase hover:bg-white transition-all duration-300 shadow-[0_10px_30px_rgba(207,208,187,0.15)] rounded-xl">
                            Discover Membership <FiArrowRight size={14} />
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}
