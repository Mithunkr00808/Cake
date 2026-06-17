"use client";

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import PageTitle from '@/components/common/PageTitle';

export default function OrderConfirmationClient({ order, orderId }: { order: any, orderId: string | undefined }) {
    const checkVariants: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut", delay: 0.2 }
        }
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut", delay: 0.5, staggerChildren: 0.2 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <>
            <PageTitle
                title="Order Confirmed"
                breadcrumb={[
                    { label: 'Home', href: '/' },
                    { label: 'Shop', href: '/shop' },
                    { label: 'Order Confirmed' },
                ]}
                backgroundImage="/assets/images/background/about-title-bg.png"
            />

            <section className="checkout-page" style={{ padding: '80px 0', background: '#fcfcfc' }}>
                <div className="auto-container">
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        style={{
                            background: '#fff',
                            borderRadius: '16px',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
                            maxWidth: '750px',
                            margin: '0 auto',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Header Section */}
                        <div style={{ padding: '50px 40px', textAlign: 'center', borderBottom: '1px dashed #eee' }}>
                            <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 25px' }}>
                                <motion.svg 
                                    width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"
                                >
                                    <motion.path
                                        d="M14.1 27.2L22.3 35.4L37.9 14.6"
                                        stroke="#22c55e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
                                        variants={checkVariants}
                                        initial="hidden" animate="visible"
                                    />
                                </motion.svg>
                            </div>

                            <motion.h2 variants={itemVariants} style={{ marginBottom: '15px', color: '#111', fontSize: '32px', fontWeight: 700 }}>Order Confirmed!</motion.h2>
                            <motion.p variants={itemVariants} style={{ color: '#666', fontSize: '16px', lineHeight: '1.6', margin: 0 }}>
                                Thank you for your purchase. We've received your order and are getting it ready.
                            </motion.p>
                            
                            {orderId && (
                                <motion.div variants={itemVariants} style={{ marginTop: '20px', display: 'inline-block', background: '#f8f9fa', padding: '10px 20px', borderRadius: '30px', border: '1px solid #eaeaea' }}>
                                    <span style={{ color: '#666', fontSize: '14px' }}>Order ID:</span> <strong style={{ color: '#333', fontFamily: 'monospace', letterSpacing: '1px' }}>{orderId}</strong>
                                </motion.div>
                            )}
                        </div>

                        {/* Order Details Section */}
                        {order && (
                            <div style={{ padding: '40px' }}>
                                <motion.h3 variants={itemVariants} style={{ fontSize: '20px', marginBottom: '25px', color: '#222', borderBottom: '2px solid #ff7a7a', display: 'inline-block', paddingBottom: '5px' }}>Order Details</motion.h3>
                                
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '40px' }}>
                                    <motion.div variants={itemVariants}>
                                        <h4 style={{ fontSize: '16px', color: '#555', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Shipping Address</h4>
                                        <p style={{ color: '#333', lineHeight: '1.7', margin: 0 }}>
                                            <strong>{order.customer.firstName} {order.customer.lastName}</strong><br/>
                                            {order.customer.address}<br/>
                                            {order.customer.apartment && <>{order.customer.apartment}<br/></>}
                                            {order.customer.city}, {order.customer.state} {order.customer.pincode}<br/>
                                            {order.customer.phone}
                                        </p>
                                    </motion.div>
                                    
                                    <motion.div variants={itemVariants}>
                                        <h4 style={{ fontSize: '16px', color: '#555', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Payment Summary</h4>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <span style={{ color: '#666' }}>Payment Method:</span>
                                            <span style={{ color: '#333', fontWeight: 600 }}>{order.paymentMethod}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <span style={{ color: '#666' }}>Order Status:</span>
                                            <span style={{ color: '#ffa500', fontWeight: 600, textTransform: 'capitalize' }}>{order.status}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #eee' }}>
                                            <span style={{ color: '#222', fontWeight: 700 }}>Total Amount:</span>
                                            <span style={{ color: '#ff7a7a', fontWeight: 700, fontSize: '18px' }}>₹{order.total.toFixed(2)}</span>
                                        </div>
                                    </motion.div>
                                </div>

                                <motion.h4 variants={itemVariants} style={{ fontSize: '16px', color: '#555', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>Items Ordered</motion.h4>
                                <motion.div variants={itemVariants} style={{ border: '1px solid #eaeaea', borderRadius: '8px', overflow: 'hidden' }}>
                                    {order.items.map((item: any, index: number) => (
                                        <div key={index} style={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            padding: '20px', 
                                            borderBottom: index !== order.items.length - 1 ? '1px solid #eaeaea' : 'none',
                                            background: index % 2 === 0 ? '#fff' : '#fcfcfc'
                                        }}>
                                            <div style={{ 
                                                width: '70px', 
                                                height: '70px', 
                                                borderRadius: '8px', 
                                                overflow: 'hidden', 
                                                marginRight: '20px',
                                                border: '1px solid #eee',
                                                flexShrink: 0
                                            }}>
                                                <img src={item.options?.photoUrl || item.image || '/assets/images/resource/products/1.jpg'} alt={`Product image of ${item.name}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <h5 style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#222' }}>{item.name}</h5>
                                                <div style={{ fontSize: '13px', color: '#777', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                                                    <span>Qty: <strong>{item.quantity}</strong></span>
                                                    {item.options?.size && <span>Size: {item.options.size.label}</span>}
                                                    {item.options?.flavor && <span>Flavor: {item.options.flavor}</span>}
                                                </div>
                                            </div>
                                            <div style={{ fontWeight: 600, color: '#333', marginLeft: '15px' }}>
                                                ₹{(item.price * item.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            </div>
                        )}

                        {/* Footer Actions */}
                        <div style={{ padding: '30px 40px', background: '#fcfcfc', borderTop: '1px solid #eee', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link href="/shop" className="theme-btn">
                                <span className="btn-title">Continue Shopping</span>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
