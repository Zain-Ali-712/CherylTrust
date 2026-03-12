"use server";

import { cookies } from "next/headers";
import { signToken } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function login(prevState: any, formData: FormData) {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (!username || !password) {
        return { error: "Username and password are required" };
    }

    try {
        await connectToDatabase();

        const user = await User.findOne({ username });
        if (!user) {
            return { error: "Invalid credentials" };
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return { error: "Invalid credentials" };
        }

        // Generate token
        const token = await signToken({ userId: user._id, username: user.username });

        // Set cookie
        const cookieStore = await cookies();
        cookieStore.set("admin_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24, // 24 hours
            path: "/",
        });

    } catch (error) {
        console.error("Login error:", error);
        return { error: "An unexpected error occurred" };
    }

    redirect("/admin/testimonials");
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_token");
    redirect("/admin/login");
}

// Dev utility to setup first admin
export async function setupFirstAdmin(password: string) {
    if (process.env.NODE_ENV === "production") return; // Safety check
    try {
        await connectToDatabase();
        const existingUser = await User.findOne({ username: "admin" });
        if (existingUser) return { message: "Admin already exists" };

        const passwordHash = await bcrypt.hash(password, 10);
        await User.create({ username: "admin", passwordHash });
        return { message: "Admin user created successfully with username: admin" };
    } catch (e: any) {
        return { error: e.message };
    }
}
