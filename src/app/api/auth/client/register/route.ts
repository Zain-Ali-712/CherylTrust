import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Client from "@/models/Client";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();

        // Check existing
        const existing = await Client.findOne({ email: body.email });
        if (existing) {
            return NextResponse.json({ error: "Email already exists" }, { status: 400 });
        }

        const passwordHash = await bcrypt.hash(body.password, 10);

        const newClient = await Client.create({
            firstName: body.firstName,
            lastName: body.lastName,
            secondaryName: body.secondaryName,
            email: body.email,
            phone: body.phone,
            passwordHash,
            address: body.address,
            trustTechniqueCompleted: body.trustTechniqueCompleted,
            dogs: body.dogs || [],
            reasonsForPark: body.reasonsForPark || [],
            agreements: body.agreements,
            status: "active"
        });

        // Sign JWT
        const token = await signToken({
            id: newClient._id.toString(),
            email: newClient.email,
            role: "client"
        });

        const response = NextResponse.json({ 
            success: true, 
            message: "Registration successful" 
        });
        
        response.cookies.set({
            name: "client_token",
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24, // 24 hours
            path: "/"
        });

        return response;
    } catch (error: any) {
        console.error("Register Error:", error);
        return NextResponse.json({ error: "Failed to register. Missing fields." }, { status: 500 });
    }
}
