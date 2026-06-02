"use client";

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import PageTitle from '@/components/common/PageTitle';

function OrderConfirmationContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('id');

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

            <section className="checkout-page" style={{ padding: '80px 0' }}>
                <div className="auto-container">
                    <div style={{
                        textAlign: 'center',
                        padding: '60px 40px',
                        background: '#fff',
                        borderRadius: '12px',
                        boxShadow: '0 4px 30px rgba(0,0,0,0.07)',
                        maxWidth: '600px',
                        margin: '0 auto',
                    }}>
                        {/* Checkmark */}
                        <div style={{
                            width: '80px', height: '80px', borderRadius: '50%',
                            background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 30px',
                            fontSize: '36px',
                            color: '#fff',
                        }}>✓</div>

                        <h2 style={{ marginBottom: '15px', color: '#222' }}>Thank You for Your Order!</h2>
                        <p style={{ color: '#666', marginBottom: '25px', fontSize: '16px', lineHeight: '1.6' }}>
                            Your order has been placed successfully. We will contact you shortly to confirm the delivery details.
                        </p>

                        {orderId && (
                            <div style={{
                                background: '#f9f9f9',
                                border: '1px solid #eee',
                                borderRadius: '8px',
                                padding: '15px 20px',
                                marginBottom: '30px',
                                fontSize: '14px',
                                color: '#555',
                            }}>
                                <strong>Order ID:</strong>&nbsp;
                                <span style={{ fontFamily: 'monospace', color: '#333' }}>{orderId}</span>
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link href="/shop" className="theme-btn">
                                <span className="btn-title">Continue Shopping</span>
                            </Link>
                            <Link href="/" className="theme-btn btn-style-two">
                                <span>Back to Home</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default function OrderConfirmationPage() {
    return (
        <Suspense fallback={<div className="auto-container" style={{ padding: '100px 0', textAlign: 'center' }}><h3>Loading...</h3></div>}>
            <OrderConfirmationContent />
        </Suspense>
    );
}
