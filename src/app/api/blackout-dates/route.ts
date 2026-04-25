import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import BlackoutDate from "@/models/BlackoutDate";

export async function GET() {
    try {
        await dbConnect();
        const dates = await BlackoutDate.find({}).sort({ date: 1 });
        return NextResponse.json(dates);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch blackout dates" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { date, reason } = await req.json();
        
        if (!date) {
            return NextResponse.json({ error: "Date is required" }, { status: 400 });
        }

        const blackout = await BlackoutDate.create({ 
            date: new Date(date).setHours(0,0,0,0), 
            reason 
        });
        return NextResponse.json(blackout, { status: 201 });
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json({ error: "This date is already blocked" }, { status: 400 });
        }
        return NextResponse.json({ error: "Failed to block date" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        
        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        await BlackoutDate.findByIdAndDelete(id);
        return NextResponse.json({ message: "Date unblocked" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to unblock date" }, { status: 500 });
    }
}
