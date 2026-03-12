import Link from "next/link";
import Image from "next/image";
import { FiPlus, FiTrash2, FiStar } from "react-icons/fi";
import connectToDatabase from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { deleteTestimonial } from "@/actions/testimonials";
import mongoose from "mongoose";

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
        } catch (e) { }
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-dark">Testimonials</h1>
                    <p className="text-dark/60 font-sans mt-1">Manage client reviews and stories.</p>
                </div>
                <Link
                    href="/admin/testimonials/new"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-dark text-white rounded-lg hover:bg-dark transition-colors font-sans text-sm font-bold shadow-sm"
                >
                    <FiPlus /> Add New
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-dark/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left font-sans">
                        <thead className="bg-bg-light/50 border-b border-dark/10">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-dark/70 uppercase tracking-wider">Client Info</th>
                                <th className="px-6 py-4 text-xs font-bold text-dark/70 uppercase tracking-wider">Service</th>
                                <th className="px-6 py-4 text-xs font-bold text-dark/70 uppercase tracking-wider">Rating</th>
                                <th className="px-6 py-4 text-xs font-bold text-dark/70 uppercase tracking-wider w-1/3">Preview Text</th>
                                <th className="px-6 py-4 text-xs font-bold text-dark/70 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-dark/5">
                            {testimonials.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-dark/50">
                                        No testimonials added yet. Click &quot;Add New&quot; to get started.
                                    </td>
                                </tr>
                            ) : (
                                testimonials.map((t: any) => (
                                    <tr key={t._id.toString()} className="hover:bg-bg-light/30 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 shrink-0 rounded-full bg-primary-light/20 flex items-center justify-center overflow-hidden border border-primary-light/30 relative">
                                                    {t.imageUrl ? (
                                                        <Image src={t.imageUrl} alt={t.name} fill className="object-cover" sizes="40px" />
                                                    ) : (
                                                        <span className="text-primary-dark font-serif font-bold text-lg">{t.name.charAt(0)}</span>
                                                    )}
                                                </div>
                                                <div className="font-bold text-dark text-sm">{t.name}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-dark/70">
                                            {t.service}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <FiStar key={i} size={14} className={i < t.rating ? "text-accent fill-accent" : "text-dark/10 fill-dark/10"} />
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-dark/70">
                                            <div className="truncate max-w-xs xl:max-w-md">
                                                &quot;{t.text}&quot;
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <form action={async () => {
                                                "use server";
                                                await deleteTestimonial(t._id.toString());
                                            }}>
                                                <button type="submit" className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors">
                                                    <FiTrash2 size={16} />
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
