"use client";
import { useState, useEffect } from "react";
import { FiTrash2, FiCheck, FiX, FiStar, FiMessageSquare, FiEdit2 } from "react-icons/fi";

export default function AdminReviewsPage() {
    const [reviews, setReviews] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [editingId, setEditingId] = useState<string | null>(null);
    const [editData, setEditData] = useState<any>({});

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/reviews");
            if (res.ok) setReviews(await res.json());
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = async (id: string, updates: any) => {
        const res = await fetch("/api/reviews", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, ...updates })
        });
        if (res.ok) {
            setEditingId(null);
            fetchReviews();
        }
    };

    const startEditing = (review: any) => {
        setEditingId(review._id);
        setEditData({
            clientName: review.clientName,
            comment: review.comment,
            rating: review.rating
        });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this review?")) return;
        const res = await fetch("/api/reviews", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        });
        if (res.ok) fetchReviews();
    };

    if (isLoading) return <div className="p-12 text-center text-dark/50 font-sans">Loading submitted reviews...</div>;

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-dark">Client Reviews</h1>
                    <p className="text-dark/60 font-sans mt-1">Moderate, edit, and approve reviews submitted on-site.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {reviews.length === 0 ? (
                    <div className="p-12 text-center bg-white rounded-3xl border-2 border-dashed border-dark/10 text-dark/50 italic font-sans">
                        No reviews submitted yet.
                    </div>
                ) : (
                    reviews.map((r) => (
                        <div key={r._id} className={`bg-white p-6 lg:p-8 rounded-[2rem] border ${r.isApproved ? 'border-green-100 shadow-sm' : 'border-orange-100 shadow-md bg-orange-50/[0.02]'} transition-all`}>
                            {editingId === r._id ? (
                                <div className="space-y-4 font-sans">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase font-bold tracking-widest text-dark/40 ml-1">Name</label>
                                            <input 
                                                type="text" 
                                                value={editData.clientName}
                                                onChange={(e) => setEditData({...editData, clientName: e.target.value})}
                                                className="w-full px-4 py-2 border border-dark/10 rounded-xl focus:outline-none focus:border-accent"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase font-bold tracking-widest text-dark/40 ml-1">Rating</label>
                                            <select 
                                                value={editData.rating}
                                                onChange={(e) => setEditData({...editData, rating: parseInt(e.target.value)})}
                                                className="w-full px-4 py-2 border border-dark/10 rounded-xl focus:outline-none focus:border-accent"
                                            >
                                                {[1,2,3,4,5].map(v => <option key={v} value={v}>{v} Stars</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase font-bold tracking-widest text-dark/40 ml-1">Comment</label>
                                        <textarea 
                                            rows={3}
                                            value={editData.comment}
                                            onChange={(e) => setEditData({...editData, comment: e.target.value})}
                                            className="w-full px-4 py-2 border border-dark/10 rounded-xl focus:outline-none focus:border-accent resize-none"
                                        />
                                    </div>
                                    <div className="flex gap-2 justify-end">
                                        <button onClick={() => setEditingId(null)} className="px-4 py-2 text-dark/40 font-bold text-xs uppercase tracking-widest hover:text-dark">Cancel</button>
                                        <button onClick={() => handleUpdate(r._id, editData)} className="px-6 py-2 bg-dark text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-accent hover:text-dark transition">Save Changes</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-dark/5 flex items-center justify-center text-dark/40 border border-dark/5">
                                                <FiMessageSquare size={20} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-dark text-lg flex items-center gap-2">
                                                    {r.clientName}
                                                    <button onClick={() => startEditing(r)} className="text-dark/20 hover:text-accent transition opacity-0 group-hover:opacity-100">
                                                        <FiX size={14} />
                                                    </button>
                                                </div>
                                                <div className="flex gap-0.5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <FiStar key={i} size={12} className={i < r.rating ? "text-accent fill-accent" : "text-dark/10 fill-dark/10"} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button 
                                                onClick={() => startEditing(r)}
                                                className="p-2 text-dark/30 hover:text-dark hover:bg-dark/5 rounded-lg transition"
                                                title="Edit Review"
                                            >
                                                <FiEdit2 size={18} />
                                            </button>

                                            {!r.isApproved ? (
                                                <button 
                                                    onClick={() => handleUpdate(r._id, { isApproved: true })}
                                                    className="px-4 py-2 bg-green-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-md hover:bg-green-700 transition"
                                                >
                                                    <FiCheck /> Approve
                                                </button>
                                            ) : (
                                                <button 
                                                    onClick={() => handleUpdate(r._id, { isApproved: false })}
                                                    className="px-4 py-2 bg-white border border-dark/10 text-dark/40 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-dark hover:text-white transition shadow-sm"
                                                >
                                                    <FiX /> Unpublish
                                                </button>
                                            )}
                                            <button 
                                                onClick={() => handleDelete(r._id)}
                                                className="p-2 text-dark/20 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                                            >
                                                <FiTrash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-dark font-sans leading-relaxed italic bg-dark/[0.01] p-5 rounded-2xl border border-dark/[0.04]">
                                        &quot;{r.comment}&quot;
                                    </p>
                                    <div className="mt-5 flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-dark/30">
                                        <span>Submitted: {new Date(r.date).toLocaleDateString()}</span>
                                        <span className={`flex items-center gap-1 ${r.isApproved ? 'text-green-600' : 'text-orange-500'}`}>
                                            {r.isApproved ? <><FiCheck /> Published</> : 'Pending Moderation'}
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

