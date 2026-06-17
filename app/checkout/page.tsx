import React from 'react';
import Link from 'next/link';
import Checkout from '@/components/shop/Checkout';
import type { Metadata } from 'next';
import { verifySession } from '@/lib/auth/verifySession';
import { getUserProfile } from '@/lib/db/users';
import { getSettingsAdmin } from '@/lib/db/settings-admin';

export const metadata: Metadata = {
    title: "Checkout",
    description: "Complete your order and enjoy fresh premium cakes from Slice of Cake.",
    robots: { index: false, follow: false },
};

export default async function CheckoutPage() {
    const session = await verifySession();
    let userProfile = null;
    
    if (session?.uid) {
        userProfile = await getUserProfile(session.uid);
    }
    
    const settings = await getSettingsAdmin();
    const validPincodes = settings?.deliverablePincodes || [];

    const authData = session ? {
        name: session.name || '',
        email: session.email || '',
        phone: session.phone_number || ''
    } : null;
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
            <Checkout initialProfile={userProfile} validPincodes={validPincodes} authData={authData} />
            {/* End Checkout Section */}
        </>
    );
}
