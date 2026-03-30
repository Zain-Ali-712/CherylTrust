import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Discount from "@/models/Discount";

export async function DELETE(req: Request, { params }: any) {
    try {
        await dbConnect();
        const { id } = await params;
        const result = await Discount.findByIdAndDelete(id);
        if (!result) return NextResponse.json({ error: "Voucher not found" }, { status: 404 });
        return NextResponse.json({ message: "Voucher deleted" });
    } catch (e) {
        return NextResponse.json({ error: "Failed to delete voucher" }, { status: 500 });
    }
}
