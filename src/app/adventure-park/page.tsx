"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiClock, FiArrowRight } from "react-icons/fi";
import HomeCTA from "@/components/home/HomeCTA";

const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const formatTime = (timeStr: string) => {
    if (!timeStr) return "Closed";
    const [hours, minutes] = timeStr.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const h12 = hours % 12 || 12;
    return `${h12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

const features = [
    {
        title: "Distraction-free dog time",
        desc: "Safe, private spaces help to minimize distractions or triggers and maximize time with your dog. Time for you and your dog to enjoy each other with no other people or dogs to worry about.",
        img: "/club1.jpg", // Using existing placeholder images
    },
    {
        title: "Off-leash enrichment",
        desc: "Exploration and off lead fun activities that will enrich your dogs day - Canine Adventure Park is filled with a confidence course, a swimming hole, a sensory garden, agility jumps, and more....fun for everyone.",
        img: "/club2.jpg",
    },
    {
        title: "Safe play space",
        desc: "Fully deer fenced and double gated entry - super safe so you can relax and enjoy the countryside with your bestie at Canine Adventure Park. Have an amazing adventure with your dog in an enclosed private park - it's great exercise, it's safe, and it's fun for both of you.",
        img: "/club3.jpg",
    }
];



export default function AdventureParkPage() {
    const [hours, setHours] = useState<any[]>([]);
    const [membershipPackages, setMembershipPackages] = useState<any[]>([]);
    const [bookingPackages, setBookingPackages] = useState<any[]>([]);

    useEffect(() => {
        fetch("/api/schedule")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setHours(data);
                }
            })
            .catch(err => console.error("Error fetching hours:", err));

        fetch("/api/membership-packages")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setMembershipPackages(data.filter((p: any) => p.isActive));
                }
            })
            .catch(err => console.error("Error fetching memberships:", err));

        fetch("/api/booking-packages")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setBookingPackages(data.filter((p: any) => p.isActive));
                }
            })
            .catch(err => console.error("Error fetching booking packages:", err));
    }, []);
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
                        Canine <span className="text-accent italic">Adventure Park.</span>
                    </h1>
                    <p className="text-white/80 font-sans leading-[1.8] max-w-[600px] text-[1.05rem] mb-8">
                        Exclusive access to an acre of private, deer fenced country bliss for you and your dog, in Wainuiomata, Wellington.
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
                                    Canine Adventure Park is a private membership (all welcome to join) for responsible dog owners and their dogs, providing exclusive access to booking Canine Adventure Park, the Swim Spot, Farm and Bush walks, plus other fun activities run by the club.
                                </p>
                                <p>
                                    On joining Canine Adventure Park you will be able to purchase visits to Canine Adventure Park, the swim spot, and enjoy private outings and activities on our farm in Wainuiomata, Wellington.
                                </p>
                                <p>
                                    Canine Adventure Park has been created for dog owners to enjoy a fully enclosed and private space to visit. Designed for all types of dogs and activities – there is plenty of room to zoom, obstacles to play and train on, as well as some quiet spots to enjoy the sounds and scenery of the countryside.
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
                                        {hours.length > 0 ? (
                                            hours.map((h, i) => (
                                                <div key={i} className="flex justify-between items-center py-3 border-b border-white/10 last:border-0 font-sans text-[0.95rem]">
                                                    <span className="font-bold text-white/60 tracking-wide uppercase text-[0.8rem]">{DAYS_OF_WEEK[h.dayOfWeek]}</span>
                                                    <span className="text-white font-medium">
                                                        {h.isActive ? `${formatTime(h.openTime)} - ${formatTime(h.closeTime)}` : "Closed"}
                                                    </span>
                                                </div>
                                            ))
                                        ) : (
                                            DAYS_OF_WEEK.map((day, i) => (
                                                <div key={i} className="flex justify-between items-center py-3 border-b border-white/10 last:border-0 font-sans text-[0.95rem]">
                                                    <span className="font-bold text-white/60 tracking-wide uppercase text-[0.8rem]">{day}</span>
                                                    <span className="text-white font-medium">08:00 AM - 06:00 PM</span>
                                                </div>
                                            ))
                                        )}
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
                MEMBER INFO SECTION
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
                <div className="max-w-[900px] mx-auto px-[clamp(1.25rem,6vw,4rem)] relative z-10">
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-3 mb-5">
                            <div className="w-5 h-px bg-accent" />
                            <span className="text-[0.7rem] font-bold tracking-[0.22em] uppercase font-sans text-dark/40">Exclusive Membership</span>
                            <div className="w-5 h-px bg-accent" />
                        </div>
                        <h2 className="font-serif text-4xl lg:text-5xl text-dark mb-6">Member Info</h2>
                        <p className="text-lg font-serif italic text-accent/80">On becoming a Canine Country Club Member you have access to our facilities</p>
                    </div>

                    <div className="bg-primary-dark/5 border border-primary-dark/10 rounded-[2.5rem] p-8 lg:p-16 shadow-inner relative overflow-hidden">
                        <div className="absolute -top-12 -right-12 w-48 h-48 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

                        <div className="space-y-8 text-dark/80 font-sans leading-relaxed text-[1.05rem]">
                            <h3 className="font-serif text-2xl text-dark text-center mb-10">Canine Adventure Park</h3>

                            <p>
                                We have a special spot, just under an acre on our 40-acre farm in Wainuiomata, Wellington, for your fun canine adventures and enjoyment. This is a private dog area that has been created especially for people to have a safe place to relax and enjoy time with their dog/s without the worry of other people or dogs.
                            </p>

                            <p>
                                We have fully enclosed (deer fenced) a large open space, full of enrichment opportunities and activities. We&apos;ve set up a few obstacles for the dogs to play on and build confidence, and there is a small muddy stream, long grass to run around in, a mountain to conquer, a dig space, and more…. it’s a great place for the dogs to gallop around and enjoy being a dog – it’s a pup&apos;s paradise with long grass and oh so many smells!
                            </p>

                            <p>
                                This is where dogs get to be dogs so bring your towel as your dog may get muddy! Can also bring your own balls to throw, treats to scatter or hide, or blanket to lie in the long grass with your dog and chillax. And of course, bring your poop bags to keep our environment clean and tidy.
                            </p>

                            <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Link href="#membership-plans" className="group relative flex flex-col items-center justify-center p-6 bg-dark text-white rounded-2xl transition-all hover:bg-accent hover:text-dark hover:-translate-y-1 shadow-lg overflow-hidden">
                                    <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none" />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 opacity-60">Step 1</span>
                                    <span className="text-sm font-bold uppercase tracking-widest">Join Membership</span>
                                    <div className="mt-2 h-0.5 w-0 group-hover:w-12 bg-dark transition-all duration-300" />
                                </Link>

                                <Link href="#book-now" className="group relative flex flex-col items-center justify-center p-6 bg-white border border-dark/10 text-dark rounded-2xl transition-all hover:border-accent hover:-translate-y-1 shadow-md overflow-hidden">
                                    <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 text-dark/40">Step 2</span>
                                    <span className="text-sm font-bold uppercase tracking-widest">Book Adventure</span>
                                    <span className="text-[10px] font-bold text-dark mt-1">Members Only</span>
                                    <div className="mt-2 h-0.5 w-0 group-hover:w-12 bg-accent transition-all duration-300" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                DETAILED EXPERIENCE & GUIDELINES
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <section className="py-24 lg:py-32 bg-bg-light relative overflow-hidden">
                <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none" />
                <div className="max-w-[1280px] mx-auto px-[clamp(1.25rem,6vw,4rem)] relative z-10">

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                        {/* Sidebar: Quick Info & Facilities */}
                        <div className="lg:col-span-4 space-y-10 order-2 lg:order-1">

                            {/* Timing Card */}
                            <div className="bg-dark text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
                                <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none" />
                                <h3 className="font-serif text-xl mb-6 flex items-center gap-2">
                                    <FiClock className="text-accent" /> Arrival & Departure
                                </h3>
                                <div className="space-y-6">
                                    <div className="pb-4 border-b border-white/5">
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Total Session Window</div>
                                        <div className="font-sans text-lg font-bold">1 Hour</div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center text-sm font-sans">
                                            <span className="text-white/60">Property Arrival & Entry</span>
                                            <span className="font-bold">5 Mins</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm font-sans">
                                            <span className="text-accent font-bold">Adventure Time</span>
                                            <span className="font-bold text-accent">40 Mins</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm font-sans">
                                            <span className="text-white/60">Catching & Exiting Park</span>
                                            <span className="font-bold">5 Mins</span>
                                        </div>
                                        <div className="pt-2 flex justify-between items-center text-xs font-bold uppercase tracking-tighter text-red-400 border-t border-white/5">
                                            <span>Buffer (Clear Parking)</span>
                                            <span>10 Mins</span>
                                        </div>
                                    </div>
                                    <p className="text-[10px] italic text-white/50 leading-relaxed pt-2">
                                        Sticking to the timetable is vital for the safety of reactive dogs. Tardiness will be taken seriously.
                                    </p>
                                </div>
                            </div>

                            {/* Facilities Card */}
                            <div className="bg-white border border-dark/5 rounded-3xl p-8 shadow-sm">
                                <h3 className="font-serif text-xl text-dark mb-6">Park Facilities</h3>
                                <div className="space-y-5 text-sm text-dark/70 font-sans">
                                    <div className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                                        <p><strong>Phone Coverage:</strong> Good for Vodafone; patchy for other providers.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                                        <p><strong>Toilets:</strong> No facilities on-site. Closest is Remutaka Park (5km south) or BP (9km north).</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                                        <p><strong>Waste:</strong> No bins provided. Please take all rubbish and poo bags with you.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Post Adventure */}
                            <div className="text-center p-8 bg-accent/5 border border-accent/10 rounded-3xl">
                                <h3 className="font-serif text-lg text-dark mb-4">Post Adventure</h3>
                                <p className="text-sm text-dark/60 mb-6 italic">Share your memories with us!</p>
                                <div className="flex flex-col gap-3">
                                    <a href="https://facebook.com/caninecountryclub" className="font-bold text-[10px] uppercase tracking-widest text-dark hover:text-accent transition-colors">@caninecountryclub FB</a>
                                    <Link href="#" className="text-accent underline font-bold text-[11px] uppercase tracking-widest">Leave a Review</Link>
                                </div>
                            </div>
                        </div>

                        {/* Main Content: Guidelines & Safety */}
                        <div className="lg:col-span-8 order-1 lg:order-2">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-5 h-px bg-accent" />
                                <span className="text-[0.7rem] font-bold tracking-[0.22em] uppercase font-sans text-dark/40">The Experience</span>
                            </div>
                            <h2 className="font-serif text-4xl lg:text-5xl text-dark mb-10 leading-tight">Adventure Park <span className="italic text-accent">Protocol.</span></h2>

                            <div className="space-y-12 prose prose-dark max-w-none">
                                <section>
                                    <h3 className="font-serif text-2xl text-dark mb-4">Location & Entry</h3>
                                    <p className="text-dark/75 font-sans leading-relaxed">
                                        The Adventure Park is located 200 metres south of our home on our 40-acre farm, in Wainuiomata, Wellington.
                                        The entry is <strong>double gated</strong>, and the park is deer fenced (2 metres high) enclosing just under an acre of paddock.
                                        A first gate provides initial entry, followed by a padlocked park entrance gate.
                                        Once you book a time you will be sent the code for gate entry – take note of this as it changes often.
                                    </p>
                                </section>

                                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-[2rem] border border-dark/5 shadow-sm">
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-accent mb-4">Park Guidelines</h4>
                                        <ul className="space-y-3 text-sm text-dark/70 list-none p-0">
                                            <li className="flex gap-2"><strong>•</strong> Dogs must be on lead entering and exiting.</li>
                                            <li className="flex gap-2"><strong>•</strong> Take your code with you to the park.</li>
                                            <li className="flex gap-2"><strong>•</strong> Secure the padlock on your exit.</li>
                                            <li className="flex gap-2"><strong>•</strong> Use long leads for escape-prone dogs.</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-accent mb-4">Safety & Ethics</h4>
                                        <ul className="space-y-3 text-sm text-dark/70 list-none p-0">
                                            <li className="flex gap-2"><strong>•</strong> No smoking, alcohol, or drugs.</li>
                                            <li className="flex gap-2"><strong>•</strong> Max 3 dogs per property booking.</li>
                                            <li className="flex gap-2"><strong>•</strong> Dogs must be fully vaccinated (Kennel Cough).</li>
                                            <li className="flex gap-2"><strong>•</strong> Respect our neighbours&apos; livestock.</li>
                                        </ul>
                                    </div>
                                </section>

                                <section>
                                    <h3 className="font-serif text-2xl text-dark mb-4 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-red-500/10 text-red-600 flex items-center justify-center text-base">!</div>
                                        Critical Timing
                                    </h3>
                                    <div className="space-y-4 text-dark/75 font-sans leading-relaxed">
                                        <p>
                                            <strong>Do not arrive early:</strong> If early, continue down the road for a country drive until your allotted time.
                                            If a car is still in the spot on your start time, please wait patiently until they have vacated.
                                        </p>
                                        <p>
                                            <strong>Do not leave late:</strong> Even if you arrive late, you must stick to the timetable and exit at the 45-minute mark.
                                            At 50 minutes past the hour, the parking area <strong>must</strong> be available for the next client.
                                        </p>
                                        <div className="p-5 bg-red-50 border border-red-100 rounded-xl text-red-800 text-sm italic">
                                            Security cameras monitor all activity. Any complaints regarding tardiness will be investigated and taken seriously. This park is used for reactive dogs; respect for the timetable is vital.
                                        </div>
                                    </div>
                                </section>

                                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-dark/10 pt-10">
                                    <div>
                                        <h4 className="font-serif text-xl text-dark mb-3">Management</h4>
                                        <p className="text-sm text-dark/60 leading-relaxed">
                                            Please respect all equipment. Children must be supervised at all times and are not permitted to play on the obstacles.
                                            Report any damage immediately. Monitor dogs at all times; they must never be left unattended.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-serif text-xl text-dark mb-3">Conduct</h4>
                                        <p className="text-sm text-dark/60 leading-relaxed">
                                            Do not let dogs bark excessively or dig. If they become over-excited, pop them on a lead to encourage calmer behaviours.
                                            Clients must follow all on-site signage.
                                        </p>
                                    </div>
                                </section>
                            </div>
                        </div>
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
                            Join Canine Adventure Park
                        </h2>
                        <p className="text-dark/60 font-sans max-w-2xl mx-auto">Select the membership plan that matches your current relationship with the Trust Technique to gain access to our facilities. See our <Link href="/terms-and-conditions" className="text-accent underline font-bold">Terms & Conditions</Link>.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {membershipPackages.map((plan, idx) => (
                            <div key={idx} className="bg-dark text-white rounded-3xl p-8 lg:p-10 shadow-2xl border border-dark/5 flex flex-col relative overflow-hidden group">
                                <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />

                                {/* Accent top border */}
                                <div className="absolute top-0 left-0 right-0 h-[6px] bg-accent/80 group-hover:bg-accent transition-colors z-10" />

                                <div className="relative z-10 flex flex-col flex-grow">
                                    <h3 className="font-serif text-[1.6rem] lg:text-[1.8rem] text-white mb-3 leading-[1.2]">{plan.name}</h3>
                                    <div className="mb-2 flex items-baseline gap-2">
                                        <span className="font-serif font-bold text-4xl text-accent">${plan.price.toFixed(2)}</span>
                                        <span className="font-sans text-[0.8rem] text-white/90 uppercase tracking-widest relative top-[-6px]">/ {plan.billingPeriod || `${plan.durationInDays} days`}</span>
                                    </div>
                                    <div className="mb-6">
                                        <span className="font-sans text-lg font-bold text-white uppercase tracking-wider">
                                            Available for {plan.availableFor === 'all' ? 'Everyone' : plan.availableFor}
                                        </span>
                                    </div>

                                    <div className="h-px w-full bg-white/[0.08] mb-8" />

                                    <p className="font-sans text-[1.05rem] text-white/90 leading-[1.8] mb-8">
                                        {plan.description || `Exclusive access to Canine Adventure Park, swimming spots, and farm walks.`}
                                    </p>

                                    <div className="flex-grow space-y-5 mb-10">
                                        <div className="flex items-start gap-4">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent/60 mt-[10px] shrink-0" />
                                            <span className="font-sans text-white/80 text-[1.05rem] leading-[1.6]">Sessions: <strong className="text-white font-medium">{plan.sessionsAllowed === 'unlimited' ? 'Unlimited' : plan.sessionsAllowed}</strong></span>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent/60 mt-[10px] shrink-0" />
                                            <span className="font-sans text-white/80 text-[1.05rem] leading-[1.6]">Starts from <strong className="text-white font-medium">{plan.startDate ? new Date(plan.startDate).toLocaleDateString() : 'Immediately'}</strong></span>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/checkout/membership?pkgId=${plan._id}`}
                                        className="w-full text-center py-4 bg-white/5 border border-white/10 text-white rounded-xl font-sans font-bold text-[0.95rem] tracking-[0.1em] uppercase hover:bg-accent hover:border-accent hover:text-dark transition-all duration-300">
                                        Select Plan
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                BOOK NOW (SESSIONS)
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <section id="book-now" className="py-24 bg-white">
                <div className="max-w-[1000px] mx-auto px-[clamp(1.25rem,6vw,4rem)] text-center">
                    <h2 className="font-serif font-normal text-dark leading-[1.12] mb-12 tracking-[-0.01em]" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                        Book a Session
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                        {bookingPackages.map((pkg, idx) => (
                            <div key={idx} className="p-8 border border-dark/10 rounded-3xl hover:border-accent transition-colors flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-serif mb-2">{pkg.name}</h3>
                                    <p className="text-dark/60 mb-4 uppercase tracking-widest text-sm font-bold">{pkg.clientType === 'all' ? 'Everyone' : pkg.clientType}</p>
                                    {pkg.description && (
                                        <p className="text-dark/80 font-sans text-[0.95rem] leading-relaxed mb-6">
                                            {pkg.description}
                                        </p>
                                    )}
                                    <div className="text-4xl text-accent font-serif mb-6">${pkg.price.toFixed(2)}</div>
                                </div>
                                <Link href={`/book?pkgId=${pkg._id}`} className="w-full text-center block py-4 bg-dark text-white rounded-xl font-sans font-bold text-[0.95rem] tracking-[0.1em] uppercase hover:bg-accent hover:text-dark transition">Book Now</Link>
                            </div>
                        ))}
                    </div>
                    <p className="mt-12 text-dark/40 font-sans text-sm">
                        By booking a session or membership, you agree to our <Link href="/terms-and-conditions" className="text-accent underline font-bold">Terms & Conditions</Link>.
                    </p>
                </div>
            </section>
            <section className="py-24 lg:py-32 bg-white relative">
                <div className="max-w-[1280px] mx-auto px-[clamp(1.25rem,6vw,4rem)]">
                    <div className="max-w-2xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <div className="w-5 h-px bg-accent" />
                                <span className="text-[0.7rem] font-bold tracking-[0.22em] uppercase font-sans text-dark/40">Get In Touch</span>
                                <div className="w-5 h-px bg-accent" />
                            </div>
                            <h2 className="font-serif text-3xl lg:text-4xl text-dark mb-4">Contact Us</h2>
                            <p className="text-dark/60 font-sans text-[0.95rem] mb-10">To contact us, pop your message here and we will get back to you within 3 business days.</p>
                        </div>

                        <form className="space-y-6 max-w-lg mx-auto">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-dark/40 ml-1">Name</label>
                                <input type="text" placeholder="Your full name" className="w-full px-5 py-4 bg-bg-light border border-dark/5 rounded-2xl focus:outline-none focus:border-accent font-sans transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-dark/40 ml-1">Contact Phone (Mandatory)</label>
                                <input required type="tel" placeholder="Best number to reach you" className="w-full px-5 py-4 bg-bg-light border border-dark/5 rounded-2xl focus:outline-none focus:border-accent font-sans transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-dark/40 ml-1">Email</label>
                                <input type="email" placeholder="email@example.com" className="w-full px-5 py-4 bg-bg-light border border-dark/5 rounded-2xl focus:outline-none focus:border-accent font-sans transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-dark/40 ml-1">Message</label>
                                <textarea rows={4} placeholder="How can we help?" className="w-full px-5 py-4 bg-bg-light border border-dark/5 rounded-2xl focus:outline-none focus:border-accent font-sans transition-colors resize-none"></textarea>
                            </div>
                            <button type="button" className="w-full px-10 py-4 bg-dark text-white rounded-2xl font-bold tracking-[0.2em] uppercase text-[10px] hover:bg-accent hover:text-dark transition-all transform active:scale-95 shadow-lg">Send Message</button>
                        </form>
                    </div>
                </div>
            </section>


            <HomeCTA />
        </main>
    );
}
