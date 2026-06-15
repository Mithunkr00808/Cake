import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCachedProducts } from '@/lib/db/cache';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Portfolio – Our Cake Creations",
    description:
        "Explore our portfolio of premium handcrafted cakes. From elegant wedding cakes to fun birthday cakes — see the artistry of Slice of Cake, Thrissur.",
    alternates: {
        canonical: "https://sliceofcake.in/portfolio",
    },
    openGraph: {
        title: "Portfolio – Slice of Cake Creations",
        description:
            "Explore our portfolio of premium handcrafted cakes from Thrissur, Kerala.",
        url: "https://sliceofcake.in/portfolio",
    },
};

export default async function PortfolioPage() {
    const products = await getCachedProducts();

    // Build image list from products (server-side)
    const images: { url: string; productId: string; title: string }[] = [];
    if (products && products.length > 0) {
        products.forEach((product) => {
            if (product.image) {
                images.push({ url: product.image, productId: product.slug || product.id, title: product.name });
            }
            if (product.images && product.images.length > 0) {
                product.images.forEach((img) => {
                    if (img !== product.image) {
                        images.push({ url: img, productId: product.slug || product.id, title: product.name });
                    }
                });
            }
        });
    }

    return (
        <>
            {/* Page Title */}
            <section className="page-title" style={{ backgroundImage: 'url(/assets/images/main-slider/slide_2.jpg)' }}>
                <div className="auto-container">
                    <h1>Portfolio</h1>
                    <ul className="page-breadcrumb">
                        <li><Link href="/">home</Link></li>
                        <li>Portfolio</li>
                    </ul>
                </div>
            </section>
            {/* End Page Title */}

            {/* Portfolio Section */}
            <section className="portfolio-section" style={{ padding: '80px 0' }}>
                <div className="auto-container">
                    {images.length === 0 ? (
                        <div className="text-center py-5">
                            <p>No images found in the portfolio.</p>
                        </div>
                    ) : (
                        <div className="row">
                            {images.map((img, index) => (
                                <div className="portfolio-block col-lg-4 col-md-6 col-sm-12" key={index} style={{ marginBottom: '30px' }}>
                                    <div className="inner-box" style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                                        <div className="image-box">
                                            <figure className="image" style={{ margin: 0, position: 'relative', height: '300px' }}>
                                                <Link href={`/shop/${img.productId}`}>
                                                    <Image
                                                        src={img.url}
                                                        alt={img.title}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                        style={{ objectFit: 'cover', transition: 'transform 0.3s ease' }}
                                                    />
                                                </Link>
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
