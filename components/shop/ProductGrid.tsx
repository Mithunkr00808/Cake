"use client";

import React, { useCallback } from 'react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

import { useCart } from '@/context/CartContext';

import { getProducts, Product } from '@/lib/db/products';

const ProductGrid = () => {
    const { addToCart } = useCart();
    const [products, setProducts] = React.useState<Product[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
                toast.error("Failed to load products.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = useCallback((e: React.MouseEvent, product: any) => {
        e.preventDefault();
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image
        });
        toast.success(`${product.name} added to cart!`);
    }, [addToCart]);

    if (loading) {
        return <div className="text-center py-5"><h4>Loading products...</h4></div>;
    }

    return (
        <div className="our-shop">
            <div className="shop-upper-box clearfix">
                <div className="items-label">Showing all {products.length} results</div>
                <div className="orderby">
                    <select name="orderby" className="sortby-select">
                        <option value="popularity">Sort by popularity</option>
                        <option value="rating">Sort by average rating</option>
                        <option value="date">Sort by newness</option>
                        <option value="price">Sort by price: low to high</option>
                        <option value="price-desc">Sort by price: high to low</option>
                    </select>
                </div>
            </div>

            <div className="row clearfix">
                {products.length === 0 ? (
                    <div className="col-12 text-center py-5">
                        <p>No products found. Please seed the database.</p>
                    </div>
                ) : products.map((product) => (
                    <div className="shop-item col-lg-4 col-md-6 col-sm-12" key={product.id}>
                        <div className="inner-box">
                            <div className="image-box">
                                {product.sale && <div className="sale-tag">sale!</div>}
                                <figure className="image">
                                    <Link href="#"><img src={product.image} alt={product.name} style={{ width: '100%', height: '300px', objectFit: 'cover' }} /></Link>
                                </figure>
                                <div className="btn-box">
                                    <motion.button 
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={(e) => handleAddToCart(e, product)} 
                                        style={{ background: 'none', border: 'none', width: '100%' }}
                                    >
                                        <a href="#" onClick={(e) => e.preventDefault()}>Add to cart</a>
                                    </motion.button>
                                </div>
                            </div>
                            <div className="lower-content">
                                <h4 className="name"><Link href="#">{product.name}</Link></h4>
                                <div className="rating">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={`fa fa-star ${i < Math.floor(product.rating) ? '' : 'light'}`}></span>
                                    ))}
                                </div>
                                <div className="price">
                                    {product.oldPrice && <del>{product.oldPrice}</del>} ${product.price.toFixed(2)}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;
