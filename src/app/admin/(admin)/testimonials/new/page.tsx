"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiImage, FiStar } from "react-icons/fi";
import { createTestimonial } from "@/actions/testimonials";

export default function NewTestimonialPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [rating, setRating] = useState(5);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImagePreview(url);
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        formData.append("rating", rating.toString());

        try {
            const result = await createTestimonial(formData);
            if (result.error) {
                setError(result.error);
                setIsSubmitting(false);
            } else {
                router.push("/admin/testimonials");
            }
        } catch (err) {
            setError("An unexpected error occurred.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/testimonials" className="p-2 text-dark/50 hover:text-dark hover:bg-dark/5 rounded-full transition-colors">
                    <FiArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-serif font-bold text-dark">Add New Testimonial</h1>
                    <p className="text-dark/60 font-sans text-sm mt-1">Publish a new client story to the website.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-dark/5 p-8 space-y-6">

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-100 flex items-start gap-3">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-dark/80 font-sans mb-1.5">Client Name *</label>
                        <input type="text" name="name" required className="w-full px-4 py-3 bg-bg-light border border-dark/10 rounded-xl focus:outline-none focus:border-primary-dark font-sans placeholder:text-dark/30 transition-colors" placeholder="e.g. Sarah & Buster" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-dark/80 font-sans mb-1.5">Service Received *</label>
                        <input type="text" name="service" required className="w-full px-4 py-3 bg-bg-light border border-dark/10 rounded-xl focus:outline-none focus:border-primary-dark font-sans placeholder:text-dark/30 transition-colors" placeholder="e.g. Trust Technique Session" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-dark/80 font-sans mb-1.5">Rating *</label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                className="p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded"
                            >
                                <FiStar size={28} className={`transition-colors ${star <= rating ? "text-accent fill-accent" : "text-dark/10 fill-dark/10 hover:text-accent/50"}`} />
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-dark/80 font-sans mb-1.5">Review Text *</label>
                    <textarea name="text" required rows={4} className="w-full px-4 py-3 bg-bg-light border border-dark/10 rounded-xl focus:outline-none focus:border-primary-dark font-sans placeholder:text-dark/30 transition-colors resize-y" placeholder="Client's review..."></textarea>
                </div>

                <div>
                    <label className="block text-sm font-bold text-dark/80 font-sans mb-1.5">Client Photo (Optional)</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dark/10 border-dashed rounded-xl hover:border-primary-dark/50 transition-colors bg-bg-light/50">
                        <div className="space-y-2 text-center">
                            {imagePreview ? (
                                <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            ) : (
                                <FiImage className="mx-auto h-12 w-12 text-dark/20" />
                            )}
                            <div className="flex text-sm text-dark/60 font-sans justify-center">
                                <label htmlFor="image-upload" className="relative cursor-pointer bg-white rounded-md font-bold text-primary-dark hover:text-dark focus-within:outline-none">
                                    <span>Upload a file</span>
                                    <input id="image-upload" name="image" type="file" accept="image/*" className="sr-only" onChange={handleImageChange} />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-dark/40 font-sans">PNG, JPG, GIF up to 5MB</p>
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-dark/5 flex justify-end gap-3">
                    <Link href="/admin/testimonials" className="px-6 py-3 border border-dark/10 rounded-lg text-sm font-bold text-dark/70 hover:bg-dark/5 transition-colors font-sans">
                        Cancel
                    </Link>
                    <button type="submit" disabled={isSubmitting} className="px-6 py-3 bg-primary-dark text-white rounded-lg text-sm font-bold hover:bg-dark transition-colors font-sans shadow-md disabled:opacity-50 flex items-center gap-2">
                        {isSubmitting ? "Saving..." : "Publish Testimonial"}
                    </button>
                </div>

            </form>
        </div>
    );
}
