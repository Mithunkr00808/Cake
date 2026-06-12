import { unstable_cache } from 'next/cache';
import { getSettingsAdmin } from './settings-admin';
import { getProductsAdmin, getProductByIdAdmin, getRelatedProductsAdmin } from './products-admin';

// Cache revalidation time (e.g., 3600 seconds = 1 hour)
const CACHE_TTL = 3600;

export const getCachedSettings = unstable_cache(
    async () => getSettingsAdmin(),
    ['store-settings'],
    { revalidate: CACHE_TTL, tags: ['settings'] }
);

export const getCachedProducts = unstable_cache(
    async () => getProductsAdmin(),
    ['all-products'],
    { revalidate: CACHE_TTL, tags: ['products'] }
);

export const getCachedProductById = unstable_cache(
    async (id: string) => getProductByIdAdmin(id),
    ['product-by-id'], // We rely on unstable_cache's internal stringification of args, but it's best to keep key static or use it as a prefix
    { revalidate: CACHE_TTL, tags: ['products'] }
);

export const getCachedRelatedProducts = unstable_cache(
    async (id: string, count: number = 3) => getRelatedProductsAdmin(id, count),
    ['related-products'],
    { revalidate: CACHE_TTL, tags: ['products'] }
);
