import mongoose, { Schema, Document } from "mongoose";

export interface IMembershipPackage extends Document {
    name: string;
    slug: string;
    description: string;
    price: number;
    currency: string;
    billingPeriod: string;
    durationInDays: number;
    availableFor: string;
    isActive: boolean;
    sessionsAllowed: number | string;
    startDate?: Date;
    endDate?: Date;
}

const MembershipPackageSchema = new Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        description: { type: String },
        price: { type: Number, required: true },
        currency: { type: String, default: "NZD" },
        billingPeriod: { type: String },
        durationInDays: { type: Number, required: true },
        availableFor: { type: String, enum: ["Trust Client", "Non-Trust Client", "all"], default: "all" },
        isActive: { type: Boolean, default: true },
        sessionsAllowed: { type: mongoose.Schema.Types.Mixed, required: true },
        startDate: { type: Date },
        endDate: { type: Date },
    },
    { timestamps: true }
);

export default mongoose.models.MembershipPackage || mongoose.model<IMembershipPackage>("MembershipPackage", MembershipPackageSchema);
