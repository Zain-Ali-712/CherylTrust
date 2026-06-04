"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiCheckCircle, FiAlertCircle, FiLock, FiLoader, FiCreditCard } from "react-icons/fi";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Link from "next/link";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function StripeForm({ finalPrice, onComplete }: { finalPrice: number; onComplete: (paymentIntentId: string) => Promise<void> }) {
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

function MembershipCheckoutContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pkgId = searchParams.get("pkgId");

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [clientData, setClientData] = useState<any>(null);
    const [packageData, setPackageData] = useState<any>(null);
    const [hasActiveMembership, setHasActiveMembership] = useState(false);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        const init = async () => {
            if (!pkgId) {
                setError("No package selected.");
                setIsLoading(false);
                return;
            }

            try {
                // Check User
                const meRes = await fetch("/api/auth/client/me");
                if (!meRes.ok) {
                    router.push(`/auth/login?redirect=/checkout/membership?pkgId=${pkgId}`);
                    return;
                }
                const me = await meRes.json();
                setClientData(me);

                // Fetch Memberships to see if active
                const mbRes = await fetch(`/api/memberships?clientId=${me.id}`);
                if (mbRes.ok) {
                    const memberships = await mbRes.json();
                    const active = memberships.find((m: any) => m.status === "active" && new Date(m.endDate) > new Date());
                    if (active) {
                        setHasActiveMembership(true);
                        setIsLoading(false);
                        return;
                    }
                }

                // Fetch Package Details
                const pkgRes = await fetch("/api/membership-packages");
                if (pkgRes.ok) {
                    const pkgs = await pkgRes.json();
                    const found = pkgs.find((p: any) => p._id === pkgId);
                    if (!found) {
                        setError("Package not found or inactive.");
                    } else {
                        setPackageData(found);
                    }
                } else {
                    setError("Failed to fetch package details.");
                }
            } catch (e) {
                console.error(e);
                setError("An error occurred during initialization.");
            } finally {
                setIsLoading(false);
            }
        };

        init();
    }, [pkgId, router]);

    const startStripeFlow = async () => {
        if (!clientData || !packageData) return;

        if (packageData.price === 0) {
            setIsLoading(true);
            await finalizePayment("");
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    membershipPackageId: packageData._id,
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

    const finalizePayment = async (paymentIntentId: string) => {
        try {
            const res = await fetch("/api/memberships", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    clientId: clientData.id,
                    packageId: packageData._id,
                    paymentIntentId: paymentIntentId
                })
            });

            if (res.ok) {
                router.push("/client/dashboard?success=membership_complete");
            } else {
                const data = await res.json();
                setError(data.error || "Payment successful, but membership failed to save. Please contact support.");
            }
        } catch (e) {
            setError("Network error after payment. Please check your dashboard.");
        }
    };

    if (isLoading) {
        return <div className="text-center py-20 min-h-screen text-dark/40"><FiLoader className="animate-spin inline mr-2" />Loading Checkout...</div>;
    }

    if (hasActiveMembership) {
        return (
            <div className="min-h-screen bg-bg-light py-20 px-4 flex flex-col items-center">
                <div className="bg-white p-10 rounded-3xl border border-dark/10 shadow-xl max-w-md text-center">
                    <FiCheckCircle className="text-accent mx-auto mb-4" size={48} />
                    <h2 className="text-2xl font-serif text-dark mb-4">You're Already a Member</h2>
                    <p className="text-dark/60 font-sans mb-8">You currently have an active membership. You cannot purchase another one until your current membership expires.</p>
                    <Link href="/client/dashboard" className="px-6 py-3 bg-dark text-white rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-accent hover:text-dark transition block">Go to Dashboard</Link>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-bg-light py-20 px-4 flex flex-col items-center">
                <div className="bg-red-50 p-10 rounded-3xl border border-red-100 max-w-md text-center">
                    <FiAlertCircle className="text-red-500 mx-auto mb-4" size={48} />
                    <h2 className="text-xl font-serif text-red-700 mb-4">Error</h2>
                    <p className="text-red-600 font-sans">{error}</p>
                    <Link href="/adventure-park" className="mt-8 px-6 py-3 border border-red-500 text-red-700 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-red-500 hover:text-white transition inline-block">Return to Park</Link>
                </div>
            </div>
        );
    }

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
                        <p className="text-dark/60 text-xs font-bold uppercase tracking-widest mb-1">Membership Plan</p>
                        <h3 className="font-serif text-xl text-dark mb-4">{packageData.name}</h3>

                        <div className="flex justify-between items-center text-sm font-sans text-dark/80 pt-4 border-t border-dark/10">
                            <div>
                                <span className="block opacity-60">Duration</span>
                                <strong>{packageData.durationInDays} days</strong>
                            </div>
                            <div className="text-right">
                                <span className="block opacity-60">Sessions</span>
                                <strong>{packageData.sessionsAllowed === 'unlimited' ? 'Unlimited' : packageData.sessionsAllowed}</strong>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-dark/10 pt-6 mb-8">
                        <div className="flex justify-between items-end">
                            <span className="text-dark/70 font-sans font-medium">Total Due:</span>
                            <span className="text-4xl font-serif text-accent">${packageData.price.toFixed(2)}</span>
                        </div>
                    </div>

                    {!clientSecret ? (
                        <button
                            onClick={startStripeFlow}
                            disabled={isLoading}
                            className={`w-full py-4 rounded-xl shadow-lg text-sm font-bold font-sans tracking-wider uppercase flex items-center justify-center gap-2 transition-all 
                                ${isLoading ? "bg-dark/10 text-dark/30 cursor-not-allowed" : "bg-dark text-white hover:bg-primary-dark"}`}
                        >
                            {isLoading ? <><FiLoader className="animate-spin" /> Preparing...</> : <><FiCreditCard /> Proceed to Payment</>}
                        </button>
                    ) : (
                        <Elements stripe={stripePromise} options={{ clientSecret }}>
                            <StripeForm finalPrice={packageData.price} onComplete={finalizePayment} />
                        </Elements>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function MembershipCheckoutPage() {
    return (
        <Suspense fallback={<div className="text-center py-20 min-h-screen text-dark/40"><FiLoader className="animate-spin inline mr-2" />Loading Checkout...</div>}>
            <MembershipCheckoutContent />
        </Suspense>
    );
}
