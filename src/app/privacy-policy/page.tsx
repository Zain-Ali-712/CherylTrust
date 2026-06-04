import { FiShield } from "react-icons/fi";

export const metadata = {
    title: "Privacy Policy | Cheryl Trust Technique",
    description: "Privacy policy and data collection terms."
};

export default function PrivacyPolicy() {
    return (
        <main className="bg-[#f0edea] bg-noise min-h-screen pt-32 pb-24">
            <div className="max-w-[800px] mx-auto px-[clamp(1.25rem,6vw,4rem)]">
                
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-16 h-16 bg-brand/10 rounded-2xl flex items-center justify-center text-brand">
                        <FiShield size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-serif text-dark mb-2">Privacy Policy</h1>
                        <p className="text-dark/40 font-sans tracking-[0.2em] uppercase text-xs font-bold">
                            Effective Date: {/* TODO: Enter effective date here (e.g., October 1, 2024) */}
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-[2.5rem] p-10 lg:p-16 border border-dark/5 shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
                    
                    <div className="relative z-10 prose prose-dark max-w-none font-sans text-dark/75 leading-relaxed space-y-8">
                        <p className="text-lg text-dark mb-8 font-serif italic">
                            This Privacy Policy explains how {/* TODO: Enter Company Name */} collects, uses, and protects your personal information when you use our website and services.
                        </p>

                        <section>
                            <h2 className="text-2xl font-serif text-dark mb-4">1. Information We Collect</h2>
                            <p className="mb-4">We may collect the following types of information when you interact with our website or book our services:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Personal Identification Information:</strong> Name, email address, phone number, and physical address.</li>
                                <li><strong>Booking Information:</strong> Details regarding the services you book, pet/animal information, and appointment history.</li>
                                <li><strong>Technical Data:</strong> IP address, browser type, device information, and usage data collected via cookies.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif text-dark mb-4">2. How We Use Your Information</h2>
                            <p className="mb-4">We use the collected data for various purposes, including:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>To provide, maintain, and improve our services.</li>
                                <li>To process and manage your bookings and payments.</li>
                                <li>To communicate with you regarding appointments, updates, and support.</li>
                                <li>To send promotional materials (only if you have explicitly opted in).</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif text-dark mb-4">3. Cookies and Tracking Technologies</h2>
                            <p>
                                Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our audience is coming from. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif text-dark mb-4">4. Data Sharing and Disclosure</h2>
                            <p>
                                We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information with our business partners and trusted affiliates. We may disclose your personal information if required by law or in response to valid requests by public authorities.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif text-dark mb-4">5. Data Security</h2>
                            <p>
                                We prioritize the security of your personal information and implement reasonable security measures to protect it from unauthorized access, alteration, disclosure, or destruction. However, please remember that no method of transmission over the internet or method of electronic storage is 100% secure.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif text-dark mb-4">6. Your Data Rights</h2>
                            <p className="mb-4">Depending on your location, you may have the following rights regarding your personal data:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>The right to access, update, or delete the information we have on you.</li>
                                <li>The right of rectification if your information is inaccurate or incomplete.</li>
                                <li>The right to object to our processing of your personal data.</li>
                                <li>The right to withdraw consent at any time where we relied on your consent to process your personal information.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif text-dark mb-4">7. Contact Us</h2>
                            <p>
                                If you have any questions about this Privacy Policy, please contact us at: <br/>
                                <strong>Email:</strong> {/* TODO: Enter Contact Email */} <br/>
                                <strong>Address:</strong> {/* TODO: Enter Business Address */}
                            </p>
                        </section>

                    </div>
                </div>
            </div>
        </main>
    );
}
