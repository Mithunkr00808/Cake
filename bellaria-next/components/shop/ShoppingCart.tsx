"use client";

import React from 'react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

import { useCart } from '@/context/CartContext';

const ShoppingCart = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

    const handleRemove = (id: string, name: string) => {
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
                    <div className="table-outer" style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.04)', border: '1px solid #eaeaea', background: '#fff' }}>
                        <table className="cart-table" style={{ borderCollapse: 'collapse', width: '100%', margin: 0, border: 'none' }}>
                            <thead className="cart-header" style={{ background: '#fbfbfb' }}>
                                <tr style={{ borderBottom: '2px solid #eaeaea' }}>
                                    <th className="product-thumbnail" style={{ border: 'none', padding: '20px 15px', color: '#666', fontWeight: 600 }}>&nbsp;</th>
                                    <th className="product-name" style={{ border: 'none', padding: '20px 15px', color: '#666', fontWeight: 600 }}>Product</th>
                                    <th className="product-price" style={{ border: 'none', padding: '20px 15px', color: '#666', fontWeight: 600 }}>Price</th>
                                    <th className="product-quantity" style={{ border: 'none', padding: '20px 15px', color: '#666', fontWeight: 600 }}>Quantity</th>
                                    <th className="product-subtotal" style={{ border: 'none', padding: '20px 15px', color: '#666', fontWeight: 600 }}>Total</th>
                                    <th className="product-remove" style={{ border: 'none', padding: '20px 15px', color: '#666', fontWeight: 600 }}>&nbsp;</th>
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
                                            <td colSpan={6} style={{ textAlign: 'center', padding: '60px 20px', color: '#888', border: 'none' }}>Your cart is currently empty.</td>
                                        </motion.tr>
                                    ) : (
                                        cartItems.map((item) => (
                                            <motion.tr 
                                                className="cart-item" 
                                                key={item.id}
                                                layout
                                                style={{ borderBottom: '1px solid #f4f4f4' }}
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
                                                <td className="product-thumbnail" style={{ border: 'none', padding: '20px 15px', verticalAlign: 'middle' }}>
                                                    <Link href={`/shop/${item.productId}`}><img src={item.image} alt={item.name} className="thumb" style={{ borderRadius: '8px', width: '80px', height: '80px', objectFit: 'cover' }} /></Link>
                                                </td>
                                                <td className="product-name" style={{ border: 'none', padding: '20px 15px', verticalAlign: 'middle' }}>
                                                    <Link href={`/shop/${item.productId}`} style={{ fontWeight: '600', color: '#333', fontSize: '16px' }}>{item.name}</Link>
                                                    {item.options && (
                                                        <div style={{ fontSize: '13px', color: '#777', marginTop: '8px', lineHeight: '1.4' }}>
                                                            {item.options.size && <div><span style={{ color: '#aaa' }}>Size:</span> {item.options.size.label}</div>}
                                                            {item.options.flavor && <div><span style={{ color: '#aaa' }}>Flavor:</span> {item.options.flavor}</div>}
                                                            {item.options.message && <div style={{ fontStyle: 'italic' }}><span style={{ color: '#aaa' }}>Message:</span> "{item.options.message}"</div>}
                                                            {item.options.topper && <div><span style={{ color: '#aaa' }}>Topper:</span> {item.options.topper}</div>}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="product-price" style={{ border: 'none', padding: '20px 15px', verticalAlign: 'middle', fontWeight: '500', color: '#555' }}>₹{item.price.toFixed(2)}</td>
                                                <td className="product-quantity" style={{ border: 'none', padding: '20px 15px', verticalAlign: 'middle' }}>
                                                    <div className="quantity" style={{ margin: 0 }}>
                                                        <input 
                                                            type="number" 
                                                            className="qty" 
                                                            name="qty" 
                                                            style={{ border: '1px solid #ddd', borderRadius: '4px', padding: '5px 10px', width: '70px', textAlign: 'center' }}
                                                            value={item.quantity} 
                                                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                                            min="1"
                                                        />
                                                    </div>
                                                </td>
                                                <td className="product-subtotal" style={{ border: 'none', padding: '20px 15px', verticalAlign: 'middle' }}><span className="amount" style={{ fontWeight: '700', color: '#222' }}>₹{(item.price * item.quantity).toFixed(2)}</span></td>
                                                <td className="product-remove" style={{ border: 'none', padding: '20px 15px', verticalAlign: 'middle', textAlign: 'center' }}> 
                                                    <motion.a 
                                                        href="#"
                                                        whileHover={{ scale: 1.1, color: '#ff4d4d' }}
                                                        whileTap={{ scale: 0.9 }}
                                                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                                                        onClick={(e) => { e.preventDefault(); handleRemove(item.id, item.name); }} 
                                                        className="remove"
                                                        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: '#fff', border: '1px solid #eee', color: '#999', textDecoration: 'none' }}
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
                            {/* Coupon removed */}
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
                            <li className="clearfix"><span className="col">Subtotal</span><span className="col price">₹{cartTotal.toFixed(2)}</span></li>
                            <li className="clearfix"><span className="col">Total</span><span className="col total-price">₹{cartTotal.toFixed(2)}</span></li>
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
