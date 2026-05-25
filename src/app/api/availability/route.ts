import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import OpeningHours from "@/models/OpeningHours";
import Booking from "@/models/Booking";
import BlackoutDate from "@/models/BlackoutDate";

export async function GET(req: Request) {
    try {
        await dbConnect();
        
        const { searchParams } = new URL(req.url);
        const dateStr = searchParams.get("date");
        if (!dateStr) return NextResponse.json({ error: "Date required" }, { status: 400 });

        const requestDate = new Date(dateStr);
        requestDate.setHours(0, 0, 0, 0);

        // Check for Blackout Dates (e.g. flooding, maintenance)
        const isBlackedOut = await BlackoutDate.findOne({ date: requestDate });
        if (isBlackedOut) {
            return NextResponse.json({ 
                availableSlots: [], 
                isBlocked: true, 
                reason: isBlackedOut.reason || "The park is closed on this day." 
            });
        }

        const dayOfWeek = requestDate.getDay(); // 0 = Sunday
        
        const hours = await OpeningHours.findOne({ dayOfWeek, isActive: true });
        if (!hours) return NextResponse.json({ availableSlots: [] });

        // Retrieve bookings for this day
        const startOfDay = new Date(requestDate);
        startOfDay.setHours(0, 0, 0, 0);
        
        const endOfDay = new Date(requestDate);
        endOfDay.setHours(23, 59, 59, 999);

        const bookings = await Booking.find({
            date: { $gte: startOfDay, $lte: endOfDay },
            status: { $ne: "cancelled" }
        });

        const slotD = hours.slotDuration !== undefined ? hours.slotDuration : 60;
        const buffer = hours.bufferTime !== undefined ? hours.bufferTime : 0;
        
        let currentMinutes = parseTime(hours.openTime);
        const endMinutes = parseTime(hours.closeTime);
        
        const availableSlots = [];

        // Check against overlapping booking logic
        const isOverlapping = (startMins: number, endMins: number) => {
            return bookings.some(booking => {
                if (!booking.startTime || !booking.endTime) return false;
                const bStart = parseTime(booking.startTime);
                const bEnd = parseTime(booking.endTime);
                // Two periods [s1, e1] and [s2, e2] overlap if Math.max(s1, s2) < Math.min(e1, e2)
                return Math.max(startMins, bStart) < Math.min(endMins, bEnd);
            });
        };
        
        while (currentMinutes + slotD <= endMinutes) {
            const slotStart = currentMinutes;
            const slotEnd = currentMinutes + slotD;
            
            if (!isOverlapping(slotStart, slotEnd)) {
                availableSlots.push({
                    startTime: formatTime(slotStart),
                    endTime: formatTime(slotEnd),
                });
            }
            
            currentMinutes += slotD + buffer;
        }

        return NextResponse.json({ availableSlots });

    } catch (e) {
        console.error("Availability error:", e);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}

function parseTime(time: string) {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
}

function formatTime(minutes: number) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}
