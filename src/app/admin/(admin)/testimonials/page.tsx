import Link from "next/link";
import { FiPlus, FiStar } from "react-icons/fi";
import connectToDatabase from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import mongoose from "mongoose";
import TestimonialList from "@/components/admin/TestimonialList";

export const revalidate = 0; // Disable static caching for admin

export default async function AdminTestimonialsPage() {
    await connectToDatabase();

    // Fetch all testimonials sorted by newest first
    let testimonials: any[] = [];
    if (mongoose.connection.readyState === 1) {
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
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-dark">Testimonials</h1>
                    <p className="text-dark/60 font-sans mt-1">Manage client reviews and stories.</p>
                </div>
                <div className="flex gap-4">
                    <Link
                        href="/admin/testimonials/reviews"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-bg-section border border-dark/10 text-dark rounded-lg hover:bg-white transition-colors font-sans text-sm font-bold shadow-sm"
                    >
                        <FiStar className="text-accent" /> Submission Queue
                    </Link>
                    <Link
                        href="/admin/testimonials/new"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-dark text-white rounded-lg hover:bg-dark transition-colors font-sans text-sm font-bold shadow-sm"
                    >
                        <FiPlus /> Add New
                    </Link>
                </div>
            </div>

            <TestimonialList initialTestimonials={testimonials} />
        </div>
    );
}
