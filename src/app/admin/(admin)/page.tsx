"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FiUsers, FiClock, FiDollarSign, FiShoppingBag, FiArrowRight, FiActivity, FiDownload } from "react-icons/fi";

function StatCard({ title, value, subtext, icon, trend }: { title: string, value: string | number, subtext?: string, icon: React.ReactNode, trend?: "up" | "down" | "neutral" }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-brand/10 text-brand rounded-xl group-hover:bg-brand group-hover:text-white transition-colors">
                    {icon}
                </div>
                {trend && (
                    <span className={`text-xs font-bold uppercase tracking-widest ${trend === 'up' ? 'text-green-500' : 'text-dark/50'}`}>
                        {trend === 'up' ? '+ New' : 'Stable'}
                    </span>
                )}
            </div>
            <h3 className="text-3xl font-bold font-serif text-dark mb-1">{value}</h3>
            <p className="text-dark/70 font-sans font-medium text-sm">{title}</p>
            {subtext && <p className="text-xs text-dark/40 mt-2">{subtext}</p>}
        </div>
    );
}

export default function AdminDashboardPage() {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await fetch("/api/stats");
                if (res.ok) {
                    setData(await res.json());
                }
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDashboard();
    }, []);

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center -mt-20"><div className="animate-spin text-brand text-4xl"><FiActivity /></div></div>;
    }

    if (!data) return <div className="text-center text-red-500">Failed to load statistics.</div>;

    const { stats, recent } = data;

    return (
        <div className="space-y-8">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-serif text-dark mb-2">Dashboard Overview</h1>
                    <p className="text-dark/50">High-level metrics and system status.</p>
                </div>
                <a 
                    href="/api/reports/memberships" 
                    download 
                    className="flex items-center gap-2 px-5 py-2.5 bg-white border border-black/10 rounded-xl text-dark font-sans font-bold text-sm hover:bg-dark hover:text-white transition-all shadow-sm"
                >
                    <FiDownload className="text-brand" /> Download Memberships Report
                </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Total Clients" 
                    value={stats.totalClients} 
                    subtext={`${stats.newClients30Days} new in last 30 days`}
                    icon={<FiUsers size={24} />} 
                    trend={stats.newClients30Days > 0 ? "up" : "neutral"} 
                />
                <StatCard 
                    title="Active Memberships" 
                    value={stats.activeMemberships} 
                    icon={<FiShoppingBag size={24} />} 
                />
                <StatCard 
                    title="Aggregate Bookings" 
                    value={stats.totalBookings} 
                    icon={<FiClock size={24} />} 
                />
                <StatCard 
                    title="Gross Revenue" 
                    value={`$${stats.totalRevenue.toFixed(2)}`} 
                    subtext="Based on confirmed bookings"
                    icon={<FiDollarSign size={24} />} 
                />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-x-auto">
                <div className="p-6 border-b border-black/5 flex justify-between items-center bg-black/5 min-w-[600px] sm:min-w-full">
                    <h2 className="text-lg font-bold font-serif text-dark">Upcoming Sessions</h2>
                    <Link href="/admin/bookings" className="text-xs font-bold uppercase tracking-widest text-brand hover:text-brand/70 flex items-center gap-1 transition">
                        View All <FiArrowRight />
                    </Link>
                </div>
                {recent.length === 0 ? (
                    <div className="p-8 text-center text-dark/50">No upcoming confirmed sessions.</div>
                ) : (
                    <table className="w-full text-left border-collapse min-w-[600px] sm:min-w-full">
                        <tbody>
                            {recent.map((b: any) => (
                                <tr key={b._id} className="border-b border-black/5 last:border-0 hover:bg-black/5 transition-colors">
                                    <td className="p-4">
                                        <div className="font-semibold text-dark mb-1">{b.client?.firstName} {b.client?.lastName}</div>
                                        <div className="text-xs text-dark/50">{b.service}</div>
                                    </td>
                                    <td className="p-4 text-dark/70 font-medium">
                                        {new Date(b.date).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 text-dark/70">
                                        {b.startTime} - {b.endTime}
                                    </td>
                                    <td className="p-4 text-right">
                                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${b.status === 'confirmed' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                                            {b.status.toUpperCase()}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
