import { db } from '@/lib/firebase-admin';
import InventoryClient from './_components/InventoryClient';
import { Product } from '@/lib/db/products';

export const dynamic = "force-dynamic";

export default async function InventoryPage() {
    let products: Product[] = [];

    try {
        const snapshot = await db.collection('products').get();
        products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    } catch (error) {
        console.error("Error fetching products server-side:", error);
    }

    return <InventoryClient initialProducts={products} />;
}
