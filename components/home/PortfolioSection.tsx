"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getProducts, Product } from '@/lib/db/products';
import Skeleton from '@/components/common/Skeleton';

const PortfolioSection = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const allProducts = await getProducts();
                // Take up to 8 products for the creations grid
                setProducts(allProducts.slice(0, 8));
            } catch (error) {
                console.error("Error fetching creations:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section className="portfolio-section">
            <div className="auto-container">
                <div className="sec-title text-center">

                    <h2>Our Creations</h2>
                </div>

                {loading ? (
                    <div className="row">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                            <div className="shop-item col-lg-3 col-md-6 col-sm-12" key={n}>
                                <div className="inner-box">
                                    <Skeleton type="image" height="250px" style={{ marginBottom: '15px' }} />
                                    <Skeleton type="title" width="70%" style={{ margin: '0 auto 10px auto' }} />
                                    <Skeleton type="text" width="40%" style={{ margin: '0 auto' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="row">
                        {products.map((product) => (
                            <div className="shop-item col-lg-3 col-md-6 col-sm-12" key={product.id}>
                                <div className="inner-box">
                                    <div className="image-box">
                                        <figure className="image">
                                            <Link href={`/shop/${product.id}`}>
                                                <img 
                                                    src={product.image || (product.images && product.images[0])} 
                                                    alt={product.name} 
                                                    style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '8px' }} 
                                                />
                                            </Link>
                                        </figure>
                                    </div>
                                    <div className="lower-content" style={{ textAlign: 'center', padding: '15px 0' }}>
                                        <h4 className="name" style={{ marginBottom: '5px' }}>
                                            <Link href={`/shop/${product.id}`} style={{ color: '#333', textDecoration: 'none' }}>
                                                {product.name}
                                            </Link>
                                        </h4>
                                        <div className="price" style={{ color: '#ff7a7a', fontWeight: 'bold', fontSize: '18px' }}>
                                            {product.oldPrice && <del style={{ color: '#999', marginRight: '8px', fontSize: '14px', fontWeight: 'normal' }}>₹{product.oldPrice}</del>} 
                                            ₹{product.price.toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default PortfolioSection;
