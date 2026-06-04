"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { FiArrowLeft, FiPlus, FiTrash2, FiCalendar, FiClock } from "react-icons/fi";
import Link from "next/link";

type Dog = {
  name: string;
  breed: string;
  age: string;
};

type Client = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  secondaryName?: string;
  status: string;
  trustTechniqueCompleted?: boolean;
  dogs?: Dog[];
  reasonsForPark?: string[];
  agreements?: {
    terms: boolean;
    rules: boolean;
    cancellation: boolean;
    marketing: boolean;
  };
};

type Membership = {
  _id: string;
  type: string;
  name?: string;
  price?: number;
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
  const [membershipPackages, setMembershipPackages] = useState<any[]>([]);
  
  const [isMembershipModalOpen, setIsMembershipModalOpen] = useState(false);
  const [membershipData, setMembershipData] = useState({ packageId: "", type: "", price: 0, startDate: "", endDate: "" });

  const fetchClientDetails = async () => {
    try {
      // Fire all fetch requests concurrently to eliminate network waterfall
      const [clientRes, memRes, bookRes, pkgRes] = await Promise.all([
        fetch(`/api/clients/${id}`),
        fetch(`/api/memberships?clientId=${id}`),
        fetch(`/api/bookings?clientId=${id}`),
        fetch(`/api/membership-packages`)
      ]);

      // Handle Client
      if (clientRes.ok) {
        setClient(await clientRes.json());
      } else {
        router.push("/admin/clients");
        return; // Exit early if the client doesn't exist
      }

      // Handle Memberships
      if (memRes.ok) {
        setMemberships(await memRes.json());
      }

      // Handle Bookings
      if (bookRes.ok) {
        setBookings(await bookRes.json());
      }

      if (pkgRes.ok) {
        setMembershipPackages(await pkgRes.json());
      }
    } catch (e) {
      console.error("Failed to fetch client details:", e);
    }
  };

  useEffect(() => {
    fetchClientDetails();
  }, [id]);

  const handleCreateMembership = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!membershipData.packageId) {
      alert("Please select a package.");
      return;
    }
    const res = await fetch("/api/memberships", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...membershipData, clientId: id, paymentIntentId: "admin_manual" })
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

  const activeMembership = memberships.find(m => m.status === "active" && new Date(m.endDate) > new Date());

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

        {/* Active Membership Banner */}
        {activeMembership ? (
          <div className="mt-4 p-4 bg-dark text-white rounded-2xl flex items-center justify-between shadow-md border border-dark/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
            <div className="relative z-10">
              <span className="inline-block px-2.5 py-0.5 bg-accent/20 text-accent text-[9px] font-bold tracking-widest uppercase rounded-full mb-1 border border-accent/20">Active Membership</span>
              <h3 className="font-serif text-lg text-white font-bold">{activeMembership.name}</h3>
              <p className="text-xs text-white/75 font-sans mt-0.5">
                Valid until {new Date(activeMembership.endDate).toLocaleDateString(undefined, { dateStyle: 'medium' })}
              </p>
            </div>
            <div className="relative z-10 text-right">
              <span className="text-lg font-bold font-serif text-accent">${activeMembership.price}</span>
              <button 
                onClick={() => cancelMembership(activeMembership._id)}
                className="block text-xs text-red-400 hover:text-red-500 underline mt-1 font-bold tracking-wide uppercase transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm font-sans font-medium flex items-center justify-between">
            <span>No active membership found for this client.</span>
            <button 
              onClick={() => setIsMembershipModalOpen(true)}
              className="text-xs bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider transition"
            >
              Add Membership
            </button>
          </div>
        )}
      </div>

      {/* Client Detailed Information */}
      <div className="bg-white rounded-xl shadow-sm border border-black/5 p-6 mt-8">
        <h2 className="text-xl font-serif font-bold text-dark mb-4 pb-2 border-b border-black/5">Client Information</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-bold text-dark/40 uppercase tracking-widest mb-1">Contact Details</h3>
              <p className="text-sm font-sans text-dark"><span className="font-semibold text-dark/60">Secondary Contact:</span> {client.secondaryName || "None"}</p>
              <p className="text-sm font-sans text-dark"><span className="font-semibold text-dark/60">Address:</span> {client.address || "Not provided"}</p>
            </div>
            
            <div>
              <h3 className="text-xs font-bold text-dark/40 uppercase tracking-widest mb-1">Status</h3>
              <p className="text-sm font-sans text-dark">
                <span className="font-semibold text-dark/60">Trust Technique Completed:</span> {client.trustTechniqueCompleted ? "Yes ✅" : "No ❌"}
              </p>
            </div>
            
            {client.reasonsForPark && client.reasonsForPark.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-dark/40 uppercase tracking-widest mb-1">Reasons For Visit</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {client.reasonsForPark.map((reason, i) => (
                    <span key={i} className="px-2.5 py-1 bg-dark/5 text-dark rounded-md text-xs font-medium">{reason}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-bold text-dark/40 uppercase tracking-widest mb-1">Dogs ({client.dogs?.length || 0})</h3>
              {client.dogs && client.dogs.length > 0 ? (
                <div className="space-y-2 mt-1">
                  {client.dogs.map((dog, i) => (
                    <div key={i} className="bg-dark/5 p-3 rounded-lg flex justify-between items-center">
                      <div className="font-bold text-dark">{dog.name}</div>
                      <div className="text-xs text-dark/60">{dog.breed} • Age {dog.age}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-dark/50 italic">No dogs registered.</p>
              )}
            </div>

            {client.agreements && (
              <div>
                <h3 className="text-xs font-bold text-dark/40 uppercase tracking-widest mb-1">Agreements</h3>
                <ul className="text-sm space-y-1 text-dark/70">
                  <li><span className="w-4 inline-block text-center">{client.agreements.terms ? '✅' : '❌'}</span> Terms & Conditions</li>
                  <li><span className="w-4 inline-block text-center">{client.agreements.rules ? '✅' : '❌'}</span> Park Rules</li>
                  <li><span className="w-4 inline-block text-center">{client.agreements.cancellation ? '✅' : '❌'}</span> Cancellation Policy</li>
                  <li><span className="w-4 inline-block text-center">{client.agreements.marketing ? '✅' : '❌'}</span> Marketing Emails</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mt-8">
        {/* Memberships Section */}
        <div className="bg-white rounded-xl shadow-sm border border-black/5 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-serif font-bold">Memberships History</h2>
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
                    <h3 className="font-semibold text-lg">{mem.name || mem.type}</h3>
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
        <div className="bg-white rounded-xl shadow-sm border border-black/5 p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-black/5">
            <h2 className="text-xl font-serif font-bold text-dark">Bookings History ({bookings.length})</h2>
          </div>
          
          <div className="space-y-4 overflow-y-auto flex-grow max-h-[500px] pr-1">
            {bookings.length === 0 ? (
              <p className="text-dark/50 text-sm italic py-4">No bookings found for this client.</p>
            ) : (
              bookings.map((b) => (
                <div key={b._id} className="bg-bg-section/30 border border-dark/5 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-all duration-300">
                  <div className="min-w-0 space-y-2 flex-grow">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-md ${b.status === 'confirmed' ? 'bg-blue-100 text-blue-700' : (b.status === 'moved' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700')}`}>
                        {b.status}
                      </span>
                      <span className="text-[10px] text-dark/40 font-mono">Ref: {b._id.substring(0, 8)}...</span>
                    </div>
                    <h3 className="font-sans font-bold text-dark text-base truncate" title={b.service}>{b.service}</h3>
                    <div className="flex items-center gap-4 text-xs text-dark/60 font-sans flex-wrap mt-1">
                      <span className="flex items-center gap-1.5">
                        <FiCalendar className="text-brand/80" /> {new Date(b.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FiClock className="text-brand/80" /> {b.startTime || "N/A"} - {b.endTime || "N/A"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between md:justify-end gap-6 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-dark/5">
                    <div className="flex flex-col items-start md:items-end">
                      <span className="text-[10px] text-dark/40 font-sans uppercase tracking-wider font-bold">Price</span>
                      <span className="text-lg font-bold text-dark font-sans">${b.price?.toFixed(2)}</span>
                    </div>
                    <Link 
                      href={`/admin/bookings/${b._id}`} 
                      className="px-4 py-2 bg-dark text-white rounded-xl text-xs font-bold font-sans uppercase tracking-widest hover:bg-brand hover:text-white transition-all shadow-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))
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
                <label className="block text-sm font-medium text-dark/70 mb-1">Package</label>
                <select value={membershipData.packageId || ""} onChange={(e) => {
                  const pkg = membershipPackages.find(p => p._id === e.target.value);
                  if (pkg) {
                    setMembershipData({...membershipData, packageId: pkg._id, type: pkg.availableFor, price: pkg.price});
                  }
                }} className="w-full border border-black/10 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand/50 bg-white">
                  <option value="" disabled>Select a package...</option>
                  {membershipPackages.map(pkg => (
                    <option key={pkg._id} value={pkg._id}>{pkg.name} - ${pkg.price}</option>
                  ))}
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
