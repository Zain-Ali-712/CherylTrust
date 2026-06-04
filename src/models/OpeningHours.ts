import mongoose, { Schema, Document } from "mongoose";

export interface IOpeningHours extends Document {
    dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
    openTime: string; // e.g. "09:00"
    closeTime: string; // e.g. "17:00"
    slotDuration: number;
    bufferTime: number;
    isActive: boolean;
}

const OpeningHoursSchema = new Schema(
    {
        dayOfWeek: { type: Number, required: true, min: 0, max: 6 },
        openTime: { type: String, required: true },
        closeTime: { type: String, required: true },
        slotDuration: { type: Number, required: true, default: 60 },
        bufferTime: { type: Number, required: true, default: 0 },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export default mongoose.models.OpeningHours || mongoose.model<IOpeningHours>("OpeningHours", OpeningHoursSchema);
