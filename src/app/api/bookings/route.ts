import { NextResponse } from "next/server";
import Stripe from "stripe";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Client from "@/models/Client";
import Discount from "@/models/Discount";
import BookingPackage from "@/models/BookingPackage";
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
        const { clientId, date, service, price, startTime, endTime, voucherCode, slots } = body;

        const parsedSlots: { startTime: string, endTime: string }[] = slots && Array.isArray(slots) && slots.length > 0
            ? slots
            : (startTime && endTime ? [{ startTime, endTime }] : []);

        if (!clientId || !date || parsedSlots.length === 0) {
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

        // Concurrent Overlap checks
        const targetDate = new Date(date);
        targetDate.setHours(0, 0, 0, 0);
        const targetEnd = new Date(date);
        targetEnd.setHours(23, 59, 59, 999);

        for (const slot of parsedSlots) {
            const overlaps = await Booking.countDocuments({
                date: { $gte: targetDate, $lte: targetEnd },
                startTime: slot.startTime,
                status: { $ne: "cancelled" }
            });
            if (overlaps > 0) {
                return NextResponse.json({ error: `The slot starting at ${slot.startTime} is no longer available` }, { status: 409 });
            }
        }

        const { paymentStatus, paymentIntentId } = body;

        let finalPaymentStatus = "unpaid";
        
        // --- SECURE BACKEND PRICE CALCULATION ---
        let basePrice = service.toLowerCase().includes("non") ? 25 : 20;
        if (body.packageId) {
            const pkg = await BookingPackage.findById(body.packageId);
            if (pkg) {
                basePrice = pkg.price;
            }
        }
        let calculatedPrice = basePrice * parsedSlots.length;
        if (voucherCode) {
            const voucher = await Discount.findOne({ code: voucherCode.toUpperCase() });
            if (voucher && new Date(voucher.expiryDate) >= new Date() && voucher.timesUsed < voucher.usageLimit) {
                if (voucher.type === "percentage") {
                    calculatedPrice = calculatedPrice - (calculatedPrice * voucher.value / 100);
                } else {
                    calculatedPrice = Math.max(0, calculatedPrice - voucher.value);
                }
            }
        }
        let finalPrice = calculatedPrice;

        // --- SECURE PAYMENT VERIFICATION ---
        if (paymentIntentId) {
            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
                apiVersion: "2025-01-27.acacia" as any,
            });

            try {
                // 1. Retrieve the intent securely from Stripe
                const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
                
                // 2. Verify payment succeeded
                if (paymentIntent.status !== "succeeded") {
                    return NextResponse.json({ error: "Payment was not successful." }, { status: 400 });
                }

                // 3. Prevent impersonation (verify intent belongs to this user)
                if (paymentIntent.metadata.userId !== clientId) {
                    return NextResponse.json({ error: "Payment does not match the user." }, { status: 403 });
                }

                // 4. Prevent replay attacks (check if intent was already used)
                const existingBooking = await Booking.findOne({ paymentIntentId });
                if (existingBooking) {
                    return NextResponse.json({ error: "This payment has already been used for a booking." }, { status: 409 });
                }

                // 5. Trust the Stripe amount, not the frontend
                finalPaymentStatus = "paid";
                finalPrice = paymentIntent.amount / 100;
            } catch (error) {
                console.error("Stripe verification failed:", error);
                return NextResponse.json({ error: "Invalid payment intent." }, { status: 400 });
            }
        } else if (calculatedPrice === 0) {
            // Allow 100% discounted bookings without Stripe
            finalPaymentStatus = "paid";
        } else if (paymentStatus === "paid") {
            // Block attackers trying to pass `paymentStatus: "paid"` without a valid intent
            return NextResponse.json({ error: "Payment verification required." }, { status: 400 });
        }

        const pricePerSlot = finalPrice / parsedSlots.length;
        const createdBookings = [];

        for (const slot of parsedSlots) {
            const booking = await Booking.create({
                client: clientId,
                date: new Date(date),
                startTime: slot.startTime,
                endTime: slot.endTime,
                service,
                price: pricePerSlot,
                status: "confirmed",
                paymentStatus: finalPaymentStatus,
                paymentIntentId: paymentIntentId || "",
                packageId: body.packageId || undefined
            });
            createdBookings.push(booking);
        }

        const config = await SystemConfig.findOne({ key: "padlock_code" });
        const entryCode = config?.value || "9077";

        const sessionTimes = parsedSlots.map(s => `${new Date(date).toLocaleDateString()} at ${s.startTime}`).join(", and ");

        try {
            await sendTemplatedEmail({
                to: client.email,
                subject: "Booking Confirmed",
                type: "booking_created",
                variables: {
                    firstName: client.firstName,
                    date: sessionTimes,
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
                    message: `A new booking has been placed by <strong>${client.firstName} ${client.lastName}</strong> for <strong>${sessionTimes}</strong>.`
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

        return NextResponse.json(createdBookings, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
    }
}
