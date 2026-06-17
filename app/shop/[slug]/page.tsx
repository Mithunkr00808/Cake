import React, { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductDetails from '@/components/shop/ProductDetails';
import ProductSidebar from '@/components/shop/ProductSidebar';
import Skeleton from '@/components/common/Skeleton';
import { getCachedProductBySlug, getCachedRelatedProducts } from '@/lib/db/cache';
import { getSettingsAdmin } from '@/lib/db/settings-admin';
import type { Metadata } from 'next';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    let product = await getCachedProductBySlug(slug);

    if (!product) {
        const { getCachedProductById } = await import('@/lib/db/cache');
        product = await getCachedProductById(slug);
    }

    if (!product) {
        return {
            title: "Product Not Found",
        };
    }

    return {
        title: product.name,
        description:
            product.description ||
            `Order ${product.name} online from Slice of Cake, Thrissur. Premium handcrafted cake, delivered fresh. ₹${product.price}`,
        alternates: {
            canonical: `https://sliceofcake.in/shop/${product.slug || product.id}`,
        },
        openGraph: {
            title: `${product.name} – Slice of Cake`,
            description:
                product.description ||
                `Order ${product.name} online. Premium handcrafted cake from Thrissur, Kerala.`,
            url: `https://sliceofcake.in/shop/${product.slug || product.id}`,
            images: product.image
                ? [
                      {
                          url: product.image,
                          width: 800,
                          height: 800,
                          alt: product.name,
                      },
                  ]
                : [],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${product.name} – Slice of Cake`,
            description:
                product.description ||
                `Order ${product.name} online from Slice of Cake.`,
            images: product.image ? [product.image] : [],
        },
    };
}

function getProductJsonLd(product: {
    id: string;
    slug?: string;
    name: string;
    price: number;
    description?: string;
    image: string;
    images?: string[];
    category?: string;
    sale: boolean;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description:
            product.description ||
            `Premium handcrafted ${product.name} from Slice of Cake, Thrissur.`,
        image: product.images?.length
            ? product.images
            : [product.image],
        brand: {
            "@type": "Brand",
            name: "Slice of Cake",
        },
        category: product.category || "Cakes",
        offers: {
            "@type": "Offer",
            url: `https://sliceofcake.in/shop/${product.slug || product.id}`,
            priceCurrency: "INR",
            price: product.price,
            availability: "https://schema.org/InStock",
            seller: {
                "@type": "Organization",
                name: "Slice of Cake",
            },
        },
    };
}

function getProductBreadcrumbJsonLd(productName: string, product: { slug?: string; id: string }) {
    return {
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
            {
                "@type": "ListItem",
                position: 3,
                name: productName,
                item: `https://sliceofcake.in/shop/${product.slug || product.id}`,
            },
        ],
    };
}
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
    let product = await getCachedProductBySlug(slug);
    
    if (!product) {
        const { getCachedProductById } = await import('@/lib/db/cache');
        product = await getCachedProductById(slug);
    }
    
    if (!product) {
        notFound();
    }
    
    const relatedProducts = await getCachedRelatedProducts(product.id, 3);
    const settings = await getSettingsAdmin();
    const validPincodes = settings?.deliverablePincodes || [];

    return (
        <>
            {/* Product JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(getProductJsonLd(product)) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(getProductBreadcrumbJsonLd(product.name, product)) }}
            />
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
                            <ProductDetails product={product} relatedProducts={relatedProducts} validPincodes={validPincodes} />
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
