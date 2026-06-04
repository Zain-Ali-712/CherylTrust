"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FiMail, FiLock, FiAlertCircle } from "react-icons/fi";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get("redirect") || "/client/dashboard";

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/client/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (res.ok) {
                router.push(redirectUrl);
                router.refresh();
            } else {
                const data = await res.json();
                setError(data.error || "Failed to login");
            }
        } catch (err) {
            setError("Network error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white py-8 px-4 shadow sm:rounded-3xl sm:px-10 border border-dark/5">
            {error && (
                <div className="mb-4 bg-red-50 p-3 rounded-lg flex items-center gap-2 text-sm text-red-600">
                    <FiAlertCircle />
                    {error}
                </div>
            )}
            <form className="space-y-6" onSubmit={handleLogin}>
                <div>
                    <label className="block text-sm font-medium text-dark/70">Email address</label>
                    <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-dark/40">
                            <FiMail />
                        </div>
                        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                            className="appearance-none block w-full pl-10 px-3 py-3 border border-dark/10 rounded-xl shadow-sm placeholder-dark/30 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm bg-bg-light/50"
                            placeholder="you@example.com" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-dark/70">Password</label>
                    <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-dark/40">
                            <FiLock />
                        </div>
                        <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                            className="appearance-none block w-full pl-10 px-3 py-3 border border-dark/10 rounded-xl shadow-sm placeholder-dark/30 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm bg-bg-light/50"
                            placeholder="••••••••" />
                    </div>
                </div>

                <div>
                    <button type="submit" disabled={isLoading}
                        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold font-sans tracking-wider uppercase text-dark bg-accent hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition ${isLoading ? "opacity-70 cursor-wait" : ""}`}>
                        {isLoading ? "Authenticating..." : "Sign in"}
                    </button>
                </div>
            </form>

            <div className="mt-6 text-center text-sm">
                <span className="text-dark/60">New to the park? </span>
                <Link href={`/auth/register?redirect=${encodeURIComponent(redirectUrl)}`} className="font-semibold text-brand hover:underline">
                    Create an account
                </Link>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-bg-light flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link href="/" className="block text-center text-3xl font-serif text-dark font-bold hover:opacity-80 transition">
                    Canine Adventure Park
                </Link>
                <h2 className="mt-6 text-center text-xl font-bold font-sans text-dark/80 uppercase tracking-widest">
                    Client Access
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <Suspense fallback={<div className="bg-white py-8 px-10 shadow sm:rounded-3xl border border-dark/5 text-center text-dark/40">Loading...</div>}>
                    <LoginForm />
                </Suspense>
            </div>
        </div>
    );
}
