import mongoose, { Schema, Document } from "mongoose";

export interface IDiscount extends Document {
    code: string;
    type: "percentage" | "fixed";
    value: number;
    expiryDate: Date;
    usageLimit: number;
    timesUsed: number;
}

const DiscountSchema = new Schema(
    {
        code: { type: String, required: true, unique: true },
        type: { type: String, enum: ["percentage", "fixed"], required: true },
        value: { type: Number, required: true },
        expiryDate: { type: Date, required: true },
        usageLimit: { type: Number, required: true, default: 1 },
        timesUsed: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.models.Discount || mongoose.model<IDiscount>("Discount", DiscountSchema);
