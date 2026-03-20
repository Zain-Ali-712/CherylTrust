"use client";

import Image from "next/image";
import { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiPlus, FiMinus, FiArrowRight } from "react-icons/fi";

const faqs = [
    {
        question: "Where are you located and do you travel?",
        answer: "I am based in Wellington, New Zealand. I can travel for consultations depending on location (travel fees may apply), or we can arrange online Zoom sessions which are highly effective for many behavioural issues.",
    },
    {
        question: "How many sessions will my animal need?",
        answer: "Every animal is unique. While some minor issues can see significant improvement in 1-2 sessions, deep trauma and entrenched behaviours take time and commitment. The appropriate approach will be discussed during the initial conversation.",
    },
    {
        question: "Do I need to do homework between sessions?",
        answer: "Yes, absolutely. The Trust Technique and other behavioural modifications require your active participation. Your consistency in practicing the exercises between my visits is the most crucial factor in your animal's success.",
    },
    {
        question: "What is the Trust Technique®?",
        answer: "The Trust Technique is an educational approach that uses mindful presence to lower an animal's thinking levels, replacing fear and reactivity with peace and cooperation. It works by building a deep bond of trust rather than using dominance or force.",
    },
    {
        question: "Do you only work with rescue animals?",
        answer: "While A Dog's Life Charitable Trust focuses specifically on rescue animals and fosters, my private services are available to any dog or horse owner facing behavioural challenges or simply wanting to deepen their bond.",
    },
];

const bookingOffers = [
    {
        title: "Trust Technique Foundation Program",
        price: "$1800",
        duration: "4 x 1 hour 20 min sessions",
        desc: "A 4-session structured program based on the Trust Technique and practical lead skills to improve behaviour.",
        features: ["Interview and assessment", "Identify behavioural goals", "Guided practice and demonstration", "Teaching the Trust Technique principles"],
    },
    {
        title: "Trust Technique Follow-up Session",
        price: "$300",
        duration: "1 hour 15 mins",
        desc: "For existing clients only. We will review progress, problem solve, add new goals, and tackle new challenges.",
        features: ["Progress review", "Continued guidance", "Advanced Trust Technique exercises"],
    },
    {
        title: "Trust Technique® Immersion / Travel",
        price: "POA",
        duration: "1–2 days",
        desc: "1-on-1 coaching anywhere in the country. A condensed foundation program where Cheryl will be hands on, and teaching you. Pricing depends on client needs.",
        features: ["Practical demonstration", "Guided practice", "Hands-on training", "Real results in hours"],
    },
    {
        title: "Puppy / New Dog Set Up",
        price: "$250",
        duration: "1 hour",
        desc: "An in-depth plan to help new dogs thrive in their new home.",
        features: ["In-depth session", "Structured tailored plan", "Covering successful outcomes"],
    },
    {
        title: "Emergency Consult",
        price: "$350",
        duration: "1 hour",
        desc: "An urgent response service for immediate behavioural concerns.",
        features: ["Evaluation and plan", "Clear instruction", "Immediate remedies", "Follow-up support"],
    },
    {
        title: "ConTact C.A.R.E Canine",
        price: "$80",
        duration: "30–40 minutes",
        desc: "Releasing skeletal pressure and restoring biomechanical balance.",
        features: ["Hands-on", "Gentle on animal", "Animal dictates pace", "Normal function returns"],
    },
    {
        title: "ConTact C.A.R.E Animal Visit",
        price: "POA",
        duration: "30–40 minutes",
        desc: "Travel sessions for dogs, cats, horses, and other animals, addressing acute pain and complex trauma.",
        features: ["Restore balance and function", "Movement equals mobility", "Ease brings behavioural changes"],
    },
];

export default function ContactPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate form submission
        setTimeout(() => setIsSubmitted(true), 600);
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
                {/* Background image */}
                <Image
                    src="/adopt5.jpg"
                    alt="Contact Cheryl - Dog outdoors"
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

                {/* Bottom fade - Reduced white overlay */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-20 sm:h-24 pointer-events-none z-10"
                    style={{ background: "linear-gradient(to bottom, transparent, rgba(252,250,248,0.7))" }}
                />

                {/* Content - Added margin to push away from navbar */}
                <div
                    className="absolute inset-0 flex flex-col justify-center z-20 hero-content mt-24 sm:mt-32"
                    style={{
                        paddingLeft: "clamp(1.25rem, 7vw, 7rem)",
                        paddingRight: "clamp(1.25rem, 7vw, 7rem)",
                    }}
                >
                    {/* Eyebrow */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-5 h-px bg-accent/70" />
                        <span className="text-[0.72rem] font-bold tracking-[0.22em] uppercase font-sans text-accent/85">
                            Get In Touch
                        </span>
                    </div>

                    {/* Headline */}
                    <h1
                        className="font-serif font-normal text-white leading-[1.1] max-w-[700px] mb-5 tracking-[-0.01em]"
                        style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
                    >
                        Enquire & <br /> <span className="text-accent">Book a Session.</span>
                    </h1>

                    {/* Subtext */}
                    <p
                        className="text-white/75 font-sans leading-[1.8] max-w-[550px] text-[0.95rem] sm:text-base mb-8"
                    >
                        Ready to start your journey towards a calmer, more connected relationship with your animal? Reach out to arrange a consultation or ask any questions you might have.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <a href="#form-section" className="inline-flex items-center gap-2 px-9 py-3.5 text-[0.72rem] font-bold tracking-[0.22em] uppercase font-sans no-underline transition-all duration-300 bg-accent text-dark border border-accent hover:bg-white hover:border-white">
                            Send Enquiry <FiArrowRight size={13} />
                        </a>
                        <a href="#booking-offers" className="inline-flex items-center gap-2 px-9 py-3.5 text-[0.72rem] font-bold tracking-[0.22em] uppercase font-sans no-underline transition-all duration-300 text-white border border-white/30 hover:bg-white/10 hover:border-white/50">
                            View Offers
                        </a>
                    </div>
                </div>
            </section>

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                CONTACT DETAILS MAIN SECTION (Dark Cards)
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <section className="py-20 lg:py-28 relative bg-white/50">
                <div className="max-w-[1280px] mx-auto px-[clamp(1.25rem,6vw,4rem)]">
                    <div className="text-center mb-16 max-w-2xl mx-auto">
                        <div className="flex items-center justify-center gap-3 mb-5">
                            <div className="w-5 h-px bg-primary-dark" />
                            <span className="text-[0.7rem] font-bold tracking-[0.22em] uppercase font-sans text-primary-dark">Direct Contact</span>
                            <div className="w-5 h-px bg-primary-dark" />
                        </div>
                        <h2 className="font-serif font-normal text-dark leading-[1.12] mb-6 tracking-[-0.01em]" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                            Reach out to <span className="text-primary-dark">Cheryl</span> directly
                        </h2>
                        <p className="text-dark/70 font-sans leading-[1.8] text-[0.95rem]">
                            Whether you need to discuss your animal&apos;s unique situation, book a session, or ask about travel arrangements, please don&apos;t hesitate to reach out. I aim to reply to all enquiries within 3 business days. If emailing, please monitor your spam folder for replies.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {/* Dark Card - Email */}
                        <div className="bg-dark text-white p-8 lg:p-10 rounded-[2rem] flex flex-col items-center text-center shadow-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
                            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors relative z-10">
                                <FiMail size={24} className="text-accent" />
                            </div>
                            <h3 className="font-serif font-normal text-2xl text-white mb-2 relative z-10">Email</h3>
                            <p className="text-white/60 font-sans text-[0.9rem] mb-6 relative z-10 leading-relaxed">For general enquiries via email.</p>
                            <a href="mailto:ponyblue_1@hotmail.com" className="font-sans font-bold text-accent hover:text-white transition-colors mt-auto relative z-10 text-[0.95rem]">ponyblue_1@hotmail.com</a>
                        </div>
                        {/* Dark Card - Phone */}
                        <div className="bg-dark text-white p-8 lg:p-10 rounded-[2rem] flex flex-col items-center text-center shadow-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
                            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors relative z-10">
                                <FiPhone size={24} className="text-accent" />
                            </div>
                            <h3 className="font-serif font-normal text-2xl text-white mb-2 relative z-10">Phone</h3>
                            <p className="text-white/60 font-sans text-[0.9rem] mb-6 relative z-10 leading-relaxed">Phone between 10.30-5.30pm anyday.</p>
                            <a href="tel:+64021822186" className="font-sans font-bold text-accent hover:text-white transition-colors mt-auto relative z-10 text-[0.95rem]">021 822 186</a>
                        </div>
                        {/* Dark Card - Location */}
                        <div className="bg-dark text-white p-8 lg:p-10 rounded-[2rem] flex flex-col items-center text-center shadow-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
                            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors relative z-10">
                                <FiMapPin size={24} className="text-accent" />
                            </div>
                            <h3 className="font-serif font-normal text-2xl text-white mb-2 relative z-10">Location</h3>
                            <p className="text-white/60 font-sans text-[0.9rem] mb-6 relative z-10 leading-relaxed mt-auto">Based in Wellington, NZ<br />(Online available)</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                BOOKING OFFERS / SERVICES (Moved Above Form)
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <section id="booking-offers" className="py-24 lg:py-32 bg-dark text-white relative overflow-hidden">
                <div className="absolute inset-0">
                    <Image src="/kiri1.jpg" alt="Background" fill className="object-cover opacity-[0.06] mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/95 to-dark" />
                </div>

                <div className="max-w-[1280px] mx-auto px-[clamp(1.25rem,6vw,4rem)] relative z-10">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <div className="flex items-center justify-center gap-3 mb-5">
                            <div className="w-5 h-px bg-white/30" />
                            <span className="text-[0.7rem] font-bold tracking-[0.22em] uppercase font-sans text-accent">Booking Offers</span>
                            <div className="w-5 h-px bg-white/30" />
                        </div>
                        <h2 className="font-serif font-normal text-white leading-[1.12] mb-6 tracking-[-0.01em]" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                            Select a Service Plan
                        </h2>
                        <p className="text-white/60 font-sans leading-[1.8] text-[0.95rem]">
                            These are my standard consultation packages. All sessions are designed to create lasting, positive behavioural change. We can customise these to suit your specific needs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {bookingOffers.map((offer, idx) => (
                            <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-10 flex flex-col hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden">
                                {/* Accent top border */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-accent opacity-50 group-hover:opacity-100 transition-opacity" />

                                <h3 className="font-serif text-2xl text-white mb-2">{offer.title}</h3>
                                <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-white/10">
                                    <span className="font-sans font-bold text-3xl text-accent">{offer.price}</span>
                                    <span className="font-sans text-[0.9rem] text-white/50">/ {offer.duration}</span>
                                </div>
                                <p className="text-white/70 font-sans text-[0.95rem] leading-[1.7] mb-8 flex-grow">
                                    {offer.desc}
                                </p>
                                <ul className="space-y-4 mb-10">
                                    {offer.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-start gap-3 font-sans text-[0.9rem] text-white/80">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary-light shrink-0 mt-2" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <a href="#form-section" className="w-full py-4 text-center border border-white/20 rounded-xl font-sans font-bold tracking-[0.15em] uppercase text-[0.75rem] text-white hover:bg-white hover:text-dark transition-colors">
                                    Enquire Now
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                ENQUIRY FORM & FAQ SECTION (Side by side)
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <section id="form-section" className="py-20 lg:py-28 bg-white border-t border-dark/[0.03]">
                <div className="max-w-[1400px] mx-auto px-[clamp(1.25rem,6vw,4rem)]">
                    <div className="text-center mb-16 lg:hidden">
                        <div className="flex items-center justify-center gap-3 mb-5">
                            <div className="w-5 h-px bg-primary-dark" />
                            <span className="text-[0.7rem] font-bold tracking-[0.22em] uppercase font-sans text-primary-dark">Enquire & Ask</span>
                            <div className="w-5 h-px bg-primary-dark" />
                        </div>
                        <h2 className="font-serif font-normal text-dark leading-[1.12] mb-4 tracking-[-0.01em]" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                            We&apos;re Here to Help
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                        {/* Left Side: FAQs */}
                        <div>
                            <div className="mb-8 hidden lg:block">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-5 h-px bg-primary-dark" />
                                    <span className="text-[0.65rem] font-bold tracking-[0.22em] uppercase font-sans text-primary-dark">Common Questions</span>
                                </div>
                                <h2 className="font-serif font-normal text-dark leading-[1.12] mb-4 tracking-[-0.01em]" style={{ fontSize: "clamp(2rem, 3vw, 2.5rem)" }}>
                                    Frequently Asked Questions
                                </h2>
                                <p className="text-dark/60 font-sans text-[0.9rem] leading-relaxed">Find quick answers to common questions about consultations, travel, and the Trust Technique before you reach out.</p>
                            </div>

                            <div className="space-y-3">
                                {faqs.map((faq, idx) => {
                                    const isOpen = openFaq === idx;
                                    return (
                                        <div key={idx} className={`bg-bg-section border rounded-xl overflow-hidden transition-colors duration-300 ${isOpen ? 'border-primary-dark/30 shadow-sm bg-white' : 'border-dark/5 hover:border-dark/15'}`}>
                                            <button
                                                className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                                                onClick={() => toggleFaq(idx)}
                                            >
                                                <span className={`font-serif text-base pr-4 transition-colors duration-300 ${isOpen ? 'text-primary-dark' : 'text-dark'}`}>
                                                    {faq.question}
                                                </span>
                                                <span className={`flex items-center justify-center w-6 h-6 rounded-full transition-colors duration-300 shrink-0 ${isOpen ? 'bg-primary-dark text-white' : 'bg-white border border-dark/10 text-dark'}`}>
                                                    {isOpen ? <FiMinus size={14} /> : <FiPlus size={14} />}
                                                </span>
                                            </button>

                                            <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                                                <div className="overflow-hidden">
                                                    <div className="p-5 pt-0 text-dark/70 font-sans leading-[1.6] text-[0.85rem]">
                                                        {faq.answer}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right Side: Form */}
                        <div className="bg-bg-section p-8 lg:p-10 rounded-[2rem] shadow-[0_10px_30px_rgba(28,43,54,0.04)] border border-dark/5">
                            <div className="mb-8">
                                <h3 className="font-serif font-normal text-dark text-2xl lg:text-3xl mb-2">Send an Enquiry</h3>
                                <p className="text-dark/60 font-sans text-[0.85rem]">Please fill out the form below detailing your needs.</p>
                            </div>

                            {isSubmitted ? (
                                <div className="text-center py-10">
                                    <div className="w-16 h-16 bg-primary-dark/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <FiArrowRight size={24} className="text-primary-dark" />
                                    </div>
                                    <h3 className="font-serif text-2xl text-dark mb-3">Message Sent!</h3>
                                    <p className="text-dark/70 font-sans text-sm max-w-[280px] mx-auto">Thank you for reaching out. I have received your enquiry and will be in touch shortly.</p>
                                    <button onClick={() => setIsSubmitted(false)} className="mt-6 px-6 py-2.5 border border-dark/20 rounded-xl font-sans font-bold text-[0.75rem] uppercase tracking-widest hover:bg-white transition-colors">
                                        Send Another
                                    </button>
                                </div>
                            ) : (
                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="font-sans text-[0.7rem] font-bold text-dark/70 uppercase tracking-widest pl-1">First Name</label>
                                            <input required type="text" className="w-full px-4 py-3 bg-white border border-dark/5 rounded-xl text-[0.9rem] focus:outline-none focus:border-primary-dark font-sans text-dark transition-colors" placeholder="Jane" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="font-sans text-[0.7rem] font-bold text-dark/70 uppercase tracking-widest pl-1">Last Name</label>
                                            <input required type="text" className="w-full px-4 py-3 bg-white border border-dark/5 rounded-xl text-[0.9rem] focus:outline-none focus:border-primary-dark font-sans text-dark transition-colors" placeholder="Doe" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="font-sans text-[0.7rem] font-bold text-dark/70 uppercase tracking-widest pl-1">Email</label>
                                            <input required type="email" className="w-full px-4 py-3 bg-white border border-dark/5 rounded-xl text-[0.9rem] focus:outline-none focus:border-primary-dark font-sans text-dark transition-colors" placeholder="jane@example.com" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="font-sans text-[0.7rem] font-bold text-dark/70 uppercase tracking-widest pl-1">Phone</label>
                                            <input type="tel" className="w-full px-4 py-3 bg-white border border-dark/5 rounded-xl text-[0.9rem] focus:outline-none focus:border-primary-dark font-sans text-dark transition-colors" placeholder="+64 21 000 0000" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="font-sans text-[0.7rem] font-bold text-dark/70 uppercase tracking-widest pl-1">Animal</label>
                                            <div className="relative">
                                                <select className="w-full px-4 py-3 bg-white border border-dark/5 rounded-xl text-[0.9rem] outline-none focus:border-primary-dark font-sans text-dark transition-colors appearance-none cursor-pointer">
                                                    <option value="" disabled selected>Select...</option>
                                                    <option>Dog</option>
                                                    <option>Horse</option>
                                                    <option>Other</option>
                                                </select>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-dark/40">
                                                    <FiArrowRight className="rotate-90" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="font-sans text-[0.7rem] font-bold text-dark/70 uppercase tracking-widest pl-1">Enquiry</label>
                                            <div className="relative">
                                                <select className="w-full px-4 py-3 bg-white border border-dark/5 rounded-xl text-[0.9rem] outline-none focus:border-primary-dark font-sans text-dark transition-colors appearance-none cursor-pointer">
                                                    <option value="" disabled selected>Select...</option>
                                                    <option>General</option>
                                                    <option>Trust Technique</option>
                                                    <option>New Canine </option>
                                                    <option>ConTact C.A.R.E</option>

                                                </select>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-dark/40">
                                                    <FiArrowRight className="rotate-90" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="font-sans text-[0.7rem] font-bold text-dark/70 uppercase tracking-widest pl-1">Message</label>
                                        <textarea required rows={4} className="w-full px-4 py-3 bg-white border border-dark/5 rounded-xl text-[0.9rem] focus:outline-none focus:border-primary-dark font-sans text-dark transition-colors resize-y leading-relaxed" placeholder="Tell me a bit about your situation..." />
                                    </div>

                                    <div className="pt-2">
                                        <button type="submit" className="inline-flex items-center justify-center gap-3 w-full px-8 py-3.5 bg-primary-dark text-white font-sans font-bold tracking-[0.2em] uppercase text-[0.75rem] rounded-xl hover:bg-dark transition-colors shadow-lg shadow-primary-dark/20">
                                            Submit Enquiry <FiArrowRight size={14} />
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}
