"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiCheckCircle, FiAlertCircle, FiLock, FiLoader, FiTag } from "react-icons/fi";

function CheckoutContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const service = searchParams.get("service") || "";
    const date = searchParams.get("date") || "";
    const start = searchParams.get("start") || "";
    const end = searchParams.get("end") || "";

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [clientData, setClientData] = useState<any>(null);

    // Voucher state
    const [voucherCode, setVoucherCode] = useState("");
    const [voucherApplied, setVoucherApplied] = useState<{ type: string; value: number; code: string } | null>(null);
    const [voucherError, setVoucherError] = useState("");
    const [isValidating, setIsValidating] = useState(false);

    useEffect(() => {
        const fetchUserIdentity = async () => {
            try {
                const res = await fetch("/api/auth/client/me");
                if (res.ok) {
                    const data = await res.json();
                    setClientData(data);
                }
            } catch (e) {
               console.error(e);
            }
        };
        fetchUserIdentity();
    }, []);

    const basePrice = service.includes("non") ? 25 : 20;

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

    const processMockCheckout = async () => {
        if (!clientData) {
            setError("Authentication verification failed.");
            return;
        }

        setIsLoading(true);
        setError("");
        
        try {
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    clientId: clientData.id,
                    date: date,
                    startTime: start,
                    endTime: end,
                    service: service,
                    price: finalPrice,
                    voucherCode: voucherApplied?.code || null
                })
            });

            if (res.ok) {
                router.push("/client/dashboard?success=booking_complete");
            } else {
                const data = await res.json();
                setError(data.error || "Failed to finalize booking.");
            }
        } catch (e) {
            setError("Gateway Network Error");
        } finally {
            setIsLoading(false);
        }
    };

    const targetDate = new Date(date);

    return (
        <div className="min-h-screen bg-bg-light py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
            <div className="max-w-md w-full">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-serif text-dark mb-3">Secure Checkout</h2>
                    <p className="text-dark/60 font-sans text-sm flex items-center justify-center gap-2 uppercase tracking-widest"><FiLock /> Mock Gateway</p>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-xl border border-dark/5">
                    {/* Summary */}
                    <div className="bg-primary-dark/5 border border-primary-dark/10 p-5 rounded-2xl mb-6">
                        <p className="text-dark/60 text-xs font-bold uppercase tracking-widest mb-1">Service Details</p>
                        <h3 className="font-serif text-xl text-dark mb-4">{service}</h3>
                        
                        <div className="flex justify-between items-center text-sm font-sans text-dark/80 pt-4 border-t border-dark/10">
                            <div>
                                <span className="block opacity-60">Date</span>
                                <strong>{targetDate.toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' })}</strong>
                            </div>
                            <div className="text-right">
                                <span className="block opacity-60">Time</span>
                                <strong>{start} to {end}</strong>
                            </div>
                        </div>
                    </div>

                    {/* Voucher Section */}
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
                                    className="flex-1 border border-black/10 rounded-lg p-2.5 text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-brand/50"
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

                    <button 
                        onClick={processMockCheckout} 
                        disabled={isLoading || !clientData}
                        className={`w-full py-4 rounded-xl shadow-lg text-sm font-bold font-sans tracking-wider uppercase flex items-center justify-center gap-2 transition-all 
                            ${isLoading || !clientData ? "bg-dark/10 text-dark/30 cursor-not-allowed" : "bg-dark text-white hover:bg-primary-dark"}`}>
                        {isLoading ? <><FiLoader className="animate-spin" /> Processing...</> : <><FiCheckCircle /> Confirm Mock Payment</>}
                    </button>
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
