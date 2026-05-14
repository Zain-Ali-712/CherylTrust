"use client";

import Link from "next/link";
import { FiArrowLeft, FiFileText, FiShield, FiAlertTriangle, FiInfo } from "react-icons/fi";

export default function TermsAndConditions() {
    const sections = [
        {
            id: 1,
            title: "Liability",
            icon: <FiShield className="text-accent" />,
            content: "No liability or responsibility will be taken by the landowner/s or business owner/s for damage or injury sustained to property, individuals or animals whilst using the facilities at Canine Adventures or on the property of 566 Coast Road, Wainuiomata. All vehicles parked outside the property are entirely at their owner’s risk. No responsibility for damage or accidents will be taken by the landowner/s or business owner/s. Any breakages or damage to the facility, property or equipment will be paid for by the dog owner in full within 7 days of the damage."
        },
        {
            id: 2,
            title: "Dogs",
            icon: <FiInfo className="text-accent" />,
            content: "All dogs attending the facilities at Canine Adventures will be over 4 months of age, registered with council at their place of residence, presenting as healthy dogs, and up to date with all vaccinations - including Kennel Cough. They must be regularly treated for internal and external parasites and free of illness and disease at the time of attendance. Dogs who bark excessively will not be suitable to attend. We ask that all clients manage their dogs noise levels and be respectful of neighbouring properties."
        },
        {
            id: 3,
            title: "Clients",
            icon: <FiInfo className="text-accent" />,
            content: "Clients are deemed the signed and registered members of the membership club. Strictly Clients only allowed in the Canine Adventure Park, and their household family members. Clients will follow all instructions issued by email, text message, website and signs/placards at the property. All bookings must be made by persons over 18 years of age. Clients will be booking for dogs owned and/or in their permanent care with a maximum of 3 dogs at any visit. Clients will be utilising the space for passive recreation purposes only. No access for persons that gain remuneration for training, dog walking, daycare, behaviour management or rehabilitation without prior written approval. Clients agree to keep Canine Adventure Park a drug, alcohol, and smoke free environment and be respectful and polite with all other users. There is zero tolerance for any abusive behaviour."
        },
        {
            id: 4,
            title: "Site Access",
            icon: <FiInfo className="text-accent" />,
            content: "Clients agree to follow all guidelines, information and notices regarding access and security processes. If you arrive late for your scheduled booking the booking time cannot be extended and will not be eligible for a refund (partial or full). You must leave Canine Adventure Park at the allotted time, in readiness for the next client."
        },
        {
            id: 5,
            title: "Equipment",
            icon: <FiInfo className="text-accent" />,
            content: "Clients acknowledge that equipment is designed for dog use only. If damage occurs clients agree to notify owner/s immediately. Clients will be responsible for any damage/breakages with full replacement within 7 days of incident. Clients acknowledge that the facility and parking area is monitored by surveillance equipment. Clients will monitor and manage any children attending the facility and will ensure that children do not climb on the dog equipment."
        },
        {
            id: 6,
            title: "Waste",
            icon: <FiInfo className="text-accent" />,
            content: "Clients agree to pick up and remove all waste of all varieties that their dog or attendance produces."
        },
        {
            id: 7,
            title: "Hazard Information",
            icon: <FiAlertTriangle className="text-accent" />,
            content: "Clients book and use the facilities at Canine Adventure Park at their own risk. Clients agree to be familiar with Hazard Information as documented and published on the Hazards register in the 'office' which is situated in the western side of the park. Where any hazard is noted, the client agrees to notify owner/s immediately. The facilities are on a farm with uneven ground, long grass, mud, banks, streams, obstacles and fauna and flora and owners take no responsibility for your attendance."
        },
        {
            id: 8,
            title: "Bookings",
            icon: <FiInfo className="text-accent" />,
            content: "All bookings are made through the web booking system and are pre-paid."
        },
        {
            id: 9,
            title: "Payment",
            icon: <FiInfo className="text-accent" />,
            content: "All payments are made through the web booking system."
        },
        {
            id: 10,
            title: "Cancellation of a booking",
            icon: <FiInfo className="text-accent" />,
            content: "Bookings can be cancelled up to 6 hours prior to booking time with no fees incurred. Bookings cancelled less than 6 hours prior will not be eligible for refund. The online booking system does not process refunds automatically - please contact us by email if you wish to request a refund."
        },
        {
            id: 11,
            title: "Gifting a session",
            icon: <FiInfo className="text-accent" />,
            content: "This is non compliant as all bookings must be made by the owner of the dog attending the booked slot at Canine Adventure Park."
        },
        {
            id: 12,
            title: "Code of Ethics",
            icon: <FiShield className="text-accent" />,
            content: "Clients agree to treat all other users with respect. There is a zero tolerance for abuse or aggression towards people or dogs and you will be asked to leave immediately. Clients agree to treat all dogs responsibly. Use of prong collars, electronic shock collars and harsh handling will not be acceptable tools at these premises."
        },
        {
            id: 13,
            title: "Withdrawal of Facility",
            icon: <FiInfo className="text-accent" />,
            content: "Canine Adventure Park reserves the right to withdraw the facility for booking with no notice period and to make changes to its availability at any time. In such cases we will make all efforts to re-schedule any affected bookings."
        },
        {
            id: 14,
            title: "Withdrawal of Service",
            icon: <FiInfo className="text-accent" />,
            content: "Canine Adventure Park reserves the right to decline access to any client at any point in time. Clients who do not comply with the Terms and Conditions and notices/publications will be notified that access will be withdrawn. Clients who sign up with incorrect, misguiding, or fraudulent information on application of membership will be blocked and membership withdrawn with no refund. Membership is solely for that client's use; any client booking on behalf of non-members will be blocked and membership withdrawn."
        }
    ];

    return (
        <main className="bg-[#f0edea] bg-noise min-h-screen pt-32 pb-24">
            <div className="max-w-[1000px] mx-auto px-[clamp(1.25rem,6vw,4rem)]">
                <Link href="/adventure-park" className="inline-flex items-center gap-2 text-dark/60 hover:text-dark hover:underline mb-12 font-sans transition">
                    <FiArrowLeft /> Back to Adventure Park
                </Link>

                <div className="flex items-center gap-4 mb-10">
                    <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center text-accent">
                        <FiFileText size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-serif text-dark mb-2">Terms & Conditions</h1>
                        <p className="text-dark/40 font-sans tracking-[0.2em] uppercase text-xs font-bold">Canine Country Club & Adventure Park</p>
                    </div>
                </div>

                <div className="bg-white rounded-[2.5rem] p-10 lg:p-16 border border-dark/5 shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
                    
                    <div className="relative z-10 prose prose-dark max-w-none">
                        <p className="text-lg text-dark/70 font-sans leading-relaxed mb-16 italic border-l-4 border-accent pl-6">
                            By booking at Canine Adventure Park you are agreeing to the following Terms & Conditions:
                        </p>

                        <div className="space-y-16">
                            {sections.map((section) => (
                                <div key={section.id} className="relative">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="text-2xl opacity-80">{section.icon}</div>
                                        <h2 className="text-2xl font-serif text-dark m-0">{section.id}. {section.title}</h2>
                                    </div>
                                    <div className="text-[1.05rem] text-dark/75 font-sans leading-[1.8] pl-10">
                                        {section.content}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-20 pt-10 border-t border-dark/10 text-center">
                            <p className="text-dark/40 font-sans text-sm">
                                Terms and conditions updated as at 7/10/2024
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
