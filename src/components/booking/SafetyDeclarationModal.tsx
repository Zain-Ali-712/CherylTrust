"use client";

import { useState } from "react";
import { FiX, FiCheck } from "react-icons/fi";

interface SafetyDeclarationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function SafetyDeclarationModal({ isOpen, onClose, onConfirm }: SafetyDeclarationModalProps) {
    const [personName, setPersonName] = useState("");
    const [phone, setPhone] = useState("");
    const [dog1, setDog1] = useState("");
    const [dog2, setDog2] = useState("");
    const [dog3, setDog3] = useState("");
    const [agreedTerms, setAgreedTerms] = useState(false);
    const [agreedHealth, setAgreedHealth] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (agreedTerms && agreedHealth && personName && phone) {
            onConfirm();
        } else {
            alert("Please fill in mandatory fields and agree to the terms.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[10000]">
            <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative p-8 lg:p-12 animate-in fade-in zoom-in duration-300">
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 text-dark/40 hover:text-dark transition-colors"
                >
                    <FiX size={24} />
                </button>

                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-5 h-px bg-primary-dark" />
                        <span className="text-[0.7rem] font-bold tracking-[0.22em] uppercase font-sans text-primary-dark/60">Adventure Park Form</span>
                    </div>
                    <h2 className="font-serif text-3xl text-dark mb-4 leading-tight">Safety & <span className="text-primary-dark italic">Health Declaration.</span></h2>
                    <p className="text-dark/50 font-sans text-sm italic border-b border-primary-dark/10 pb-4">
                        Please complete this declaration before finalizing your booking.
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-dark/40 ml-1">Person Name</label>
                            <input 
                                required
                                type="text" 
                                value={personName}
                                onChange={(e) => setPersonName(e.target.value)}
                                className="w-full px-4 py-3 bg-bg-light/50 border border-dark/5 rounded-xl text-sm focus:outline-none focus:border-primary-dark transition-colors" 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-dark/40 ml-1">Contact Phone</label>
                            <input 
                                required
                                type="tel" 
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-4 py-3 bg-bg-light/50 border border-dark/5 rounded-xl text-sm focus:outline-none focus:border-primary-dark transition-colors" 
                            />
                        </div>
                    </div>

                    <div className="space-y-4 pt-4">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-dark/40 ml-1">Registered Dogs</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <input 
                                type="text" 
                                placeholder="Dog Name 1" 
                                value={dog1}
                                onChange={(e) => setDog1(e.target.value)}
                                className="w-full px-4 py-3 bg-bg-light/50 border border-dark/5 rounded-xl text-sm focus:outline-none focus:border-primary-dark transition-colors" 
                            />
                            <input 
                                type="text" 
                                placeholder="Dog Name 2" 
                                value={dog2}
                                onChange={(e) => setDog2(e.target.value)}
                                className="w-full px-4 py-3 bg-bg-light/50 border border-dark/5 rounded-xl text-sm focus:outline-none focus:border-primary-dark transition-colors" 
                            />
                            <input 
                                type="text" 
                                placeholder="Dog Name 3" 
                                value={dog3}
                                onChange={(e) => setDog3(e.target.value)}
                                className="w-full px-4 py-3 bg-bg-light/50 border border-dark/5 rounded-xl text-sm focus:outline-none focus:border-primary-dark transition-colors" 
                            />
                        </div>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-primary-dark/10">
                        <label className="flex items-start gap-3 cursor-pointer group">
                            <input 
                                type="checkbox" 
                                required
                                checked={agreedTerms}
                                onChange={(e) => setAgreedTerms(e.target.checked)}
                                className="mt-1 w-4 h-4 rounded border-dark/20 text-primary-dark focus:ring-primary-dark accent-primary-dark" 
                            />
                            <span className="text-[0.8rem] text-dark/70 font-sans leading-relaxed group-hover:text-dark transition-colors">
                                I agree with Canine Adventure Park <span className="underline">Terms and Conditions</span>
                            </span>
                        </label>
                        <label className="flex items-start gap-3 cursor-pointer group">
                            <input 
                                type="checkbox" 
                                required
                                checked={agreedHealth}
                                onChange={(e) => setAgreedHealth(e.target.checked)}
                                className="mt-1 w-4 h-4 rounded border-dark/20 text-primary-dark focus:ring-primary-dark accent-primary-dark" 
                            />
                            <span className="text-[0.8rem] text-dark/70 font-sans leading-relaxed group-hover:text-dark transition-colors">
                                My dog/s are healthy and up to date with veterinary prescribed vaccinations (including Kennel Cough) at the time of visiting.
                            </span>
                        </label>
                    </div>

                    <button 
                        type="submit" 
                        className="w-full py-4 bg-primary-dark text-white rounded-xl font-bold tracking-[0.2em] uppercase text-[10px] hover:bg-dark transition-all shadow-lg mt-4"
                    >
                        Confirm & Continue to Payment
                    </button>
                </form>
            </div>
        </div>
    );
}
