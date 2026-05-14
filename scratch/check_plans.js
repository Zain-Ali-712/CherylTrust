
const { MongoClient } = require('mongodb');
const fs = require('fs');

const envFile = fs.readFileSync('.env.local', 'utf8');
const MONGODB_URI = envFile.match(/MONGODB_URI=(.*)/)[1].trim();

async function checkSpecials() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        const db = client.db('cheryl-annie'); // Based on repo name cheryl-annie, or cheryl
        const specials = await db.collection('specialpackages').find({}).toArray();
        console.log('Special Packages:');
        console.log(JSON.stringify(specials, null, 2));
        
        const memberships = await db.collection('membershipplans').find({}).toArray();
        console.log('Membership Plans:');
        console.log(JSON.stringify(memberships, null, 2));
    } catch (e) {
        // try other db name
        try {
            const db = client.db('cheryl');
            const specials = await db.collection('specialpackages').find({}).toArray();
            console.log('Special Packages (cheryl db):');
            console.log(JSON.stringify(specials, null, 2));
        } catch (e2) {
             console.error(e2);
        }
    } finally {
        await client.close();
    }
}

checkSpecials();
