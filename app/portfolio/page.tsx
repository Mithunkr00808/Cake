"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProducts, Product } from '@/lib/db/products';
import Skeleton from '@/components/common/Skeleton';

export default function PortfolioPage() {
    const [images, setImages] = useState<{ url: string; productId: string; title: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const products = await getProducts();
                const allImages: { url: string; productId: string; title: string }[] = [];
                
                products.forEach(product => {
                    // Extract main image
                    if (product.image) {
                        allImages.push({ url: product.image, productId: product.id, title: product.name });
                    }
                    // Extract additional images
                    if (product.images && product.images.length > 0) {
                        product.images.forEach(img => {
                            if (img !== product.image) {
                                allImages.push({ url: img, productId: product.id, title: product.name });
                            }
                        });
                    }
                });

                setImages(allImages);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

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
                    {loading ? (
                        <div className="row">
                            {[1, 2, 3, 4, 5, 6].map((n) => (
                                <div className="portfolio-block col-lg-4 col-md-6 col-sm-12" key={n} style={{ marginBottom: '30px' }}>
                                    <div className="inner-box" style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                                        <Skeleton type="image" height="300px" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : images.length === 0 ? (
                        <div className="text-center py-5">
                            <p>No images found in the portfolio.</p>
                        </div>
                    ) : (
                        <div className="row">
                            {images.map((img, index) => (
                                <div className="portfolio-block col-lg-4 col-md-6 col-sm-12" key={index} style={{ marginBottom: '30px' }}>
                                    <div className="inner-box" style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                                        <div className="image-box">
                                            <figure className="image" style={{ margin: 0 }}>
                                                <Link href={`/shop/${img.productId}`}>
                                                    <img 
                                                        src={img.url} 
                                                        alt={img.title} 
                                                        style={{ width: '100%', height: '300px', objectFit: 'cover', transition: 'transform 0.3s ease' }} 
                                                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
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
