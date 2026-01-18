import React from 'react';
import Link from 'next/link';
import CheckoutForm from '@/components/shop/CheckoutForm';

export default function CheckoutPage() {
    return (
        <>
            {/* Page Title */}
            <section className="page-title" style={{ backgroundImage: 'url(/assets/images/main-slider/slide_2.jpg)' }}>
                <div className="auto-container">
                    <h1>Checkout</h1>
                    <ul className="page-breadcrumb">
                        <li><Link href="/">home</Link></li>
                        <li>Checkout</li>
                    </ul>
                </div>
            </section>
            {/* End Page Title */}

            {/* Checkout Section */}
            <CheckoutForm />
            {/* End Checkout Section */}
        </>
    );
}
