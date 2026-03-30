import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Discount from "@/models/Discount";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { code } = await req.json();

        if (!code) {
            return NextResponse.json({ error: "Code is required" }, { status: 400 });
        }

        const voucher = await Discount.findOne({ code: code.toUpperCase() });

        if (!voucher) {
            return NextResponse.json({ error: "Invalid voucher code" }, { status: 404 });
        }

        if (new Date(voucher.expiryDate) < new Date()) {
            return NextResponse.json({ error: "This voucher has expired" }, { status: 400 });
        }

        if (voucher.timesUsed >= voucher.usageLimit) {
            return NextResponse.json({ error: "This voucher has reached its usage limit" }, { status: 400 });
        }

        return NextResponse.json({
            valid: true,
            type: voucher.type,
            value: voucher.value,
            code: voucher.code
        });
    } catch (e) {
        return NextResponse.json({ error: "Validation failed" }, { status: 500 });
    }
}
