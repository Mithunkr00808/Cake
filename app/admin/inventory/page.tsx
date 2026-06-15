import { db } from '@/lib/firebase-admin';
import InventoryClient from './_components/InventoryClient';
import { Product } from '@/lib/db/products';

import { getProductsPaginatedServerAction } from '@/lib/actions/inventoryActions';

export const dynamic = "force-dynamic";

export default async function InventoryPage() {
    let products: Product[] = [];
    let hasMore = false;

    try {
        const result = await getProductsPaginatedServerAction(null, 12);
        products = result.products;
        hasMore = result.hasMore;
    } catch (error) {
        console.error("Error fetching initial products server-side:", error);
    }

    return <InventoryClient initialProducts={products} initialHasMore={hasMore} />;
}
