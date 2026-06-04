"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FiCalendar, FiClock, FiArrowLeft, FiLoader, FiActivity, FiShoppingBag, FiCheckCircle } from "react-icons/fi";
import SafetyDeclarationModal from "@/components/booking/SafetyDeclarationModal";

const getAvailableDates = () => {
    const dates = [];
    let curr = new Date();
    curr.setHours(0, 0, 0, 0);

    while (dates.length < 14) {
        dates.push(new Date(curr));
        curr.setDate(curr.getDate() + 1);
    }
    return dates;
};

function BookingContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pkgId = searchParams.get("pkgId") || "";
    const [bookingPackage, setBookingPackage] = useState<any>(null);

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [availableSlots, setAvailableSlots] = useState<{ startTime: string, endTime: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMembership, setHasMembership] = useState<any | null>(null);
    const [isCheckingMembership, setIsCheckingMembership] = useState(true);
    const [blockReason, setBlockReason] = useState<string | null>(null);
    const [isDeclarationOpen, setIsDeclarationOpen] = useState(false);
    const [selectedSlots, setSelectedSlots] = useState<{ startTime: string, endTime: string }[]>([]);

    const dates = getAvailableDates();

    useEffect(() => {
        if (!pkgId) {
            setBlockReason("Invalid package. Return to adventure park.");
            setIsCheckingMembership(false);
            return;
        }

        const fetchPkgAndMembership = async () => {
            try {
                const pkgRes = await fetch("/api/booking-packages");
                if (pkgRes.ok) {
                    const pkgs = await pkgRes.json();
                    const found = pkgs.find((p: any) => p._id === pkgId);
                    if (found) setBookingPackage(found);
                }
                await checkMembership();
            } catch (e) {
                console.error(e);
            }
        };

        fetchPkgAndMembership();
    }, [pkgId]);

    const checkMembership = async () => {
        try {
            const meRes = await fetch("/api/auth/client/me");
            if (!meRes.ok) {
                router.push("/auth/login");
                return;
            }
            const me = await meRes.json();

            const mbRes = await fetch(`/api/memberships?clientId=${me.id}`);
            if (mbRes.ok) {
                const memberships = await mbRes.json();
                const active = memberships.find((m: any) => m.status === "active" && new Date(m.endDate) > new Date());
                setHasMembership(active || null); // Pass the active membership object instead of true
            } else {
                setHasMembership(false);
            }
        } catch (e) {
            console.error(e);
            setHasMembership(false);
        } finally {
            setIsCheckingMembership(false);
        }
    };

    useEffect(() => {
        setSelectedSlots([]);
        if (selectedDate && hasMembership) {
            fetchAvailability(selectedDate);
        }
    }, [selectedDate, hasMembership]);

    const fetchAvailability = async (date: Date) => {
        setIsLoading(true);
        setBlockReason(null);
        try {
            const res = await fetch(`/api/availability?date=${date.toISOString()}`);
            if (res.ok) {
                const data = await res.json();
                if (data.isBlocked) {
                    setBlockReason(data.reason);
                    setAvailableSlots([]);
                } else {
                    setAvailableSlots(data.availableSlots || []);
                }
            } else {
                setAvailableSlots([]);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const areConsecutive = (s1: { startTime: string, endTime: string }, s2: { startTime: string, endTime: string }) => {
        const parseToMins = (t: string) => {
            const [h, m] = t.split(":").map(Number);
            return h * 60 + m;
        };
        const end1 = parseToMins(s1.endTime);
        const start1 = parseToMins(s1.startTime);
        const end2 = parseToMins(s2.endTime);
        const start2 = parseToMins(s2.startTime);

        const gap1 = start2 - end1;
        const gap2 = start1 - end2;
        return (gap1 >= 0 && gap1 <= 30) || (gap2 >= 0 && gap2 <= 30);
    };

    const handleSlotSelection = (slot: { startTime: string, endTime: string }) => {
        if (!hasMembership) return;
        
        const index = selectedSlots.findIndex(s => s.startTime === slot.startTime);
        if (index !== -1) {
            // Deselect
            setSelectedSlots(selectedSlots.filter((_, idx) => idx !== index));
        } else {
            if (selectedSlots.length === 0) {
                setSelectedSlots([slot]);
            } else if (selectedSlots.length === 1) {
                if (areConsecutive(selectedSlots[0], slot)) {
                    setSelectedSlots([...selectedSlots, slot]);
                } else {
                    setSelectedSlots([slot]);
                }
            } else {
                // Already 2 selected, reset to only this one
                setSelectedSlots([slot]);
            }
        }
    };

    const handleDeclarationConfirm = () => {
        if (selectedSlots.length === 0 || !selectedDate || !bookingPackage) return;

        // Sort selectedSlots by start time to make sure they are in order
        const sorted = [...selectedSlots].sort((a, b) => a.startTime.localeCompare(b.startTime));

        const queryParams = new URLSearchParams({
            pkgId: pkgId,
            date: selectedDate.toISOString(),
            slots: JSON.stringify(sorted)
        });

        // redirect to checkout route (middleware handles auth intercept)
        router.push(`/checkout?${queryParams.toString()}`);
    };

    // Verify if membership is allowed for this booking package
    const canBook = () => {
        if (!hasMembership || typeof hasMembership === 'boolean') return false; // Not an object
        if (!bookingPackage) return false;

        const bookingTarget = bookingPackage.clientType;
        console.log(bookingTarget);
        if (bookingTarget === 'all') return true;

        const membershipTarget = (hasMembership as any).type || (hasMembership as any).packageId?.availableFor;
        console.log(membershipTarget);
        if (membershipTarget === 'all') return true;


        return bookingTarget === membershipTarget;
    };

    const isAllowedToBook = hasMembership !== null && hasMembership !== false && canBook();

    if (isCheckingMembership) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-dark/40 font-sans">
                <FiLoader className="animate-spin text-accent mb-4" size={32} />
                <p>Verifying Membership Status...</p>
            </div>
        );
    }

    if (!hasMembership) {
        return (
            <div className="max-w-2xl mx-auto mt-10">
                <div className="bg-white p-10 rounded-[2.5rem] border border-dark/10 shadow-2xl text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
                    <div className="relative z-10">
                        <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FiShoppingBag className="text-accent" size={40} />
                        </div>
                        <h2 className="text-3xl font-serif text-dark mb-4">Membership Required</h2>
                        <p className="text-dark/60 font-sans leading-relaxed mb-8">
                            To maintain the privacy and quality of our Adventure Park, bookings are exclusive to our members.
                            Please purchase a <strong>Trust Client</strong> or <strong>Non-Trust</strong> membership to proceed.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/adventure-park#membership-plans" className="px-8 py-4 bg-dark text-white rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-accent hover:text-dark transition shadow-lg">
                                Buy Membership
                            </Link>
                            <Link href="/auth/login" className="px-8 py-4 border border-dark/20 text-dark rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-dark/5 transition">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!isAllowedToBook && hasMembership !== null && hasMembership !== false && bookingPackage) {
        return (
            <div className="max-w-2xl mx-auto mt-10">
                <div className="bg-white p-10 rounded-[2.5rem] border border-dark/10 shadow-2xl text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
                    <div className="relative z-10">
                        <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FiActivity className="text-orange-600" size={40} />
                        </div>
                        <h2 className="text-3xl font-serif text-dark mb-4">Membership Upgrade Required</h2>
                        <p className="text-dark/60 font-sans leading-relaxed mb-8">
                            Your current membership does not allow you to book <strong>{bookingPackage.name}</strong> sessions.
                            This session is intended for <strong>{bookingPackage.clientType}</strong>.
                        </p>
                        <div className="flex justify-center">
                            <Link href="/adventure-park" className="px-8 py-4 border border-dark/20 text-dark rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-dark/5 transition">
                                View Packages
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <Link href="/adventure-park" className="inline-flex items-center gap-2 text-dark/60 hover:text-dark hover:underline mb-8 font-sans transition">
                <FiArrowLeft /> Back to Park Info
            </Link>

            <div className="mb-10 text-center">
                <h2 className="text-3xl font-serif text-dark mb-3">Select a Session Time</h2>
                <p className="text-dark/70 font-sans">Booking: <strong className="text-accent">{bookingPackage?.name || "Loading..."}</strong></p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-3xl border border-dark/5 shadow-xl">
                    <div className="flex items-center gap-2 mb-6 text-dark font-sans font-semibold">
                        <FiCalendar className="text-accent" size={20} />
                        <span>Select Day (Next 14 Days)</span>
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                        {dates.map((date, i) => {
                            const isSelected = selectedDate?.toDateString() === date.toDateString();
                            return (
                                <button
                                    key={i}
                                    onClick={() => setSelectedDate(date)}
                                    className={`aspect-square flex flex-col items-center justify-center rounded-xl text-sm transition-all border
                                        ${isSelected ? 'bg-accent border-accent text-dark font-bold shadow-md' : 'bg-bg-light/50 border-transparent hover:border-dark/10 text-dark/80'}`}
                                >
                                    <span className="text-[10px] uppercase font-bold tracking-widest opacity-60 mb-1">{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                                    <span className="text-xl leading-none">{date.getDate()}</span>
                                    <span className="text-[10px] opacity-60 mt-1">{date.toLocaleDateString('en-US', { month: 'short' })}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-dark/5 shadow-xl flex flex-col items-stretch">
                    <div className="flex items-center gap-2 mb-6 text-dark font-sans font-semibold shrink-0">
                        <FiClock className="text-accent" size={20} />
                        <span>Available Time Slots</span>
                    </div>

                    {/* Session Timing Info */}
                    <div className="mb-6 p-4 bg-primary-dark/5 border border-primary-dark/10 rounded-2xl">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-dark/40 mb-3">Hourly Session Breakdown</h4>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-xs font-sans">
                                <span className="text-dark/60">Arrival & Entry</span>
                                <span className="font-bold text-dark/80">5 Mins</span>
                            </div>
                            <div className="flex items-center justify-between text-xs font-sans">
                                <span className="text-accent font-bold">Adventure Time</span>
                                <span className="font-bold text-accent">40 Mins</span>
                            </div>
                            <div className="flex items-center justify-between text-xs font-sans">
                                <span className="text-dark/60">Exit & Departure</span>
                                <span className="font-bold text-dark/80">5 Mins</span>
                            </div>
                        </div>
                    </div>

                    {!selectedDate ? (
                        <div className="flex-grow min-h-[200px] flex items-center justify-center text-dark/40 font-sans text-sm text-center border-2 border-dashed border-dark/5 rounded-2xl">
                            Please select a date first<br />to see available times.
                        </div>
                    ) : isLoading ? (
                        <div className="flex-grow min-h-[200px] flex flex-col items-center justify-center text-dark/40 font-sans text-sm gap-4 border-2 border-dashed border-dark/5 rounded-2xl">
                            <FiLoader className="animate-spin text-accent" size={24} />
                            Calculating Availability...
                        </div>
                    ) : blockReason ? (
                        <div className="flex-grow min-h-[200px] flex flex-col items-center justify-center text-orange-600 font-sans text-sm text-center border-2 border-dashed border-orange-200 bg-orange-50 rounded-2xl p-6">
                            <FiActivity className="mb-3 opacity-50" size={32} />
                            <p className="font-bold mb-1">Park Closure Notice</p>
                            <p>{blockReason}</p>
                        </div>
                    ) : availableSlots.length === 0 ? (
                        <div className="flex-grow min-h-[200px] flex items-center justify-center text-red-500/70 font-sans text-sm text-center border-2 border-dashed border-red-500/10 bg-red-500/5 rounded-2xl">
                            No available slots for this day.<br />Please choose another date.
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <div className="grid grid-cols-1 gap-3 pb-2 h-fit max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                                {availableSlots.map((slot, i) => {
                                    const isSelected = selectedSlots.some(s => s.startTime === slot.startTime);
                                    return (
                                        <button
                                            key={i}
                                            onClick={() => handleSlotSelection(slot)}
                                            className={`py-4 border rounded-xl flex items-center justify-between px-6 font-bold transition-all shadow-sm group
                                                ${isSelected 
                                                    ? 'bg-accent border-accent text-dark shadow-md' 
                                                    : 'border-dark/10 text-dark/80 hover:bg-accent hover:border-accent hover:text-dark'}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <FiClock className={`transition-colors ${isSelected ? 'text-dark/60' : 'text-dark/40 group-hover:text-dark/60'}`} />
                                                <span>{slot.startTime}</span>
                                            </div>
                                            <span className={`text-[10px] uppercase tracking-widest text-right transition-opacity ${isSelected ? 'opacity-60' : 'opacity-40 group-hover:opacity-60'}`}>1 Hour Block</span>
                                        </button>
                                    );
                                })}
                            </div>
                            {selectedSlots.length > 0 && (
                                <button
                                    onClick={() => setIsDeclarationOpen(true)}
                                    className="w-full py-4 bg-dark text-white rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-accent hover:text-dark transition shadow-lg flex items-center justify-center gap-2"
                                >
                                    <FiCheckCircle /> Book {selectedSlots.length} Session{selectedSlots.length > 1 ? 's' : ''}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <SafetyDeclarationModal
                isOpen={isDeclarationOpen}
                onClose={() => setIsDeclarationOpen(false)}
                onConfirm={handleDeclarationConfirm}
            />
        </div>
    );
}

export default function BookingPage() {
    return (
        <div className="min-h-screen bg-bg-light py-12 px-4 sm:px-6 lg:px-8">
            <Suspense fallback={<div className="text-center py-20 text-dark/40"><FiLoader className="animate-spin inline mr-2" />Loading Module...</div>}>
                <BookingContent />
            </Suspense>
        </div>
    );
}
