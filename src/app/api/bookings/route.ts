import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Client from "@/models/Client";
import Discount from "@/models/Discount";
import SystemConfig from "@/models/SystemConfig";
import { checkBookingAvailability } from "@/lib/bookingValidation";
import { sendTemplatedEmail } from "@/lib/emailService";
import { hasActiveMembership } from "@/lib/membership";

export async function GET(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const clientId = searchParams.get('clientId');
        
        let query = {};
        if (clientId) query = { client: clientId };

        const bookings = await Booking.find(query).populate("client", "firstName lastName").sort({ date: 1 });
        return NextResponse.json(bookings);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const { clientId, date, service, price, startTime, endTime, voucherCode } = body;

        if (!clientId || !date || !startTime || !endTime) {
            return NextResponse.json({ error: "Missing required booking fields" }, { status: 400 });
        }

        const client = await Client.findById(clientId);
        if (!client || client.status === "cancelled") {
            return NextResponse.json({ error: "Client not found or is cancelled" }, { status: 400 });
        }

        // Membership validation
        const activeMember = await hasActiveMembership(clientId);
        if (!activeMember) {
            return NextResponse.json({ error: "Mandatory Membership: You must have an active membership to book adventures." }, { status: 403 });
        }

        // Trust Client validation
        if (service === "Canine Adventure Park session Trust Client") {
            const pastBookingsCount = await Booking.countDocuments({
                client: clientId,
                status: { $ne: "cancelled" }
            });
            if (pastBookingsCount < 3) {
                return NextResponse.json({ error: "You must have completed at least 3 previous sessions to book a Trust session." }, { status: 403 });
            }
        }

        // Concurrent Overlap checks
        const targetDate = new Date(date);
        targetDate.setHours(0,0,0,0);
        const targetEnd = new Date(date);
        targetEnd.setHours(23,59,59,999);

        const overlaps = await Booking.countDocuments({
            date: { $gte: targetDate, $lte: targetEnd },
            startTime: startTime,
            status: { $ne: "cancelled" }
        });
        if (overlaps > 0) {
            return NextResponse.json({ error: "This time slot is no longer available" }, { status: 409 });
        }

        const booking = await Booking.create({
            client: clientId,
            date: new Date(date),
            startTime,
            endTime,
            service,
            price: price || 0,
            status: "confirmed"
        });

        const config = await SystemConfig.findOne({ key: "padlock_code" });
        const entryCode = config?.value || "9077";

        try {
            await sendTemplatedEmail({
                to: client.email,
                subject: "Booking Confirmed",
                type: "booking_created",
                variables: { 
                    firstName: client.firstName, 
                    date: `${new Date(date).toLocaleDateString()} at ${startTime}`,
                    gateCode: entryCode
                }
            });

            // Send Admin Alert
            await sendTemplatedEmail({
                to: process.env.EMAIL_USER!,
                subject: "🚨 New Booking Received",
                type: "admin_alert",
                variables: {
                    action: "New Booking",
                    message: `A new booking has been placed by <strong>${client.firstName} ${client.lastName}</strong> for <strong>${new Date(date).toLocaleDateString()}</strong> at ${startTime}.`
                }
            });
        } catch (emailError) {
            console.error("[BookingAPI] Booking success but email failed:", emailError);
        }



        // Increment voucher usage if one was applied
        if (voucherCode) {
            await Discount.findOneAndUpdate(
                { code: voucherCode.toUpperCase() },
                { $inc: { timesUsed: 1 } }
            );
        }

        return NextResponse.json(booking, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
    }
}
