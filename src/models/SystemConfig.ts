import mongoose, { Schema, Document } from "mongoose";

export interface ISystemConfig extends Document {
    key: string;
    value: string;
    description?: string;
}

const SystemConfigSchema = new Schema(
    {
        key: { type: String, required: true, unique: true },
        value: { type: String, required: true },
        description: { type: String },
    },
    { timestamps: true }
);

export default mongoose.models.SystemConfig || mongoose.model<ISystemConfig>("SystemConfig", SystemConfigSchema);
