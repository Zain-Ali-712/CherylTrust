import mongoose, { Schema, Document } from "mongoose";

export interface IBlackoutDate extends Document {
    date: Date;
    reason?: string;
}

const BlackoutDateSchema = new Schema(
    {
        date: { type: Date, required: true, unique: true },
        reason: { type: String },
    },
    { timestamps: true }
);

export default mongoose.models.BlackoutDate || mongoose.model<IBlackoutDate>("BlackoutDate", BlackoutDateSchema);
