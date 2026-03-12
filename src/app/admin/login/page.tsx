"use client";

import { useActionState } from "react";
import { login } from "@/actions/auth";

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(login, null);

    return (
        <div className="min-h-screen bg-bg-light flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-serif font-bold text-dark">
                    Admin Access
                </h2>
                <p className="mt-2 text-center text-sm text-dark/70 font-sans">
                    Log in to manage testimonials
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-dark/5">
                    <form action={formAction} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-dark/80 font-sans">
                                Username
                            </label>
                            <div className="mt-1">
                                <input
                                    name="username"
                                    type="text"
                                    required
                                    className="appearance-none block w-full px-3 py-3 border border-dark/20 rounded-lg shadow-sm placeholder-dark/40 focus:outline-none focus:ring-primary-dark focus:border-primary-dark sm:text-sm font-sans"
                                    placeholder="Enter username"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-dark/80 font-sans">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    className="appearance-none block w-full px-3 py-3 border border-dark/20 rounded-lg shadow-sm placeholder-dark/40 focus:outline-none focus:ring-primary-dark focus:border-primary-dark sm:text-sm font-sans"
                                    placeholder="Enter password"
                                />
                            </div>
                        </div>

                        {state?.error && (
                            <div className="text-red-500 text-sm font-medium font-sans bg-red-50 p-3 rounded-lg border border-red-100">
                                {state.error}
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold font-sans text-white bg-primary-dark hover:bg-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark transition-colors disabled:opacity-50"
                            >
                                {isPending ? "Logging in..." : "Log In"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
