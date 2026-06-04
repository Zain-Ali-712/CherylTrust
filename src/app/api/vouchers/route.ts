import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Discount from "@/models/Discount";

export async function GET() {
    try {
        await dbConnect();
        const vouchers = await Discount.find({}).sort({ createdAt: -1 });
        return NextResponse.json(vouchers);
    } catch (e) {
        return NextResponse.json({ error: "Failed to fetch vouchers" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const { code, type, value, expiryDate, usageLimit } = body;

        if (!code || !type || !value || !expiryDate) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const existing = await Discount.findOne({ code: code.toUpperCase() });
        if (existing) {
            return NextResponse.json({ error: "Voucher code already exists" }, { status: 400 });
        }

        const voucher = await Discount.create({
            code: code.toUpperCase(),
            type,
            value,
            expiryDate: new Date(expiryDate),
            usageLimit: usageLimit || 1,
            timesUsed: 0
        });

        return NextResponse.json(voucher, { status: 201 });
    } catch (e) {
        return NextResponse.json({ error: "Failed to create voucher" }, { status: 500 });
    }
}
