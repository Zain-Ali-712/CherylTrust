import mongoose, { Schema, Document, Types } from "mongoose";

export interface IBooking extends Document {
    client: Types.ObjectId;
    service: string;
    price: number;
    date: Date;
    startTime: string;
    endTime: string;
    status: "confirmed" | "cancelled" | "moved";
    paymentStatus: "unpaid" | "paid" | "refunded";
    paymentIntentId?: string;
}

const BookingSchema = new Schema(
    {
        client: { type: Schema.Types.ObjectId, ref: "Client", required: true },
        service: { type: String, required: true, default: "Canine Adventure Park" },
        price: { type: Number, required: true, default: 0 },
        date: { type: Date, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        status: { type: String, enum: ["confirmed", "cancelled", "moved"], default: "confirmed" },
        paymentStatus: { type: String, enum: ["unpaid", "paid", "refunded"], default: "unpaid" },
        paymentIntentId: { type: String },
        packageId: { type: Schema.Types.ObjectId, ref: "BookingPackage" },
    },
    { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);
