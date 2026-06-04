import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Client from "@/models/Client";
import { sendTemplatedEmail } from "@/lib/emailService";

export async function GET() {
    try {
        const adminSession = await requireAdmin();
        if (!adminSession) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        await dbConnect();
        const clients = await Client.find({})
            .select("firstName lastName email phone status")
            .sort({ createdAt: -1 })
            .lean();
        return NextResponse.json(clients);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const { firstName, lastName, email, phone, address, secondaryName, trustTechniqueCompleted, dogs, reasonsForPark, agreements } = body;

        if (!firstName || !lastName || !email) {
            return NextResponse.json({ error: "First name, last name, and email are required" }, { status: 400 });
        }

        const existingClient = await Client.findOne({ email });
        if (existingClient) {
            return NextResponse.json({ error: "Email must be unique" }, { status: 400 });
        }

        const client = await Client.create({ 
            firstName, lastName, email, phone, 
            address, secondaryName, trustTechniqueCompleted, 
            dogs: dogs || [], reasonsForPark: reasonsForPark || [], agreements: agreements || {} 
        });

        // Trigger email
        try {
            await sendTemplatedEmail({
                to: email,
                subject: "Welcome to Cheryl Trust!",
                type: "client_added",
                variables: { firstName, lastName }
            });
        } catch (emailError) {
            console.error("[ClientAPI] Client created but email failed:", emailError);
        }


        return NextResponse.json(client, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create client" }, { status: 500 });
    }
}
