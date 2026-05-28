import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Client from "@/models/Client";
import Booking from "@/models/Booking";
import Membership from "@/models/Membership";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("admin_token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const payload = await verifyToken(token);
        if (!payload) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        
        const [
            totalClients,
            newClients30Days,
            totalBookings,
            revenueData,
            activeMemberships,
            upcomingBookings
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
            Membership.countDocuments({ status: "active", endDate: { $gte: new Date() } }),
            Booking.find({ 
                date: { $gte: startOfToday },
                status: { $in: ["confirmed", "moved"] } 
            }).populate("client", "firstName lastName").sort({ date: 1 }).limit(5).lean()
        ]);

        const totalRevenue = revenueData.length > 0 ? revenueData[0].totalR : 0;

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
