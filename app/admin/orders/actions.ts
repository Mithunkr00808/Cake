'use server';

import { db as adminDb } from '@/lib/firebase-admin';
import { revalidatePath } from 'next/cache';
import { sendOrderStatusEmail } from '@/lib/email/actions';
import { OrderStatus } from '@/lib/db/orders';

const VALID_STATUSES: OrderStatus[] = [
  'pending', 'confirmed', 'processing', 'out_for_delivery', 'delivered', 'cancelled'
];

export async function updateOrderStatusServer(
  orderId: string,
  newStatus: string
): Promise<{ success: boolean; error?: string }> {

  if (!VALID_STATUSES.includes(newStatus as OrderStatus)) {
    return { success: false, error: `Invalid status: ${newStatus}` };
  }

  if (!process.env.FIREBASE_PROJECT_ID) {
    return { success: false, error: 'Firebase not configured.' };
  }

  try {
    const orderRef = adminDb.collection('orders').doc(orderId);
    const doc = await orderRef.get();

    if (!doc.exists) {
      return { success: false, error: 'Order not found.' };
    }

    await orderRef.update({ status: newStatus });

    // ── Dispatch Status Email ─────
    try {
      await sendOrderStatusEmail(orderId, newStatus);
    } catch (err) {
      console.error("Email dispatch failed:", err);
    }

    revalidatePath('/admin/orders');
    revalidatePath('/admin');

    return { success: true };
  } catch (err) {
    console.error('updateOrderStatus error:', err);
    return { success: false, error: 'Failed to update order status.' };
  }
}
