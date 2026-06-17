"use client";
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { Product } from '@/lib/db/products';

interface PortfolioSectionProps {
    initialProducts?: Product[];
}

const PortfolioSection = ({ initialProducts = [] }: PortfolioSectionProps) => {
    return (
        <section className="portfolio-section">
            <div className="auto-container">
                <div className="sec-title text-center">
                    <div className="divider"><img src="/assets/images/icons/divider_1.png" alt="" /></div>
                    <h2>Our Creations</h2>
                </div>

                <div className="row">
                    {initialProducts.length === 0 ? (
                        <div className="col-12 text-center py-5">
                            <p>No products available.</p>
                        </div>
                    ) : initialProducts.map((product) => (
                        <div className="portfolio-block col-lg-3 col-md-6 col-sm-12" key={product.id}>
                            <div className="inner-box">
                                <div className="image-box">
                                    <figure className="image">
                                        <Link href={`/shop/${product.slug || product.id}`}>
                                            <img 
                                                src={product.image || (product.images && product.images[0])} 
                                                alt={product.name} 
                                                style={{ width: '100%', height: '250px', objectFit: 'cover' }} 
                                            />
                                        </Link>
                                    </figure>
                                </div>
                                <div className="lower-content" style={{ textAlign: 'center', padding: '15px 0' }}>
                                    <h4 className="name" style={{ marginBottom: '5px' }}>
                                        <Link href={`/shop/${product.slug || product.id}`} style={{ color: '#333', textDecoration: 'none' }}>
                                            {product.name}
                                        </Link>
                                    </h4>
                                    <div className="price" style={{ color: '#ff7a7a', fontWeight: 'bold', fontSize: '18px' }}>
                                        {product.oldPrice && <del style={{ color: '#999', marginRight: '8px', fontSize: '14px', fontWeight: 'normal' }}>₹{product.oldPrice}</del>} 
                                        ₹{(product.price || 0).toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PortfolioSection;
