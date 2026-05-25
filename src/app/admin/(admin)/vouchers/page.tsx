"use client";
import { useState, useEffect } from "react";
import { FiPlus, FiTrash2, FiTag } from "react-icons/fi";

export default function VouchersPage() {
    const [vouchers, setVouchers] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ code: "", type: "percentage" as "percentage" | "fixed", value: 10, expiryDate: "", usageLimit: 10 });
    const [errorMsg, setErrorMsg] = useState("");

    const fetchVouchers = async () => {
        const res = await fetch("/api/vouchers");
        if (res.ok) setVouchers(await res.json());
    };

    useEffect(() => { fetchVouchers(); }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");
        const res = await fetch("/api/vouchers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });
        if (res.ok) {
            setIsModalOpen(false);
            setFormData({ code: "", type: "percentage", value: 10, expiryDate: "", usageLimit: 10 });
            fetchVouchers();
        } else {
            const data = await res.json();
            setErrorMsg(data.error || "Failed to create voucher");
        }
    };

    const deleteVoucher = async (id: string) => {
        if (!confirm("Delete this voucher permanently?")) return;
        await fetch(`/api/vouchers/${id}`, { method: "DELETE" });
        fetchVouchers();
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold font-serif text-dark">Vouchers & Discounts</h1>
                <button onClick={() => { setErrorMsg(""); setIsModalOpen(true); }} className="bg-dark text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-dark/90 transition font-bold shadow-md">
                    <FiPlus /> New Voucher
                </button>
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-black/5 overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px] lg:min-w-full">
                    <thead>
                        <tr className="bg-black/5 border-b border-black/5">
                            <th className="p-4 font-semibold text-dark/70">Code</th>
                            <th className="p-4 font-semibold text-dark/70">Type</th>
                            <th className="p-4 font-semibold text-dark/70">Discount</th>
                            <th className="p-4 font-semibold text-dark/70">Usage</th>
                            <th className="p-4 font-semibold text-dark/70">Expiry</th>
                            <th className="p-4 font-semibold text-dark/70">Status</th>
                            <th className="p-4 font-semibold text-dark/70 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vouchers.map(v => {
                            const expired = new Date(v.expiryDate) < new Date();
                            const exhausted = v.timesUsed >= v.usageLimit;
                            return (
                                <tr key={v._id} className="border-b border-black/5 hover:bg-black/5 transition-colors">
                                    <td className="p-4">
                                        <span className="font-mono font-bold text-dark bg-black/5 px-2 py-1 rounded">{v.code}</span>
                                    </td>
                                    <td className="p-4 text-dark/70 capitalize">{v.type}</td>
                                    <td className="p-4 font-semibold text-accent">
                                        {v.type === "percentage" ? `${v.value}%` : `$${v.value.toFixed(2)}`}
                                    </td>
                                    <td className="p-4 text-dark/70">{v.timesUsed} / {v.usageLimit}</td>
                                    <td className="p-4 text-dark/70">{new Date(v.expiryDate).toLocaleDateString()}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${expired ? 'bg-red-100 text-red-700' : exhausted ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                                            {expired ? "EXPIRED" : exhausted ? "EXHAUSTED" : "ACTIVE"}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button onClick={() => deleteVoucher(v._id)} className="text-red-500 hover:text-red-700" title="Delete"><FiTrash2 size={18} /></button>
                                    </td>
                                </tr>
                            );
                        })}
                        {vouchers.length === 0 && (
                            <tr><td colSpan={7} className="p-8 text-center text-dark/50">No vouchers created yet.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card List View */}
            <div className="block lg:hidden space-y-4">
                {vouchers.map(v => {
                    const expired = new Date(v.expiryDate) < new Date();
                    const exhausted = v.timesUsed >= v.usageLimit;
                    return (
                        <div key={v._id} className="bg-white rounded-xl shadow-sm border border-black/5 p-4 space-y-3">
                            <div className="flex justify-between items-start">
                                <span className="font-mono font-bold text-dark bg-black/5 px-2 py-1 rounded">{v.code}</span>
                                <span className={`px-2 py-1 text-xs rounded-full font-medium ${expired ? 'bg-red-100 text-red-700' : exhausted ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                                    {expired ? "EXPIRED" : exhausted ? "EXHAUSTED" : "ACTIVE"}
                                </span>
                            </div>

                            <div className="border-t border-black/5 pt-3 grid grid-cols-2 gap-2 text-sm text-dark/70">
                                <div><strong>Type:</strong> <span className="capitalize">{v.type}</span></div>
                                <div><strong>Discount:</strong> <span className="font-semibold text-accent">{v.type === "percentage" ? `${v.value}%` : `$${v.value.toFixed(2)}`}</span></div>
                                <div><strong>Usage:</strong> {v.timesUsed} / {v.usageLimit}</div>
                                <div><strong>Expiry:</strong> {new Date(v.expiryDate).toLocaleDateString()}</div>
                            </div>

                            <div className="flex justify-end pt-2 border-t border-black/5">
                                <button onClick={() => deleteVoucher(v._id)} className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition" title="Delete"><FiTrash2 size={18} /></button>
                            </div>
                        </div>
                    );
                })}
                {vouchers.length === 0 && (
                    <div className="bg-white p-8 text-center text-dark/50 rounded-xl border border-black/5">No vouchers created yet.</div>
                )}
            </div>

            {/* Create Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                        <h2 className="text-xl font-bold font-serif mb-4 flex items-center gap-2"><FiTag className="text-brand" /> Generate Voucher</h2>

                        {errorMsg && <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-lg text-sm">{errorMsg}</div>}

                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-dark/70 mb-1">Voucher Code</label>
                                <input required type="text" value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })} placeholder="e.g. WELCOME20" className="w-full border border-black/10 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand/50 font-mono uppercase" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-dark/70 mb-1">Type</label>
                                    <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value as "percentage" | "fixed" })} className="w-full border border-black/10 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand/50 bg-white">
                                        <option value="percentage">Percentage (%)</option>
                                        <option value="fixed">Fixed ($)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-dark/70 mb-1">Value</label>
                                    <input required type="number" min={1} value={formData.value} onChange={(e) => setFormData({ ...formData, value: parseInt(e.target.value) })} className="w-full border border-black/10 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand/50" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-dark/70 mb-1">Expiry Date</label>
                                    <input required type="date" value={formData.expiryDate} onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })} className="w-full border border-black/10 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand/50" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-dark/70 mb-1">Usage Limit</label>
                                    <input required type="number" min={1} value={formData.usageLimit} onChange={(e) => setFormData({ ...formData, usageLimit: parseInt(e.target.value) })} className="w-full border border-black/10 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand/50" />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 font-medium text-dark/70 hover:bg-black/5 rounded-lg transition">Cancel</button>
                                <button type="submit" className="px-5 py-2.5 font-bold bg-dark text-white rounded-lg hover:bg-dark/90 transition shadow-md">Create Voucher</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
