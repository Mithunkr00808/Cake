"use server";

import { db } from "@/lib/firebase-admin";
import { CreateOrderInput } from "@/lib/db/orders";
import { getProductByIdAdmin } from "@/lib/db/products-admin";
import { FieldValue } from "firebase-admin/firestore";

import { createOrderSchema } from "@/lib/validations/order";

export async function createOrderServerAction(rawData: unknown): Promise<string | null> {
    try {
        // 1. Validate inputs using Zod (Strict Schema Validation)
        const data = createOrderSchema.parse(rawData);

        // 2. Recalculate and verify the total price securely on the server
        let calculatedTotal = 0;
        const verifiedItems = [];

        for (const item of data.items) {
            // Fetch the actual product from the database
            const lookupId = item.productId || String(item.id).split('-{')[0];
            const product = await getProductByIdAdmin(lookupId);
            
            if (!product) {
                throw new Error(`Product not found: ${lookupId}`);
            }

            // Use the database price, not the client-provided price
            calculatedTotal += product.price * item.quantity;
            verifiedItems.push({
                ...item,
                price: product.price // override with real price
            });
        }

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
