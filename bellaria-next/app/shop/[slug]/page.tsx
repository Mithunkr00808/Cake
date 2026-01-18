import React from 'react';
import Link from 'next/link';
import ProductDetails from '@/components/shop/ProductDetails';
import ProductSidebar from '@/components/shop/ProductSidebar';

export default function ShopSinglePage({ params }: { params: { slug: string } }) {
    return (
        <>
            {/* Page Title */}
            <section className="page-title" style={{ backgroundImage: 'url(/assets/images/main-slider/slide_2.jpg)' }}>
                <div className="auto-container">
                    <h1>Birthday Cake</h1>
                    <ul className="page-breadcrumb">
                        <li><Link href="/">home</Link></li>
                        <li><Link href="/shop">Products</Link></li>
                        <li>Birthday Cake</li>
                    </ul>
                </div>
            </section>
            {/* End Page Title */}

            {/* Sidebar Page Container */}
            <div className="sidebar-page-container">
                <div className="auto-container">
                    <div className="row clearfix">

                        {/* Content Side */}
                        <div className="content-side col-lg-9 col-md-12 col-sm-12">
                            <ProductDetails />
                        </div>

                        {/* Sidebar Side */}
                        <div className="sidebar-side sticky-container col-lg-3 col-md-12 col-sm-12">
                            <ProductSidebar />
                        </div>
                    </div>
                </div>
            </div>
            {/* End Sidebar Page Container */}
        </>
    );
}
