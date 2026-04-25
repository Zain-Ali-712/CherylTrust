"use client";
import { useState, useEffect } from "react";
import { FiPlus, FiTrash2, FiClock, FiEdit2, FiEye } from "react-icons/fi";
import Link from "next/link";

export default function BookingsPage() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [clients, setClients] = useState<any[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        clientId: "", date: "", startTime: "", endTime: "",
        service: "Canine Adventure Park session Trust Client", price: 20
    });
    const [moveData, setMoveData] = useState({ bookingId: "", newDate: "", startTime: "", endTime: "" });
    const [errorMsg, setErrorMsg] = useState("");

    const fetchData = async () => {
        const bRes = await fetch("/api/bookings", { cache: 'no-store' });
        if (bRes.ok) setBookings(await bRes.json());

        const cRes = await fetch("/api/clients", { cache: 'no-store' });
        if (cRes.ok) {
            setClients((await cRes.json()).filter((c: any) => c.status === "active"));
        }
    };


    useEffect(() => { fetchData(); }, []);

    const handleCreateBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");

        const res = await fetch("/api/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                clientId: formData.clientId,
                date: formData.date,
                startTime: formData.startTime,
                endTime: formData.endTime,
                service: formData.service,
                price: formData.price
            })
        });

        if (res.ok) {
            setFormData({ clientId: "", date: "", startTime: "", endTime: "", service: "Canine Adventure Park session Trust Client", price: 20 });
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

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold font-serif text-dark">Bookings</h1>
                <button
                    onClick={() => { setErrorMsg(""); setIsModalOpen(true); }}
                    className="bg-dark text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-dark/90 transition font-bold shadow-md"
                >
                    <FiPlus /> New Booking
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-black/5 overflow-hidden">
                <table className="w-full text-left border-collapse">
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
                        {bookings.map(booking => (
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
                        {bookings.length === 0 && (
                            <tr><td colSpan={5} className="p-8 text-center text-dark/50">No bookings found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Create Booking Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
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
                                <label className="block text-sm font-medium text-dark/70 mb-1">Service & Price</label>
                                <select required value={formData.service} onChange={(e) => {
                                    const val = e.target.value;
                                    setFormData({ ...formData, service: val, price: val.includes("non") ? 25 : 20 });
                                }} className="w-full border border-black/10 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand/50 bg-white">
                                    <option value="Canine Adventure Park session Trust Client">Trust Client - $20.00</option>
                                    <option value="Canine Adventure Park session non Trust Client">Non Trust Client - $25.00</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-dark/70 mb-1">Date</label>
                                <input required type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full border border-black/10 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand/50" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-dark/70 mb-1">Start Time</label>
                                    <input required type="time" value={formData.startTime} onChange={(e) => setFormData({ ...formData, startTime: e.target.value })} className="w-full border border-black/10 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand/50" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-dark/70 mb-1">End Time</label>
                                    <input required type="time" value={formData.endTime} onChange={(e) => setFormData({ ...formData, endTime: e.target.value })} className="w-full border border-black/10 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand/50" />
                                </div>
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
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                        <h2 className="text-xl font-bold font-serif mb-4">Move Booking</h2>

                        {errorMsg && (
                            <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-lg text-sm">{errorMsg}</div>
                        )}

                        <form onSubmit={handleMoveBooking} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-dark/70 mb-1">New Date</label>
                                <input required type="date" value={moveData.newDate} onChange={(e) => setMoveData({ ...moveData, newDate: e.target.value })} className="w-full border border-black/10 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand/50" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-dark/70 mb-1">New Start Time</label>
                                    <input required type="time" value={moveData.startTime} onChange={(e) => setMoveData({ ...moveData, startTime: e.target.value })} className="w-full border border-black/10 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand/50" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-dark/70 mb-1">New End Time</label>
                                    <input required type="time" value={moveData.endTime} onChange={(e) => setMoveData({ ...moveData, endTime: e.target.value })} className="w-full border border-black/10 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand/50" />
                                </div>
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
