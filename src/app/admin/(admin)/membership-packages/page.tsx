"use client";
import { useState, useEffect } from "react";
import { FiPlus, FiTrash2, FiEdit, FiCheck } from "react-icons/fi";

export default function AdminMembershipPackagesPage() {
    const [packages, setPackages] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editData, setEditData] = useState<any>({});

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/membership-packages");
            if (res.ok) setPackages(await res.json());
        } finally {
            setIsLoading(false);
        }
    };

    const startEditing = (p: any) => {
        setEditingId(p._id);
        setEditData({
            name: p.name,
            slug: p.slug,
            description: p.description,
            price: p.price,
            currency: p.currency || "GBP",
            billingPeriod: p.billingPeriod,
            durationInDays: p.durationInDays,
            availableFor: p.availableFor || "all",
            sessionsAllowed: p.sessionsAllowed,
            isActive: p.isActive,
            startDate: p.startDate ? new Date(p.startDate).toISOString().split('T')[0] : "",
            endDate: p.endDate ? new Date(p.endDate).toISOString().split('T')[0] : "",
        });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        const res = await fetch("/api/membership-packages", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        });
        if (res.ok) fetchPackages();
    };

    if (isLoading) return <div className="p-12 text-center text-dark/50 font-sans">Loading membership packages...</div>;

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-dark">Membership Packages</h1>
                    <p className="text-dark/60 font-sans mt-1">Manage membership tiers and subscription packages.</p>
                </div>
                <button 
                    onClick={() => setIsAdding(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-dark rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-md hover:bg-accent/80 transition"
                >
                    <FiPlus /> New Package
                </button>
            </div>

            {(isAdding || editingId) && (
                <div className="bg-white p-8 rounded-[2.5rem] border border-accent/20 mb-10 shadow-lg relative overflow-hidden font-sans">
                    <h3 className="font-serif text-xl mb-6">{editingId ? 'Edit Package' : 'Add New Package'}</h3>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={async (e) => {
                        e.preventDefault();
                        const fd = new FormData(e.currentTarget);
                        const data = Object.fromEntries(fd.entries());
                        const payload: any = {
                            ...data,
                            isActive: data.isActive === 'true',
                            sessionsAllowed: data.unlimitedSessions === 'on' ? 'unlimited' : Number(data.sessionsAllowed),
                            startDate: data.startDate ? new Date(data.startDate as string) : null,
                            endDate: data.endDate ? new Date(data.endDate as string) : null,
                        };
                        delete payload.currency;
                        if (!payload.startDate) delete payload.startDate;
                        if (!payload.endDate) delete payload.endDate;
                        const res = await fetch("/api/membership-packages", {
                            method: editingId ? "PATCH" : "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(editingId ? { id: editingId, ...payload } : payload)
                        });
                        if (res.ok) {
                            setIsAdding(false);
                            setEditingId(null);
                            fetchPackages();
                        } else {
                            const err = await res.json();
                            alert(err.error || "Failed to save package");
                        }
                    }}>
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-dark/40 ml-1">Name</label>
                                <input name="name" defaultValue={editData.name} placeholder="e.g. Gold Membership" required className="w-full p-3 border border-dark/5 bg-bg-light rounded-xl text-sm" onChange={(e) => {
                                    if (!editingId) {
                                        const slugInput = document.querySelector('input[name="slug"]') as HTMLInputElement;
                                        if (slugInput) slugInput.value = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                                    }
                                }} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-dark/40 ml-1">Slug</label>
                                <input name="slug" defaultValue={editData.slug} placeholder="e.g. gold-membership" required className="w-full p-3 border border-dark/5 bg-bg-light rounded-xl text-sm" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-dark/40 ml-1">Description</label>
                                <textarea name="description" defaultValue={editData.description} placeholder="Brief description" className="w-full p-3 border border-dark/5 bg-bg-light rounded-xl text-sm" />
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-dark/40 ml-1">Price (NZD)</label>
                                    <input name="price" type="number" step="0.01" defaultValue={editData.price} placeholder="100.00" required className="w-full p-3 border border-dark/5 bg-bg-light rounded-xl text-sm" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-dark/40 ml-1">Sessions Allowed</label>
                                <div className="flex gap-4 items-center">
                                    <input name="sessionsAllowed" type="number" defaultValue={editData.sessionsAllowed !== 'unlimited' ? editData.sessionsAllowed : ""} placeholder="10" className="w-full p-3 border border-dark/5 bg-bg-light rounded-xl text-sm flex-1" />
                                    <label className="flex items-center gap-2 whitespace-nowrap text-sm font-medium text-dark/70">
                                        <input type="checkbox" name="unlimitedSessions" defaultChecked={editData.sessionsAllowed === 'unlimited'} className="w-4 h-4 accent-accent" onChange={(e) => {
                                            const input = e.target.parentElement?.previousElementSibling as HTMLInputElement;
                                            if (input) input.disabled = e.target.checked;
                                        }} />
                                        Unlimited
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-dark/40 ml-1">Billing Period</label>
                                    <input name="billingPeriod" defaultValue={editData.billingPeriod} placeholder="e.g. monthly" className="w-full p-3 border border-dark/5 bg-bg-light rounded-xl text-sm" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-dark/40 ml-1">Duration (Days)</label>
                                    <input name="durationInDays" type="number" defaultValue={editData.durationInDays} placeholder="30" required className="w-full p-3 border border-dark/5 bg-bg-light rounded-xl text-sm" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-dark/40 ml-1">Start Date</label>
                                    <input name="startDate" type="date" defaultValue={editData.startDate} className="w-full p-3 border border-dark/5 bg-bg-light rounded-xl text-sm" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-dark/40 ml-1">End Date (Optional)</label>
                                    <input name="endDate" type="date" defaultValue={editData.endDate} className="w-full p-3 border border-dark/5 bg-bg-light rounded-xl text-sm" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-dark/40 ml-1">Available For</label>
                                <select name="availableFor" defaultValue={editData.availableFor || "all"} className="w-full p-3 border border-dark/5 bg-bg-light rounded-xl text-sm">
                                    <option value="all">All</option>
                                    <option value="Trust Client">Trust Client</option>
                                    <option value="Non-Trust Client">Non-Trust Client</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-dark/40 ml-1">Status</label>
                                <select name="isActive" defaultValue={editData.isActive !== false ? 'true' : 'false'} className="w-full p-3 border border-dark/5 bg-bg-light rounded-xl text-sm">
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                            </div>
                            <div className="flex gap-4 pt-5">
                                <button type="submit" className="flex-1 py-3 bg-dark text-white rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg hover:bg-accent hover:text-dark transition">
                                    {editingId ? 'Update' : 'Save'}
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => { setIsAdding(false); setEditingId(null); setEditData({}); }} 
                                    className="flex-1 py-3 border border-dark/10 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-bg-light transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {packages.map((p) => (
                    <div key={p._id} className="bg-white rounded-[2rem] p-8 border border-dark/5 shadow-sm relative group overflow-hidden hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="font-serif text-2xl text-dark mb-1">{p.name}</h3>
                                <div className="text-accent text-[10px] uppercase font-bold tracking-[0.2em]">{p.durationInDays} Days</div>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => startEditing(p)} className="p-2 text-dark/30 hover:text-accent transition"><FiEdit size={18} /></button>
                                <button onClick={() => handleDelete(p._id)} className="p-2 text-dark/10 hover:text-red-500 transition"><FiTrash2 size={18} /></button>
                            </div>
                        </div>
                        
                        <div className="space-y-3 mb-8">
                            <div className="flex justify-between text-sm font-sans">
                                <span className="text-dark/40 font-bold uppercase tracking-widest text-[10px]">Price</span>
                                <span className="text-dark font-bold font-serif text-xl">${p.price.toFixed(2)} NZD</span>
                            </div>
                            <div className="flex justify-between text-sm font-sans border-t border-dark/[0.03] pt-3">
                                <span className="text-dark/40 font-bold uppercase tracking-widest text-[10px]">Sessions Allowed</span>
                                <span className="text-dark font-medium">{p.sessionsAllowed === 'unlimited' ? 'Unlimited' : p.sessionsAllowed}</span>
                            </div>
                            <div className="flex justify-between text-sm font-sans border-t border-dark/[0.03] pt-3">
                                <span className="text-dark/40 font-bold uppercase tracking-widest text-[10px]">Description</span>
                                <span className="text-dark font-medium text-right max-w-[60%]">{p.description}</span>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-2 pt-6 border-t border-dark/5">
                            <div className={`px-3 py-1 ${p.isActive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'} text-[10px] font-bold rounded-lg uppercase tracking-widest flex items-center gap-1`}>
                                {p.isActive ? <><FiCheck /> Active</> : 'Inactive'}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
