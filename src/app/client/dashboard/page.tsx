"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FiLogOut, FiCalendar, FiShoppingBag, FiInfo, FiCheck, FiLoader, FiStar, FiMessageSquare } from "react-icons/fi";

const membershipPlans = [
    { type: "Country Club Trust Membership", price: 30, duration: "1 year" },
    { type: "Country Club Non Trust Membership", price: 30, duration: "1 year" },
    { type: "Feb Valentines Special (2 Members)", price: 35, duration: "45 mins" },
    { type: "Feb Valentines Special", price: 45, duration: "45 mins" },
];

function DashboardContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isSuccess = searchParams.get("success") === "booking_complete";

    const [clientData, setClientData] = useState<any>(null);
    const [bookings, setBookings] = useState<any[]>([]);
    const [memberships, setMemberships] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isPurchasing, setIsPurchasing] = useState<string | null>(null);

    // Testimonial state
    const [isTestimonialOpen, setIsTestimonialOpen] = useState(false);
    const [testimonialService, setTestimonialService] = useState("");
    const [testimonialText, setTestimonialText] = useState("");
    const [testimonialRating, setTestimonialRating] = useState(5);
    const [testimonialSubmitting, setTestimonialSubmitting] = useState(false);
    const [testimonialSuccess, setTestimonialSuccess] = useState(false);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const meRes = await fetch("/api/auth/client/me");
            if (!meRes.ok) throw new Error("Not auth");
            const me = await meRes.json();
            setClientData(me);

            const [bkRes, mbRes] = await Promise.all([
                fetch(`/api/bookings?clientId=${me.id}`),
                fetch(`/api/memberships?clientId=${me.id}`)
            ]);

            if (bkRes.ok) setBookings(await bkRes.json());
            if (mbRes.ok) setMemberships(await mbRes.json());
        } catch (e) {
            router.push("/auth/login");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        await fetch("/api/auth/client/logout", { method: "POST" });
        router.push("/auth/login");
    };

    const handlePurchaseMembership = async (plan: any) => {
        if (!clientData) return;
        setIsPurchasing(plan.type);

        const startDate = new Date();
        const endDate = new Date();
        if (plan.duration === "1 year") {
            endDate.setFullYear(endDate.getFullYear() + 1);
        } else {
            // Assume 45 mins just adds a day buffer for the system
            endDate.setDate(endDate.getDate() + 1);
        }

        try {
            const res = await fetch("/api/memberships", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    clientId: clientData.id,
                    type: plan.type,
                    price: plan.price,
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString()
                })
            });

            if (res.ok) {
                fetchDashboardData();
            } else {
                const data = await res.json();
                alert(data.error || "Failed to finalize membership. Please check server logs.");
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsPurchasing(null);
        }
    };

    const handleCancelBooking = async (id: string) => {
        if (!confirm("Are you sure you want to cancel this booking?")) return;
        try {
            const res = await fetch(`/api/bookings/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "cancelled" })
            });
            if (res.ok) {
                alert("Booking cancelled successfully.");
                fetchDashboardData();
            } else {
                const data = await res.json();
                alert(data.error || "Failed to cancel booking.");
            }
        } catch (e) {
            alert("Error cancelling booking.");
        }
    };


    const openTestimonialModal = (service: string) => {
        setTestimonialService(service);
        setTestimonialText("");
        setTestimonialRating(5);
        setTestimonialSuccess(false);
        setIsTestimonialOpen(true);
    };

    const handleSubmitTestimonial = async () => {
        if (!clientData || !testimonialText.trim()) return;
        setTestimonialSubmitting(true);
        try {
            const res = await fetch("/api/testimonials", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: `${clientData.firstName} ${clientData.lastName}`,
                    service: testimonialService,
                    text: testimonialText,
                    rating: testimonialRating
                })
            });
            if (res.ok) {
                setTestimonialSuccess(true);
                setTimeout(() => setIsTestimonialOpen(false), 1500);
            } else {
                alert("Failed to submit testimonial.");
            }
        } catch (e) {
            alert("Error submitting testimonial.");
        } finally {
            setTestimonialSubmitting(false);
        }
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center"><FiLoader className="animate-spin text-accent" size={32} /></div>;
    }

    const activeMembership = memberships.find(m => m.status === "active" && new Date(m.endDate) > new Date());
    const upcomingBookings = bookings.filter(b => b.status === "confirmed" && new Date(b.date) >= new Date(new Date().setHours(0, 0, 0, 0)));

    return (
        <div className="min-h-screen bg-bg-light pb-20 pt-20">


            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Memberships */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Active Membership */}
                    <div className="bg-dark p-6 rounded-3xl shadow-xl border border-dark/10 relative overflow-hidden">
                        <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
                        <h3 className="font-serif text-xl text-white mb-6 relative z-10 flex items-center gap-2">
                            <FiShoppingBag className="text-accent" /> Active Membership
                        </h3>
                        {activeMembership ? (
                            <div className="relative z-10">
                                <span className="inline-block px-3 py-1 bg-accent/20 text-accent text-[10px] font-bold tracking-widest uppercase rounded-full mb-3 border border-accent/20">Active</span>
                                <h4 className="text-white font-serif text-[1.2rem] mb-2">{activeMembership.type}</h4>
                                <p className="text-white/60 text-sm font-sans mb-1">Expires: {new Date(activeMembership.endDate).toLocaleDateString()}</p>
                            </div>
                        ) : (
                            <div className="relative z-10 text-white/50 text-sm font-sans">
                                You currently have no active membership.
                            </div>
                        )}
                    </div>

                    {/* Purchase Plans */}
                    <div className="bg-white p-6 rounded-3xl shadow-lg border border-dark/5">
                        <h3 className="font-serif text-xl text-dark mb-4">Available Plans</h3>
                        <p className="text-dark/50 text-xs mb-6 leading-relaxed">Purchasing a membership is required for premium slots. <em>(Payments are mock logic for now)</em></p>
                        <div className="space-y-4">
                            {membershipPlans
                                .filter(plan => {
                                    const isSpecial = plan.type.startsWith("Feb");
                                    if (clientData?.trustTechniqueCompleted) {
                                        return isSpecial || (plan.type.includes("Trust Membership") && !plan.type.includes("Non Trust"));
                                    } else {
                                        return isSpecial || plan.type.includes("Non Trust Membership");
                                    }
                                })
                                .map((plan, i) => (
                                    <div key={i} className="p-4 border border-dark/10 rounded-xl hover:border-accent transition">
                                        <h4 className="font-serif text-[1rem] text-dark">{plan.type}</h4>
                                        <div className="flex justify-between items-center mt-3">
                                            <span className="font-bold text-accent text-xl">${plan.price}</span>
                                            <button
                                                onClick={() => handlePurchaseMembership(plan)}
                                                disabled={isPurchasing === plan.type || activeMembership}
                                                className={`text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-lg transition-colors
                                                    ${isPurchasing === plan.type ? "bg-dark/10 text-dark/40" :
                                                        activeMembership ? "bg-dark/5 text-dark/30 hidden" : "bg-dark text-white hover:bg-accent hover:text-dark"}`}>
                                                {isPurchasing === plan.type ? "Processing..." : "Purchase"}
                                            </button>

                                        </div>

                                    </div>
                                ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Bookings */}
                <div className="lg:col-span-2 space-y-8">
                    {isSuccess && (
                        <div className="bg-green-50 border border-green-200 p-4 rounded-xl flex items-center gap-3 text-green-700 font-medium">
                            <FiCheck className="text-green-500" size={24} />
                            Success! Your booking has been confirmed and reserved.
                        </div>
                    )}

                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-dark/5">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center items-start mb-8 pb-4 border-b border-dark/5 gap-4">
                            <h3 className="font-serif text-2xl text-dark flex items-center gap-3">
                                <FiCalendar className="text-accent shrink-0" /> Upcoming Sessions
                            </h3>
                            <div className="flex items-center gap-4">
                                <Link href={`/book?service=${clientData?.trustTechniqueCompleted ? "Canine Adventure Park session Trust Client" : "Canine Adventure Park session non Trust Client"}`} className="text-sm font-bold uppercase tracking-widest text-dark bg-accent px-5 py-2.5 rounded-xl hover:brightness-110 transition text-center">
                                    New Booking
                                </Link>
                                <button onClick={handleLogout} className="text-sm font-bold uppercase tracking-widest text-red-500 hover:text-red-700 transition flex items-center gap-2">
                                    <FiLogOut size={16} /> Logout
                                </button>
                            </div>
                        </div>

                        {upcomingBookings.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center text-dark/40">
                                <FiInfo size={40} className="mb-4 opacity-50" />
                                <p className="font-sans">No upcoming bookings found.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {upcomingBookings.map((b, i) => (
                                    <div key={i} className="flex flex-col sm:flex-row justify-between sm:items-center p-5 border border-dark/10 rounded-2xl hover:border-dark/20 transition-colors">
                                        <div className="mb-4 sm:mb-0">
                                            <span className="inline-block px-2 py-1 bg-green-50 text-green-700 text-[10px] font-bold tracking-widest uppercase rounded-md mb-2">Confirmed</span>
                                            <h4 className="font-serif text-lg text-dark mb-1">{b.service}</h4>
                                            <div className="text-dark/60 text-sm font-sans flex items-center gap-2">
                                                <FiCalendar /> {new Date(b.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} | {b.startTime} - {b.endTime}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <span className="font-bold text-accent text-xl">${b.price}</span>
                                            <button
                                                onClick={() => openTestimonialModal(b.service)}
                                                className="text-xs font-bold uppercase tracking-widest text-brand hover:text-brand/70 border border-brand/20 px-3 py-1.5 rounded-lg hover:bg-brand/5 transition flex items-center gap-1">
                                                <FiMessageSquare size={12} /> Review
                                            </button>
                                            <button
                                                onClick={() => handleCancelBooking(b._id)}
                                                className="text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-700 border border-red-500/20 px-3 py-1.5 rounded-lg hover:bg-red-50 transition">
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Testimonial Modal */}
            {isTestimonialOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
                        {testimonialSuccess ? (
                            <div className="text-center py-8">
                                <FiCheck className="mx-auto text-green-500 mb-4" size={48} />
                                <h3 className="font-serif text-xl text-dark mb-2">Thank You!</h3>
                                <p className="text-dark/60 text-sm">Your review has been submitted successfully.</p>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-xl font-bold font-serif mb-1 flex items-center gap-2"><FiMessageSquare className="text-brand" /> Leave a Review</h2>
                                <p className="text-dark/50 text-sm mb-5">For: {testimonialService}</p>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-dark/70 mb-2">Rating</label>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setTestimonialRating(star)}
                                                className={`p-1 transition-colors ${star <= testimonialRating ? 'text-yellow-400' : 'text-dark/20'}`}
                                            >
                                                <FiStar size={28} fill={star <= testimonialRating ? 'currentColor' : 'none'} />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-dark/70 mb-1">Your Experience</label>
                                    <textarea
                                        value={testimonialText}
                                        onChange={(e) => setTestimonialText(e.target.value)}
                                        rows={4}
                                        placeholder="Tell us about your experience at the park..."
                                        className="w-full border border-black/10 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 resize-none"
                                    />
                                </div>

                                <div className="flex justify-end gap-3">
                                    <button onClick={() => setIsTestimonialOpen(false)} className="px-4 py-2 text-dark/70 hover:bg-black/5 rounded-lg transition font-medium">Cancel</button>
                                    <button
                                        onClick={handleSubmitTestimonial}
                                        disabled={testimonialSubmitting || !testimonialText.trim()}
                                        className="px-5 py-2.5 bg-brand text-white rounded-lg font-bold hover:bg-brand/90 transition shadow-md disabled:opacity-50"
                                    >
                                        {testimonialSubmitting ? "Submitting..." : "Submit Review"}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function DashboardClientPage() {
    return (
        <Suspense fallback={<div className="text-center py-20 min-h-screen text-dark/40"><FiLoader className="animate-spin inline mr-2" />Loading Dashboard...</div>}>
            <DashboardContent />
        </Suspense>
    );
}
