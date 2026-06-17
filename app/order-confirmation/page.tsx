import React, { Suspense } from 'react';
import OrderConfirmationClient from './OrderConfirmationClient';
import { getOrderByIdServerAction } from '@/lib/actions/orderActions';

export const dynamic = 'force-dynamic'; // Ensure it fetches fresh data

export default async function OrderConfirmationPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const params = await searchParams;
    const orderId = params?.id as string | undefined;
    let order = null;

    if (orderId) {
        order = await getOrderByIdServerAction(orderId);
    }

    return (
        <Suspense fallback={<div className="auto-container" style={{ padding: '100px 0', textAlign: 'center', minHeight: '60vh' }}><i className="fa fa-spinner fa-spin" style={{ fontSize: '40px', color: '#ff7a7a' }}></i></div>}>
            <OrderConfirmationClient order={order} orderId={orderId} />
        </Suspense>
    );
}
