import OpeningHours from "@/models/OpeningHours";
import Booking from "@/models/Booking";
import Client from "@/models/Client";
import dbConnect from "@/lib/mongodb"; // Assuming there's a mongodb connection init logic here

function convertTo24Hour(timeStr: string): string {
    if (!timeStr) return "00:00";
    const cleaned = timeStr.trim().toUpperCase();
    const isPM = cleaned.includes("PM");
    const isAM = cleaned.includes("AM");
    
    // Remove AM/PM
    const timePart = cleaned.replace(/\s?[AP]M/, "");
    const parts = timePart.split(":");
    let hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10) || 0;
    
    if (isPM && hours !== 12) {
        hours += 12;
    } else if (isAM && hours === 12) {
        hours = 0;
    }
    
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

export const checkBookingAvailability = async (
    dateString: string, // ISO string or YYYY-MM-DD
    timeString?: string, // e.g. "10:00 AM" or "14:30" (optional, falls back to time in dateString)
    excludeBookingId?: string
): Promise<{ valid: boolean; reason?: string; clientValid?: boolean }> => {
    
    await dbConnect();
    
    // Parse base date (YYYY-MM-DD)
    const baseDateString = dateString.split('T')[0];
    const baseDate = new Date(baseDateString);
    
    // Extract target time
    let targetTime = "00:00";
    if (timeString) {
        targetTime = timeString;
    } else if (dateString.includes('T')) {
        const timePart = dateString.split('T')[1];
        targetTime = timePart.substring(0, 5);
    }
    
    const time24 = convertTo24Hour(targetTime);
    const [hours, minutes] = time24.split(":").map(Number);
    
    const desiredStart = new Date(baseDate);
    desiredStart.setHours(hours, minutes, 0, 0);
    
    const dayOfWeek = desiredStart.getDay(); // 0-6

    // Rule 2: Booking must be within opening hours and start at a valid slot time
    const openingHoursInfo = await OpeningHours.findOne({ dayOfWeek });
    
    if (!openingHoursInfo || !openingHoursInfo.isActive) {
        return { valid: false, reason: "Closed on this day." };
    }

    const parseMins = (tStr: string) => {
        const [h, m] = tStr.split(":").map(Number);
        return h * 60 + (m || 0);
    };

    const formatMins = (mins: number) => {
        const h = Math.floor(mins / 60);
        const m = mins % 60;
        return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
    };

    const openTimeMins = parseMins(openingHoursInfo.openTime);
    const closeTimeMins = parseMins(openingHoursInfo.closeTime);
    const slotD = openingHoursInfo.slotDuration !== undefined ? openingHoursInfo.slotDuration : 60;
    const buffer = openingHoursInfo.bufferTime !== undefined ? openingHoursInfo.bufferTime : 0;

    let currentMins = openTimeMins;
    const validStarts = [];
    while (currentMins + slotD <= closeTimeMins) {
        validStarts.push(currentMins);
        currentMins += slotD + buffer;
    }

    const requestedMins = hours * 60 + minutes;
    if (!validStarts.includes(requestedMins)) {
        const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return { 
            valid: false, 
            reason: `Bookings on ${DAYS[dayOfWeek]} must start at one of the valid times: ${validStarts.map(formatMins).join(", ")}.` 
        };
    }

    // Rule 3: Session is 50 mins + 10 mins buffer -> takes up exactly 60 mins.
    // Check if ANY booking exists on the same calendar day with the same startTime slot.
    const startOfDay = new Date(desiredStart);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(desiredStart);
    endOfDay.setHours(23, 59, 59, 999);

    // Format target time to both formats to verify database consistency
    const isPM = hours >= 12;
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    const time12 = `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${isPM ? 'PM' : 'AM'}`;

    const query: any = {
        date: { $gte: startOfDay, $lte: endOfDay },
        startTime: { $in: [time24, time12] },
        status: { $in: ["confirmed", "moved"] } // Cancelled bookings free up the slot
    };

    if (excludeBookingId) {
        query._id = { $ne: excludeBookingId };
    }

    const overlappingBooking = await Booking.findOne(query);

    if (overlappingBooking) {
        return { valid: false, reason: "This time slot is already booked." };
    }

    return { valid: true };
};
