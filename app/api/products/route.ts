import { NextResponse } from 'next/server';
import { getCachedProducts } from '@/lib/db/cache';

export async function GET() {
    try {
        const products = await getCachedProducts();
        return NextResponse.json(products);
    } catch (error) {
        console.error("Error fetching products in API route:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}
