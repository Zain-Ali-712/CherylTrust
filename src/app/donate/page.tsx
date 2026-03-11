"use client";
import Image from "next/image";
import { FiHeart, FiExternalLink } from "react-icons/fi";
import { FaDog, FaPaw } from "react-icons/fa";
import HomeCTA from "@/components/home/HomeCTA";


const donationTiers = [
    { breed: "Chihuahua", amount: "$5 - $20", desc: "All donations, however small!" },
    { breed: "Corgi", amount: "$50", desc: "A thirty minute bodywork session" },
    { breed: "Staffy", amount: "$100", desc: "Two thirty minute bodywork sessions" },
    { breed: "Border Collie", amount: "$200", desc: "Online Zoom Session" },
    { breed: "Boxer", amount: "$300", desc: "Set up a new dog" },
    { breed: "Beardie", amount: "$600", desc: "Trust Technique Foundation package" },
    { breed: "Great Dane", amount: "$750", desc: "Change Day" },
    { breed: "Mixed Breed", amount: "Your Choice", desc: "Your choice of donation, towards anything or everything!" },
];

export default function DonatePage() {
    return (
        <main className="bg-warm-white bg-noise min-h-screen">
            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                HERO SECTION
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <section
                className="relative w-full overflow-hidden"
                style={{ height: "100vh", minHeight: 600, maxHeight: 920 }}
            >
                {/* Background image - Changed from donate.jpg to another image as requested */}
                <Image
                    src="/adopt4.jpg"
                    alt="Dog resting calmly"
                    fill
                    priority
                    className="object-cover"
                    style={{ objectPosition: "center 40%" }}
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
                    style={{ background: "linear-gradient(to bottom, transparent, #FCFAF8)" }}
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
                            Charitable Trust
                        </span>
                    </div>

                    {/* Headline */}
                    <h1
                        className="font-serif font-normal text-white leading-[1.1] max-w-[700px] mb-5 tracking-[-0.01em]"
                        style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
                    >
                        Helping Animals <span className="text-accent">Thrive,</span><br />
                        Not Just Survive.
                    </h1>

                    {/* Subtext */}
                    <p
                        className="text-white/75 font-sans leading-[1.8] max-w-[550px] text-[0.95rem] sm:text-base mb-8"
                    >
                        We are a registered charity (#CC61736) purposed in educating, training, and supporting people with rescue and re-homed animals. 100% of your donation goes directly to supporting the dogs and the people working with them.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <a href="#donation-form" className="inline-flex items-center gap-2 px-9 py-3.5 text-[0.72rem] font-bold tracking-[0.22em] uppercase font-sans no-underline transition-all duration-300 bg-accent text-dark border border-accent hover:bg-white hover:border-white">
                            Donate Now <FiHeart size={13} />
                        </a>
                        <a href="#about-charity" className="inline-flex items-center gap-2 px-9 py-3.5 text-[0.72rem] font-bold tracking-[0.22em] uppercase font-sans no-underline transition-all duration-300 text-white border border-white/30 hover:bg-white/10 hover:border-white/50">
                            Our Mission
                        </a>
                    </div>
                </div>
            </section>

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                ABOUT THE CHARITY (With Overlay Image & Expander)
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <section id="about-charity" className="py-20 lg:py-28 bg-white relative">
                <div className="max-w-[1280px] mx-auto px-[clamp(1.25rem,6vw,4rem)]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                        {/* Left Side: Images (Shorter 3:5 aspect ratio with overlay) */}
                        <div className="lg:col-span-5 relative">
                            {/* Main Background Image */}
                            <div className="relative w-full aspect-[3/5] sm:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-dark/5">
                                <Image src="/adopt3.jpg" alt="Rescue dog support" fill className="object-cover object-center" />
                                <div className="absolute inset-0 bg-dark/10" />
                            </div>

                            {/* Overlaid Donate Logo / Image */}
                            <div className="absolute -bottom-8 -right-4 sm:-right-8 w-48 sm:w-56 aspect-square rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(28,43,54,0.15)] border-4 border-white bg-white z-10 flex items-center justify-center p-4">
                                <div className="relative w-full h-full">
                                    <Image src="/donate.jpg" alt="A Dog's Life Logo" fill className="object-cover rounded-xl" />
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Text & Expander */}
                        <div className="lg:col-span-7 lg:pl-8 pt-8 lg:pt-0">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-5 h-px bg-primary-dark" />
                                <span className="text-[0.7rem] font-bold tracking-[0.22em] uppercase font-sans text-primary-dark">Charitable Purpose</span>
                            </div>
                            <h2 className="font-serif font-normal text-dark leading-[1.12] mb-6 tracking-[-0.01em]"
                                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                                About <span className="text-primary-dark">A Dog&apos;s Life</span>
                            </h2>

                            <div className="prose prose-lg prose-p:text-dark/70 prose-p:font-sans prose-p:leading-[1.85] prose-p:text-[0.95rem] mb-6">
                                <p>
                                    The main goal of A Dog&apos;s Life is to provide education, training, and support to individuals who have rescued or adopted animals, as well as volunteers and staff at rescue shelters. A Dog&apos;s Life aims to help animals thrive in their new environments, rather than just survive.
                                </p>

                                <div className="pt-4 space-y-5">
                                    <p>
                                        Specifically, we work with animal rescue centres and shelters to promote positive behavioural change, create resources to assist with animal settling, and provide additional support and assistance in line with our charitable purpose.
                                    </p>
                                    <p>
                                        We offer support for anxious, fearful, or aggressive animals, specifically dogs, using the Trust Technique&reg;. Our team works closely with people to help dogs in a variety of situations, assisting with specific exercises and practices so the dog can settle in the new home or environment, lessening the high numbers of return-to-rescues or unadoptable classification due to behavioural issues.
                                    </p>
                                    <div className="mt-6 flex gap-3 p-5 rounded-2xl border border-primary-dark/10 bg-primary-dark/5 items-start">
                                        <FaPaw className="text-primary-dark shrink-0 mt-1" size={16} />
                                        <p className="text-[0.85rem] italic text-dark/70 m-0 leading-relaxed">
                                            Please note, continuing homework and training is essential when engaging in the charity&apos;s services.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                WHAT YOUR DONATION SUPPORTS (Smaller/Elegant Tiers)
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <section className="py-20 lg:py-28 bg-dark text-white">
                <div className="max-w-[1000px] mx-auto px-[clamp(1.25rem,6vw,4rem)]">
                    <div className="text-center mb-20">
                        <div className="flex items-center justify-center gap-3 mb-5">
                            <div className="w-5 h-px bg-white/30" />
                            <span className="text-[0.7rem] font-bold tracking-[0.22em] uppercase font-sans text-accent">Your Impact</span>
                            <div className="w-5 h-px bg-white/30" />
                        </div>
                        <h2 className="font-serif font-normal text-white leading-[1.12] mb-4 tracking-[-0.01em]" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                            What Your Donation Supports
                        </h2>
                        <p className="text-white/60 font-sans">Every contribution supports real outcomes for rescued dogs.</p>
                    </div>

                    {/* Redesigned Donation Tiers (List/Grid Layout, No heavy cards) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        {donationTiers.map((tier, idx) => (
                            <div key={idx} className="group flex items-start gap-5 py-4 border-b border-white/10 hover:border-accent/50 transition-colors">
                                <div className="w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-accent/20 group-hover:border-accent/30 transition-all">
                                    <FaDog className="text-white/60 group-hover:text-accent transition-colors" size={18} />
                                </div>
                                <div className="flex-grow pt-1">
                                    <div className="flex items-baseline justify-between mb-1 gap-2">
                                        <h4 className="font-sans font-bold text-[0.8rem] tracking-widest uppercase text-white/90">{tier.breed}</h4>
                                        <span className="font-serif text-xl text-accent">{tier.amount}</span>
                                    </div>
                                    <p className="text-[0.9rem] font-sans text-white/50 leading-relaxed">
                                        {tier.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 flex justify-center">
                        <p className="font-serif text-xl text-white/80 italic m-0 flex items-center gap-4">
                            <FiHeart className="text-accent" />
                            &quot;And for all donations - a big fat thank you from the dogs!&quot;
                            <FiHeart className="text-accent" />
                        </p>
                    </div>
                </div>
            </section>

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                DONATION FORM & GIVEALITTLE
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <section id="donation-form" className="py-24 lg:py-32 bg-bg-section relative">
                <div className="max-w-[1280px] mx-auto px-[clamp(1.25rem,6vw,4rem)]">
                    <div className="text-center mb-16 max-w-3xl mx-auto flex flex-col items-center">
                        <div className="relative w-24 h-24 mb-6 rounded-xl overflow-hidden shadow-lg border-2 border-white">
                            <Image src="/donate.jpg" alt="A Dog's Life Logo" fill className="object-cover" />
                        </div>
                        <h2 className="font-serif font-normal text-dark leading-[1.12] tracking-[-0.01em] mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}>
                            Its a dogs life charitable trust
                        </h2>
                        <p className="text-[1rem] text-dark/70 font-sans leading-[1.8] mb-8">
                            As a registered charity, we operate entirely on donations. We receive no direct funding from local or central government and rely on fundraising efforts from our volunteers, grants, and donations from members of the public who recognise the value of supporting animals to thrive.
                        </p>
                    </div>

                    <div className="max-w-xl mx-auto items-stretch">
                        {/* Givealittle Alternative */}
                        <div className="p-8 lg:p-10 border border-dark/10 rounded-2xl bg-white/50 text-center flex flex-col justify-center items-center h-full">
                            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-6">
                                <FiExternalLink size={24} className="text-accent" />
                            </div>
                            <h3 className="font-serif font-bold text-2xl text-dark mb-4">Give-a-little Page</h3>
                            <p className="text-dark/60 font-sans leading-[1.75] text-[0.95rem] mb-8 max-w-sm mx-auto">
                                You can also donate to our cause via our official Give-a-little page. Note that a small fee is deducted from your donation by the platform.
                            </p>
                            <a href="https://givealittle.co.nz" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 text-[0.75rem] font-bold tracking-[0.15em] uppercase font-sans no-underline transition-all duration-300 bg-accent text-dark border border-accent hover:bg-white hover:border-dark rounded-xl">
                                Go to Give-a-little
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <HomeCTA />
        </main>
    );
}
