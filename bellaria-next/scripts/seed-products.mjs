import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

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
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const productsCol = collection(db, "products");

    console.log("Seeding products...");

    // Optional: Clear existing products
    // const snapshot = await getDocs(productsCol);
    // for (const document of snapshot.docs) {
    //     await deleteDoc(doc(db, "products", document.id));
    // }

    for (const product of products) {
        await addDoc(productsCol, product);
        console.log(`Added: ${product.name}`);
    }

    console.log("Seeding complete!");
    process.exit(0);
};

seed().catch(err => {
    console.error("Seeding failed:", err);
    process.exit(1);
});
