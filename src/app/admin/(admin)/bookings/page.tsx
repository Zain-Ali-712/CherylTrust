"use client";
import { useState, useEffect } from "react";
import { FiPlus, FiTrash2, FiClock, FiEdit2, FiEye } from "react-icons/fi";
import Link from "next/link";

export default function BookingsPage() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [clients, setClients] = useState<any[]>([]);
    const [bookingPackages, setBookingPackages] = useState<any[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        clientId: "", date: "", startTime: "", endTime: "",
        service: "", price: 0, packageId: ""
    });
    const [moveData, setMoveData] = useState({ bookingId: "", newDate: "", startTime: "", endTime: "" });
    const [errorMsg, setErrorMsg] = useState("");
    const [sortKey, setSortKey] = useState<string>("date-desc");
    const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "all">("upcoming");

    const [availableSlots, setAvailableSlots] = useState<{startTime: string, endTime: string}[]>([]);
    const [isLoadingSlots, setIsLoadingSlots] = useState(false);

    const fetchData = async () => {
        const bRes = await fetch("/api/bookings", { cache: 'no-store' });
        if (bRes.ok) setBookings(await bRes.json());

        const cRes = await fetch("/api/clients", { cache: 'no-store' });
        if (cRes.ok) {
            setClients((await cRes.json()).filter((c: any) => c.status === "active"));
        }

        const pRes = await fetch("/api/booking-packages", { cache: 'no-store' });
        if (pRes.ok) setBookingPackages(await pRes.json());
    };


    useEffect(() => { fetchData(); }, []);

    useEffect(() => {
        const fetchSlots = async (date: string) => {
            if (!date) {
                setAvailableSlots([]);
                return;
            }
            setIsLoadingSlots(true);
            try {
                const res = await fetch(`/api/availability?date=${date}`);
                const data = await res.json();
                if (res.ok) {
                    setAvailableSlots(data.availableSlots || []);
                } else {
                    setAvailableSlots([]);
                }
            } catch (e) {
                setAvailableSlots([]);
            } finally {
                setIsLoadingSlots(false);
            }
        };

        if (isMoveModalOpen && moveData.newDate) {
            fetchSlots(moveData.newDate);
        } else if (isModalOpen && formData.date) {
            fetchSlots(formData.date);
        } else {
            setAvailableSlots([]);
        }
    }, [isMoveModalOpen, moveData.newDate, isModalOpen, formData.date]);

    const handleCreateBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");

        if (!formData.startTime || !formData.endTime) {
            setErrorMsg("Please select an available time slot.");
            return;
        }

        const res = await fetch("/api/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                clientId: formData.clientId,
                date: formData.date,
                startTime: formData.startTime,
                endTime: formData.endTime,
                service: formData.service,
                price: formData.price,
                packageId: formData.packageId
            })
        });

        if (res.ok) {
            setFormData({ clientId: "", date: "", startTime: "", endTime: "", service: "", price: 0, packageId: "" });
            setIsModalOpen(false);
            fetchData();
        } else {
            const { error } = await res.json();
            setErrorMsg(error || "Failed to create booking");
        }
    };

    const cancelBooking = async (id: string) => {
        if (!confirm("Cancel this booking? The record will remain but be marked cancelled.")) return;
        await fetch(`/api/bookings/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "cancelled" })
        });
        fetchData();
    };

    const deleteBooking = async (id: string) => {
        if (!confirm("PERMANENTLY DELETE this booking? This cannot be undone.")) return;
        await fetch(`/api/bookings/${id}`, { method: "DELETE" });
        fetchData();
    };

    const handleMoveBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");

        if (!moveData.startTime || !moveData.endTime) {
            setErrorMsg("Please select an available time slot.");
            return;
        }

        const res = await fetch(`/api/bookings/${moveData.bookingId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                status: "moved",
                newDate: moveData.newDate,
                startTime: moveData.startTime,
                endTime: moveData.endTime
            })
        });
        if (res.ok) {
            setIsMoveModalOpen(false);
            fetchData();
        } else {
            const { error } = await res.json();
            setErrorMsg(error || "Failed to move booking");
        }
    };

    const sortedBookings = [...bookings].sort((a, b) => {
        if (sortKey === "date-desc") {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            if (dateA !== dateB) return dateB - dateA;
            return (b.startTime || "").localeCompare(a.startTime || "");
        } else if (sortKey === "date-asc") {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            if (dateA !== dateB) return dateA - dateB;
            return (a.startTime || "").localeCompare(b.startTime || "");
        } else if (sortKey === "client-asc") {
            const nameA = `${a.client?.firstName || ""} ${a.client?.lastName || ""}`.toLowerCase();
            const nameB = `${b.client?.firstName || ""} ${b.client?.lastName || ""}`.toLowerCase();
            if (nameA !== nameB) return nameA.localeCompare(nameB);
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        } else if (sortKey === "client-desc") {
            const nameA = `${a.client?.firstName || ""} ${a.client?.lastName || ""}`.toLowerCase();
            const nameB = `${b.client?.firstName || ""} ${b.client?.lastName || ""}`.toLowerCase();
            if (nameA !== nameB) return nameB.localeCompare(nameA);
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return 0;
    });

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const filteredBookings = sortedBookings.filter(booking => {
        const bookingDate = new Date(booking.date);
        const isPast = bookingDate < todayStart;
        if (activeTab === "upcoming") {
            return !isPast;
        } else if (activeTab === "past") {
            return isPast;
        }
        return true;
    });

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold font-serif text-dark">Bookings</h1>
                <div className="flex items-center gap-4 flex-wrap w-full sm:w-auto">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-dark/60 font-sans">Sort by:</span>
                        <select 
                            value={sortKey} 
                            onChange={(e) => setSortKey(e.target.value)}
                            className="border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 bg-white font-sans font-medium text-dark"
                        >
                            <option value="date-desc">Date (Newest first)</option>
                            <option value="date-asc">Date (Oldest first)</option>
                            <option value="client-asc">Client Name (A-Z)</option>
                            <option value="client-desc">Client Name (Z-A)</option>
                        </select>
                    </div>
                    <button
                        onClick={() => { setErrorMsg(""); setIsModalOpen(true); }}
                        className="bg-dark text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-dark/90 transition font-bold shadow-md text-sm font-sans"
                    >
                        <FiPlus /> New Booking
                    </button>
                </div>
            </div>

            {/* Visual Separation Tabs for Expired/Past Bookings */}
            <div className="flex border-b border-black/10 mb-6 gap-6 overflow-x-auto shrink-0 pb-1">
                <button 
                    onClick={() => setActiveTab("upcoming")} 
                    className={`pb-2.5 font-sans text-sm font-bold tracking-wide transition-colors relative shrink-0 ${activeTab === "upcoming" ? "text-brand" : "text-dark/40 hover:text-dark/70"}`}
                >
                    Upcoming Sessions
                    {activeTab === "upcoming" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand" />}
                </button>
                <button 
                    onClick={() => setActiveTab("past")} 
                    className={`pb-2.5 font-sans text-sm font-bold tracking-wide transition-colors relative shrink-0 ${activeTab === "past" ? "text-brand" : "text-dark/40 hover:text-dark/70"}`}
                >
                    Past & Expired
                    {activeTab === "past" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand" />}
                </button>
                <button 
                    onClick={() => setActiveTab("all")} 
                    className={`pb-2.5 font-sans text-sm font-bold tracking-wide transition-colors relative shrink-0 ${activeTab === "all" ? "text-brand" : "text-dark/40 hover:text-dark/70"}`}
                >
                    All History
                    {activeTab === "all" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand" />}
                </button>
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-black/5 overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px] lg:min-w-full">
                    <thead>
                        <tr className="bg-black/5 border-b border-black/5">
                            <th className="p-4 font-semibold text-dark/70">Client</th>
                            <th className="p-4 font-semibold text-dark/70">Service</th>
                            <th className="p-4 font-semibold text-dark/70">Date & Time</th>
                            <th className="p-4 font-semibold text-dark/70">Status</th>
                            <th className="p-4 font-semibold text-dark/70 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBookings.map(booking => (
                            <tr key={booking._id} className="border-b border-black/5 hover:bg-black/5 transition-colors">
                                <td className="p-4">
                                    {booking.client ? (
                                        <Link href={`/admin/clients/${booking.client._id}`} className="font-semibold text-brand hover:underline">
                                            {booking.client.firstName} {booking.client.lastName}
                                        </Link>
                                    ) : <span className="text-dark/50 italic">Unknown Client</span>}
                                </td>
                                <td className="p-4 text-dark/70 text-sm">
                                    {booking.service} <br />
                                    <span className="font-semibold text-accent">${booking.price?.toFixed(2)}</span>
                                </td>
                                <td className="p-4 text-dark/70">
                                    <div className="flex items-center gap-2">
                                        <FiClock className="text-brand/70" />
                                        <div>
                                            <div>{new Date(booking.date).toLocaleDateString([], { dateStyle: 'long' })}</div>
                                            <div className="text-xs text-dark/50">{booking.startTime || "N/A"} - {booking.endTime || "N/A"}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${booking.status === 'confirmed' ? 'bg-blue-100 text-blue-700' : (booking.status === 'moved' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700')}`}>
                                        {booking.status.toUpperCase()}
                                    </span>
                                </td>
                                <td className="p-4 flex gap-3 justify-end">
                                    <Link href={`/admin/bookings/${booking._id}`} className="text-dark/50 hover:text-dark transition" title="View Details">
                                        <FiEye size={18} />
                                    </Link>
                                    {(booking.status === 'confirmed' || booking.status === 'moved') && (
                                        <>
                                            <button onClick={() => { setMoveData({ bookingId: booking._id, newDate: "", startTime: "", endTime: "" }); setErrorMsg(""); setIsMoveModalOpen(true); }} className="text-blue-500 hover:text-blue-700" title="Move Booking">
                                                <FiEdit2 size={18} />
                                            </button>
                                            <button onClick={() => cancelBooking(booking._id)} className="text-orange-500 hover:text-orange-700" title="Cancel Booking">
                                                <FiClock size={18} />
                                            </button>
                                        </>
                                    )}
                                    <button onClick={() => deleteBooking(booking._id)} className="text-red-500 hover:text-red-700" title="Delete Permanently">
                                        <FiTrash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredBookings.length === 0 && (
                            <tr><td colSpan={5} className="p-8 text-center text-dark/50">No bookings found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card List View */}
            <div className="block lg:hidden space-y-4">
                {filteredBookings.map(booking => (
                    <div key={booking._id} className="bg-white rounded-xl shadow-sm border border-black/5 p-4 space-y-3">
                        <div className="flex justify-between items-start">
                            <div>
                                {booking.client ? (
                                    <Link href={`/admin/clients/${booking.client._id}`} className="font-bold text-brand hover:underline text-base">
                                        {booking.client.firstName} {booking.client.lastName}
                                    </Link>
                                ) : <span className="text-dark/50 italic font-semibold">Unknown Client</span>}
                                <div className="text-xs text-dark/50 mt-0.5">Ref: {booking._id.substring(0, 8)}...</div>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${booking.status === 'confirmed' ? 'bg-blue-100 text-blue-700' : (booking.status === 'moved' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700')}`}>
                                {booking.status.toUpperCase()}
                            </span>
                        </div>

                        <div className="border-t border-black/5 pt-3">
                            <div className="text-sm font-semibold text-dark/80">{booking.service}</div>
                            <div className="text-sm font-bold text-accent mt-0.5">${booking.price?.toFixed(2)}</div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-dark/70 bg-bg-light p-2.5 rounded-lg">
                            <FiClock className="text-brand/70" />
                            <div>
                                <div className="font-semibold">{new Date(booking.date).toLocaleDateString([], { dateStyle: 'medium' })}</div>
                                <div className="text-[10px] text-dark/50">{booking.startTime || "N/A"} - {booking.endTime || "N/A"}</div>
                            </div>
                        </div>

                        <div className="flex gap-3 justify-end pt-2 border-t border-black/5">
                            <Link href={`/admin/bookings/${booking._id}`} className="p-2 text-dark/50 hover:text-dark hover:bg-black/5 rounded-lg transition" title="View Details">
                                <FiEye size={18} />
                            </Link>
                            {(booking.status === 'confirmed' || booking.status === 'moved') && (
                                <>
                                    <button onClick={() => { setMoveData({ bookingId: booking._id, newDate: "", startTime: "", endTime: "" }); setErrorMsg(""); setIsMoveModalOpen(true); }} className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition" title="Move Booking">
                                        <FiEdit2 size={18} />
                                    </button>
                                    <button onClick={() => cancelBooking(booking._id)} className="p-2 text-orange-500 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition" title="Cancel Booking">
                                        <FiClock size={18} />
                                    </button>
                                </>
                            )}
                            <button onClick={() => deleteBooking(booking._id)} className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition" title="Delete Permanently">
                                <FiTrash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
                {filteredBookings.length === 0 && (
                    <div className="bg-white p-8 text-center text-dark/50 rounded-xl border border-black/5">No bookings found.</div>
                )}
            </div>

            {/* Create Booking Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-xl sm:max-w-2xl w-full p-4 sm:p-6 mx-auto max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold font-serif mb-4">Add New Booking</h2>

                        {errorMsg && (
                            <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-lg text-sm">{errorMsg}</div>
                        )}

                        <form onSubmit={handleCreateBooking} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-dark/70 mb-1">Client</label>
                                <select required value={formData.clientId} onChange={(e) => setFormData({ ...formData, clientId: e.target.value })} className="w-full border border-black/10 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand/50 bg-white">
                                    <option value="" disabled>Select a client...</option>
                                    {clients.map(c => (
                                        <option key={c._id} value={c._id}>{c.firstName} {c.lastName} ({c.email})</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-dark/70 mb-1">Service Package</label>
                                <select required value={formData.packageId || ""} onChange={(e) => {
                                    const pkgId = e.target.value;
                                    const pkg = bookingPackages.find(p => p._id === pkgId);
                                    if (pkg) {
                                        setFormData({ ...formData, packageId: pkg._id, service: pkg.name, price: pkg.price });
                                    }
                                }} className="w-full border border-black/10 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand/50 bg-white">
                                    <option value="" disabled>Select a package...</option>
                                    {bookingPackages.map(pkg => (
                                        <option key={pkg._id} value={pkg._id}>{pkg.name} - ${pkg.price}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-dark/70 mb-1">Date</label>
                                <input required type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full border border-black/10 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand/50" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-dark/70 mb-1">Available Slots</label>
                                {isLoadingSlots ? (
                                    <div className="text-sm text-dark/50 p-2 border border-black/10 rounded-lg">Loading slots...</div>
                                ) : !formData.date ? (
                                    <div className="text-sm text-dark/50 p-2 border border-black/10 rounded-lg">Please select a date first</div>
                                ) : availableSlots.length === 0 ? (
                                    <div className="text-sm text-dark/50 p-2 border border-black/10 rounded-lg">No slots available on this date</div>
                                ) : (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                                        {availableSlots.map((slot, idx) => {
                                            const isSelected = formData.startTime === slot.startTime && formData.endTime === slot.endTime;
                                            return (
                                                <button
                                                    key={idx}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, startTime: slot.startTime, endTime: slot.endTime })}
                                                    className={`p-2 rounded-lg border text-sm font-medium transition ${isSelected ? 'bg-brand text-white border-brand' : 'bg-white text-dark/80 border-black/10 hover:border-brand/50'}`}
                                                >
                                                    {slot.startTime} - {slot.endTime}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 font-medium text-dark/70 hover:bg-black/5 rounded-lg transition">Cancel</button>
                                <button type="submit" className="px-5 py-2.5 font-bold bg-dark text-white rounded-lg hover:bg-dark/90 transition shadow-md">Create Booking</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Move Booking Modal */}
            {isMoveModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-xl sm:max-w-2xl w-full p-4 sm:p-6 mx-auto max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold font-serif mb-4">Move Booking</h2>

                        {errorMsg && (
                            <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-lg text-sm">{errorMsg}</div>
                        )}

                        <form onSubmit={handleMoveBooking} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-dark/70 mb-1">New Date</label>
                                <input required type="date" value={moveData.newDate} onChange={(e) => setMoveData({ ...moveData, newDate: e.target.value })} className="w-full border border-black/10 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand/50" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-dark/70 mb-1">Available Slots</label>
                                {isLoadingSlots ? (
                                    <div className="text-sm text-dark/50 p-2 border border-black/10 rounded-lg">Loading slots...</div>
                                ) : !moveData.newDate ? (
                                    <div className="text-sm text-dark/50 p-2 border border-black/10 rounded-lg">Please select a date first</div>
                                ) : availableSlots.length === 0 ? (
                                    <div className="text-sm text-dark/50 p-2 border border-black/10 rounded-lg">No slots available on this date</div>
                                ) : (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                                        {availableSlots.map((slot, idx) => {
                                            const isSelected = moveData.startTime === slot.startTime && moveData.endTime === slot.endTime;
                                            return (
                                                <button
                                                    key={idx}
                                                    type="button"
                                                    onClick={() => setMoveData({ ...moveData, startTime: slot.startTime, endTime: slot.endTime })}
                                                    className={`p-2 rounded-lg border text-sm font-medium transition ${isSelected ? 'bg-brand text-white border-brand' : 'bg-white text-dark/80 border-black/10 hover:border-brand/50'}`}
                                                >
                                                    {slot.startTime} - {slot.endTime}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={() => setIsMoveModalOpen(false)} className="px-4 py-2 font-medium text-dark/70 hover:bg-black/5 rounded-lg transition">Cancel</button>
                                <button type="submit" className="px-5 py-2.5 font-bold bg-dark text-white rounded-lg hover:bg-dark/90 transition shadow-md">Confirm Move</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
