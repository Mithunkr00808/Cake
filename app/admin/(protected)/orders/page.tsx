import { db } from '@/lib/firebase-admin';
import OrdersClient from './_components/OrdersClient';
import { Order } from '@/lib/db/orders';

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
    let orders: Order[] = [];

    try {
        const snapshot = await db.collection('orders').orderBy('createdAt', 'desc').limit(100).get();
        orders = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                // Serialize timestamp for passing to client component
                createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null,
            } as unknown as Order;
        });
    } catch (error) {
        console.error("Error fetching orders server-side:", error);
    }

    return <OrdersClient initialOrders={orders} />;
}
