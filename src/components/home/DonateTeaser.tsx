"use client";

import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";

export default function DonateTeaser() {
    return (
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
    );
}
