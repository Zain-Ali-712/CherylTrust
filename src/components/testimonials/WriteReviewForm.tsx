"use client";
import { useState } from "react";
import { FiStar, FiCheckCircle, FiLoader } from "react-icons/fi";

export default function WriteReviewForm() {
    const [rating, setRating] = useState(5);
    const [hover, setHover] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const data = {
            clientName: formData.get("name"),
            comment: formData.get("comment"),
            rating,
        };


        try {
            const res = await fetch("/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setIsSubmitted(true);
            } else {
                setError("Failed to submit review. Please try again.");
            }
        } catch (err) {
            setError("Something went wrong.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="bg-green-50 border border-green-100 rounded-3xl p-10 text-center">
                <FiCheckCircle className="text-green-500 mx-auto mb-4" size={40} />
                <h3 className="font-serif text-2xl text-green-800 mb-2">Thank you!</h3>
                <p className="text-green-700 font-sans">Your review has been submitted for moderation and will appear on the site once approved by our team.</p>
                <button onClick={() => setIsSubmitted(false)} className="mt-6 text-sm font-bold uppercase tracking-widest text-green-800 underline">Write Another</button>
            </div>
        );
    }

    return (
        <div id="write-review" className="bg-bg-section border border-dark/5 rounded-[2.5rem] p-8 lg:p-12 shadow-sm">
            <h3 className="font-serif text-3xl text-dark mb-2">Share Your Experience</h3>
            <p className="text-dark/50 font-sans mb-10">We would love to hear about your time at Canine Adventure Park.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-dark/40 ml-1">Your Rating</label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onMouseEnter={() => setHover(star)}
                                onMouseLeave={() => setHover(0)}
                                onClick={() => setRating(star)}
                                className="focus:outline-none transition-transform hover:scale-110"
                            >
                                <FiStar 
                                    size={32} 
                                    className={`${(hover || rating) >= star ? "text-accent fill-accent" : "text-dark/10 fill-dark/10"} transition-colors`} 
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-dark/40 ml-1">Your Name</label>
                    <input required name="name" type="text" placeholder="Full Name" className="w-full px-6 py-4 bg-white border border-dark/5 rounded-2xl focus:outline-none focus:border-accent font-sans transition-colors" />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-dark/40 ml-1">Your Review</label>
                    <textarea required name="comment" rows={4} placeholder="Tell us about your adventure..." className="w-full px-6 py-4 bg-white border border-dark/5 rounded-2xl focus:outline-none focus:border-accent font-sans transition-colors resize-none"></textarea>
                </div>

                {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}

                <button 
                    disabled={isSubmitting}
                    className="w-full py-4 bg-dark text-white rounded-2xl font-bold tracking-[0.2em] uppercase text-[10px] hover:bg-accent hover:text-dark transition-all shadow-lg flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <FiLoader className="animate-spin" /> Submitting...
                        </>
                    ) : (
                        "Submit Review"
                    )}
                </button>
            </form>
        </div>
    );
}
