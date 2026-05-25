import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { checkBookingAvailability } from "@/lib/bookingValidation";
import { sendTemplatedEmail } from "@/lib/emailService";

export async function GET(req: Request, { params }: any) {
    try {
        await dbConnect();
        const { id } = await params;
        const booking = await Booking.findById(id).populate("client");
        if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });
        return NextResponse.json(booking);
    } catch(e) {
        return NextResponse.json({ error: "Failed to fetch booking details" }, { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: any) {
    try {
        await dbConnect();
        const body = await req.json();
        const { status, newDate, startTime, endTime } = body;
        const { id } = await params;
        console.log(`[BookingSync] Updating ID: ${id}, Target Status: ${status}`);


        const booking = await Booking.findById(id).populate("client");
        if (!booking) {
            console.log(`[BookingSync] FAILED: Booking ${id} not found`);
            return NextResponse.json({ error: "Booking not found" }, { status: 404 });
        }

        const normalizedStatus = status?.toLowerCase();
        console.log(`[BookingSync] Current Status: ${booking.status}, Normalized New Status: ${normalizedStatus}`);


        if (normalizedStatus === "moved" && newDate) {
            // Combine date and time to validate correctly (defaulting to existing booking times if not provided)
            const targetStartTime = startTime || booking.startTime;
            const targetEndTime = endTime || booking.endTime;
            const availability = await checkBookingAvailability(newDate, targetStartTime, id);
            
            if (!availability.valid) {
                return NextResponse.json({ error: availability.reason }, { status: 400 });
            }
            booking.date = new Date(newDate);
            if (startTime) booking.startTime = startTime;
            if (endTime) booking.endTime = endTime;
            booking.status = "moved";
            await booking.save();

            try {
                if (booking.client && booking.client.email) {
                    // Client Email
                    await sendTemplatedEmail({
                        to: booking.client.email,
                        subject: "Booking Rescheduled",
                        type: "booking_moved",
                        variables: { 
                            firstName: booking.client.firstName, 
                            oldDate: new Date(booking.date).toLocaleString(), 
                            newDate: new Date(newDate).toLocaleString() 
                        }
                    });

                    // Admin Alert
                    await sendTemplatedEmail({
                        to: process.env.EMAIL_USER!,
                        subject: "🔔 Booking Rescheduled",
                        type: "admin_alert",
                        variables: {
                            action: "Booking Rescheduled",
                            message: `The booking for <strong>${booking.client.firstName} ${booking.client.lastName}</strong> has been moved to <strong>${new Date(newDate).toLocaleDateString()}</strong> at ${startTime}.`
                        }
                    });
                }
            } catch (e) {
                console.error("Reschedule email fail:", e);
            }
        } else if (normalizedStatus === "cancelled" && booking.status !== "cancelled") {
            booking.status = "cancelled";
            await booking.save();

            try {
                if (booking.client && booking.client.email) {
                    // Client Email
                    await sendTemplatedEmail({
                        to: booking.client.email,
                        subject: "Booking Cancelled",
                        type: "booking_cancelled",
                        variables: { 
                            firstName: booking.client.firstName, 
                            date: new Date(booking.date).toLocaleString() 
                        }
                    });

                    // Admin Alert
                    await sendTemplatedEmail({
                        to: process.env.EMAIL_USER!,
                        subject: "⚠️ Booking Cancelled",
                        type: "admin_alert",
                        variables: {
                            action: "Booking Cancelled",
                            message: `The booking for <strong>${booking.client.firstName} ${booking.client.lastName}</strong> on <strong>${new Date(booking.date).toLocaleDateString()}</strong> has been cancelled.`
                        }
                    });
                }
            } catch (emailError) {
                console.error("[Cancellation] Booking status updated, but emails failed:", emailError);
            }
        }

        return NextResponse.json(booking);
    } catch (error) {
        console.error("Update error:", error);
        return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: any) {
    try {
        await dbConnect();
        const { id } = await params;
        const result = await Booking.findByIdAndDelete(id);
        if (!result) return NextResponse.json({ error: "Booking not found" }, { status: 404 });
        return NextResponse.json({ message: "Booking permanently deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete booking" }, { status: 500 });
    }
}
