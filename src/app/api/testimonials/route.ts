import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";

export async function GET() {
    try {
        await dbConnect();
        const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
        return NextResponse.json(testimonials);
    } catch (e) {
        return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const { name, service, text, rating } = body;

        if (!name || !service || !text || !rating) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const testimonial = await Testimonial.create({ name, service, text, rating });
        return NextResponse.json(testimonial, { status: 201 });
    } catch (e) {
        return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
    }
}
