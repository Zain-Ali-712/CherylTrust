import Link from "next/link";
import { FiPlus, FiStar } from "react-icons/fi";
import connectToDatabase from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import mongoose from "mongoose";
import TestimonialList from "@/components/admin/TestimonialList";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
    await connectToDatabase();

    // Fetch all testimonials sorted by newest first
    let testimonials: any[] = [];
    try {
        const rawTestimonials = await Testimonial.find().sort({ createdAt: -1 }).lean() || [];
        testimonials = rawTestimonials.map((t: any) => ({
            ...t,
            _id: t._id.toString(),
            createdAt: t.createdAt?.toISOString() || null,
            updatedAt: t.updatedAt?.toISOString() || null
        }));
    } catch (e) { 
        console.error("Fetch error:", e);
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-serif font-bold text-dark">Testimonials</h1>
                    <p className="text-sm md:text-base text-dark/60 font-sans mt-1">Manage client reviews and stories.</p>
                </div>
                <div className="flex flex-row gap-2 sm:gap-4 w-full sm:w-auto">
                    <Link
                        href="/admin/testimonials/reviews"
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-5 py-2 md:py-2.5 bg-bg-section border border-dark/10 text-dark rounded-lg hover:bg-white transition-colors font-sans text-xs md:text-sm font-bold shadow-sm whitespace-nowrap"
                    >
                        <FiStar className="text-accent" /> 
                        <span className="hidden sm:inline">Submission Queue</span>
                        <span className="sm:hidden">Queue</span>
                    </Link>
                    <Link
                        href="/admin/testimonials/new"
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-5 py-2 md:py-2.5 bg-primary-dark text-white rounded-lg hover:bg-dark transition-colors font-sans text-xs md:text-sm font-bold shadow-sm whitespace-nowrap"
                    >
                        <FiPlus /> Add New
                    </Link>
                </div>
            </div>

            <TestimonialList initialTestimonials={testimonials} />
        </div>
    );
}
