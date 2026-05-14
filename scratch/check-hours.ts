import fs from "fs";
import path from "path";

async function checkHours() {
    // 1. Manually load .env.local BEFORE importing any models/lib
    try {
        const envPath = path.resolve(process.cwd(), ".env.local");
        if (fs.existsSync(envPath)) {
            const envFile = fs.readFileSync(envPath, "utf8");
            const match = envFile.match(/MONGODB_URI=(.*)/);
            if (match) {
                process.env.MONGODB_URI = match[1].trim();
            }
        }
    } catch (e) {
        console.warn("Warning: Could not load .env.local");
    }

    // 2. Use dynamic imports
    try {
        const mongoose = (await import("mongoose")).default;
        const dbConnect = (await import("../src/lib/mongodb")).default;
        const OpeningHours = (await import("../src/models/OpeningHours")).default;

        console.log("Connecting to database...");
        await dbConnect();
        
        console.log("Connection readyState:", mongoose.connection.readyState);
        if (mongoose.connection.readyState !== 1) {
            console.log("Waiting for connection to be fully open...");
            await new Promise((resolve) => mongoose.connection.once("open", resolve));
        }

        console.log("Fetching Opening Hours...");
        // Use a timeout for the query
        const hours = await OpeningHours.find({}).lean().exec();
        
        console.log("\nCurrent Opening Hours in DB:");
        if (hours.length === 0) {
            console.log("No opening hours found in the collection.");
        } else {
            console.log(JSON.stringify(hours, null, 2));
        }
    } catch (error) {
        console.error("Error occurred:", error);
    } finally {
        process.exit(0);
    }
}

checkHours();
