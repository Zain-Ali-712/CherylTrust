import mongoose, { Schema, Document } from "mongoose";

function hasMaxDogs(val: any[]) {
    return val.length <= 3;
}

export interface IClient extends Document {
    firstName: string;
    lastName: string;
    secondaryName?: string;
    email: string;
    phone: string;
    passwordHash: string;
    address: string;
    trustTechniqueCompleted: boolean;
    dogs: {
        name: string;
        age: string;
        neutered: boolean;
        vaxUpToDate: boolean;
    }[];
    reasonsForPark: string[];
    agreements: {
        terms: boolean;
        cancellation: boolean;
        marketing: boolean;
    };
    status: "active" | "cancelled";
}

const ClientSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        secondaryName: { type: String },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true },
        passwordHash: { type: String, required: true },
        address: { type: String, required: true },
        trustTechniqueCompleted: { type: Boolean, required: true },
        dogs: {
            type: [
                {
                    name: String,
                    age: String,
                    neutered: Boolean,
                    vaxUpToDate: Boolean
                }
            ],
            validate: [hasMaxDogs, 'Exceeds the limit of 3 dogs']
        },
        reasonsForPark: [{ type: String }],
        agreements: {
            terms: { type: Boolean, required: true },
            cancellation: { type: Boolean, required: true },
            marketing: { type: Boolean, default: false }
        },
        status: { type: String, enum: ["active", "cancelled"], default: "active" },
    },
    { timestamps: true }
);

export default mongoose.models.Client || mongoose.model<IClient>("Client", ClientSchema);
