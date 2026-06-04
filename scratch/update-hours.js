const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

async function updateHours() {
    try {
        const envPath = path.resolve(process.cwd(), '.env.local');
        const envFile = fs.readFileSync(envPath, 'utf8');
        const MONGODB_URI = envFile.match(/MONGODB_URI=(.*)/)[1].trim();

        const client = new MongoClient(MONGODB_URI);
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db('cheryl');
        const collection = db.collection('openinghours');

        const result = await collection.updateMany(
            {},
            {
                $set: {
                    openTime: "08:00",
                    closeTime: "18:00",
                    isActive: true,
                    updatedAt: new Date()
                }
            }
        );

        console.log(`Updated ${result.modifiedCount} opening hour records.`);
        await client.close();
        process.exit(0);
    } catch (error) {
        console.error("Error updating hours:", error);
        process.exit(1);
    }
}

updateHours();
