import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.JWT_SECRET;
if (!secretKey) {
    throw new Error("Missing JWT_SECRET environment variable");
}

const key = new TextEncoder().encode(secretKey);

export async function signToken(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(key);
}

export async function verifyToken(input: string) {
    try {
        const { payload } = await jwtVerify(input, key, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (error) {
        return null; // invalid or expired token
    }
}

export async function requireAdmin() {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    
    if (!token) return null;
    
    const payload = await verifyToken(token);
    return payload ? payload : null;
}

export async function requireClient() {
    const cookieStore = await cookies();
    const token = cookieStore.get("client_token")?.value;
    
    if (!token) return null;
    
    const payload = await verifyToken(token);
    return payload ? payload : null;
}
