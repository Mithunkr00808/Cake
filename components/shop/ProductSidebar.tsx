"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const ProductSidebar = () => {
    const { cartItems, cartTotal, removeFromCart } = useCart();

    return (
        <aside className="sidebar" style={{ position: 'sticky', top: '100px' }}>
            <div className="sticky-sidebar">
                {/* Cart Widget */}
                <div className="sidebar-widget cart-widget">
                    <div className="widget-content">
                        <h3 className="widget-title">Cart</h3>

                        <div className="shopping-cart">
                            <ul className="shopping-cart-items">
                                <AnimatePresence mode='popLayout'>
                                {cartItems.length === 0 ? (
                                    <motion.li 
                                        initial={{ opacity: 0, y: 10 }} 
                                        animate={{ opacity: 1, y: 0 }} 
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                        className="cart-item" 
                                        style={{ textAlign: 'center', padding: '10px' }}
                                    >
                                        Cart is empty
                                    </motion.li>
                                ) : (
                                    cartItems.map((item) => (
                                        <motion.li 
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, x: -20, scale: 0.95 }}
                                            animate={{ opacity: 1, x: 0, scale: 1 }}
                                            exit={{ opacity: 0, x: 20, scale: 0.95 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.5 }}
                                            className="cart-item"
                                        >
                                            <Image src={item.image} alt={item.name} width={80} height={80} className="thumb" />
                                            <Link href={`/shop/${item.id}`} className="item-name">{item.name}</Link>
                                            <span className="item-quantity">{item.quantity} x <span className="item-amount">₹{item.price.toFixed(2)}</span></span>
                                            <Link href={`/shop/${item.id}`} className="product-detail"></Link>
                                            <button className="remove-item" onClick={() => removeFromCart(item.id)}><span className="fa fa-times"></span></button>
                                        </motion.li>
                                    ))
                                )}
                                </AnimatePresence>
                            </ul>

                            <div className="cart-footer">
                                <div className="shopping-cart-total"><strong>Subtotal:</strong> ₹{cartTotal.toFixed(2)}</div>
                                <Link href="/cart" className="theme-btn">View Cart</Link>
                                <button 
                                    onClick={() => {
                                        if (cartItems.length === 0) {
                                            toast.error("Please add items to cart first");
                                        } else {
                                            window.location.href = "/checkout";
                                        }
                                    }} 
                                    className="theme-btn"
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </aside>
    );
};

export default ProductSidebar;
