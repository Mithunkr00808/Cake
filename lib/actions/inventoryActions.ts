"use server";

import { db } from "@/lib/firebase-admin";
import { Product } from "@/lib/db/products";

/**
 * Fetches products using cursor-based pagination.
 * @param lastDocumentId The ID of the last document in the current list, or null for the first page.
 * @param pageSize The number of items to fetch.
 */
export async function getProductsPaginatedServerAction(
    lastDocumentId: string | null = null,
    pageSize: number = 12
): Promise<{ products: Product[], hasMore: boolean }> {
    try {
        let query = db.collection('products')
            .orderBy('name') // Must order by something for pagination
            .limit(pageSize);

        if (lastDocumentId) {
            const lastDocSnap = await db.collection('products').doc(lastDocumentId).get();
            if (lastDocSnap.exists) {
                query = query.startAfter(lastDocSnap);
            } else {
                console.warn(`Last document ID ${lastDocumentId} not found for pagination.`);
            }
        }

        const snapshot = await query.get();
        
        const products = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Product));

        // Check if there are more items by seeing if we got a full page
        const hasMore = products.length === pageSize;

        return { products, hasMore };
    } catch (error) {
        console.error("Error fetching paginated products:", error);
        return { products: [], hasMore: false };
    }
}
