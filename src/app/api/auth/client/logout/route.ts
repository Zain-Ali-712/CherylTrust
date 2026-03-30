import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({ success: true, message: "Logged out safely." });
    
    response.cookies.delete("client_token");
    
    return response;
}
