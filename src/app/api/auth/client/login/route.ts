import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Client from "@/models/Client";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();

        const client = await Client.findOne({ email: body.email });
        if (!client) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const valid = await bcrypt.compare(body.password, client.passwordHash);
        if (!valid) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Sign JWT
        const token = await signToken({
            id: client._id.toString(),
            email: client.email,
            role: "client"
        });

        const response = NextResponse.json({ 
            success: true, 
            message: "Login successful" 
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
        console.error("Login Error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
