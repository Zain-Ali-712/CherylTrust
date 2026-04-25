import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Review from "@/models/Review";

export async function GET() {
    try {
        await dbConnect();
        const reviews = await Review.find({}).sort({ createdAt: -1 });
        return NextResponse.json(reviews);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const review = await Review.create(body);

        // Send Admin Alert
        try {
            const { sendTemplatedEmail } = await import("@/lib/emailService");
            await sendTemplatedEmail({
                to: process.env.EMAIL_USER!,
                subject: "⭐ New Review Submitted",
                type: "admin_alert",
                variables: {
                    action: "New Review",
                    message: `<strong>${review.clientName}</strong> has submitted a new ${review.rating}-star review. You can moderate it in the admin dashboard.`
                }
            });
        } catch (e) {
            console.error("Admin review alert failed:", e);
        }

        return NextResponse.json(review);

    } catch (error) {
        return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        await dbConnect();
        const { id, ...updates } = await req.json();
        const review = await Review.findByIdAndUpdate(id, updates, { new: true });
        return NextResponse.json(review);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        await dbConnect();
        const { id } = await req.json();
        await Review.findByIdAndDelete(id);
        return NextResponse.json({ message: "Review deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
    }
}
