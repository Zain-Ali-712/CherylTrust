import Image from "next/image";
import { FiStar } from "react-icons/fi";
import { FaQuoteLeft } from "react-icons/fa";
import connectToDatabase from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import HomeCTA from "@/components/home/HomeCTA";
import mongoose from "mongoose";

export const revalidate = 3600; // revalidate at most every hour

export default async function TestimonialsPage() {
    await connectToDatabase();
    let testimonials: any[] = [];
    if (mongoose.connection.readyState === 1) {
        try {
            const rawTestimonials = await Testimonial.find().sort({ createdAt: -1 }).lean() || [];
            testimonials = rawTestimonials.map((t: any) => ({
                ...t,
                _id: t._id.toString()
            }));
        } catch (e) { }
    }

    return (
        <main className="bg-warm-white bg-noise min-h-screen">
            {/* Header */}
            <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-light/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="max-w-[1280px] mx-auto px-[clamp(1.25rem,6vw,4rem)] relative z-10 text-center">
                    <div className="flex items-center justify-center gap-3 mb-5">
                        <div className="w-5 h-px bg-primary-dark" />
                        <span className="text-[0.7rem] font-bold tracking-[0.22em] uppercase font-sans text-primary-dark">Client Stories</span>
                        <div className="w-5 h-px bg-primary-dark" />
                    </div>
                    <h1 className="font-serif font-normal text-dark leading-[1.12] mb-6 tracking-[-0.01em]" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                        Happy Hearts & Wags
                    </h1>
                    <p className="text-[1.05rem] text-dark/70 font-sans leading-[1.8] max-w-[600px] mx-auto">
                        Real stories from humans and their best friends about their journey with the Trust Technique and our facilities.
                    </p>
                </div>
            </section>

            {/* Grid */}
            <section className="pb-24 lg:pb-32 bg-white relative z-10">
                <div className="max-w-[1280px] mx-auto px-[clamp(1.25rem,6vw,4rem)]">
                    {testimonials.length === 0 ? (
                        <div className="text-center py-20 text-dark/50 font-sans border-2 border-dashed border-dark/10 rounded-3xl">
                            <p>No testimonials available at this moment. Please check back later.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                            {testimonials.map((t: any) => (
                                <div key={t._id.toString()} className="bg-bg-light p-8 lg:p-10 rounded-[2rem] border border-dark/5 relative hover:-translate-y-1 transition-transform duration-300 h-full flex flex-col shadow-[0_10px_40px_rgba(28,43,54,0.03)] hover:shadow-[0_15px_50px_rgba(28,43,54,0.06)] overflow-hidden">
                                    <FaQuoteLeft className="text-primary-dark/5 absolute top-8 right-8 text-6xl" />

                                    <div className="flex gap-1 mb-8 relative z-10">
                                        {[...Array(5)].map((_, i) => (
                                            <FiStar key={i} size={15} className={i < t.rating ? "text-accent fill-accent" : "text-dark/10 fill-dark/10"} />
                                        ))}
                                    </div>

                                    <p className="font-sans text-dark/80 text-[1.05rem] leading-[1.8] mb-10 flex-grow relative z-10">
                                        "{t.text}"
                                    </p>

                                    <div className="flex items-center gap-4 mt-auto border-t border-dark/10 pt-6 relative z-10">
                                        <div className="w-14 h-14 rounded-full bg-primary-dark/10 flex items-center justify-center text-primary-dark font-serif font-bold text-xl overflow-hidden relative border border-primary-dark/20">
                                            {t.imageUrl ? (
                                                <Image src={t.imageUrl} alt={t.name} fill className="object-cover" sizes="56px" />
                                            ) : (
                                                t.name.charAt(0)
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-sans font-bold text-dark text-[0.95rem]">{t.name}</h4>
                                            <p className="font-sans text-[0.75rem] text-dark/50 uppercase tracking-widest mt-1">{t.service}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <HomeCTA />
        </main>
    );
}
