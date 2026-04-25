import dbConnect from "./mongodb";
import Membership from "@/models/Membership";

export async function hasActiveMembership(clientId: string): Promise<boolean> {
    try {
        await dbConnect();
        const now = new Date();
        const activeMembership = await Membership.findOne({
            client: clientId,
            status: "active",
            endDate: { $gt: now }
        });
        return !!activeMembership;
    } catch (error) {
        console.error("Error checking membership:", error);
        return false;
    }
}
