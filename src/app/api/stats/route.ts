import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Client from "@/models/Client";
import Booking from "@/models/Booking";
import Membership from "@/models/Membership";

export async function GET() {
    try {
        await dbConnect();
        
        const [
            totalClients,
            newClients30Days,
            totalBookings,
            revenueData,
            activeMemberships
        ] = await Promise.all([
            Client.countDocuments({ status: { $ne: "cancelled" } }),
            Client.countDocuments({ 
                createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 30)) }, 
                status: { $ne: "cancelled" } 
            }),
            Booking.countDocuments({ status: { $ne: "cancelled" } }),
            Booking.aggregate([
                { $match: { status: "confirmed" } },
                { $group: { _id: null, totalR: { $sum: "$price" } } }
            ]),
            Membership.countDocuments({ status: "active", endDate: { $gte: new Date() } })
        ]);

        const totalRevenue = revenueData.length > 0 ? revenueData[0].totalR : 0;

        // Optionally, grab upcoming 5 bookings for a quick-view table on the dashboard
        const upcomingBookings = await Booking.find({ 
            date: { $gte: new Date() },
            status: { $in: ["confirmed", "moved"] } 
        }).populate("client", "firstName lastName").sort({ date: 1 }).limit(5);

        return NextResponse.json({
            stats: {
                totalClients,
                newClients30Days,
                totalBookings,
                totalRevenue,
                activeMemberships
            },
            recent: upcomingBookings
        });
    } catch (e) {
        return NextResponse.json({ error: "Failed to fetch aggregated stats." }, { status: 500 });
    }
}
