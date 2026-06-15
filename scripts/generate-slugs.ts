export {};
const admin = require('firebase-admin');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

// Helper to create a slug from a string
function createSlug(text: string) {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

async function run() {
    try {
        console.log("Checking Firebase credentials...");

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
        console.log("Connected to Firestore. Fetching products...");

        const productsSnapshot = await db.collection('products').get();
        const batch = db.batch();
        let updatedCount = 0;

        productsSnapshot.forEach((doc: any) => {
            const data = doc.data();
            if (data.name && !data.slug) {
                const slug = createSlug(data.name);
                console.log(`Generating slug for product ID ${doc.id}: ${slug}`);
                batch.update(doc.ref, { slug: slug });
                updatedCount++;
            } else if (data.slug) {
                console.log(`Product ID ${doc.id} already has a slug: ${data.slug}. Skipping.`);
            }
        });

        if (updatedCount > 0) {
            await batch.commit();
            console.log(`Successfully generated and saved slugs for ${updatedCount} products.`);
        } else {
            console.log("No products needed slugs generated.");
        }

        process.exit(0);
    } catch (error) {
        console.error("Error generating slugs:", error);
        process.exit(1);
    }
}

run();
