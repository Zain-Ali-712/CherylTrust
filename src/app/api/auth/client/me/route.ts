import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import dbConnect from "@/lib/mongodb";
import Client from "@/models/Client";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("client_token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const decoded = await verifyToken(token);
        if (!decoded || decoded.role !== "client") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        let userId = decoded.id;
        if (typeof userId === "object") {
            // Force a re-login to wipe the old buffer object token
            return NextResponse.json({ error: "Malformed session token. Please re-login." }, { status: 401 });
        }

        await dbConnect();
        const client = await Client.findById(userId).select("-passwordHash");
        if (!client) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            id: client._id,
            email: client.email,
            firstName: client.firstName,
            lastName: client.lastName
        });
    } catch (e) {
        console.error("Auth Me Error:", e);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
