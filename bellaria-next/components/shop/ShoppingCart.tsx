"use client";

import React from 'react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

import { useCart } from '@/context/CartContext';

const ShoppingCart = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

    const handleRemove = (id: number, name: string) => {
        removeFromCart(id);
        toast.error(`${name} removed from cart`);
    };

    const handleClearCart = () => {
        if (cartItems.length === 0) {
            toast.error("Your cart is already empty");
            return;
        }
        clearCart();
        toast.success("Cart cleared");
    };

    return (
        <section className="cart-section">
            <div className="auto-container">
                {/*Cart Outer*/}
                <div className="cart-outer">
                    <div className="table-outer">
                        <table className="cart-table">
                            <thead className="cart-header">
                                <tr>
                                    <th className="product-thumbnail">&nbsp;</th>
                                    <th className="product-name">Product</th>
                                    <th className="product-price">Price</th>
                                    <th className="product-quantity">Quantity</th>
                                    <th className="product-subtotal">Total</th>
                                    <th className="product-remove">&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence mode='popLayout'>
                                    {cartItems.length === 0 ? (
                                        <motion.tr 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeOut" }}
                                        >
                                            <td colSpan={6} style={{ textAlign: 'center', padding: '40px' }}>Your cart is currently empty.</td>
                                        </motion.tr>
                                    ) : (
                                        cartItems.map((item) => (
                                            <motion.tr 
                                                className="cart-item" 
                                                key={item.id}
                                                layout
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ 
                                                    opacity: 0,
                                                    x: -100,
                                                    height: 0,
                                                    transition: { 
                                                        opacity: { duration: 0.2, ease: "easeOut" },
                                                        x: { duration: 0.3, ease: "easeInOut" },
                                                        height: { duration: 0.3, delay: 0.1, ease: "easeInOut" }
                                                    }
                                                }}
                                                transition={{ 
                                                    type: "spring", 
                                                    stiffness: 500, 
                                                    damping: 30,
                                                    mass: 0.4
                                                }}
                                            >
                                                <td className="product-thumbnail">
                                                    <Link href="#"><img src={item.image} alt={item.name} className="thumb" /></Link>
                                                </td>
                                                <td className="product-name"><Link href="#">{item.name}</Link></td>
                                                <td className="product-price">${item.price.toFixed(2)}</td>
                                                <td className="product-quantity">
                                                    <div className="quantity">
                                                        <label>Quantity</label>
                                                        <input 
                                                            type="number" 
                                                            className="qty" 
                                                            name="qty" 
                                                            value={item.quantity} 
                                                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                                            min="1"
                                                        />
                                                    </div>
                                                </td>
                                                <td className="product-subtotal"><span className="amount">${(item.price * item.quantity).toFixed(2)}</span></td>
                                                <td className="product-remove"> 
                                                    <motion.a 
                                                        href="#"
                                                        whileHover={{ scale: 1.3, rotate: 90 }}
                                                        whileTap={{ scale: 0.8 }}
                                                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                                                        onClick={(e) => { e.preventDefault(); handleRemove(item.id, item.name); }} 
                                                        className="remove"
                                                    >
                                                        <span className="fa fa-times"></span>
                                                    </motion.a>
                                                </td>
                                            </motion.tr>
                                        ))
                                    )}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>

                    <div className="cart-options clearfix">
                        <div className="pull-left">
                            <div className="apply-coupon clearfix">
                                <div className="form-group clearfix">
                                    <input type="text" name="coupon-code" placeholder="Coupon Code" />
                                </div>
                                <div className="form-group clearfix">
                                    <button type="button" className="theme-btn coupon-btn">Apply Coupon</button>
                                </div>
                            </div>
                        </div>

                        <div className="pull-right">
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="button" 
                                className="theme-btn cart-btn" 
                                onClick={handleClearCart}
                            >
                                Clear Cart
                            </motion.button>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-between">
                    <div className="column col-lg-4 offset-lg-8 col-md-6 col-sm-12">
                        {/*Totals Table*/}
                        <ul className="totals-table">
                            <li><h3>Cart Totals</h3></li>
                            <li className="clearfix"><span className="col">Subtotal</span><span className="col price">${cartTotal.toFixed(2)}</span></li>
                            <li className="clearfix"><span className="col">Total</span><span className="col total-price">${cartTotal.toFixed(2)}</span></li>
                            <li className="text-right">
                                <button 
                                    onClick={() => {
                                        if (cartItems.length === 0) {
                                            toast.error("Please add items to cart first");
                                        } else {
                                            window.location.href = "/checkout";
                                        }
                                    }}
                                    className="theme-btn proceed-btn"
                                >
                                    Proceed to Checkout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShoppingCart;
