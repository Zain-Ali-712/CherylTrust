import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SpecialPackage from "@/models/SpecialPackage";

export async function GET() {
    try {
        await dbConnect();
        const specials = await SpecialPackage.find({ isActive: true }).sort({ createdAt: -1 });
        return NextResponse.json(specials);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch specials" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const special = await SpecialPackage.create(body);
        return NextResponse.json(special);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create special" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        await dbConnect();
        const { id, ...updates } = await req.json();
        const special = await SpecialPackage.findByIdAndUpdate(id, updates, { new: true });
        return NextResponse.json(special);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update special" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {

    try {
        await dbConnect();
        const { id } = await req.json();
        await SpecialPackage.findByIdAndDelete(id);
        return NextResponse.json({ message: "Special deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete special" }, { status: 500 });
    }
}
