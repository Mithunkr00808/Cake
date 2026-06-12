import React, { Suspense } from 'react';
import ShopSidebar from '@/components/shop/ShopSidebar';
import ProductGrid from '@/components/shop/ProductGrid';
import Link from 'next/link';
import { getCachedProducts } from '@/lib/db/cache';

export default async function ShopPage() {
    const initialProducts = await getCachedProducts();

    return (
        <>
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
