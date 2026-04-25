import { NextResponse } from "next/server";
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

        const memberships = await Membership.find(query).populate("client", "firstName lastName email").sort({ createdAt: -1 });
        return NextResponse.json(memberships);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch memberships" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const { clientId, type, price, startDate, endDate } = body;

        if (!clientId || !type || !startDate || !endDate) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const client = await Client.findById(clientId);
        if (!client) {
            return NextResponse.json({ error: "Client not found" }, { status: 404 });
        }

        // Prevent overlapping active memberships
        const overlapping = await Membership.findOne({
            client: clientId,
            status: "active",
            startDate: { $lte: new Date(endDate) },
            endDate: { $gte: new Date(startDate) }
        });

        if (overlapping) {
            return NextResponse.json({ error: "Client already has an active membership during this period" }, { status: 400 });
        }

        const membership = await Membership.create({
            client: clientId,
            type,
            price: price || 0,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            status: "active"
        });

        // Trigger email
        try {
            await sendTemplatedEmail({
                to: client.email,
                subject: "Your new Membership at Cheryl Trust",
                type: "membership_added",
                variables: { 
                    firstName: client.firstName, 
                    type, 
                    startDate: new Date(startDate).toLocaleDateString(), 
                    endDate: new Date(endDate).toLocaleDateString() 
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
