"use client";
import { useState, useEffect } from "react";
import { FiPlus, FiTrash2, FiEdit, FiStar, FiCalendar, FiCheck } from "react-icons/fi";

export default function AdminPromotionsPage() {
    const [specials, setSpecials] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editData, setEditData] = useState<any>({});

    useEffect(() => {
        fetchSpecials();
    }, []);

    const fetchSpecials = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/specials");
            if (res.ok) setSpecials(await res.json());
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = async (id: string, updates: any) => {
        const res = await fetch("/api/specials", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, ...updates })
        });
        if (res.ok) {
            setEditingId(null);
            fetchSpecials();
        }
    };

    const startEditing = (s: any) => {
        setEditingId(s._id);
        setEditData({
            title: s.title,
            subtitle: s.subtitle,
            price: s.price,
            duration: s.duration,
            sessions: s.sessions,
            isActive: s.isActive
        });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        const res = await fetch("/api/specials", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        });
        if (res.ok) fetchSpecials();
    };

    if (isLoading) return <div className="p-12 text-center text-dark/50 font-sans">Loading promotions...</div>;

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-dark">Seasonal Promotions</h1>
                    <p className="text-dark/60 font-sans mt-1">Manage special session packages and seasonal offers.</p>
                </div>
                <button 
                    onClick={() => setIsAdding(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-dark rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-md hover:bg-accent/80 transition"
                >
                    <FiPlus /> New Special
                </button>
            </div>

            {(isAdding || editingId) && (
                <div className="bg-white p-8 rounded-[2.5rem] border border-accent/20 mb-10 shadow-lg relative overflow-hidden font-sans">
                    <h3 className="font-serif text-xl mb-6">{editingId ? 'Edit Promotion' : 'Add New Promotion'}</h3>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={async (e) => {
                        e.preventDefault();
                        const fd = new FormData(e.currentTarget);
                        const data = Object.fromEntries(fd.entries());
                        const res = await fetch("/api/specials", {
                            method: editingId ? "PATCH" : "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(editingId ? { id: editingId, ...data } : data)
                        });
                        if (res.ok) {
                            setIsAdding(false);
                            setEditingId(null);
                            fetchSpecials();
                        }
                    }}>
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-dark/40 ml-1">Title</label>
                                <input name="title" defaultValue={editData.title} placeholder="e.g. Valentines Special" required className="w-full p-3 border border-dark/5 bg-bg-light rounded-xl text-sm" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-dark/40 ml-1">Subtitle</label>
                                <input name="subtitle" defaultValue={editData.subtitle} placeholder="e.g. Bring a Friend" required className="w-full p-3 border border-dark/5 bg-bg-light rounded-xl text-sm" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-dark/40 ml-1">Price (£)</label>
                                <input name="price" type="number" step="0.01" defaultValue={editData.price} placeholder="35.00" required className="w-full p-3 border border-dark/5 bg-bg-light rounded-xl text-sm" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-dark/40 ml-1">Duration</label>
                                <input name="duration" defaultValue={editData.duration} placeholder="e.g. 45 mins" required className="w-full p-3 border border-dark/5 bg-bg-light rounded-xl text-sm" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-dark/40 ml-1">Included Sessions</label>
                                <input name="sessions" defaultValue={editData.sessions} placeholder="e.g. 1 Adventure Park Session" required className="w-full p-3 border border-dark/5 bg-bg-light rounded-xl text-sm" />
                            </div>
                            <div className="flex gap-4 pt-5">
                                <button type="submit" className="flex-1 py-3 bg-dark text-white rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg hover:bg-accent hover:text-dark transition">
                                    {editingId ? 'Update Promotion' : 'Save Promotion'}
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => { setIsAdding(false); setEditingId(null); }} 
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
                {specials.map((s) => (
                    <div key={s._id} className="bg-white rounded-[2rem] p-8 border border-dark/5 shadow-sm relative group overflow-hidden hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="font-serif text-2xl text-dark mb-1">{s.title}</h3>
                                <div className="text-accent text-[10px] uppercase font-bold tracking-[0.2em]">{s.subtitle}</div>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => startEditing(s)} className="p-2 text-dark/30 hover:text-accent transition"><FiEdit size={18} /></button>
                                <button onClick={() => handleDelete(s._id)} className="p-2 text-dark/10 hover:text-red-500 transition"><FiTrash2 size={18} /></button>
                            </div>
                        </div>
                        
                        <div className="space-y-3 mb-8">
                            <div className="flex justify-between text-sm font-sans">
                                <span className="text-dark/40 font-bold uppercase tracking-widest text-[10px]">Price</span>
                                <span className="text-dark font-bold font-serif text-xl">£{s.price.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm font-sans border-t border-dark/[0.03] pt-3">
                                <span className="text-dark/40 font-bold uppercase tracking-widest text-[10px]">What's Included</span>
                                <span className="text-dark font-medium">{s.sessions}</span>
                            </div>
                            <div className="flex justify-between text-sm font-sans">
                                <span className="text-dark/40 font-bold uppercase tracking-widest text-[10px]">Timing</span>
                                <span className="text-dark font-medium">{s.duration}</span>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-2 pt-6 border-t border-dark/5">
                            <div className={`px-3 py-1 ${s.isActive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'} text-[10px] font-bold rounded-lg uppercase tracking-widest flex items-center gap-1`}>
                                {s.isActive ? <><FiCheck /> Live</> : 'Paused'}
                            </div>
                            <div className="px-3 py-1 bg-dark/[0.03] text-dark/40 text-[10px] font-bold rounded-lg uppercase tracking-widest flex items-center gap-1">
                                <FiCalendar /> Seasonal Offering
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

