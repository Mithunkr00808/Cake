import React from 'react';
import Link from 'next/link';
import LoginForm from '@/components/shop/LoginForm';

export default function LoginPage() {
    return (
        <>
            {/* Page Title */}
            <section className="page-title" style={{ backgroundImage: 'url(/assets/images/main-slider/slide_2.jpg)' }}>
                <div className="auto-container">
                    <h1>My account</h1>
                    <ul className="page-breadcrumb">
                        <li><Link href="/">home</Link></li>
                        <li>My account</li>
                    </ul>
                </div>
            </section>
            {/* End Page Title */}

            {/* Login Section */}
            <LoginForm />
            {/* End Login Section */}
        </>
    );
}
