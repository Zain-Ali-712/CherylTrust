import { FiStar } from "react-icons/fi";
import { FaQuoteLeft } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import connectToDatabase from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import mongoose from "mongoose";

export const revalidate = 3600;

export default async function TestimonialsSection() {
    await connectToDatabase();

    // Fetch only the latest 3 testimonials for the home page
    let testimonials: any[] = [];
    if (mongoose.connection.readyState === 1) {
        try {
            const rawTestimonials = await Testimonial.find().sort({ createdAt: -1 }).limit(3).lean() || [];
            testimonials = rawTestimonials.map((t: any) => ({
                ...t,
                _id: t._id.toString()
            }));
        } catch (e) {
            console.error("Testimonials fetch error:", e);
        }
    }

    return (
        <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-light/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="max-w-[1280px] mx-auto px-[clamp(1.25rem,6vw,4rem)] relative z-10">
                <div className="text-center mb-16 lg:mb-24">
                    <div className="flex items-center justify-center gap-3 mb-5">
                        <div className="w-5 h-px bg-primary-dark" />
                        <span className="text-[0.7rem] font-bold tracking-[0.22em] uppercase font-sans text-primary-dark">Client Stories</span>
                        <div className="w-5 h-px bg-primary-dark" />
                    </div>
                    <h2 className="font-serif font-normal text-dark leading-[1.12] mb-6 tracking-[-0.01em]" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
                        Happy hearts and wags
                    </h2>
                    <p className="text-[1.05rem] text-dark/70 font-sans leading-[1.8] max-w-[600px] mx-auto">
                        Real stories from humans and their best friends about their journey with the Trust Technique and our Canine Adventure Park facilities.
                    </p>
                </div>

                {testimonials.length === 0 ? (
                    <div className="text-center py-12 text-dark/50 font-sans">
                        <p>No testimonials available yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((t: any) => (
                            <div key={t._id.toString()} className="bg-bg-light p-8 lg:p-10 rounded-[2rem] border border-dark/5 relative group hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full shadow-[0_10px_30px_rgba(28,43,54,0.03)] hover:shadow-[0_15px_40px_rgba(28,43,54,0.06)] overflow-hidden">

                                {/* Decorative Quote Mark */}
                                <FaQuoteLeft className="text-primary-dark/5 absolute top-8 right-8 text-6xl" />

                                {/* Rating */}
                                <div className="flex gap-1 mb-8 relative z-10">
                                    {[...Array(5)].map((_, i) => (
                                        <FiStar key={i} className={i < t.rating ? "text-accent fill-accent" : "text-dark/10 fill-dark/10"} size={16} />
                                    ))}
                                </div>

                                {/* Review Text */}
                                <p className="font-sans text-dark/80 text-[1.05rem] leading-[1.8] mb-10 min-h-[120px] flex-grow relative z-10">
                                    "{t.text}"
                                </p>

                                {/* Author Info */}
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

                <div className="mt-16 text-center">
                    <Link href="/testimonials" className="inline-flex items-center gap-3 px-10 py-4 text-[0.75rem] font-bold tracking-[0.2em] uppercase font-sans no-underline transition-all duration-300 text-dark border-2 border-primary-dark/20 hover:border-primary-dark hover:bg-primary-dark hover:text-white rounded-xl shadow-sm hover:shadow-lg">
                        View More Testimonials
                    </Link>
                </div>
            </div>
        </section>
    );
}
