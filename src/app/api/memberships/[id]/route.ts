import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Membership from "@/models/Membership";
import { sendTemplatedEmail } from "@/lib/emailService";

export async function PATCH(req: Request, { params }: any) {
    try {
        await dbConnect();
        const body = await req.json();
        const { status } = body; 
        const { id } = await params;

        const membership = await Membership.findById(id).populate("client");
        if (!membership) {
            return NextResponse.json({ error: "Membership not found" }, { status: 404 });
        }

        if (status === "cancelled" && membership.status !== "cancelled") {
            membership.status = "cancelled";
            await membership.save();

            if (membership.client && membership.client.email) {
                // Trigger email
                await sendTemplatedEmail({
                    to: membership.client.email,
                    subject: "Membership Cancelled",
                    type: "membership_cancelled",
                    variables: { 
                        firstName: membership.client.firstName, 
                        type: membership.type 
                    }
                });
            }
        }

        return NextResponse.json(membership);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update membership" }, { status: 500 });
    }
}
