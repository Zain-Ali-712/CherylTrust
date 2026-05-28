import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Membership from "@/models/Membership";
import Client from "@/models/Client";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("admin_token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const payload = await verifyToken(token);
        if (!payload) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        
        // Ensure Client model is registered (Mongoose error fix for population)
        // Accessing Client here ensures the model is loaded in the current scope
        if (!Client) {
            console.error("Client model failed to load");
        }

        const now = new Date();
        // Fetch all active memberships that have not expired
        const activeMemberships = await Membership.find({
            status: "active",
            endDate: { $gte: now }
        })
        .select("client type startDate endDate price")
        .populate({
            path: "client",
            select: "firstName lastName email phone"
        })
        .lean();

        // Sort alphabetically by last name, then first name
        activeMemberships.sort((a: any, b: any) => {
            const lastA = a.client?.lastName || "";
            const lastB = b.client?.lastName || "";
            if (lastA !== lastB) return lastA.localeCompare(lastB);
            
            const firstA = a.client?.firstName || "";
            const firstB = b.client?.firstName || "";
            return firstA.localeCompare(firstB);
        });

        if (!activeMemberships || activeMemberships.length === 0) {
            // Return empty CSV with headers if no memberships found
            const emptyCsv = "First Name,Last Name,Email,Phone,Membership Type,Start Date,End Date,Price\n";
            return new Response(emptyCsv, {
                headers: {
                    "Content-Type": "text/csv",
                    "Content-Disposition": "attachment; filename=live_memberships.csv",
                },
            });
        }

        // Generate CSV rows
        const headers = ["First Name", "Last Name", "Email", "Phone", "Membership Type", "Start Date", "End Date", "Price"];
        const formatDate = (dateString: any) => {
            if (!dateString) return "";
            const d = new Date(dateString);
            return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
        };

        const rows = activeMemberships.map((m: any) => {
            const client = m.client;
            return [
                client?.firstName || "",
                client?.lastName || "",
                client?.email || "",
                client?.phone || "",
                m.type || "",
                formatDate(m.startDate),
                formatDate(m.endDate),
                (m.price || 0).toFixed(2)
            ].map(field => `"${String(field).replace(/"/g, '""')}"`).join(",");
        });

        const csvContent = [headers.join(","), ...rows].join("\n");
        const filename = `live_memberships_${now.toISOString().split('T')[0]}.csv`;

        return new Response(csvContent, {
            headers: {
                "Content-Type": "text/csv",
                "Content-Disposition": `attachment; filename="${filename}"`,
            },
        });
    } catch (error: any) {
        console.error("Error generating membership report:", error);
        return NextResponse.json({ 
            error: "Failed to generate report", 
            details: error.message 
        }, { status: 500 });
    }
}
