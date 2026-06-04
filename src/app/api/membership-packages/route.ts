import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import MembershipPackage from "@/models/MembershipPackage";

export async function GET() {
    try {
        await dbConnect();
        const packages = await MembershipPackage.find().sort({ createdAt: -1 });
        return NextResponse.json(packages);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch membership packages" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        body.currency = "NZD";
        const pkg = await MembershipPackage.create(body);
        return NextResponse.json(pkg);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create membership package" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        await dbConnect();
        const { id, ...updates } = await req.json();
        updates.currency = "NZD";
        const pkg = await MembershipPackage.findByIdAndUpdate(id, updates, { new: true });
        return NextResponse.json(pkg);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update membership package" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        await dbConnect();
        const { id } = await req.json();
        await MembershipPackage.findByIdAndDelete(id);
        return NextResponse.json({ message: "Membership package deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete membership package" }, { status: 500 });
    }
}
