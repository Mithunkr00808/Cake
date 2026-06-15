import { unstable_cache } from 'next/cache';
import { getSettingsAdmin } from './settings-admin';
import { getProductsAdmin, getProductByIdAdmin, getRelatedProductsAdmin, getProductBySlugAdmin } from './products-admin';

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

export const getCachedProductById = (id: string) => unstable_cache(
    async () => getProductByIdAdmin(id),
    ['product-by-id', id], 
    { revalidate: CACHE_TTL, tags: ['products', `product-${id}`] }
)();

export const getCachedProductBySlug = (slug: string) => unstable_cache(
    async () => getProductBySlugAdmin(slug),
    ['product-by-slug', slug], 
    { revalidate: CACHE_TTL, tags: ['products', `product-slug-${slug}`] }
)();

export const getCachedRelatedProducts = (id: string, count: number = 3) => unstable_cache(
    async () => getRelatedProductsAdmin(id, count),
    ['related-products', id, count.toString()],
    { revalidate: CACHE_TTL, tags: ['products'] }
)();
