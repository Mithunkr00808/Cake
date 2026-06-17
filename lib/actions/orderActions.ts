"use server";

import { db } from "@/lib/firebase-admin";
import { CreateOrderInput } from "@/lib/db/orders";
import { getProductByIdAdmin } from "@/lib/db/products-admin";
import { FieldValue } from "firebase-admin/firestore";
// Cloudinary is now handled entirely on the client side for faster checkout
import { createOrderSchema } from "@/lib/validations/order";

export async function createOrderServerAction(rawData: any): Promise<string | null> {
    try {
        // 1. Validate inputs using Zod (Strict Schema Validation)
        const data = createOrderSchema.parse(rawData);

        const verifiedItems = await Promise.all(
            data.items.map(async (item) => {
                const lookupId = item.productId || String(item.id).split('-{')[0];
                const product = await getProductByIdAdmin(lookupId);
                
                if (!product) {
                    throw new Error(`Product not found: ${lookupId}`);
                }

                return {
                    ...item,
                    price: product.price
                };
            })
        );

        const calculatedTotal = verifiedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        // 3. Write securely to Firestore using admin SDK (bypasses client-side rules)
        const orderData = {
            ...data,
            items: verifiedItems,
            total: calculatedTotal,
            createdAt: FieldValue.serverTimestamp(),
        };

        const docRef = await db.collection("orders").add(orderData);
        
        return docRef.id;
    } catch (error: any) {
        console.error("Server Action - Error creating order:", error);
        require('fs').writeFileSync('/tmp/order-error.log', String(error?.stack || error?.message || error));
        return null;
    }
}

export async function getOrderByIdServerAction(orderId: string): Promise<any | null> {
    try {
        const docRef = db.collection("orders").doc(orderId);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            return null;
        }

        const data = docSnap.data();
        
        // Serialize timestamps for the client
        if (data && data.createdAt) {
            data.createdAt = data.createdAt.toDate().toISOString();
        }

        return {
            id: docSnap.id,
            ...data
        };
    } catch (error) {
        console.error("Server Action - Error fetching order:", error);
        return null;
    }
}
