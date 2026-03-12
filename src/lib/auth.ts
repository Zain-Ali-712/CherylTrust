import { SignJWT, jwtVerify } from "jose";

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
