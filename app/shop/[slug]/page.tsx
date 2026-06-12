import React, { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductDetails from '@/components/shop/ProductDetails';
import ProductSidebar from '@/components/shop/ProductSidebar';
import Skeleton from '@/components/common/Skeleton';
import { getCachedProductById, getCachedRelatedProducts } from '@/lib/db/cache';

function ShopSingleLoading() {
    return (
        <div className="product-details">
            <div className="basic-details">
                <div className="row clearfix">
                    <div className="image-column col-md-6 col-sm-12">
                        <Skeleton type="image" height="500px" style={{ marginBottom: '15px' }} />
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <Skeleton type="thumbnail" width="100px" height="100px" />
                            <Skeleton type="thumbnail" width="100px" height="100px" />
                        </div>
                    </div>
                    <div className="info-column col-md-6 col-sm-12">
                        <Skeleton type="title" width="80%" height="40px" style={{ marginBottom: '20px' }} />
                        <Skeleton type="text" width="40%" height="20px" style={{ marginBottom: '30px' }} />
                        <Skeleton type="text" width="100%" height="15px" style={{ marginBottom: '10px' }} />
                        <Skeleton type="text" width="100%" height="15px" style={{ marginBottom: '10px' }} />
                        <Skeleton type="text" width="60%" height="15px" style={{ marginBottom: '40px' }} />
                        <Skeleton type="button" width="200px" height="50px" />
                    </div>
                </div>
            </div>
        </div>
    );
}

async function ShopSingleContent({ slug }: { slug: string }) {
    const product = await getCachedProductById(slug);
    
    if (!product) {
        notFound();
    }
    
    const relatedProducts = await getCachedRelatedProducts(product.id, 3);

    return (
        <>
            {/* Page Title */}
            <section className="page-title" style={{ backgroundImage: 'url(/assets/images/main-slider/slide_2.jpg)' }}>
                <div className="auto-container">
                    <h1>{product.name}</h1>
                    <ul className="page-breadcrumb">
                        <li><Link href="/">home</Link></li>
                        <li><Link href="/shop">Products</Link></li>
                        <li>{product.name}</li>
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
                            <ProductDetails product={product} relatedProducts={relatedProducts} />
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

export default async function ShopSinglePage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    
    return (
        <Suspense fallback={
            <>
                {/* Page Title Loading */}
                <section className="page-title" style={{ backgroundImage: 'url(/assets/images/main-slider/slide_2.jpg)' }}>
                    <div className="auto-container">
                        <h1>Loading...</h1>
                        <ul className="page-breadcrumb">
                            <li><Link href="/">home</Link></li>
                            <li><Link href="/shop">Products</Link></li>
                            <li>Loading...</li>
                        </ul>
                    </div>
                </section>
                
                <div className="sidebar-page-container">
                    <div className="auto-container">
                        <div className="row clearfix">
                            <div className="content-side col-lg-9 col-md-12 col-sm-12">
                                <ShopSingleLoading />
                            </div>
                            <div className="sidebar-side sticky-container col-lg-3 col-md-12 col-sm-12">
                                <ProductSidebar />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        }>
            <ShopSingleContent slug={resolvedParams.slug} />
        </Suspense>
    );
}
