"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FiPlus, FiTrash2, FiEdit2, FiX } from "react-icons/fi";
import { LuDog } from "react-icons/lu";

const REASONS_OPTIONS = [
    "More fun training",
    "My dog is anxious",
    "Let my dog go exploring",
    "My dog is dog reactive",
    "I am anxious",
    "I want to walk with no other dogs around",
    "I want to let my dog off the lead in a secure area"
];

const emptyDog = { name: "", age: "", neutered: false, vaxUpToDate: false };

const emptyForm = {
    firstName: "", lastName: "", email: "", phone: "", address: "",
    secondaryName: "", trustTechniqueCompleted: false,
    dogs: [{ ...emptyDog }],
    reasonsForPark: [] as string[],
};

type Client = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    address?: string;
    secondaryName?: string;
    trustTechniqueCompleted?: boolean;
    dogs?: any[];
    reasonsForPark?: string[];
    status: string;
};

export default function ClientsPage() {
    const [clients, setClients] = useState<Client[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ ...emptyForm });
    const [errorMsg, setErrorMsg] = useState("");

    const fetchClients = async () => {
        const res = await fetch("/api/clients");
        if (res.ok) setClients(await res.json());
    };

    useEffect(() => { fetchClients(); }, []);

    const openCreateModal = () => {
        setEditingId(null);
        setFormData({ ...emptyForm, dogs: [{ ...emptyDog }] });
        setErrorMsg("");
        setIsModalOpen(true);
    };

    const openEditModal = (c: Client) => {
        setEditingId(c._id);
        setFormData({
            firstName: c.firstName, lastName: c.lastName, email: c.email,
            phone: c.phone || "", address: c.address || "",
            secondaryName: c.secondaryName || "",
            trustTechniqueCompleted: c.trustTechniqueCompleted || false,
            dogs: c.dogs && c.dogs.length > 0 ? c.dogs : [{ ...emptyDog }],
            reasonsForPark: c.reasonsForPark || [],
        });
        setErrorMsg("");
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");

        const filteredDogs = formData.dogs.filter(d => d.name.trim() !== "");

        const payload = { ...formData, dogs: filteredDogs };

        const url = editingId ? `/api/clients/${editingId}` : "/api/clients";
        const method = editingId ? "PUT" : "POST";

        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            setIsModalOpen(false);
            fetchClients();
        } else {
            const data = await res.json();
            setErrorMsg(data.error || "Operation failed.");
        }
    };

    const cancelClient = async (id: string) => {
        if (!confirm("Cancel this client? Their future bookings will also be cancelled.")) return;
        await fetch(`/api/clients/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "cancelled" }) });
        fetchClients();
    };

    const deleteClient = async (id: string) => {
        if (!confirm("PERMANENTLY DELETE this client and ALL their bookings? This cannot be undone.")) return;
        await fetch(`/api/clients/${id}`, { method: "DELETE" });
        fetchClients();
    };

    const updateDog = (index: number, field: string, value: any) => {
        const updated = [...formData.dogs];
        updated[index] = { ...updated[index], [field]: value };
        setFormData({ ...formData, dogs: updated });
    };

    const addDog = () => {
        if (formData.dogs.length < 3) {
            setFormData({ ...formData, dogs: [...formData.dogs, { ...emptyDog }] });
        }
    };

    const removeDog = (index: number) => {
        setFormData({ ...formData, dogs: formData.dogs.filter((_, i) => i !== index) });
    };

    const toggleReason = (reason: string) => {
        const current = formData.reasonsForPark;
        setFormData({
            ...formData,
            reasonsForPark: current.includes(reason) ? current.filter(r => r !== reason) : [...current, reason]
        });
    };

    const filteredClients = clients.filter(client => {
        const q = searchQuery.toLowerCase();
        const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
        const email = client.email.toLowerCase();
        const phone = client.phone?.toLowerCase() || "";
        return fullName.includes(q) || email.includes(q) || phone.includes(q);
    });

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h1 className="text-3xl font-bold font-serif text-dark">Clients</h1>
                <div className="flex w-full sm:w-auto items-center gap-3">
                    <input 
                        type="text"
                        placeholder="Search name, email, or phone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full sm:w-64 border border-black/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 shadow-sm"
                    />
                    <button onClick={openCreateModal} className="bg-dark text-white px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-dark/90 transition font-bold shadow-md whitespace-nowrap">
                        <FiPlus /> New Client
                    </button>
                </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-black/5 overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px] lg:min-w-full">
                    <thead>
                        <tr className="bg-black/5 border-b border-black/5">
                            <th className="p-4 font-semibold text-dark/70">Name</th>
                            <th className="p-4 font-semibold text-dark/70">Email</th>
                            <th className="p-4 font-semibold text-dark/70">Phone</th>
                            <th className="p-4 font-semibold text-dark/70">Status</th>
                            <th className="p-4 font-semibold text-dark/70 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClients.map(client => (
                            <tr key={client._id} className="border-b border-black/5 hover:bg-black/5 transition-colors">
                                <td className="p-4">
                                    <Link href={`/admin/clients/${client._id}`} className="font-semibold text-brand hover:underline">
                                        {client.firstName} {client.lastName}
                                    </Link>
                                </td>
                                <td className="p-4 text-dark/70">{client.email}</td>
                                <td className="p-4 text-dark/70">{client.phone || "-"}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${client.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {client.status.toUpperCase()}
                                    </span>
                                </td>
                                <td className="p-4 flex gap-3 justify-end">
                                    <button onClick={() => openEditModal(client)} className="text-blue-500 hover:text-blue-700" title="Edit Client"><FiEdit2 size={18} /></button>
                                    {client.status === 'active' && (
                                        <button onClick={() => cancelClient(client._id)} className="text-orange-500 hover:text-orange-700" title="Cancel Client"><FiX size={18} /></button>
                                    )}
                                    <button onClick={() => deleteClient(client._id)} className="text-red-500 hover:text-red-700" title="Delete Permanently"><FiTrash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                        {filteredClients.length === 0 && (
                            <tr><td colSpan={5} className="p-8 text-center text-dark/50">No clients found matching your search.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card List View */}
            <div className="block lg:hidden space-y-4">
                {filteredClients.map(client => (
                    <div key={client._id} className="bg-white rounded-xl shadow-sm border border-black/5 p-4 space-y-3">
                        <div className="flex justify-between items-start">
                            <div>
                                <Link href={`/admin/clients/${client._id}`} className="font-bold text-brand hover:underline text-base">
                                    {client.firstName} {client.lastName}
                                </Link>
                                {client.secondaryName && (
                                    <div className="text-xs text-dark/50 italic mt-0.5">Secondary: {client.secondaryName}</div>
                                )}
                            </div>
                            <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${client.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {client.status.toUpperCase()}
                            </span>
                        </div>

                        <div className="border-t border-black/5 pt-3 space-y-1 text-sm text-dark/70">
                            <div><strong>Email:</strong> {client.email}</div>
                            <div><strong>Phone:</strong> {client.phone || "N/A"}</div>
                        </div>

                        <div className="flex gap-3 justify-end pt-2 border-t border-black/5">
                            <button onClick={() => openEditModal(client)} className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition" title="Edit Client">
                                <FiEdit2 size={18} />
                            </button>
                            {client.status === 'active' && (
                                <button onClick={() => cancelClient(client._id)} className="p-2 text-orange-500 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition" title="Cancel Client">
                                    <FiX size={18} />
                                </button>
                            )}
                            <button onClick={() => deleteClient(client._id)} className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition" title="Delete Permanently">
                                <FiTrash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
                {filteredClients.length === 0 && (
                    <div className="bg-white p-8 text-center text-dark/50 rounded-xl border border-black/5">No clients found matching your search.</div>
                )}
            </div>

            {/* Create / Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold font-serif mb-4">{editingId ? "Edit Client" : "Add New Client"}</h2>

                        {errorMsg && (
                            <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-lg text-sm">{errorMsg}</div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Basic Info */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-dark/70 mb-1">First Name *</label>
                                    <input required type="text" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="w-full border border-black/10 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand/50" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-dark/70 mb-1">Last Name *</label>
                                    <input required type="text" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="w-full border border-black/10 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand/50" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-dark/70 mb-1">Secondary Name (Family Membership)</label>
                                <input type="text" value={formData.secondaryName} onChange={(e) => setFormData({ ...formData, secondaryName: e.target.value })} className="w-full border border-black/10 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand/50" placeholder="Optional" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-dark/70 mb-1">Email *</label>
                                    <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full border border-black/10 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand/50" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-dark/70 mb-1">Phone</label>
                                    <input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full border border-black/10 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand/50" placeholder="+64..." />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-dark/70 mb-1">Address</label>
                                <input type="text" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="w-full border border-black/10 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand/50" />
                            </div>

                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" checked={formData.trustTechniqueCompleted} onChange={(e) => setFormData({ ...formData, trustTechniqueCompleted: e.target.checked })} className="w-5 h-5 accent-brand rounded" />
                                <span className="text-sm font-medium text-dark/80">Completed Trust Technique Foundation Program</span>
                            </label>

                            {/* Dogs */}
                            <div className="border-t border-black/10 pt-5">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-bold font-serif text-dark flex items-center gap-2"><LuDog className="text-brand" /> Dogs (max 3)</h3>
                                    {formData.dogs.length < 3 && (
                                        <button type="button" onClick={addDog} className="text-xs font-bold uppercase tracking-widest text-brand hover:text-brand/70"><FiPlus className="inline mr-1" />Add Dog</button>
                                    )}
                                </div>
                                {formData.dogs.map((dog, i) => (
                                    <div key={i} className="bg-bg-light p-4 rounded-lg border border-black/5 mb-3 relative">
                                        <button type="button" onClick={() => removeDog(i)} className="absolute top-2 right-2 text-red-400 hover:text-red-600"><FiX size={14} /></button>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs font-medium text-dark/60 mb-1">Dog Name</label>
                                                <input type="text" value={dog.name} onChange={(e) => updateDog(i, "name", e.target.value)} className="w-full border border-black/10 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-dark/60 mb-1">Age</label>
                                                <input type="text" value={dog.age} onChange={(e) => updateDog(i, "age", e.target.value)} className="w-full border border-black/10 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50" placeholder="e.g. 3 years" />
                                            </div>
                                        </div>
                                        <div className="flex gap-6 mt-3">
                                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                                                <input type="checkbox" checked={dog.neutered} onChange={(e) => updateDog(i, "neutered", e.target.checked)} className="accent-brand" /> Neutered/Spayed
                                            </label>
                                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                                                <input type="checkbox" checked={dog.vaxUpToDate} onChange={(e) => updateDog(i, "vaxUpToDate", e.target.checked)} className="accent-brand" /> Vax Up-to-date
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Reasons */}
                            <div className="border-t border-black/10 pt-5">
                                <h3 className="font-bold font-serif text-dark mb-3">Reasons for Using the Park</h3>
                                <div className="space-y-2">
                                    {REASONS_OPTIONS.map(r => (
                                        <label key={r} className="flex items-center gap-3 cursor-pointer">
                                            <input type="checkbox" checked={formData.reasonsForPark.includes(r)} onChange={() => toggleReason(r)} className="accent-brand" />
                                            <span className="text-sm text-dark/80">{r}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-black/10">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 font-medium text-dark/70 hover:bg-black/5 rounded-lg transition">Cancel</button>
                                <button type="submit" className="px-5 py-2.5 font-bold bg-dark text-white rounded-lg hover:bg-dark/90 transition shadow-md">{editingId ? "Save Changes" : "Create Client"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
