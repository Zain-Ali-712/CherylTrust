import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { sendTemplatedEmail } from "@/lib/emailService";

export async function GET(req: Request) {
    // Basic security check for CRON (optional secret in headers)
    const authHeader = req.headers.get("authorization");
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await dbConnect();
        
        // Find bookings from yesterday that are 'confirmed'
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        const startOfYesterday = new Date(yesterday.setHours(0, 0, 0, 0));
        const endOfYesterday = new Date(yesterday.setHours(23, 59, 59, 999));

        const bookings = await Booking.find({
            date: { $gte: startOfYesterday, $lte: endOfYesterday },
            status: "confirmed"
        }).populate("client");

        let sentCount = 0;
        for (const booking of bookings) {
            if (booking.client?.email) {
                const sent = await sendTemplatedEmail({
                    to: booking.client.email,
                    subject: "How was your Adventure?",
                    type: "review_request",
                    variables: { 
                        firstName: booking.client.firstName,
                        reviewLink: "https://cheryltrust.com/testimonials#write-review"
                    }
                });
                if (sent) sentCount++;
            }
        }

        return NextResponse.json({ message: `Sent ${sentCount} review requests.` });
    } catch (error) {
        console.error("Cron Error:", error);
        return NextResponse.json({ error: "Failed to process review requests" }, { status: 500 });
    }
}
