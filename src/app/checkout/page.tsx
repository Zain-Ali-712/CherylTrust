"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiCheckCircle, FiAlertCircle, FiLock, FiLoader, FiTag, FiCreditCard } from "react-icons/fi";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function StripeForm({ finalPrice, onComplete }: { finalPrice: number; onComplete: (paymentIntentId: string) => Promise<any> }) {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleStripeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setIsProcessing(true);
        setErrorMessage("");

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
        });

        if (error) {
            setErrorMessage(error.message || "Payment failed");
            setIsProcessing(false);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            await onComplete(paymentIntent.id);
        }
    };

    return (
        <form onSubmit={handleStripeSubmit} className="space-y-6">
            <PaymentElement />
            {errorMessage && (
                <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg border border-red-100 flex items-center gap-2">
                    <FiAlertCircle /> {errorMessage}
                </div>
            )}
            <button
                disabled={isProcessing || !stripe || !elements}
                className={`w-full py-4 rounded-xl shadow-lg text-sm font-bold font-sans tracking-wider uppercase flex items-center justify-center gap-2 transition-all 
                    ${isProcessing ? "bg-dark/10 text-dark/30" : "bg-dark text-white hover:bg-primary-dark"}`}
            >
                {isProcessing ? <><FiLoader className="animate-spin" /> Processing...</> : <><FiCheckCircle /> Pay ${finalPrice.toFixed(2)}</>}
            </button>
        </form>
    );
}

function CheckoutContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const pkgId = searchParams.get("pkgId") || "";
    const date = searchParams.get("date") || "";
    const start = searchParams.get("start") || "";
    const end = searchParams.get("end") || "";
    const slotsParam = searchParams.get("slots") || "";

    const slots: { startTime: string; endTime: string }[] = slotsParam
        ? JSON.parse(slotsParam)
        : (start && end ? [{ startTime: start, endTime: end }] : []);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [clientData, setClientData] = useState<any>(null);
    const [bookingPackage, setBookingPackage] = useState<any>(null);

    // Stripe State
    const [clientSecret, setClientSecret] = useState("");

    // Voucher state
    const [voucherCode, setVoucherCode] = useState("");
    const [voucherApplied, setVoucherApplied] = useState<{ type: string; value: number; code: string } | null>(null);
    const [voucherError, setVoucherError] = useState("");
    const [isValidating, setIsValidating] = useState(false);

    useEffect(() => {
        const init = async () => {
            try {
                const res = await fetch("/api/auth/client/me");
                if (res.ok) {
                    const data = await res.json();
                    setClientData(data);
                }
                if (pkgId) {
                    const pkgRes = await fetch("/api/booking-packages");
                    if (pkgRes.ok) {
                        const pkgs = await pkgRes.json();
                        setBookingPackage(pkgs.find((p: any) => p._id === pkgId));
                    }
                }
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };
        init();
    }, [pkgId]);

    const basePrice = bookingPackage ? bookingPackage.price * slots.length : 0;
    const finalPrice = voucherApplied
        ? voucherApplied.type === "percentage"
            ? Math.max(0, basePrice - (basePrice * voucherApplied.value / 100))
            : Math.max(0, basePrice - voucherApplied.value)
        : basePrice;

    const handleApplyVoucher = async () => {
        if (!voucherCode.trim()) return;
        setIsValidating(true);
        setVoucherError("");
        setVoucherApplied(null);
        setClientSecret("");

        try {
            const res = await fetch("/api/vouchers/validate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: voucherCode })
            });
            const data = await res.json();
            if (res.ok && data.valid) {
                setVoucherApplied({ type: data.type, value: data.value, code: data.code });
            } else {
                setVoucherError(data.error || "Invalid code");
            }
        } catch (e) {
            setVoucherError("Validation failed");
        } finally {
            setIsValidating(false);
        }
    };

    const startStripeFlow = async () => {
        if (!clientData || !bookingPackage) {
            setError("Session invalid or package not found.");
            return;
        }

        if (finalPrice === 0) {
            setIsLoading(true);
            setError("");
            const success = await finalizeBookingAfterPayment("");
            if (!success) {
                setIsLoading(false);
            }
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    bookingPackageId: pkgId,
                    slotsCount: slots.length,
                    voucherCode: voucherApplied?.code || null
                })
            });

            const data = await res.json();
            if (res.ok) {
                setClientSecret(data.clientSecret);
            } else {
                setError(data.error || "Failed to initialize payment.");
            }
        } catch (e) {
            setError("Could not connect to payment gateway.");
        } finally {
            setIsLoading(false);
        }
    };

    const finalizeBookingAfterPayment = async (paymentIntentId: string) => {
        try {
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    clientId: clientData.id,
                    packageId: pkgId,
                    date: date,
                    slots: slots,
                    service: bookingPackage.name,
                    price: finalPrice,
                    voucherCode: voucherApplied?.code || null,
                    paymentStatus: "paid",
                    paymentIntentId: paymentIntentId
                })
            });

            if (res.ok) {
                router.push("/client/dashboard?success=booking_complete");
                return true;
            } else {
                const data = await res.json();
                setError(data.error || "Payment successful, but booking failed to save. Please contact support.");
                return false;
            }
        } catch (e) {
            setError("Network error after payment. Please check your dashboard.");
            return false;
        }
    };

    if (isLoading) {
        return <div className="text-center py-20 min-h-screen text-dark/40"><FiLoader className="animate-spin inline mr-2"/>Loading Checkout...</div>;
    }

    if (!bookingPackage) {
        return <div className="text-center py-20 min-h-screen text-dark/40">Booking package not found.</div>;
    }

    const targetDate = new Date(date);

    return (
        <div className="min-h-screen bg-bg-light py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
            <div className="max-w-md w-full">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-serif text-dark mb-3">Secure Checkout</h2>
                    <p className="text-dark/60 font-sans text-sm flex items-center justify-center gap-2 uppercase tracking-widest">
                        <FiLock /> {clientSecret ? "Stripe Secure Encryption" : "Verified Security"}
                    </p>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-xl border border-dark/5">
                    {/* Summary */}
                    <div className="bg-primary-dark/5 border border-primary-dark/10 p-5 rounded-2xl mb-6">
                        <p className="text-dark/60 text-xs font-bold uppercase tracking-widest mb-1">Service Details</p>
                        <h3 className="font-serif text-xl text-dark mb-4">{bookingPackage.name}</h3>

                        <div className="flex justify-between items-center text-sm font-sans text-dark/80 pt-4 border-t border-dark/10">
                            <div>
                                <span className="block opacity-60">Date</span>
                                <strong>{targetDate.toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' })}</strong>
                            </div>
                            <div className="text-right">
                                <span className="block opacity-60">Session{slots.length > 1 ? "s" : ""}</span>
                                {slots.map((s, idx) => (
                                    <strong key={idx} className="block text-xs font-semibold text-dark">
                                        {s.startTime} - {s.endTime}
                                    </strong>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Voucher Section */}
                    {!clientSecret && (
                        <div className="mb-6 p-4 bg-black/5 rounded-xl border border-black/5">
                            <label className="text-xs font-bold uppercase tracking-widest text-dark/60 mb-2 block flex items-center gap-1"><FiTag size={12} /> Voucher Code</label>
                            {voucherApplied ? (
                                <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg border border-green-200">
                                    <span className="text-green-700 font-bold font-mono">{voucherApplied.code}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-600 text-sm font-medium">
                                            -{voucherApplied.type === "percentage" ? `${voucherApplied.value}%` : `$${voucherApplied.value.toFixed(2)}`}
                                        </span>
                                        <button onClick={() => { setVoucherApplied(null); setVoucherCode(""); }} className="text-xs text-red-500 hover:text-red-700 font-bold">Remove</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={voucherCode}
                                        onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                                        placeholder="Enter code"
                                        className="flex-1 border border-black/10 rounded-lg p-2.5 text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-accent/50"
                                    />
                                    <button
                                        onClick={handleApplyVoucher}
                                        disabled={isValidating || !voucherCode.trim()}
                                        className="px-4 py-2.5 bg-dark text-white rounded-lg text-sm font-bold hover:bg-dark/80 transition disabled:opacity-50"
                                    >
                                        {isValidating ? "..." : "Apply"}
                                    </button>
                                </div>
                            )}
                            {voucherError && <p className="text-red-500 text-xs mt-2 font-medium">{voucherError}</p>}
                        </div>
                    )}

                    {error && (
                        <div className="mb-6 bg-red-50 p-4 rounded-xl flex items-start gap-3 text-sm text-red-600 font-medium border border-red-100">
                            <FiAlertCircle size={20} className="shrink-0 mt-0.5" />
                            {error}
                        </div>
                    )}

                    <div className="border-t border-dark/10 pt-6 mb-8">
                        {voucherApplied && (
                            <div className="flex justify-between items-center mb-2 text-sm text-dark/50">
                                <span>Original Price:</span>
                                <span className="line-through">${basePrice.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="flex justify-between items-end">
                            <span className="text-dark/70 font-sans font-medium">Total Due:</span>
                            <span className="text-4xl font-serif text-accent">${finalPrice.toFixed(2)}</span>
                        </div>
                    </div>

                    {!clientSecret ? (
                        <button
                            onClick={startStripeFlow}
                            disabled={isLoading || !clientData}
                            className={`w-full py-4 rounded-xl shadow-lg text-sm font-bold font-sans tracking-wider uppercase flex items-center justify-center gap-2 transition-all 
                                ${isLoading || !clientData ? "bg-dark/10 text-dark/30 cursor-not-allowed" : "bg-dark text-white hover:bg-primary-dark"}`}
                        >
                            {isLoading ? (
                                <><FiLoader className="animate-spin" /> Preparing...</>
                            ) : finalPrice === 0 ? (
                                <><FiCheckCircle /> Confirm Booking</>
                            ) : (
                                <><FiCreditCard /> Proceed to Payment</>
                            )}
                        </button>
                    ) : (
                        <Elements stripe={stripePromise} options={{ clientSecret }}>
                            <StripeForm finalPrice={finalPrice} onComplete={finalizeBookingAfterPayment} />
                        </Elements>
                    )}

                    {!clientData && !isLoading && !error && (
                       <p className="text-center text-xs text-dark/40 mt-3 animate-pulse">Verifying user identity session...</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div className="text-center py-20 min-h-screen text-dark/40"><FiLoader className="animate-spin inline mr-2"/>Loading Checkout...</div>}>
            <CheckoutContent />
        </Suspense>
    );
}
