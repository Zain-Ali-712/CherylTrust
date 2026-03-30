import mongoose, { Schema, Document, Types } from "mongoose";

export interface IMembership extends Document {
    client: Types.ObjectId;
    type: string;
    price: number;
    startDate: Date;
    endDate: Date;
    status: "active" | "cancelled" | "expired";
}

const MembershipSchema = new Schema(
    {
        client: { type: Schema.Types.ObjectId, ref: "Client", required: true },
        type: { type: String, required: true },
        price: { type: Number, required: true, default: 0 },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        status: { type: String, enum: ["active", "cancelled", "expired"], default: "active" },
    },
    { timestamps: true }
);

export default mongoose.models.Membership || mongoose.model<IMembership>("Membership", MembershipSchema);
