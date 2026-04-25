import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
    client: mongoose.Types.ObjectId;
    clientName: string;
    rating: number;
    comment: string;
    isApproved: boolean;
    date: Date;
}

const ReviewSchema = new Schema(
    {
        client: { type: Schema.Types.ObjectId, ref: "Client", required: false },
        clientName: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, required: true },
        isApproved: { type: Boolean, default: false },
        date: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);
