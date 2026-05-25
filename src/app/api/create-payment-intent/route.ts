import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import dbConnect from "@/lib/mongodb";
import SpecialPackage from "@/models/SpecialPackage";
import { verifyToken } from "@/lib/auth";

// Initialize Stripe with secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-01-27.acacia" as any, // Using a stable version
});

export async function POST(req: NextRequest) {
    try {
        // 1. Authentication Check
        const token = req.cookies.get("client_token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const decoded = await verifyToken(token);
        if (!decoded || (decoded as any).role !== "client") {
            return NextResponse.json({ error: "Invalid session" }, { status: 403 });
        }

        // 2. Parse request
        const { packageId, service, voucherCode, membershipType, membershipPackageId, bookingPackageId, slotsCount } = await req.json();
        const finalSlotsCount = slotsCount && typeof slotsCount === "number" && slotsCount > 0 ? slotsCount : 1;

        let amount = 0;
        let description = "";

        await dbConnect();

        // 3. Secure Price Calculation (Backend-only logic)
        if (membershipPackageId) {
            const MembershipPackage = (await import("@/models/MembershipPackage")).default;
            const pkg = await MembershipPackage.findById(membershipPackageId);
            if (!pkg || !pkg.isActive) return NextResponse.json({ error: "Invalid membership package" }, { status: 400 });
            amount = pkg.price;
            description = pkg.name;
        } else if (bookingPackageId) {
            const BookingPackage = (await import("@/models/BookingPackage")).default;
            const pkg = await BookingPackage.findById(bookingPackageId);
            if (!pkg || !pkg.isActive) return NextResponse.json({ error: "Invalid booking package" }, { status: 400 });
            amount = pkg.price * finalSlotsCount;
            description = `${pkg.name} (${finalSlotsCount} session${finalSlotsCount > 1 ? 's' : ''})`;
        } else if (membershipType) {
            if (membershipType === "Country Club Trust Membership" || membershipType === "Country Club Non Trust Membership") {
                amount = 30;
            } else if (membershipType === "Feb Valentines Special (2 Members)") {
                amount = 35;
            } else if (membershipType === "Feb Valentines Special") {
                amount = 45;
            } else {
                return NextResponse.json({ error: "Invalid membership type" }, { status: 400 });
            }
            description = membershipType;
        } else if (packageId) {
            const pkg = await SpecialPackage.findById(packageId);
            if (!pkg || !pkg.isActive) throw new Error("Invalid package");
            amount = pkg.price;
            description = pkg.title;
        } else {
            return NextResponse.json({ error: "Missing purchase details" }, { status: 400 });
        }

        // 4. Apply Voucher (Securely re-validated on backend)
        if (voucherCode) {
            const Discount = (await import("@/models/Discount")).default;
            const voucher = await Discount.findOne({ code: voucherCode.toUpperCase() });
            if (voucher && new Date(voucher.expiryDate) >= new Date() && voucher.timesUsed < voucher.usageLimit) {
                if (voucher.type === "percentage") {
                    amount = amount - (amount * voucher.value / 100);
                } else {
                    amount = Math.max(0, amount - voucher.value);
                }
            }
        }

        // Convert to cents for Stripe
        const finalAmountCents = Math.round(amount * 100);

        // 5. Create Stripe Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: finalAmountCents,
            currency: "nzd",
            metadata: {
                packageId: packageId || "",
                membershipPackageId: membershipPackageId || "",
                bookingPackageId: bookingPackageId || "",
                service: service || "",
                membershipType: membershipType || "",
                userId: (decoded as any).id,
                voucherCode: voucherCode || ""
            },
            automatic_payment_methods: { enabled: true },
        });

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
            amount: amount
        });

    } catch (error: any) {
        console.error("Stripe Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
