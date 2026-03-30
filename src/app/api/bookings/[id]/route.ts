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

        const booking = await Booking.findById(id).populate("client");
        if (!booking) {
            return NextResponse.json({ error: "Booking not found" }, { status: 404 });
        }

        if (status === "moved" && newDate) {
            const availability = await checkBookingAvailability(newDate);
            if (!availability.valid) {
                return NextResponse.json({ error: availability.reason }, { status: 400 });
            }
            booking.date = new Date(newDate);
            if (startTime) booking.startTime = startTime;
            if (endTime) booking.endTime = endTime;
            booking.status = "moved";
            await booking.save();

            if (booking.client && booking.client.email) {
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
            }
        } else if (status === "cancelled" && booking.status !== "cancelled") {
            booking.status = "cancelled";
            await booking.save();

            if (booking.client && booking.client.email) {
                await sendTemplatedEmail({
                    to: booking.client.email,
                    subject: "Booking Cancelled",
                    type: "booking_cancelled",
                    variables: { 
                        firstName: booking.client.firstName, 
                        date: new Date(booking.date).toLocaleString() 
                    }
                });
            }
        }

        return NextResponse.json(booking);
    } catch (error) {
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
