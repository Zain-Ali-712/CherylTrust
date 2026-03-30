"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { FiArrowLeft, FiPlus, FiTrash2 } from "react-icons/fi";
import Link from "next/link";

type Client = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  status: string;
};

type Membership = {
  _id: string;
  type: string;
  startDate: string;
  endDate: string;
  status: string;
};

export default function ClientProfilePage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [client, setClient] = useState<Client | null>(null);
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  
  const [isMembershipModalOpen, setIsMembershipModalOpen] = useState(false);
  const [membershipData, setMembershipData] = useState({ type: "Country Club Trust Membership", price: 30, startDate: "", endDate: "" });

  const fetchClientDetails = async () => {
    try {
      // Fetch Client
      const res = await fetch(`/api/clients/${id}`);
      if (res.ok) {
        setClient(await res.json());
      } else {
        router.push("/admin/clients");
      }

      // Fetch Memberships (filter manually since API currently returns all)
      const memRes = await fetch("/api/memberships");
      if (memRes.ok) {
        const allMem = await memRes.json();
        setMemberships(allMem.filter((m: any) => m.client._id === id || m.client === id));
      }

      // Fetch Bookings
      const bookRes = await fetch(`/api/bookings?clientId=${id}`);
      if (bookRes.ok) {
        setBookings(await bookRes.json());
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchClientDetails();
  }, [id]);

  const handleCreateMembership = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/memberships", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...membershipData, clientId: id })
    });

    if (res.ok) {
      setIsMembershipModalOpen(false);
      fetchClientDetails();
    } else {
      const { error } = await res.json();
      alert(error || "Failed to create membership");
    }
  };

  const cancelMembership = async (memId: string) => {
    if (!confirm("Are you sure you want to cancel this membership?")) return;
    const res = await fetch(`/api/memberships/${memId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "cancelled" })
    });
    if (res.ok) {
      fetchClientDetails();
    }
  };

  if (!client) return <div className="p-8 text-center">Loading client profile...</div>;

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/clients" className="inline-flex items-center gap-2 text-dark/70 hover:text-brand transition mb-4">
          <FiArrowLeft /> Back to Clients
        </Link>
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold font-serif text-dark">{client.firstName} {client.lastName}</h1>
            <p className="text-dark/70 mt-1">{client.email} {client.phone && `• ${client.phone}`}</p>
          </div>
          <span className={`px-3 py-1 text-sm rounded-full font-medium ${client.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {client.status.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mt-8">
        {/* Memberships Section */}
        <div className="bg-white rounded-xl shadow-sm border border-black/5 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-serif font-bold">Memberships</h2>
            <button 
              onClick={() => setIsMembershipModalOpen(true)}
              className="text-sm bg-black/5 hover:bg-black/10 px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1"
            >
              <FiPlus /> Add
            </button>
          </div>
          
          <div className="space-y-4">
            {memberships.length === 0 ? (
              <p className="text-dark/50 text-sm">No memberships found.</p>
            ) : (
              memberships.map((mem) => (
                <div key={mem._id} className="border border-black/5 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">{mem.type}</h3>
                    <p className="text-sm text-dark/70">
                      {new Date(mem.startDate).toLocaleDateString()} - {new Date(mem.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${mem.status === 'active' ? 'bg-green-100 text-green-700' : (mem.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700')}`}>
                      {mem.status.toUpperCase()}
                    </span>
                    {mem.status === 'active' && (
                      <button onClick={() => cancelMembership(mem._id)} className="text-xs text-red-500 hover:text-red-700 underline">
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Bookings Section */}
        <div className="bg-white rounded-xl shadow-sm border border-black/5 p-6">
          <h2 className="text-xl font-serif font-bold mb-4">Recent Bookings</h2>
          <div className="space-y-3">
             {bookings.length === 0 ? (
              <p className="text-dark/50 text-sm">No bookings found.</p>
            ) : (
              bookings.map((b) => (
                <div key={b._id} className="flex justify-between items-center py-2 border-b border-black/5 last:border-0">
                  <div className="font-medium">{new Date(b.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</div>
                  <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${b.status === 'confirmed' ? 'bg-blue-100 text-blue-700' : (b.status === 'moved' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700')}`}>
                    {b.status.toUpperCase()}
                  </span>
                </div>
              ))
            )}
            {bookings.length > 0 && (
                <Link href="/admin/bookings" className="text-sm text-brand hover:underline mt-2 inline-block">Manage Bookings &rarr;</Link>
            )}
          </div>
        </div>
      </div>

      {isMembershipModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold font-serif mb-4">Add Membership</h2>
            <form onSubmit={handleCreateMembership} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark/70 mb-1">Type</label>
                <select value={membershipData.type} onChange={(e) => setMembershipData({...membershipData, type: e.target.value, price: 30})} className="w-full border border-black/10 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand/50 bg-white">
                  <option value="Country Club Trust Membership">Country Club Trust Membership - $30.00</option>
                  <option value="Country Club Non Trust Membership">Country Club Non Trust Membership - $30.00</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark/70 mb-1">Start Date</label>
                  <input required type="date" value={membershipData.startDate} onChange={(e) => setMembershipData({...membershipData, startDate: e.target.value})} className="w-full border border-black/10 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark/70 mb-1">End Date</label>
                  <input required type="date" value={membershipData.endDate} onChange={(e) => setMembershipData({...membershipData, endDate: e.target.value})} className="w-full border border-black/10 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand/50" />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setIsMembershipModalOpen(false)} className="px-4 py-2 font-medium text-dark/70 hover:bg-black/5 rounded-lg transition">Cancel</button>
                <button type="submit" className="px-4 py-2 font-medium bg-brand text-white rounded-lg hover:bg-brand/90 transition">Save Membership</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
