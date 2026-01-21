"use client";

import React from 'react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

import { useCart } from '@/context/CartContext';

const products = [
    {
        id: 1,
        name: "Authentic Macaroons",
        price: 25.00,
        oldPrice: "$29.00",
        rating: 4,
        image: "/assets/images/resource/macarons.png",
        sale: true
    },
    {
        id: 2,
        name: "Birthday Cake",
        price: 84.00,
        rating: 4.5,
        image: "/assets/images/resource/birthday-cake.png",
        sale: false
    },
    {
        id: 3,
        name: "Candy Lollipop",
        price: 15.00,
        rating: 3,
        image: "/assets/images/resource/donuts.png",
        sale: false
    },
    {
        id: 4,
        name: "Classic Macaroon",
        price: 22.00,
        rating: 4.5,
        image: "/assets/images/resource/macarons.png",
        sale: false
    },
    {
        id: 5,
        name: "Coffee Cake",
        price: 39.00,
        rating: 3,
        image: "/assets/images/resource/cake.png",
        sale: false
    },
    {
        id: 6,
        name: "French Macaroon",
        price: 17.00,
        rating: 5,
        image: "/assets/images/resource/macarons.png",
        sale: true
    },
    {
        id: 7,
        name: "Happy Ninja",
        price: 35.00,
        rating: 5,
        image: "/assets/images/resource/occasion-cake.png",
        sale: false
    },
    {
        id: 8,
        name: "Hearts Lollipop",
        price: 17.00,
        rating: 5,
        image: "/assets/images/resource/donuts.png",
        sale: false
    },
    {
        id: 9,
        name: "Lemon Lollipop",
        price: 35.00,
        rating: 5,
        image: "/assets/images/resource/donuts.png",
        sale: false
    },
    {
        id: 10,
        name: "Limo Lollipop",
        price: 32.00,
        rating: 0,
        image: "/assets/images/resource/donuts.png",
        sale: false
    },
    {
        id: 11,
        name: "Premium Lollipop",
        price: 9.00,
        oldPrice: "$15.00",
        rating: 3,
        image: "/assets/images/resource/donuts.png",
        sale: true
    },
    {
        id: 12,
        name: "Yami Makaroons",
        price: 17.00,
        rating: 4.5,
        image: "/assets/images/resource/macarons.png",
        sale: false
    }
];

const ProductGrid = () => {
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent, product: any) => {
        e.preventDefault();
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image
        });
        toast.success(`${product.name} added to cart!`);
    };

    return (
        <div className="our-shop">
            <div className="shop-upper-box clearfix">
                <div className="items-label">Showing all {products.length} results</div>
                <div className="orderby">
                    <select name="orderby" className="sortby-select select2-offscreen">
                        <option value="popularity">Sort by popularity</option>
                        <option value="rating">Sort by average rating</option>
                        <option value="date">Sort by newness</option>
                        <option value="price">Sort by price: low to high</option>
                        <option value="price-desc">Sort by price: high to low</option>
                    </select>
                </div>
            </div>

            <div className="row clearfix">
                {products.map((product) => (
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
