
const { MongoClient } = require('mongodb');
const fs = require('fs');

const envFile = fs.readFileSync('.env.local', 'utf8');
const MONGODB_URI = envFile.match(/MONGODB_URI=(.*)/)[1].trim();

async function checkBookings() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        const db = client.db('cheryl');
        const bookings = await db.collection('bookings').find({}).sort({ createdAt: -1 }).limit(5).toArray();
        console.log('Recent bookings:');
        console.log(JSON.stringify(bookings, null, 2));

        const logs = await db.collection('emaillogs').find({}).sort({ createdAt: -1 }).limit(5).toArray();
        console.log('Email logs from DB:');
        console.log(JSON.stringify(logs, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

checkBookings();
