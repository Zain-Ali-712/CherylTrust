"use client";

import { FiHeart, FiExternalLink } from "react-icons/fi";

export default function DonateTeaser() {
    return (
        <section id="donation-form" className="py-24 lg:py-32 bg-bg-section relative">
            <div className="max-w-[1280px] mx-auto px-[clamp(1.25rem,6vw,4rem)]">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="font-serif font-normal text-dark leading-[1.12] tracking-[-0.01em] mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}>
                        Make a Donation
                    </h2>
                    <p className="text-[1rem] text-dark/70 font-sans leading-[1.8] mb-8">
                        As a registered charity, we operate entirely on donations. We receive no direct funding from local or central government and rely on fundraising efforts from our volunteers, grants, and donations from members of the public who recognise the value of supporting animals to thrive.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-stretch">

                    {/* Custom Donation Form Component Placeholder */}
                    <div className="bg-white p-8 lg:p-10 rounded-2xl shadow-[0_15px_40px_rgba(28,43,54,0.06)] border border-dark/5 flex flex-col">
                        <div className="text-center mb-8">
                            <h3 className="font-serif font-bold text-2xl text-dark mb-2">Direct Support</h3>
                            <p className="text-dark/60 font-sans text-sm">Secure online donation via Stripe</p>
                        </div>

                        <form className="space-y-6 flex-grow flex flex-col" onSubmit={(e) => e.preventDefault()}>
                            {/* Quick amount select */}
                            <div className="grid grid-cols-3 gap-3">
                                {['$20', '$50', '$100'].map(amount => (
                                    <button key={amount} type="button" className="py-3 px-4 border border-dark/10 rounded-xl font-sans font-semibold text-dark hover:border-primary-dark hover:bg-primary-dark/5 transition-all">
                                        {amount}
                                    </button>
                                ))}
                            </div>

                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/40 font-semibold">$</span>
                                <input type="number" placeholder="Custom Amount" className="w-full pl-8 pr-4 py-4 bg-bg-light border border-dark/10 rounded-xl focus:outline-none focus:border-primary-dark font-sans placeholder:text-dark/40" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input type="text" placeholder="First Name" className="w-full px-4 py-4 bg-bg-light border border-dark/10 rounded-xl focus:outline-none focus:border-primary-dark font-sans placeholder:text-dark/40" />
                                <input type="text" placeholder="Last Name" className="w-full px-4 py-4 bg-bg-light border border-dark/10 rounded-xl focus:outline-none focus:border-primary-dark font-sans placeholder:text-dark/40" />
                            </div>

                            <input type="email" placeholder="Email Address (for receipt)" className="w-full px-4 py-4 bg-bg-light border border-dark/10 rounded-xl focus:outline-none focus:border-primary-dark font-sans placeholder:text-dark/40" />

                            <button type="button" className="w-full mt-auto py-4 bg-primary-dark text-white font-sans font-bold tracking-widest uppercase text-[0.8rem] rounded-xl hover:bg-dark transition-colors">
                                Donate Securely
                            </button>
                        </form>
                    </div>

                    {/* Givealittle Alternative */}
                    <div className="p-8 lg:p-10 border border-dark/10 rounded-2xl bg-white/50 text-center flex flex-col justify-center items-center h-full">
                        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-6">
                            <FiExternalLink size={24} className="text-accent" />
                        </div>
                        <h3 className="font-serif font-bold text-2xl text-dark mb-4">Give-a-little Page</h3>
                        <p className="text-dark/60 font-sans leading-[1.75] text-[0.95rem] mb-8 max-w-xs mx-auto">
                            You can also donate to our cause via our official Give-a-little page. Note that a small fee is deducted from your donation by the platform.
                        </p>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 text-[0.75rem] font-bold tracking-[0.15em] uppercase font-sans no-underline transition-all duration-300 bg-accent text-dark border border-accent hover:bg-white hover:border-dark rounded-xl">
                            Go to Give-a-little
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
