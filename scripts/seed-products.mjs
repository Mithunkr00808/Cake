import admin from "firebase-admin";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load service account
const serviceAccountPath = join(__dirname, "../firebase-service-account.json");
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

const products = [
    {
        name: "Authentic Macaroons",
        price: 25.00,
        oldPrice: "$29.00",
        rating: 4,
        image: "/assets/images/resource/macarons.png",
        sale: true,
        category: "macarons"
    },
    {
        name: "Birthday Cake",
        price: 84.00,
        rating: 4.5,
        image: "/assets/images/resource/birthday-cake.png",
        sale: false,
        category: "cake"
    },
    {
        name: "Candy Lollipop",
        price: 15.00,
        rating: 3,
        image: "/assets/images/resource/donuts.png",
        sale: false,
        category: "lollipop"
    },
    {
        name: "Classic Macaroon",
        price: 22.00,
        rating: 4.5,
        image: "/assets/images/resource/macarons.png",
        sale: false,
        category: "macarons"
    },
    {
        name: "Coffee Cake",
        price: 39.00,
        rating: 3,
        image: "/assets/images/resource/cake.png",
        sale: false,
        category: "cake"
    },
    {
        name: "French Macaroon",
        price: 17.00,
        rating: 5,
        image: "/assets/images/resource/macarons.png",
        sale: true,
        category: "macarons"
    },
    {
        name: "Happy Ninja",
        price: 35.00,
        rating: 5,
        image: "/assets/images/resource/occasion-cake.png",
        sale: false,
        category: "cake"
    },
    {
        name: "Hearts Lollipop",
        price: 17.00,
        rating: 5,
        image: "/assets/images/resource/donuts.png",
        sale: false,
        category: "lollipop"
    },
    {
        name: "Lemon Lollipop",
        price: 35.00,
        rating: 5,
        image: "/assets/images/resource/donuts.png",
        sale: false,
        category: "lollipop"
    },
    {
        name: "Limo Lollipop",
        price: 32.00,
        rating: 0,
        image: "/assets/images/resource/donuts.png",
        sale: false,
        category: "lollipop"
    },
    {
        name: "Premium Lollipop",
        price: 9.00,
        oldPrice: "$15.00",
        rating: 3,
        image: "/assets/images/resource/donuts.png",
        sale: true,
        category: "lollipop"
    },
    {
        name: "Yami Makaroons",
        price: 17.00,
        rating: 4.5,
        image: "/assets/images/resource/macarons.png",
        sale: false,
        category: "macarons"
    }
];

const seed = async () => {
    const productsCol = db.collection("products");

    console.log("Seeding products...");

    for (const product of products) {
        await productsCol.add(product);
        console.log(`Added: ${product.name}`);
    }

    console.log("Seeding complete!");
    process.exit(0);
};

seed().catch(err => {
    console.error("Seeding failed:", err);
    process.exit(1);
});
