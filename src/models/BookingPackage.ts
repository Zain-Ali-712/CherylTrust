import mongoose, { Schema, Document } from "mongoose";

export interface IBookingPackage extends Document {
    name: string;
    description: string;
    price: number;
    currency: string;
    clientType: string;
    isActive: boolean;
}

const BookingPackageSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        price: { type: Number, required: true },
        currency: { type: String, default: "NZD" },
        clientType: { type: String, enum: ["Trust Client", "Non-Trust Client", "all"], default: "all" },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export default mongoose.models.BookingPackage || mongoose.model<IBookingPackage>("BookingPackage", BookingPackageSchema);
