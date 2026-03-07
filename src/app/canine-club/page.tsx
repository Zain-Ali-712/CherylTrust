"use client";

import Image from "next/image";

import { FiClock, FiArrowRight } from "react-icons/fi";
import HomeCTA from "@/components/home/HomeCTA";
import BookingModal from "@/components/canine-club/BookingModal";
import { useState } from "react";

const hours = [
    { day: "Sunday", time: "08:00 AM - 06:00 PM" },
    { day: "Monday", time: "08:00 AM - 06:00 PM" },
    { day: "Tuesday", time: "08:00 AM - 06:00 PM" },
    { day: "Wednesday", time: "08:00 AM - 08:00 PM" },
    { day: "Thursday", time: "08:00 AM - 08:00 PM" },
    { day: "Friday", time: "08:00 AM - 08:00 PM" },
    { day: "Saturday", time: "08:00 AM - 06:00 PM" },
];

const features = [
    {
        title: "Distraction-free dog time",
        desc: "Safe, private spaces help to minimize distractions or triggers and maximize time with your dog. Time for you and your dog to enjoy each other with no other people or dogs to worry about.",
        img: "/club1.jpg", // Using existing placeholder images
    },
    {
        title: "Off-leash enrichment",
        desc: "Exploration and off lead fun activities that will enrich your dogs day - Adventure Park Cheryl is filled with a confidence course, a swimming hole, a sensory garden, agility jumps, and more....fun for everyone.",
        img: "/club2.jpg",
    },
    {
        title: "Safe play space",
        desc: "Fully deer fenced and double gated entry - super safe so you can relax and enjoy the countryside with your bestie at Adventure Park Cheryl. Have an amazing adventure with your dog in an enclosed private park - it's great exercise, it's safe, and it's fun for both of you.",
        img: "/club3.jpg",
    }
];

const plans = [
    {
        title: "Adventure Park Cheryl Membership",
        subtitle: "Trust Client",
        price: "$30.00",
        duration: "1 year",
        sessions: "Unlimited",
        date: "02-03-2026"
    },
    {
        title: "Adventure Park Cheryl Membership",
        subtitle: "Non-Trust Client",
        price: "$30.00",
        duration: "1 year",
        sessions: "Unlimited",
        date: "02-03-2026"
    },
    {
        title: "Feb Valentines Special",
        subtitle: "2 Members",
        price: "$35.00",
        duration: "45 mins",
        sessions: "1 Adventure Park Cheryl Session",
        membershipRequired: true
    },
    {
        title: "Feb Valentines Special",
        subtitle: "Bring a Friend",
        price: "$45.00",
        duration: "45 mins",
        sessions: "1 Adventure Park Cheryl Session",
        membershipRequired: true
    }
];

export default function CanineClubPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlanName, setSelectedPlanName] = useState("");

    const openBookingModal = (planName: string) => {
        setSelectedPlanName(planName);
        setIsModalOpen(true);
    };

    return (
        <main className="bg-warm-white bg-noise min-h-screen">
            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                HERO SECTION
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <section
                className="relative w-full overflow-hidden"
                style={{ height: "100vh", minHeight: 600, maxHeight: 920 }}
            >
                <Image
                    src="/kiri2.jpg"
                    alt="Canine Country Club"
                    fill
                    priority
                    className="object-cover"
                    style={{ objectPosition: "center 40%" }}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(108deg, rgba(18, 30, 40, 0.93) 0%, rgba(28, 43, 54, 0.52) 52%, rgba(28,43,54,0.2) 100%)",
                    }}
                />
                <div
                    className="absolute bottom-0 left-0 right-0 h-20 sm:h-24 pointer-events-none z-10"
                    style={{ background: "linear-gradient(to bottom, transparent, rgba(252,250,248,0.7))" }}
                />
                <div
                    className="absolute inset-0 flex flex-col justify-center z-20"
                    style={{
                        paddingLeft: "clamp(1.25rem, 7vw, 7rem)",
                        paddingRight: "clamp(1.25rem, 7vw, 7rem)",
                        marginTop: "5rem" // push below navbar
                    }}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-5 h-px bg-accent/70" />
                        <span className="text-[0.72rem] font-bold tracking-[0.22em] uppercase font-sans text-accent/85">
                            Private Membership
                        </span>
                    </div>
                    <h1
                        className="font-serif font-normal text-white leading-[1.1] max-w-[800px] mb-6 tracking-[-0.01em]"
                        style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
                    >
                        Adventure Park <span className="text-accent italic">Cheryl.</span>
                    </h1>
                    <p className="text-white/80 font-sans leading-[1.8] max-w-[600px] text-[1.05rem] mb-8">
                        Exclusive access to Adventure Park Cheryl, Swim Spot, and scenic farm and bush walks in Wainuiomata, Wellington.
                    </p>
                    <a href="#membership-plans" className="inline-flex items-center gap-2 px-8 py-3.5 text-[0.72rem] font-bold tracking-[0.22em] uppercase font-sans no-underline transition-all duration-300 bg-accent text-dark border border-accent hover:bg-white hover:border-white w-fit">
                        Join The Club <FiArrowRight size={13} />
                    </a>
                </div>
            </section>

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                ABOUT & OPENING HOURS
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <section className="py-20 lg:py-28 relative">
                <div className="max-w-[1280px] mx-auto px-[clamp(1.25rem,6vw,4rem)]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                        {/* Left: About */}
                        <div className="lg:col-span-7">
                            <h2 className="font-serif text-3xl lg:text-4xl text-dark mb-8 leading-[1.2] tracking-[-0.01em]">
                                A private paradise for responsible dog owners.
                            </h2>
                            <div className="space-y-6 text-dark/75 font-sans leading-[1.8] text-[1.05rem]">
                                <p>
                                    Adventure Park Cheryl is a private membership (all welcome to join) for responsible dog owners and their dogs, providing exclusive access to booking Adventure Park Cheryl, the Swim Spot, Farm and Bush walks, plus other fun activities run by the club.
                                </p>
                                <p>
                                    On joining Adventure Park Cheryl you will be able to purchase visits to Adventure Park Cheryl, the swim spot, and enjoy private outings and activities on our farm in Wainuiomata, Wellington.
                                </p>
                                <p>
                                    Adventure Park Cheryl has been created for dog owners to enjoy a fully enclosed and private space to visit. Designed for all types of dogs and activities – there is plenty of room to zoom, obstacles to play and train on, as well as some quiet spots to enjoy the sounds and scenery of the countryside.
                                </p>
                                <div className="p-6 bg-primary-dark/5 border border-primary-dark/10 rounded-2xl mt-8">
                                    <p className="text-[0.95rem] font-medium text-dark/90 italic m-0">
                                        Note: Once you have completed your club membership you will have access to booking the dog park and joining in on other activities. You must be a club member to book any session. Swim spot open seasonally.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right: Hours */}
                        <div className="lg:col-span-5">
                            <div className="bg-dark rounded-[2rem] p-8 lg:p-10 shadow-[0_20px_40px_rgba(28,43,54,0.12)] border border-white/10 sticky top-32 relative overflow-hidden">
                                <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center shrink-0">
                                            <FiClock size={20} className="text-accent" />
                                        </div>
                                        <h3 className="font-serif text-2xl text-white m-0">Park Hours</h3>
                                    </div>
                                    <div className="space-y-4">
                                        {hours.map((h, i) => (
                                            <div key={i} className="flex justify-between items-center py-3 border-b border-white/10 last:border-0 font-sans text-[0.95rem]">
                                                <span className="font-bold text-white/60 tracking-wide uppercase text-[0.8rem]">{h.day}</span>
                                                <span className="text-white font-medium">{h.time}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                3 FEATURES SECTION
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <section className="py-20 lg:py-32 bg-bg-light relative overflow-hidden">
                <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none" />
                <div className="max-w-[1280px] mx-auto px-[clamp(1.25rem,6vw,4rem)] relative z-10">
                    <div className="text-center mb-16 lg:mb-24">
                        <div className="flex items-center justify-center gap-3 mb-5">
                            <div className="w-5 h-px bg-primary-dark/40" />
                            <span className="text-[0.7rem] font-bold tracking-[0.22em] uppercase font-sans text-primary-dark">The Experience</span>
                            <div className="w-5 h-px bg-primary-dark/40" />
                        </div>
                        <h2 className="font-serif font-normal text-dark leading-[1.12] mb-4 tracking-[-0.01em]" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                            Why Join The Club?
                        </h2>
                    </div>

                    <div className="space-y-24 lg:space-y-32">
                        {features.map((feature, idx) => (
                            <div key={idx} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                                <div className={`relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-xl ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
                                    <Image src={feature.img} alt={feature.title} fill className="object-cover hover:scale-105 transition-transform duration-700" />
                                </div>
                                <div className={idx % 2 !== 0 ? 'lg:order-1' : ''}>
                                    <div className="text-primary-dark/15 font-serif font-bold text-7xl lg:text-8xl mb-4 leading-none -ml-1">0{idx + 1}</div>
                                    <h3 className="font-serif font-normal text-3xl text-dark mb-6 hover:text-primary-dark transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-dark/75 font-sans leading-[1.8] text-[1.05rem]">
                                        {feature.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                MEMBERSHIP PLANS (Redesigned from Image)
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <section id="membership-plans" className="py-24 lg:py-32 bg-bg-section border-t border-dark/[0.03]">
                <div className="max-w-[1000px] mx-auto px-[clamp(1.25rem,6vw,4rem)]">
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-3 mb-5">
                            <div className="w-5 h-px bg-primary-dark" />
                            <span className="text-[0.7rem] font-bold tracking-[0.22em] uppercase font-sans text-primary-dark">Memberships</span>
                            <div className="w-5 h-px bg-primary-dark" />
                        </div>
                        <h2 className="font-serif font-normal text-dark leading-[1.12] mb-4 tracking-[-0.01em]" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                            Join Adventure Park Cheryl
                        </h2>
                        <p className="text-dark/60 font-sans max-w-2xl mx-auto">Select the membership plan that matches your current relationship with the Trust Technique to gain access to our facilities.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {plans.map((plan, idx) => (
                            <div key={idx} className="bg-dark text-white rounded-3xl p-8 lg:p-10 shadow-2xl border border-dark/5 flex flex-col relative overflow-hidden group">
                                <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />

                                {/* Accent top border */}
                                <div className="absolute top-0 left-0 right-0 h-[6px] bg-accent/80 group-hover:bg-accent transition-colors z-10" />

                                <div className="relative z-10 flex flex-col flex-grow">
                                    <h3 className="font-serif text-[1.6rem] lg:text-[1.8rem] text-white mb-3 leading-[1.2]">{plan.title}</h3>
                                    <div className="mb-6 flex items-baseline gap-2">
                                        <span className="font-serif font-bold text-4xl text-accent">{plan.price}</span>
                                        <span className="font-sans text-[0.8rem] text-white/90 uppercase tracking-widest relative top-[-6px]">/ {plan.duration}</span>
                                    </div>

                                    <div className="h-px w-full bg-white/[0.08] mb-8" />

                                    <p className="font-sans text-[1.05rem] text-white/90 leading-[1.8] mb-8">
                                        Exclusive {plan.subtitle.toLowerCase()} access to Adventure Park Cheryl, swimming spots, and farm walks.
                                    </p>

                                    <div className="flex-grow space-y-5 mb-10">
                                        <div className="flex items-start gap-4">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent/60 mt-[10px] shrink-0" />
                                            <span className="font-sans text-white/80 text-[1.05rem] leading-[1.6]">Available for <strong className="text-white font-medium">{plan.subtitle}s</strong></span>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent/60 mt-[10px] shrink-0" />
                                            <span className="font-sans text-white/80 text-[1.05rem] leading-[1.6]">Sessions: <strong className="text-white font-medium">{plan.sessions}</strong></span>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent/60 mt-[10px] shrink-0" />
                                            <span className="font-sans text-white/80 text-[1.05rem] leading-[1.6]">Starts from <strong className="text-white font-medium">{plan.date}</strong></span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => openBookingModal(plan.title)}
                                        className="w-full py-4 bg-white/5 border border-white/10 text-white rounded-xl font-sans font-bold text-[0.95rem] tracking-[0.1em] uppercase hover:bg-accent hover:border-accent hover:text-dark transition-all duration-300">
                                        Select Plan
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>


                </div>
            </section>

            <HomeCTA />

            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                planName={selectedPlanName}
            />
        </main>
    );
}
