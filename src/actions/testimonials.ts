"use server";

import connectToDatabase from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import cloudinary from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

// Helper function to upload buffer to Cloudinary
async function uploadToCloudinary(buffer: Buffer): Promise<{ url: string; public_id: string }> {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { folder: "cheryl_trust_testimonials" },
            (error, result) => {
                if (error) reject(error);
                if (result) resolve({ url: result.secure_url, public_id: result.public_id });
            }
        ).end(buffer);
    });
}

export async function createTestimonial(formData: FormData) {
    try {
        await connectToDatabase();

        const name = formData.get("name") as string;
        const service = formData.get("service") as string;
        const text = formData.get("text") as string;
        const rating = parseInt(formData.get("rating") as string, 10);
        const image = formData.get("image") as File | null;

        if (!name || !service || !text || !rating) {
            return { error: "Missing required fields" };
        }

        let imageUrl;
        let publicId;

        // Handle Image Upload
        if (image && image.size > 0) {
            const buffer = Buffer.from(await image.arrayBuffer());
            const uploadResult = await uploadToCloudinary(buffer);
            imageUrl = uploadResult.url;
            publicId = uploadResult.public_id;
        }

        await Testimonial.create({
            name,
            service,
            text,
            rating,
            imageUrl,
            publicId,
        });

        revalidatePath("/admin/testimonials");
        revalidatePath("/");
        revalidatePath("/testimonials");
        return { success: true };

    } catch (e: any) {
        console.error("Failed to create testimonial:", e);
        return { error: e.message ? String(e.message) : "Failed to create testimonial" };
    }
}

export async function deleteTestimonial(id: string) {
    try {
        await connectToDatabase();

        const testimonial = await Testimonial.findById(id);
        if (!testimonial) {
            return { error: "Testimonial not found" };
        }

        // Delete image from Cloudinary if it exists
        if (testimonial.publicId) {
            await cloudinary.uploader.destroy(testimonial.publicId);
        }

        await Testimonial.findByIdAndDelete(id);

        revalidatePath("/admin/testimonials");
        revalidatePath("/");
        revalidatePath("/testimonials");
        return { success: true };
    } catch (e: any) {
        console.error("Failed to delete testimonial:", e);
        return { error: "Failed to delete testimonial" };
    }
}
