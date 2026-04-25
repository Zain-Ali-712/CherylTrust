import mongoose, { Schema, Document } from "mongoose";

export interface ISpecialPackage extends Document {
    title: string;
    subtitle: string;
    price: number;
    duration: string;
    sessions: string;
    membershipRequired: boolean;
    isActive: boolean;
    expiryDate?: Date;
}

const SpecialPackageSchema = new Schema(
    {
        title: { type: String, required: true },
        subtitle: { type: String, required: true },
        price: { type: Number, required: true },
        duration: { type: String, required: true },
        sessions: { type: String, required: true },
        membershipRequired: { type: Boolean, default: true },
        isActive: { type: Boolean, default: true },
        expiryDate: { type: Date },
    },
    { timestamps: true }
);

export default mongoose.models.SpecialPackage || mongoose.model<ISpecialPackage>("SpecialPackage", SpecialPackageSchema);
