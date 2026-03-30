import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function GET(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const start = searchParams.get('start');
        const end = searchParams.get('end');
        
        if (!start || !end) {
             return NextResponse.json({ error: "start and end dates are required" }, { status: 400 });
        }

        const query = {
            date: {
                $gte: new Date(start),
                $lte: new Date(end)
            }
        };

        const bookings = await Booking.find(query).populate("client", "firstName lastName").sort({ date: 1 });

        // Map to a cleaner format specifically requested for calendar "Day / Week / Month view"
        const formatted = bookings.map(b => ({
            id: b._id,
            title: b.client ? `${(b.client as any).firstName} ${(b.client as any).lastName}` : "Unknown Client",
            clientName: b.client ? `${(b.client as any).firstName} ${(b.client as any).lastName}` : "Unknown Client",
            clientId: b.client?._id,
            start: b.date,
            startTime: b.startTime,
            endTime: b.endTime,
            service: b.service,
            status: b.status,
            color: b.status === "confirmed" ? "blue" : (b.status === "moved" ? "orange" : "red")
        }));

        return NextResponse.json(formatted);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch calendar bookings" }, { status: 500 });
    }
}
