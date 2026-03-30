"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FiAlertCircle, FiPlus, FiX } from "react-icons/fi";

const reasonsOptions = [
    "More fun training",
    "My dog is anxious",
    "Let my dog go exploring",
    "My dog is dog reactive",
    "I am anxious",
    "I want to walk with no other dogs around",
    "I want to let my dog run free",
];

function RegisterForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get("redirect") || "/client/dashboard";

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        secondaryName: "",
        email: "",
        phone: "",
        password: "",
        address: "",
        trustTechniqueCompleted: false,
        dogs: [{ name: "", age: "", neutered: false, vaxUpToDate: false }],
        reasonsForPark: [] as string[],
        agreements: {
            terms: false,
            cancellation: false,
            marketing: false
        }
    });

    const handleAddDog = () => {
        if (formData.dogs.length < 3) {
            setFormData(prev => ({ ...prev, dogs: [...prev.dogs, { name: "", age: "", neutered: false, vaxUpToDate: false }] }));
        }
    };

    const handleRemoveDog = (idx: number) => {
        setFormData(prev => ({ ...prev, dogs: prev.dogs.filter((_, i) => i !== idx) }));
    };

    const updateDog = (idx: number, field: string, value: any) => {
        const newDogs = [...formData.dogs];
        newDogs[idx] = { ...newDogs[idx], [field]: value };
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

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/client/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                router.push(redirectUrl);
                router.refresh();
            } else {
                const data = await res.json();
                setError(data.error || "Registration failed");
            }
        } catch (err) {
            setError("Network Error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-bg-light py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <Link href="/" className="block text-center text-3xl font-serif text-dark font-bold hover:opacity-80 transition mb-2">
                    Canine Adventure Park
                </Link>
                <h2 className="text-center text-xl font-bold font-sans text-dark/80 uppercase tracking-widest mb-8">
                    Create Client Account
                </h2>

                <div className="bg-white py-8 px-6 shadow-xl sm:rounded-3xl sm:px-10 border border-dark/5">
                    {error && (
                        <div className="mb-6 bg-red-50 p-4 rounded-xl flex items-center gap-2 text-sm text-red-600 font-medium border border-red-100">
                            <FiAlertCircle size={18} />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="space-y-8">
                        {/* 1. Account Details */}
                        <div>
                            <h3 className="text-lg font-serif font-bold text-dark border-b border-dark/10 pb-2 mb-4">Account Details</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input required type="text" placeholder="First Name *" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} className="w-full p-3 bg-bg-light/50 border border-dark/10 rounded-xl outline-none focus:border-accent text-sm" />
                                <input required type="text" placeholder="Last Name *" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} className="w-full p-3 bg-bg-light/50 border border-dark/10 rounded-xl outline-none focus:border-accent text-sm" />
                                <input type="text" placeholder="Second Person Name (Optional)" value={formData.secondaryName} onChange={e => setFormData({ ...formData, secondaryName: e.target.value })} className="w-full sm:col-span-2 p-3 bg-bg-light/50 border border-dark/10 rounded-xl outline-none focus:border-accent text-sm" />
                                <input required type="email" placeholder="Email Address *" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full p-3 bg-bg-light/50 border border-dark/10 rounded-xl outline-none focus:border-accent text-sm" />
                                <input required type="tel" placeholder="Phone Number (+64...) *" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full p-3 bg-bg-light/50 border border-dark/10 rounded-xl outline-none focus:border-accent text-sm" />
                                <input required type="password" placeholder="Create Password *" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} className="w-full p-3 bg-bg-light/50 border border-dark/10 rounded-xl outline-none focus:border-accent text-sm" />
                                <input required type="text" placeholder="Full Postal Address *" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} className="w-full sm:col-span-2 p-3 bg-bg-light/50 border border-dark/10 rounded-xl outline-none focus:border-accent text-sm" />
                            </div>

                            <label className="flex items-center gap-3 mt-4 cursor-pointer">
                                <input type="checkbox" checked={formData.trustTechniqueCompleted} onChange={e => setFormData({ ...formData, trustTechniqueCompleted: e.target.checked })} className="w-4 h-4 accent-accent" />
                                <span className="text-sm font-medium text-dark/80">I have completed the Trust Technique Foundation Program</span>
                            </label>
                        </div>

                        {/* 2. Dog Details */}
                        <div>
                            <div className="flex justify-between items-center border-b border-dark/10 pb-2 mb-4">
                                <h3 className="text-lg font-serif font-bold text-dark">Dog Details</h3>
                                {formData.dogs.length < 3 && (
                                    <button type="button" onClick={handleAddDog} className="text-sm font-bold text-accent flex items-center gap-1 hover:brightness-110">
                                        <FiPlus /> Add Dog
                                    </button>
                                )}
                            </div>

                            <div className="space-y-4">
                                {formData.dogs.map((dog, idx) => (
                                    <div key={idx} className="bg-bg-light/50 p-4 rounded-xl border border-dark/5 relative">
                                        {idx > 0 && (
                                            <button type="button" onClick={() => handleRemoveDog(idx)} className="absolute top-4 right-4 text-dark/30 hover:text-red-500">
                                                <FiX size={18} />
                                            </button>
                                        )}
                                        <h4 className="text-xs font-bold text-dark/50 uppercase tracking-widest mb-3">Dog {idx + 1}</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <input required type="text" placeholder="Dog Name *" value={dog.name} onChange={e => updateDog(idx, "name", e.target.value)} className="w-full p-2.5 bg-white border border-dark/10 rounded-lg outline-none text-sm" />
                                            <input required type="text" placeholder="Age *" value={dog.age} onChange={e => updateDog(idx, "age", e.target.value)} className="w-full p-2.5 bg-white border border-dark/10 rounded-lg outline-none text-sm" />
                                            <label className="flex items-center gap-2 p-2.5 bg-white border border-dark/10 rounded-lg text-sm cursor-pointer">
                                                <input type="checkbox" checked={dog.neutered} onChange={e => updateDog(idx, "neutered", e.target.checked)} className="accent-accent" /> Neutered/Spayed?
                                            </label>
                                            <label className="flex items-center gap-2 p-2.5 bg-white border border-dark/10 rounded-lg text-sm cursor-pointer">
                                                <input type="checkbox" checked={dog.vaxUpToDate} onChange={e => updateDog(idx, "vaxUpToDate", e.target.checked)} className="accent-accent" /> Vaccinations Up to Date?
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 3. Reasons */}
                        <div>
                            <h3 className="text-lg font-serif font-bold text-dark border-b border-dark/10 pb-2 mb-4">Reasons for using the park</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {reasonsOptions.map((r, i) => (
                                    <label key={i} className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${formData.reasonsForPark.includes(r) ? 'border-accent bg-accent/5' : 'border-dark/10 hover:border-accent/30'}`}>
                                        <input type="checkbox" checked={formData.reasonsForPark.includes(r)} onChange={() => toggleReason(r)} className="mt-1 accent-accent" />
                                        <span className="text-sm font-sans text-dark/80">{r}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* 4. Agreements */}
                        <div>
                            <h3 className="text-lg font-serif font-bold text-dark border-b border-dark/10 pb-2 mb-4">Agreements</h3>
                            <div className="space-y-3">
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <input required type="checkbox" checked={formData.agreements.terms} onChange={e => setFormData({ ...formData, agreements: { ...formData.agreements, terms: e.target.checked } })} className="mt-1 accent-accent" />
                                    <span className="text-sm font-sans text-dark/70 group-hover:text-dark">I agree to the Terms & Conditions of Canine Adventure Park. *</span>
                                </label>
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <input required type="checkbox" checked={formData.agreements.cancellation} onChange={e => setFormData({ ...formData, agreements: { ...formData.agreements, cancellation: e.target.checked } })} className="mt-1 accent-accent" />
                                    <span className="text-sm font-sans text-dark/70 group-hover:text-dark">I agree with the Cancellation Policy. *</span>
                                </label>
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <input type="checkbox" checked={formData.agreements.marketing} onChange={e => setFormData({ ...formData, agreements: { ...formData.agreements, marketing: e.target.checked } })} className="mt-1 accent-accent" />
                                    <span className="text-sm font-sans text-dark/70 group-hover:text-dark">I wish to receive discounts and promo codes via email.</span>
                                </label>
                            </div>
                        </div>

                        <div className="pt-4 flex flex-col items-center">
                            <button type="submit" disabled={isLoading}
                                className={`w-full py-4 px-4 rounded-xl shadow-lg text-sm font-bold font-sans tracking-wider uppercase text-dark bg-accent hover:brightness-110 focus:outline-none transition ${isLoading ? "opacity-70 cursor-wait" : ""}`}>
                                {isLoading ? "Creating Account..." : "Complete Registration"}
                            </button>
                            <span className="mt-4 text-sm text-dark/60">
                                Already have an account? <Link href={`/auth/login?redirect=${encodeURIComponent(redirectUrl)}`} className="text-brand font-bold hover:underline">Log in</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default function RegisterPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-bg-light flex items-center justify-center text-dark/40">Loading...</div>}>
            <RegisterForm />
        </Suspense>
    );
}
