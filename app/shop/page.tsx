import React, { Suspense } from 'react';
import ShopSidebar from '@/components/shop/ShopSidebar';
import ProductGrid from '@/components/shop/ProductGrid';
import Link from 'next/link';
import { getCachedProducts } from '@/lib/db/cache';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Shop Premium Cakes Online – Thrissur",
    description:
        "Browse and order premium handcrafted cakes online. Birthday cakes, wedding cakes, cupcakes, pastries & more. Fresh delivery from Slice of Cake, Thrissur, Kerala.",
    alternates: {
        canonical: "https://sliceofcake.in/shop",
    },
    openGraph: {
        title: "Shop Premium Cakes Online – Slice of Cake",
        description:
            "Browse and order premium handcrafted cakes. Birthday cakes, wedding cakes, cupcakes & pastries. Fresh delivery in Thrissur.",
        url: "https://sliceofcake.in/shop",
    },
};

const shopBreadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://sliceofcake.in",
        },
        {
            "@type": "ListItem",
            position: 2,
            name: "Shop",
            item: "https://sliceofcake.in/shop",
        },
    ],
};
export default async function ShopPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const resolvedParams = await searchParams;
    const category = typeof resolvedParams?.category === 'string' ? resolvedParams.category : undefined;

    let initialProducts = await getCachedProducts();
    
    if (category) {
        // Special case mapping if Occasion Cakes is used, map it to Custom Cakes if no Occasion Cakes exist
        // Or just do a simple case-insensitive match
        initialProducts = initialProducts.filter(p => 
            p.category?.toLowerCase() === category.toLowerCase() || 
            (category.toLowerCase() === 'occasion cakes' && p.category?.toLowerCase() === 'custom cakes')
        );
    }

    return (
        <>
            {/* Breadcrumb JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(shopBreadcrumbJsonLd) }}
            />
            {/* Page Title */}
            <section className="page-title" style={{ backgroundImage: 'url(/assets/images/main-slider/slide_2.jpg)' }}>
                <div className="auto-container">
                    <h1>Shop</h1>
                    <ul className="page-breadcrumb">
                        <li><Link href="/">home</Link></li>
                        <li>Shop</li>
                    </ul>
                </div>
            </section>

            {/* Sidebar Page Container */}
            <div className="sidebar-page-container">
                <div className="auto-container">
                    <div className="row clearfix">

                        {/* Content Side */}
                        <div className="content-side col-lg-9 col-md-12 col-sm-12">
                            <ProductGrid initialProducts={initialProducts} />
                        </div>

                        {/* Sidebar Side */}
                        <div className="sidebar-side sticky-container col-lg-3 col-md-12 col-sm-12">
                            <ShopSidebar />
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
