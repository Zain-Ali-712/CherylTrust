import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import OpeningHours from "@/models/OpeningHours";

// Seed default opening hours if they don't exist
const seedOpeningHours = async () => {
    const count = await OpeningHours.countDocuments();
    if (count === 0) {
        const defaultHours = [
            { dayOfWeek: 0, openTime: "08:00", closeTime: "18:00", slotDuration: 50, bufferTime: 10, isActive: true }, // Sunday
            { dayOfWeek: 1, openTime: "08:00", closeTime: "18:00", slotDuration: 50, bufferTime: 10, isActive: true },  // Monday
            { dayOfWeek: 2, openTime: "08:00", closeTime: "18:00", slotDuration: 50, bufferTime: 10, isActive: true },  // Tuesday
            { dayOfWeek: 3, openTime: "08:00", closeTime: "18:00", slotDuration: 50, bufferTime: 10, isActive: true },  // Wednesday
            { dayOfWeek: 4, openTime: "08:00", closeTime: "18:00", slotDuration: 50, bufferTime: 10, isActive: true },  // Thursday
            { dayOfWeek: 5, openTime: "08:00", closeTime: "18:00", slotDuration: 50, bufferTime: 10, isActive: true },  // Friday
            { dayOfWeek: 6, openTime: "08:00", closeTime: "18:00", slotDuration: 50, bufferTime: 10, isActive: true }, // Saturday
        ];
        await OpeningHours.insertMany(defaultHours);
    }
};

export async function GET() {
    try {
        await dbConnect();
        await seedOpeningHours();
        const schedule = await OpeningHours.find({}).sort({ dayOfWeek: 1 });
        return NextResponse.json(schedule);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch schedule" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        await dbConnect();
        const body = await req.json(); 
        // Expecting an array of updated schedule items
        if (!Array.isArray(body)) {
             return NextResponse.json({ error: "Invalid payload format" }, { status: 400 });
        }

        for (const item of body) {
            await OpeningHours.findByIdAndUpdate(item._id, {
                openTime: item.openTime,
                closeTime: item.closeTime,
                slotDuration: item.slotDuration !== undefined ? item.slotDuration : 50,
                bufferTime: item.bufferTime !== undefined ? item.bufferTime : 10,
                isActive: item.isActive
            });
        }

        const schedule = await OpeningHours.find({}).sort({ dayOfWeek: 1 });
        return NextResponse.json(schedule);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update schedule" }, { status: 500 });
    }
}
