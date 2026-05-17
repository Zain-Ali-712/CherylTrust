import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import BookingPackage from "@/models/BookingPackage";

export async function GET() {
    try {
        await dbConnect();
        const packages = await BookingPackage.find().sort({ createdAt: 1 });
        return NextResponse.json(packages);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch booking packages" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const pkg = await BookingPackage.create(body);
        return NextResponse.json(pkg);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create booking package" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        await dbConnect();
        const { id, ...updates } = await req.json();
        const pkg = await BookingPackage.findByIdAndUpdate(id, updates, { new: true });
        return NextResponse.json(pkg);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update booking package" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        await dbConnect();
        const { id } = await req.json();
        await BookingPackage.findByIdAndDelete(id);
        return NextResponse.json({ message: "Booking package deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete booking package" }, { status: 500 });
    }
}
