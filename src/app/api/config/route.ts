import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SystemConfig from "@/models/SystemConfig";

export async function GET(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const key = searchParams.get("key");
        
        if (key) {
            const config = await SystemConfig.findOne({ key });
            return NextResponse.json(config);
        }
        
        const configs = await SystemConfig.find({});
        return NextResponse.json(configs);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch config" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { key, value, description } = await req.json();
        
        const config = await SystemConfig.findOneAndUpdate(
            { key },
            { value, description },
            { upsert: true, new: true }
        );
        
        return NextResponse.json(config);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update config" }, { status: 500 });
    }
}
