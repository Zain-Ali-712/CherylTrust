import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Client from "@/models/Client";
import { sendTemplatedEmail } from "@/lib/emailService";
import Booking from "@/models/Booking";

export async function GET(req: Request, { params }: any) {
    try {
        const adminSession = await requireAdmin();
        if (!adminSession) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        await dbConnect();
        const { id } = await params;
        const client = await Client.findById(id).lean();
        if (!client) {
            return NextResponse.json({ error: "Client not found" }, { status: 404 });
        }
        return NextResponse.json(client);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch client" }, { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: any) {
    try {
        const adminSession = await requireAdmin();
        if (!adminSession) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        await dbConnect();
        const body = await req.json();
        const { status } = body; // expecting "cancelled"
        const { id } = await params;

        const client = await Client.findById(id);
        if (!client) {
            return NextResponse.json({ error: "Client not found" }, { status: 404 });
        }

        if (status === "cancelled" && client.status !== "cancelled") {
            client.status = "cancelled";
            await client.save();

            // Cancel any future bookings
            await Booking.updateMany(
                { client: client._id, date: { $gte: new Date() }, status: { $ne: "cancelled" } },
                { status: "cancelled" }
            );

            // Trigger email
            await sendTemplatedEmail({
                to: client.email,
                subject: "Cheryl Trust - Account Cancelled",
                type: "client_cancelled",
                variables: { firstName: client.firstName, lastName: client.lastName }
            });
        } else if (status === "active" && client.status !== "active") {
            client.status = "active";
            await client.save();
        }

        return NextResponse.json(client);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update client" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: any) {
    try {
        const adminSession = await requireAdmin();
        if (!adminSession) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        await dbConnect();
        const { id } = await params;
        const body = await req.json();

        const client = await Client.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        if (!client) {
            return NextResponse.json({ error: "Client not found" }, { status: 404 });
        }
        return NextResponse.json(client);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update client" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: any) {
    try {
        const adminSession = await requireAdmin();
        if (!adminSession) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        await dbConnect();
        const { id } = await params;

        await Booking.deleteMany({ client: id });
        const result = await Client.findByIdAndDelete(id);
        if (!result) {
            return NextResponse.json({ error: "Client not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Client permanently deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete client" }, { status: 500 });
    }
}
