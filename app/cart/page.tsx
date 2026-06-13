import React from 'react';
import Link from 'next/link';
import ShoppingCart from '@/components/shop/ShoppingCart';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Shopping Cart",
    description: "Review your selected items and proceed to checkout at Slice of Cake.",
    robots: { index: false, follow: false },
};
export default function CartPage() {
    return (
        <>
            {/* Page Title */}
            <section className="page-title" style={{ backgroundImage: 'url(/assets/images/main-slider/slide_2.jpg)' }}>
                <div className="auto-container">
                    <h1>Cart</h1>
                    <ul className="page-breadcrumb">
                        <li><Link href="/">home</Link></li>
                        <li>Cart</li>
                    </ul>
                </div>
            </section>
            {/* End Page Title */}

            {/* Cart Section */}
            <ShoppingCart />
            {/* End Cart Section */}
        </>
    );
}
