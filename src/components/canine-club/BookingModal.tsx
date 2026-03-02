"use client";

import { useState } from "react";
import { FiX, FiCheck, FiChevronLeft, FiChevronRight, FiCalendar, FiClock } from "react-icons/fi";

type BookingModalProps = {
    isOpen: boolean;
    onClose: () => void;
    planName: string;
};

type DogInfo = {
    name: string;
    age: string;
    neutered: string;
    vaxUpToDate: string;
};

const reasonsOptions = [
    "More fun training",
    "My dog is anxious",
    "Let my dog go exploring",
    "My dog is dog reactive",
    "I am anxious",
    "I want to walk with no other dogs around",
    "I want to let my dog run free",
    "Other reasons"
];

export default function BookingModal({ isOpen, onClose, planName }: BookingModalProps) {
    const [step, setStep] = useState<1 | 2 | 3>(1);

    // Step 1: Calendar State
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    // Step 2: Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        address: "",
        trustTechniqueCompleted: "",
        dogs: [{ name: "", age: "", neutered: "", vaxUpToDate: "" }] as DogInfo[],
        reasonsForPark: [] as string[],
        agreedToTerms: false,
        agreedToCancellation: false,
        wantsDiscounts: false,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    // --- Helper for Calendar ---
    // Generate next 14 days (Mon-Fri only)
    const getAvailableDates = () => {
        const dates = [];
        let curr = new Date();
        curr.setHours(0, 0, 0, 0);

        while (dates.length < 10) { // get 10 valid weekdays
            const day = curr.getDay();
            if (day !== 0 && day !== 6) { // 0=Sun, 6=Sat
                dates.push(new Date(curr));
            }
            curr.setDate(curr.getDate() + 1);
        }
        return dates;
    };

    const availableDates = getAvailableDates();
    const timeSlots = ["10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"];

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        setSelectedTime(null);
    };

    const handleNextToForm = () => {
        if (selectedDate && selectedTime) {
            setStep(2);
        }
    };

    // --- Helpers for Form ---
    const handleAddDog = () => {
        if (formData.dogs.length < 3) {
            setFormData(prev => ({ ...prev, dogs: [...prev.dogs, { name: "", age: "", neutered: "", vaxUpToDate: "" }] }));
        }
    };

    const handleRemoveDog = (index: number) => {
        setFormData(prev => ({
            ...prev,
            dogs: prev.dogs.filter((_, i) => i !== index)
        }));
    };

    const updateDog = (index: number, field: keyof DogInfo, value: string) => {
        const newDogs = [...formData.dogs];
        newDogs[index] = { ...newDogs[index], [field]: value };
        setFormData(prev => ({ ...prev, dogs: newDogs }));
    };

    const toggleReason = (reason: string) => {
        setFormData(prev => ({
            ...prev,
            reasonsForPark: prev.reasonsForPark.includes(reason)
                ? prev.reasonsForPark.filter(r => r !== reason)
                : [...prev.reasonsForPark, reason]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setStep(3); // Success step
    };

    const resetAndClose = () => {
        setStep(1);
        setSelectedDate(null);
        setSelectedTime(null);
        setFormData({
            name: "", email: "", phone: "", password: "", address: "", trustTechniqueCompleted: "",
            dogs: [{ name: "", age: "", neutered: "", vaxUpToDate: "" }],
            reasonsForPark: [], agreedToTerms: false, agreedToCancellation: false, wantsDiscounts: false,
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-dark/80 backdrop-blur-sm">
            <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative shadow-2xl">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-dark/5 shrink-0">
                    <div>
                        <h2 className="font-serif text-2xl text-dark leading-tight">Booking: {planName}</h2>
                        {step === 1 && <p className="text-dark/60 font-sans text-sm mt-1">Select a Date & Time</p>}
                        {step === 2 && <p className="text-dark/60 font-sans text-sm mt-1">Sign In / Sign Up to Complete Booking</p>}
                    </div>
                    <button onClick={resetAndClose} className="p-2 hover:bg-dark/5 rounded-full transition-colors text-dark/50 hover:text-dark">
                        <FiX size={24} />
                    </button>
                </div>

                {/* Content Area - Scrollable */}
                <div className="overflow-y-auto p-6 flex-grow bg-bg-light custom-scrollbar">

                    {/* STEP 1: CALENDAR */}
                    {step === 1 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Date Selection */}
                            <div className="bg-white p-6 rounded-2xl border border-dark/5 shadow-sm">
                                <div className="flex items-center gap-2 mb-6 text-dark font-sans font-semibold">
                                    <FiCalendar className="text-accent" />
                                    <span>Select Day (Mon - Fri)</span>
                                </div>
                                <div className="grid grid-cols-5 gap-2">
                                    {["M", "T", "W", "T", "F"].map((day, i) => (
                                        <div key={i} className="text-center text-xs font-bold text-dark/40 mb-2">{day}</div>
                                    ))}
                                    {availableDates.map((date, i) => {
                                        const isSelected = selectedDate?.toDateString() === date.toDateString();
                                        // Simple alignment: assuming first date is the current day, we might need padding
                                        // For simplicity in this dummy, just list them sequentially
                                        return (
                                            <button
                                                key={i}
                                                onClick={() => handleDateSelect(date)}
                                                className={`aspect-square flex flex-col items-center justify-center rounded-xl text-sm transition-all
                                                    ${isSelected ? 'bg-accent text-dark font-bold shadow-md' : 'hover:bg-accent/10 text-dark/80'}`}
                                            >
                                                <span className="text-xs opacity-60">{date.toLocaleDateString('en-US', { month: 'short' })}</span>
                                                <span>{date.getDate()}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Time Selection */}
                            <div className="bg-white p-6 rounded-2xl border border-dark/5 shadow-sm">
                                <div className="flex items-center gap-2 mb-6 text-dark font-sans font-semibold">
                                    <FiClock className="text-accent" />
                                    <span>Select Time (1-Hour Slots)</span>
                                </div>

                                {!selectedDate ? (
                                    <div className="h-full min-h-[200px] flex items-center justify-center text-dark/40 font-sans text-sm text-center">
                                        Please select a date first<br />to see available times.
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-3">
                                        {timeSlots.map((time, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setSelectedTime(time)}
                                                className={`py-3 rounded-xl border text-sm font-sans transition-all
                                                    ${selectedTime === time
                                                        ? 'border-accent bg-accent/10 text-dark font-bold'
                                                        : 'border-dark/10 hover:border-accent/50 text-dark/70'}`}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}


                    {/* STEP 2: SIGN UP / SIGN IN FORM */}
                    {step === 2 && (
                        <form id="booking-form" onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto">

                            {/* Summary Banner */}
                            <div className="bg-accent/10 border border-accent/20 p-4 rounded-xl flex items-center justify-between text-sm font-sans">
                                <div>
                                    <span className="text-dark/60 block mb-1">Reserving:</span>
                                    <strong className="text-dark">{planName}</strong>
                                </div>
                                <div className="text-right">
                                    <span className="text-dark/60 block mb-1">When:</span>
                                    <strong className="text-dark">{selectedDate?.toLocaleDateString()} at {selectedTime}</strong>
                                </div>
                            </div>

                            {/* Section 1: User Details */}
                            <div className="bg-white p-6 rounded-2xl border border-dark/5 space-y-5">
                                <h3 className="font-serif text-xl border-b border-dark/5 pb-3">Your Details</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <input required type="text" placeholder="Full Name *" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full p-3 bg-bg-light border border-dark/10 rounded-xl outline-none focus:border-accent transition-colors font-sans text-sm" />
                                    <input required type="email" placeholder="Email Address *" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full p-3 bg-bg-light border border-dark/10 rounded-xl outline-none focus:border-accent transition-colors font-sans text-sm" />
                                    <input required type="tel" placeholder="Phone Number *" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full p-3 bg-bg-light border border-dark/10 rounded-xl outline-none focus:border-accent transition-colors font-sans text-sm" />
                                    <input required type="password" placeholder="Create a Password *" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} className="w-full p-3 bg-bg-light border border-dark/10 rounded-xl outline-none focus:border-accent transition-colors font-sans text-sm" />
                                    <input required type="text" placeholder="Full Address *" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} className="w-full sm:col-span-2 p-3 bg-bg-light border border-dark/10 rounded-xl outline-none focus:border-accent transition-colors font-sans text-sm" />
                                </div>
                                <div className="mt-4">
                                    <label className="block text-sm font-sans text-dark/70 mb-2">Have you completed the Trust Technique Foundation Program? *</label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                                            <input type="radio" required name="trustTech" value="Yes" checked={formData.trustTechniqueCompleted === "Yes"} onChange={e => setFormData({ ...formData, trustTechniqueCompleted: e.target.value })} className="accent-accent" /> Yes
                                        </label>
                                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                                            <input type="radio" required name="trustTech" value="No" checked={formData.trustTechniqueCompleted === "No"} onChange={e => setFormData({ ...formData, trustTechniqueCompleted: e.target.value })} className="accent-accent" /> No
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Dog Details */}
                            <div className="bg-white p-6 rounded-2xl border border-dark/5 space-y-6">
                                <div className="flex items-center justify-between border-b border-dark/5 pb-3">
                                    <h3 className="font-serif text-xl">Dog Details</h3>
                                    {formData.dogs.length < 3 && (
                                        <button type="button" onClick={handleAddDog} className="text-xs font-bold text-accent hover:text-dark uppercase tracking-wider">
                                            + Add Another Dog
                                        </button>
                                    )}
                                </div>

                                {formData.dogs.map((dog, idx) => (
                                    <div key={idx} className="p-4 bg-bg-light rounded-xl border border-dark/5 relative">
                                        {idx > 0 && (
                                            <button type="button" onClick={() => handleRemoveDog(idx)} className="absolute top-3 right-3 text-dark/30 hover:text-red-500">
                                                <FiX size={18} />
                                            </button>
                                        )}
                                        <h4 className="text-sm font-bold text-dark/70 uppercase tracking-widest mb-4">Dog {idx + 1}</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <input required type="text" placeholder="Dog's Name *" value={dog.name} onChange={e => updateDog(idx, 'name', e.target.value)} className="w-full p-2.5 bg-white border border-dark/10 rounded-lg outline-none focus:border-accent transition-colors font-sans text-sm" />
                                            <input required type="text" placeholder="Age *" value={dog.age} onChange={e => updateDog(idx, 'age', e.target.value)} className="w-full p-2.5 bg-white border border-dark/10 rounded-lg outline-none focus:border-accent transition-colors font-sans text-sm" />

                                            <div>
                                                <label className="block text-xs text-dark/60 mb-1">Neutered/Spayed? *</label>
                                                <select required value={dog.neutered} onChange={e => updateDog(idx, 'neutered', e.target.value)} className="w-full p-2.5 bg-white border border-dark/10 rounded-lg outline-none focus:border-accent transition-colors font-sans text-sm">
                                                    <option value="" disabled>Select...</option>
                                                    <option value="Yes">Yes</option>
                                                    <option value="No">No</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs text-dark/60 mb-1">Up to date with Vax? *</label>
                                                <select required value={dog.vaxUpToDate} onChange={e => updateDog(idx, 'vaxUpToDate', e.target.value)} className="w-full p-2.5 bg-white border border-dark/10 rounded-lg outline-none focus:border-accent transition-colors font-sans text-sm">
                                                    <option value="" disabled>Select...</option>
                                                    <option value="Yes">Yes</option>
                                                    <option value="No">No</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>


                            {/* Section 3: Reasons & Agreements */}
                            <div className="bg-white p-6 rounded-2xl border border-dark/5 space-y-6">
                                <div>
                                    <h3 className="font-serif text-lg mb-3">Reasons for using the park <span className="text-sm font-sans text-dark/50">(Tick as many as you'd like)</span></h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {reasonsOptions.map((reason, idx) => (
                                            <label key={idx} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${formData.reasonsForPark.includes(reason) ? 'border-accent bg-accent/5' : 'border-dark/10 hover:border-accent/30'}`}>
                                                <input type="checkbox" className="mt-1 accent-accent" checked={formData.reasonsForPark.includes(reason)} onChange={() => toggleReason(reason)} />
                                                <span className="text-sm font-sans text-dark/80">{reason}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-dark/5">
                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <input required type="checkbox" checked={formData.agreedToTerms} onChange={e => setFormData({ ...formData, agreedToTerms: e.target.checked })} className="mt-1 accent-accent" />
                                        <span className="text-sm font-sans text-dark/70 group-hover:text-dark">I agree to the Terms & Conditions of Canine Country Club. *</span>
                                    </label>
                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <input required type="checkbox" checked={formData.agreedToCancellation} onChange={e => setFormData({ ...formData, agreedToCancellation: e.target.checked })} className="mt-1 accent-accent" />
                                        <span className="text-sm font-sans text-dark/70 group-hover:text-dark">I agree with the Cancellation Policy. *</span>
                                    </label>
                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <input type="checkbox" checked={formData.wantsDiscounts} onChange={e => setFormData({ ...formData, wantsDiscounts: e.target.checked })} className="mt-1 accent-accent" />
                                        <span className="text-sm font-sans text-dark/70 group-hover:text-dark">I wish to receive discounts and promo codes via email.</span>
                                    </label>
                                </div>
                            </div>
                        </form>
                    )}


                    {/* STEP 3: SUCCESS */}
                    {step === 3 && (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-6">
                                <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-dark">
                                    <FiCheck size={32} />
                                </div>
                            </div>
                            <h3 className="font-serif text-3xl text-dark mb-4">Booking Request Received!</h3>
                            <p className="text-dark/70 font-sans max-w-md mx-auto mb-8 leading-relaxed">
                                Thank you, <strong>{formData.name}</strong>. We've received your request for the <strong>{planName}</strong> on <strong>{selectedDate?.toLocaleDateString()}</strong> at <strong>{selectedTime}</strong>. We will contact you soon with confirmation.
                            </p>
                            <button onClick={resetAndClose} className="px-8 py-3 bg-dark text-white rounded-xl font-sans font-bold tracking-[0.1em] text-sm uppercase hover:bg-primary-dark transition-colors">
                                Return to Page
                            </button>
                        </div>
                    )}

                </div>

                {/* Footer Actions */}
                {step < 3 && (
                    <div className="p-4 sm:p-6 border-t border-dark/5 bg-white flex justify-between shrink-0">
                        {step === 2 ? (
                            <button type="button" onClick={() => setStep(1)} className="px-6 py-3 font-sans font-bold text-sm tracking-wider uppercase text-dark/60 hover:text-dark transition-colors flex items-center gap-2">
                                <FiChevronLeft /> Back to Calendar
                            </button>
                        ) : (
                            <div /> // Spacer
                        )}

                        {step === 1 ? (
                            <button
                                onClick={handleNextToForm}
                                disabled={!selectedDate || !selectedTime}
                                className={`px-8 py-3 rounded-xl font-sans font-bold tracking-[0.1em] text-sm uppercase flex items-center gap-2 transition-all
                                    ${selectedDate && selectedTime
                                        ? 'bg-accent text-dark hover:brightness-110 shadow-lg shadow-accent/20'
                                        : 'bg-dark/5 text-dark/30 cursor-not-allowed'}`}
                            >
                                Next Step <FiChevronRight />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                form="booking-form"
                                disabled={isSubmitting}
                                className={`px-8 py-3 rounded-xl font-sans font-bold tracking-[0.1em] text-sm uppercase flex items-center gap-2 transition-all
                                    ${isSubmitting ? 'bg-dark/50 text-white cursor-wait' : 'bg-dark text-white hover:bg-primary-dark shadow-lg'}`}
                            >
                                {isSubmitting ? "Processing..." : "Confirm & Book"} <FiCheck />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
