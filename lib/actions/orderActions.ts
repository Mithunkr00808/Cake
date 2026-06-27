"use server";

import { db } from "@/lib/firebase-admin";
import { CreateOrderInput } from "@/lib/db/orders";
import { getProductByIdAdmin } from "@/lib/db/products-admin";
import { FieldValue } from "firebase-admin/firestore";
// Cloudinary is now handled entirely on the client side for faster checkout
import { createOrderSchema } from "@/lib/validations/order";
import { verifySession } from "@/lib/auth/verifySession";
import { headers } from "next/headers";

// Security: In-memory rate limiter for order creation (per-instance; use Redis for multi-instance)
const orderRateLimitMap = new Map<string, { count: number; lastReset: number }>();
const ORDER_RATE_LIMIT = 5;       // max orders per window
const ORDER_RATE_WINDOW = 60_000; // 1 minute

function checkOrderRateLimit(key: string): boolean {
    const now = Date.now();
    const entry = orderRateLimitMap.get(key);
    if (!entry || now - entry.lastReset > ORDER_RATE_WINDOW) {
        orderRateLimitMap.set(key, { count: 1, lastReset: now });
        return true;
    }
    if (entry.count >= ORDER_RATE_LIMIT) return false;
    entry.count++;
    return true;
}

export async function createOrderServerAction(rawData: any): Promise<string | null> {
    try {
        // Security: Rate limit by user ID or IP
        const session = await verifySession();
        const headerStore = await headers();
        const rateLimitKey = session?.uid || headerStore.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
        if (!checkOrderRateLimit(rateLimitKey)) {
            console.warn(`Order rate limit exceeded for: ${rateLimitKey}`);
            return null;
        }

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
        // Security: Always hardcode status to 'pending' — never trust client-supplied status
        const { status: _ignoredStatus, ...safeData } = data;
        const orderData = {
            ...safeData,
            items: verifiedItems,
            total: calculatedTotal,
            status: 'pending',
            createdAt: FieldValue.serverTimestamp(),
        };

        const docRef = await db.collection("orders").add(orderData);
        
        return docRef.id;
    } catch (error: any) {
        console.error("Server Action - Error creating order:", error);
        return null;
    }
}

export async function getOrderByIdServerAction(orderId: string): Promise<any | null> {
    try {
        // Security: Verify the caller is authenticated and owns this order
        const session = await verifySession();

        const docRef = db.collection("orders").doc(orderId);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            return null;
        }

        const data = docSnap.data();

        // Security: Only allow the order owner or admin to view the order
        if (session) {
            const isAdmin = session.admin === true;
            const isOwner = data?.userId && session.uid === data.userId;
            if (!isAdmin && !isOwner) {
                console.warn(`Unauthorized order access attempt: uid=${session.uid}, orderId=${orderId}`);
                return null;
            }
        } else if (data?.userId) {
            // Order belongs to a registered user but caller is not authenticated
            console.warn(`Unauthenticated access attempt to user-owned order: orderId=${orderId}`);
            return null;
        }
        // Note: Guest orders (no userId) are accessible by anyone with the orderId,
        // which serves as a bearer token — this is the standard pattern for guest checkout.
        
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
