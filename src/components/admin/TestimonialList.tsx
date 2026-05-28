"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FiPlus, FiTrash2, FiStar, FiEdit2, FiCheck, FiX } from "react-icons/fi";
import { deleteTestimonial, updateTestimonial } from "@/actions/testimonials";

export default function TestimonialList({ initialTestimonials }: { initialTestimonials: any[] }) {
    const [testimonials, setTestimonials] = useState(initialTestimonials);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editData, setEditData] = useState<any>({});

    const handleEdit = (t: any) => {
        setEditingId(t._id);
        setEditData({ name: t.name, service: t.service, rating: t.rating, text: t.text });
    };

    const handleSave = async (id: string) => {
        const res = await updateTestimonial(id, editData);
        if (res.success) {
            setTestimonials(testimonials.map(t => t._id === id ? { ...t, ...editData } : t));
            setEditingId(null);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure?")) {
            const res = await deleteTestimonial(id);
            if (res.success) setTestimonials(testimonials.filter(t => t._id !== id));
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-dark/5 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full table-fixed text-left font-sans">
                    <thead className="bg-bg-light/50 border-b border-dark/10">
                        <tr>
                            <th className="px-2 md:px-6 py-3 md:py-4 text-[10px] md:text-xs font-bold text-dark/70 uppercase tracking-wider w-1/3 sm:w-1/4">Client Info</th>
                            <th className="px-2 md:px-6 py-3 md:py-4 text-[10px] md:text-xs font-bold text-dark/70 uppercase tracking-wider w-1/5 hidden sm:table-cell">Service</th>
                            <th className="px-2 md:px-6 py-3 md:py-4 text-[10px] md:text-xs font-bold text-dark/70 uppercase tracking-wider w-16 sm:w-24">Rating</th>
                            <th className="px-2 md:px-6 py-3 md:py-4 text-[10px] md:text-xs font-bold text-dark/70 uppercase tracking-wider w-1/3 sm:w-1/3">Preview Text</th>
                            <th className="px-2 md:px-6 py-3 md:py-4 text-[10px] md:text-xs font-bold text-dark/70 uppercase tracking-wider text-right w-16 sm:w-24">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-dark/5">
                        {testimonials.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-dark/50">
                                    No testimonials added yet. Click &quot;Add New&quot; to get started.
                                </td>
                            </tr>
                        ) : (
                            testimonials.map((t: any) => (
                                <tr key={t._id} className="hover:bg-bg-light/30 transition-colors">
                                    <td className="px-2 md:px-6 py-3 md:py-4 whitespace-nowrap overflow-hidden text-ellipsis">
                                        {editingId === t._id ? (
                                            <input value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} className="border rounded px-2 py-1 text-xs md:text-sm w-full font-sans" />
                                        ) : (
                                            <div className="flex items-center gap-2 md:gap-4 truncate">
                                                <div className="h-8 w-8 md:h-10 md:w-10 shrink-0 rounded-full bg-primary-light/20 items-center justify-center overflow-hidden border border-primary-light/30 relative hidden xl:flex">
                                                    {t.imageUrl ? <Image src={t.imageUrl} alt={t.name} fill className="object-cover" /> : <span>{t.name.charAt(0)}</span>}
                                                </div>
                                                <div className="font-bold text-dark text-xs md:text-sm truncate">{t.name}</div>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-2 md:px-6 py-3 md:py-4 whitespace-nowrap overflow-hidden text-ellipsis hidden sm:table-cell">
                                        {editingId === t._id ? (
                                            <input value={editData.service} onChange={e => setEditData({...editData, service: e.target.value})} className="border rounded px-2 py-1 text-xs md:text-sm w-full font-sans" />
                                        ) : (
                                            <span className="text-xs md:text-sm text-dark/70 truncate block">{t.service}</span>
                                        )}
                                    </td>
                                    <td className="px-2 md:px-6 py-3 md:py-4 whitespace-nowrap overflow-hidden">
                                        {editingId === t._id ? (
                                            <select value={editData.rating} onChange={e => setEditData({...editData, rating: parseInt(e.target.value)})} className="border rounded px-1 py-1 text-xs md:text-sm font-sans w-full">
                                                {[1,2,3,4,5].map(v => <option key={v} value={v}>{v}</option>)}
                                            </select>
                                        ) : (
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => <FiStar key={i} size={12} className={i < t.rating ? "text-accent fill-accent" : "text-dark/10 fill-dark/10"} />)}
                                            </div>
                                        )}
                                    </td>

                                    <td className="px-2 md:px-6 py-3 md:py-4 overflow-hidden text-ellipsis">
                                        {editingId === t._id ? (
                                            <textarea value={editData.text} onChange={e => setEditData({...editData, text: e.target.value})} className="border rounded px-2 py-1 text-xs md:text-sm w-full resize-none font-sans" rows={2} />
                                        ) : (
                                            <div className="truncate text-xs md:text-sm text-dark/70 font-sans w-full">
                                                &quot;{t.text}&quot;
                                            </div>
                                        )}
                                    </td>

                                    <td className="px-2 md:px-6 py-3 md:py-4 text-right">
                                        <div className="flex justify-end gap-1 md:gap-2">
                                            {editingId === t._id ? (
                                                <>
                                                    <button onClick={() => handleSave(t._id)} className="p-1 md:p-2 text-green-600 hover:bg-green-50 rounded-lg" title="Save"><FiCheck size={16} /></button>
                                                    <button onClick={() => setEditingId(null)} className="p-1 md:p-2 text-dark/30 hover:bg-dark/5 rounded-lg" title="Cancel"><FiX size={16} /></button>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={() => handleEdit(t)} className="p-1 md:p-2 text-dark/30 hover:text-accent hover:bg-bg-light rounded-lg transition-colors" title="Edit"><FiEdit2 size={14} /></button>
                                                    <button onClick={() => handleDelete(t._id)} className="p-1 md:p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><FiTrash2 size={14} /></button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
