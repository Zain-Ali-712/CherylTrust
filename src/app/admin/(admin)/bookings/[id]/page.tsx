"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { FiArrowLeft, FiMapPin, FiMail, FiPhone, FiCalendar, FiClock, FiDollarSign, FiInfo, FiCheckCircle } from "react-icons/fi";
import { LuDog } from "react-icons/lu";

export default function BookingDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [booking, setBooking] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const res = await fetch(`/api/bookings/${resolvedParams.id}`);
                if (res.ok) setBooking(await res.json());
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBooking();
    }, [resolvedParams.id]);

    if (isLoading) return <div className="p-8 text-center text-dark/50">Loading details...</div>;
    if (!booking) return <div className="p-8 text-center text-red-500">Booking not found.</div>;

    const client = booking.client;

    return (
        <div className="max-w-4xl mx-auto pb-12">
            <Link href="/admin/bookings" className="inline-flex items-center gap-2 text-dark/60 hover:text-dark mb-6 font-sans transition">
                <FiArrowLeft /> Back to Bookings
            </Link>

            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold font-serif text-dark mb-2">Booking Reference</h1>
                    <p className="font-mono text-dark/50 text-sm">{booking._id}</p>
                </div>
                <span className={`px-4 py-1.5 rounded-xl font-bold uppercase tracking-widest text-xs shadow-sm ${booking.status === 'confirmed' ? 'bg-blue-100 text-blue-700' : (booking.status === 'moved' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700')}`}>
                    {booking.status}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Booking Information */}
                <div className="space-y-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5">
                        <h2 className="text-xl font-bold font-serif mb-5 flex items-center gap-2 text-dark"><FiCalendar className="text-brand" /> Session Details</h2>
                        <div className="space-y-4 font-sans">
                            <div>
                                <span className="block text-xs uppercase tracking-widest text-dark/50 font-bold mb-1">Service Type</span>
                                <div className="font-medium text-dark">{booking.service}</div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="block text-xs uppercase tracking-widest text-dark/50 font-bold mb-1">Date</span>
                                    <div className="flex items-center gap-2 text-dark font-medium"><FiCalendar className="text-dark/40" /> {new Date(booking.date).toLocaleDateString()}</div>
                                </div>
                                <div>
                                    <span className="block text-xs uppercase tracking-widest text-dark/50 font-bold mb-1">Time Frame</span>
                                    <div className="flex items-center gap-2 text-dark font-medium"><FiClock className="text-dark/40" /> {booking.startTime} - {booking.endTime}</div>
                                </div>
                            </div>
                            <div>
                                <span className="block text-xs uppercase tracking-widest text-dark/50 font-bold mb-1">Pricing</span>
                                <div className="flex items-center gap-2 text-accent font-bold text-lg"><FiDollarSign className="-mr-1 text-dark/40" /> {booking.price?.toFixed(2)}</div>
                            </div>
                        </div>
                    </div>

                    {/* Reasons for Using Park */}
                    {client && client.reasonsForPark && client.reasonsForPark.length > 0 && (
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5">
                            <h2 className="text-xl font-bold font-serif mb-5 flex items-center gap-2 text-dark"><FiInfo className="text-brand" /> Operational Intent</h2>
                            <ul className="space-y-2">
                                {client.reasonsForPark.map((r: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-dark/80 bg-bg-light p-3 rounded-lg border border-black/5">
                                        <FiCheckCircle className="text-green-500 shrink-0 mt-0.5" /> {r}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Client Details */}
                <div className="space-y-8">
                    {client ? (
                        <>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5">
                                <h2 className="text-xl font-bold font-serif mb-5 flex flex-col gap-1 text-dark">
                                    <div className="flex items-center justify-between">
                                        Client Profile
                                        {client.trustTechniqueCompleted && <span className="bg-brand/10 text-brand text-[10px] px-2 py-1 rounded-md uppercase tracking-widest">Trust verified</span>}
                                    </div>
                                </h2>
                                
                                <div className="space-y-4 font-sans text-sm">
                                    <div className="pb-4 border-b border-black/5">
                                        <div className="text-lg font-bold text-dark">{client.firstName} {client.lastName}</div>
                                        {client.secondaryName && <div className="text-dark/60 italic font-medium">Secondary: {client.secondaryName}</div>}
                                    </div>

                                    <a href={`mailto:${client.email}`} className="flex items-center gap-3 text-dark/80 hover:text-brand transition p-2 -mx-2 rounded-lg hover:bg-black/5">
                                        <div className="bg-black/5 p-2 rounded-lg text-dark/60"><FiMail /></div>
                                        <div className="font-medium">{client.email}</div>
                                    </a>

                                    <a href={`tel:${client.phone}`} className="flex items-center gap-3 text-dark/80 hover:text-brand transition p-2 -mx-2 rounded-lg hover:bg-black/5">
                                        <div className="bg-black/5 p-2 rounded-lg text-dark/60"><FiPhone /></div>
                                        <div className="font-medium">{client.phone}</div>
                                    </a>

                                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(client.address)}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-dark/80 hover:text-brand transition p-2 -mx-2 rounded-lg hover:bg-black/5">
                                        <div className="bg-black/5 p-2 rounded-lg text-dark/60 shrink-0"><FiMapPin /></div>
                                        <div className="font-medium flex-1">{client.address} <span className="block text-xs text-brand mt-1 opacity-70">View in map &#8599;</span></div>
                                    </a>
                                </div>
                            </div>

                            {/* Dogs List */}
                            {client.dogs && client.dogs.length > 0 && (
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5">
                                    <h2 className="text-xl font-bold font-serif mb-5 flex items-center gap-2 text-dark"><LuDog className="text-brand" /> Registered Dogs</h2>
                                    <div className="space-y-3">
                                        {client.dogs.map((dog: any, i: number) => (
                                            <div key={i} className="flex flex-col gap-1 p-4 bg-bg-light border border-black/5 rounded-xl">
                                                <div className="flex justify-between items-center mb-1">
                                                    <strong className="text-dark font-serif text-lg">{dog.name}</strong>
                                                    <span className="text-dark/50 text-xs font-bold uppercase tracking-widest">{dog.age}</span>
                                                </div>
                                                <div className="flex items-center gap-3 mt-2 text-xs font-medium">
                                                    <span className={`px-2 py-1 rounded-md border ${dog.neutered ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                                                        {dog.neutered ? 'Neutered/Spayed' : 'Intact'}
                                                    </span>
                                                    <span className={`px-2 py-1 rounded-md border ${dog.vaxUpToDate ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                                                        {dog.vaxUpToDate ? 'Vax Up-to-date' : 'Vax Expired'}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 text-center py-12 text-dark/50 italic">
                            Client profile detached or missing.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
