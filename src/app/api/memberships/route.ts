import { NextResponse } from "next/server";
import Stripe from "stripe";
import dbConnect from "@/lib/mongodb";
import Membership from "@/models/Membership";
import Client from "@/models/Client";
import { sendTemplatedEmail } from "@/lib/emailService";

export async function GET(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const clientId = searchParams.get('clientId');

        let query = {};
        if (clientId) query = { client: clientId };

        const memberships = await Membership.find(query)
            .populate("client", "firstName lastName email")
            .sort({ createdAt: -1 });
        return NextResponse.json(memberships);
    } catch (error: any) {
        console.error("GET MEMBERSHIPS ERROR:", error);
        return NextResponse.json({ error: "Failed to fetch memberships", details: error.message, stack: error.stack }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const { clientId, name, type, price, startDate, endDate, paymentIntentId, packageId } = body;

        if (!clientId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        let finalType = type;
        let finalName = name || "Membership";
        let finalStartDate = startDate ? new Date(startDate) : new Date();
        let finalEndDate = endDate ? new Date(endDate) : new Date();

        if (packageId) {
            const MembershipPackage = (await import("@/models/MembershipPackage")).default;
            const pkg = await MembershipPackage.findById(packageId);
            if (pkg) {
                finalType = pkg.availableFor;
                finalName = pkg.name;
                finalStartDate = new Date();
                finalEndDate = new Date();
                const daysToAdd = pkg.durationInDays ? Number(pkg.durationInDays) : 365;
                finalEndDate.setDate(finalStartDate.getDate() + daysToAdd);
            }
        }

        const client = await Client.findById(clientId);
        if (!client) {
            return NextResponse.json({ error: "Client not found" }, { status: 404 });
        }

        // Prevent overlapping active memberships
        const overlapping = await Membership.findOne({
            client: clientId,
            status: "active",
            startDate: { $lte: finalEndDate },
            endDate: { $gte: finalStartDate }
        });

        if (overlapping) {
            return NextResponse.json({ error: "Client already has an active membership during this period" }, { status: 400 });
        }

        let finalPrice = price || 0;

        // --- SECURE PAYMENT VERIFICATION ---
        if (paymentIntentId === "admin_manual") {
            const { requireAdmin } = await import("@/lib/auth");
            const adminSession = await requireAdmin();
            if (!adminSession) {
                return NextResponse.json({ error: "Unauthorized manual assignment." }, { status: 403 });
            }
        } else if (paymentIntentId) {
            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
                apiVersion: "2025-01-27.acacia" as any,
            });

            try {
                const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

                if (paymentIntent.status !== "succeeded") {
                    return NextResponse.json({ error: "Payment was not successful." }, { status: 400 });
                }

                if (paymentIntent.metadata.userId !== clientId) {
                    return NextResponse.json({ error: "Payment does not match the user." }, { status: 403 });
                }

                const existingMembership = await Membership.findOne({ paymentIntentId });
                if (existingMembership) {
                    return NextResponse.json({ error: "This payment has already been used." }, { status: 409 });
                }

                finalPrice = paymentIntent.amount / 100;
            } catch (error) {
                console.error("Stripe verification failed:", error);
                return NextResponse.json({ error: "Invalid payment intent." }, { status: 400 });
            }
        } else {
            return NextResponse.json({ error: "Payment verification required." }, { status: 400 });
        }

        const membership = await Membership.create({
            client: clientId,
            name: finalName,
            type: finalType,
            price: finalPrice,
            startDate: finalStartDate,
            endDate: finalEndDate,
            status: "active",
            paymentIntentId,
            packageId
        });

        // Trigger email
        try {
            await sendTemplatedEmail({
                to: client.email,
                subject: "Your new Membership at Cheryl Trust",
                type: "membership_added",
                variables: {
                    firstName: client.firstName,
                    type: finalName,
                    startDate: finalStartDate.toLocaleDateString(),
                    endDate: finalEndDate.toLocaleDateString()
                }
            });
        } catch (emailError) {
            console.error("[MembershipAPI] Membership created but email failed:", emailError);
        }


        return NextResponse.json(membership, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create membership" }, { status: 500 });
    }
}
