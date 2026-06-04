import { FiFileText } from "react-icons/fi";

export const metadata = {
    title: "Website Terms & Conditions | Cheryl Trust Technique",
    description: "Standard website terms and conditions."
};

export default function WebsiteTerms() {
    return (
        <main className="bg-[#f0edea] bg-noise min-h-screen pt-32 pb-24">
            <div className="max-w-[800px] mx-auto px-[clamp(1.25rem,6vw,4rem)]">
                
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center text-accent">
                        <FiFileText size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-serif text-dark mb-2">Website Terms</h1>
                        <p className="text-dark/40 font-sans tracking-[0.2em] uppercase text-xs font-bold">
                            Effective Date: {/* TODO: Enter effective date here (e.g., October 1, 2024) */}
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-[2.5rem] p-10 lg:p-16 border border-dark/5 shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
                    
                    <div className="relative z-10 prose prose-dark max-w-none font-sans text-dark/75 leading-relaxed space-y-8">
                        <p className="text-lg text-dark mb-8 font-serif italic">
                            By accessing or using our website, you agree to be bound by these Terms and Conditions.
                        </p>

                        <section>
                            <h2 className="text-2xl font-serif text-dark mb-4">1. Use of the Website</h2>
                            <p className="mb-4">You agree to use our website only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the website. Prohibited behavior includes:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Harassing or causing distress or inconvenience to any other user.</li>
                                <li>Transmitting obscene or offensive content.</li>
                                <li>Disrupting the normal flow of dialogue within our website.</li>
                                <li>Attempting to gain unauthorized access to our servers or networks.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif text-dark mb-4">2. Intellectual Property</h2>
                            <p>
                                All content on this website, including text, graphics, logos, images, and software, is the property of {/* TODO: Enter Company Name */} or its content suppliers and is protected by international copyright laws. You may not reproduce, distribute, or create derivative works without our explicit written consent.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif text-dark mb-4">3. User Responsibilities</h2>
                            <p>
                                If you create an account or make a booking through our website, you are responsible for maintaining the confidentiality of your account information and for restricting access to your computer or device. You agree to accept responsibility for all activities that occur under your account or password.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif text-dark mb-4">4. Limitation of Liability</h2>
                            <p>
                                To the fullest extent permitted by applicable law, {/* TODO: Enter Company Name */} shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your access to or use of or inability to access or use the website; (b) any conduct or content of any third party on the website.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif text-dark mb-4">5. Governing Law</h2>
                            <p>
                                These Terms shall be governed and construed in accordance with the laws of {/* TODO: Enter Jurisdiction (e.g., New Zealand) */}, without regard to its conflict of law provisions.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif text-dark mb-4">6. Changes to Terms</h2>
                            <p>
                                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif text-dark mb-4">7. Contact Us</h2>
                            <p>
                                If you have any questions about these Terms, please contact us at: <br/>
                                <strong>Email:</strong> {/* TODO: Enter Contact Email */}
                            </p>
                        </section>

                    </div>
                </div>
            </div>
        </main>
    );
}
