"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FiCalendar, FiClock, FiArrowLeft, FiLoader } from "react-icons/fi";

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
    const service = searchParams.get("service") || "Canine Adventure Park session Trust Client";
    
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [availableSlots, setAvailableSlots] = useState<{startTime: string, endTime: string}[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const dates = getAvailableDates();

    useEffect(() => {
        if (selectedDate) {
            fetchAvailability(selectedDate);
        }
    }, [selectedDate]);

    const fetchAvailability = async (date: Date) => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/availability?date=${date.toISOString()}`);
            if (res.ok) {
                const data = await res.json();
                setAvailableSlots(data.availableSlots || []);
            } else {
                setAvailableSlots([]);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSlotSelection = (slot: {startTime: string, endTime: string}) => {
        const queryParams = new URLSearchParams({
            service,
            date: selectedDate!.toISOString(),
            start: slot.startTime,
            end: slot.endTime
        });
        
        // redirect to checkout route (middleware handles auth intercept)
        router.push(`/checkout?${queryParams.toString()}`);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <Link href="/adventure-park" className="inline-flex items-center gap-2 text-dark/60 hover:text-dark hover:underline mb-8 font-sans transition">
                <FiArrowLeft /> Back to Park Info
            </Link>
            
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-serif text-dark mb-3">Select a Session Time</h2>
                <p className="text-dark/70 font-sans">Booking: <strong className="text-accent">{service}</strong></p>
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

                    {!selectedDate ? (
                        <div className="flex-grow min-h-[200px] flex items-center justify-center text-dark/40 font-sans text-sm text-center border-2 border-dashed border-dark/5 rounded-2xl">
                            Please select a date first<br />to see available times.
                        </div>
                    ) : isLoading ? (
                        <div className="flex-grow min-h-[200px] flex flex-col items-center justify-center text-dark/40 font-sans text-sm gap-4 border-2 border-dashed border-dark/5 rounded-2xl">
                            <FiLoader className="animate-spin text-accent" size={24} />
                            Calculating Availability...
                        </div>
                    ) : availableSlots.length === 0 ? (
                        <div className="flex-grow min-h-[200px] flex items-center justify-center text-red-500/70 font-sans text-sm text-center border-2 border-dashed border-red-500/10 bg-red-500/5 rounded-2xl">
                            No available slots for this day.<br />Please choose another date.
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-3 pb-2 h-fit max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                            {availableSlots.map((slot, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSlotSelection(slot)}
                                    className="py-4 border border-dark/10 rounded-xl flex items-center justify-center gap-2 text-dark/80 font-bold hover:bg-accent hover:border-accent hover:text-dark transition-all shadow-sm group"
                                >
                                    <FiClock className="text-dark/40 group-hover:text-dark/60 transition-colors" />
                                    {slot.startTime}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function BookingPage() {
    return (
        <div className="min-h-screen bg-bg-light py-12 px-4 sm:px-6 lg:px-8">
            <Suspense fallback={<div className="text-center py-20 text-dark/40"><FiLoader className="animate-spin inline mr-2"/>Loading Module...</div>}>
                <BookingContent />
            </Suspense>
        </div>
    );
}
