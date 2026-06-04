import mongoose, { Schema, Document, Types } from "mongoose";

export interface IReviewRequest extends Document {
    client: Types.ObjectId;
    sentAt: Date;
}

const ReviewRequestSchema = new Schema(
    {
        client: { type: Schema.Types.ObjectId, ref: "Client", required: true, unique: true },
        sentAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default mongoose.models.ReviewRequest || mongoose.model<IReviewRequest>("ReviewRequest", ReviewRequestSchema);
