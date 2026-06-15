"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/shop/LoginForm';
import { useAuth } from '@/context/AuthContext';
import Preloader from '@/components/layout/Preloader';

export default function LoginPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user) {
            const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
            if (adminEmail && user.email === adminEmail) {
                router.push('/admin');
            } else {
                router.push('/');
            }
        }
    }, [user, loading, router]);

    // Don't render anything while checking auth state or while redirecting an already logged-in user
    if (loading || user) {
        return <Preloader />;
    }

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
