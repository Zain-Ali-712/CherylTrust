import OpeningHours from "@/models/OpeningHours";
import Booking from "@/models/Booking";
import Client from "@/models/Client";
import dbConnect from "@/lib/mongodb"; // Assuming there's a mongodb connection init logic here

export const checkBookingAvailability = async (
    dateString: string // ISO string representing booking start time
): Promise<{ valid: boolean; reason?: string; clientValid?: boolean }> => {
    
    await dbConnect();
    const desiredStart = new Date(dateString);
    
    // Rule 1: Bookings must start on the hour
    if (desiredStart.getMinutes() !== 0 && desiredStart.getMinutes() !== 30) {
        // Technically prompt says "Can start only on the hour"
        if (desiredStart.getMinutes() !== 0) {
             return { valid: false, reason: "Bookings can only start exactly on the hour (e.g., 09:00)." };
        }
    }

    const dayOfWeek = desiredStart.getDay(); // 0-6
    const hours = desiredStart.getHours();
    const timeString = `${hours.toString().padStart(2, '0')}:00`;

    // Rule 2: Booking must be within opening hours
    const openingHoursInfo = await OpeningHours.findOne({ dayOfWeek });
    
    if (!openingHoursInfo || !openingHoursInfo.isActive) {
        return { valid: false, reason: "Closed on this day." };
    }

    const openTime = parseInt(openingHoursInfo.openTime.replace(":", ""));
    const closeTime = parseInt(openingHoursInfo.closeTime.replace(":", ""));
    const requestedTime = parseInt(timeString.replace(":", ""));

    // Ex: open 09:00 -> 900. close 17:00 -> 1700. If an appointment lasts 50 min, you can't book at 16:30.
    // If it starts on the hour, last booking is at closeTime - 1 hour
    if (requestedTime < openTime || requestedTime >= closeTime) {
        return { valid: false, reason: "Booking time is outside opening hours." };
    }

    // Rule 3: Session is 50 mins + 10 mins buffer -> takes up exactly 60 mins.
    // We already enforce "must start on the hour". We just need to check if ANY booking exists with the same hour.
    const startOfHour = new Date(desiredStart);
    startOfHour.setMinutes(0, 0, 0);

    const endOfHour = new Date(desiredStart);
    endOfHour.setMinutes(59, 59, 999);

    const overlappingBooking = await Booking.findOne({
        date: { $gte: startOfHour, $lte: endOfHour },
        status: { $in: ["confirmed", "moved"] } // Cancelled bookings free up the slot
    });

    if (overlappingBooking) {
        return { valid: false, reason: "This time slot is already booked." };
    }

    return { valid: true };
};
