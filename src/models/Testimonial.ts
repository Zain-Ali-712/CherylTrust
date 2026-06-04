import mongoose, { Schema, Document } from "mongoose";

export interface ITestimonial extends Document {
    name: string;
    service: string;
    text: string;
    rating: number;
    imageUrl?: string;
    publicId?: string; // Cloudinary public_id
    createdAt: Date;
    updatedAt: Date;
}

const TestimonialSchema = new Schema(
    {
        name: { type: String, required: true },
        service: { type: String, required: true },
        text: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        imageUrl: { type: String },
        publicId: { type: String },
    },
    { timestamps: true }
);

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
