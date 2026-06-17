'use server';

import { db as adminDb } from '@/lib/firebase-admin';
import { revalidatePath } from 'next/cache';
import { sendOrderStatusEmail } from '@/lib/email/actions';
import type { OrderStatus } from '@/lib/db/orders';

const VALID_STATUSES: OrderStatus[] = [
  'pending', 'confirmed', 'processing', 'out_for_delivery', 'delivered', 'cancelled'
];

export async function updateOrderStatusServer(
  orderId: string,
  newStatus: string
): Promise<{ success: boolean; error?: string }> {
  console.log(`[updateOrderStatusServer] called with orderId=${orderId}, newStatus=${newStatus}`);

  if (!VALID_STATUSES.includes(newStatus as OrderStatus)) {
    console.error(`[updateOrderStatusServer] Invalid status: ${newStatus}`);
    return { success: false, error: `Invalid status: ${newStatus}` };
  }

  if (!process.env.FIREBASE_PROJECT_ID) {
    console.error(`[updateOrderStatusServer] Firebase not configured.`);
    return { success: false, error: 'Firebase not configured.' };
  }

  try {
    console.log(`[updateOrderStatusServer] Fetching order from adminDb...`);
    const orderRef = adminDb.collection('orders').doc(orderId);
    const doc = await orderRef.get();

    if (!doc.exists) {
      console.error(`[updateOrderStatusServer] Order not found in DB: ${orderId}`);
      return { success: false, error: 'Order not found.' };
    }

    console.log(`[updateOrderStatusServer] Updating status to ${newStatus} in Firestore...`);
    await orderRef.update({ status: newStatus });
    console.log(`[updateOrderStatusServer] Firestore update successful.`);

    // ── Dispatch Status Email ─────
    try {
      console.log(`[updateOrderStatusServer] Sending email...`);
      await sendOrderStatusEmail(orderId, newStatus);
    } catch (err) {
      console.error("[updateOrderStatusServer] Email dispatch failed:", err);
    }

    console.log(`[updateOrderStatusServer] Revalidating paths...`);
    revalidatePath('/admin/orders');
    revalidatePath('/admin');

    console.log(`[updateOrderStatusServer] Returning success.`);
    return { success: true };
  } catch (err) {
    console.error('[updateOrderStatusServer] FATAL error:', err);
    const errorMessage = err instanceof Error ? err.message : String(err);
    return { success: false, error: `Failed to update order status: ${errorMessage}` };
  }
}
