export {};
const admin = require('firebase-admin');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

async function run() {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            }),
        });
    }

    const db = admin.firestore();
    const productsRef = db.collection('products');
    const snapshot = await productsRef.orderBy('name', 'desc').limit(5).get();
    
    snapshot.forEach((doc: any) => {
        const data = doc.data();
        console.log(`ID: ${doc.id}`);
        console.log(`Name: ${data.name}`);
        console.log(`Slug: ${data.slug}`);
        console.log('---');
    });
}

run().catch(console.error);
