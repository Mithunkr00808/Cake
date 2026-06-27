"use server";

import { logAdminAuditEvent } from '@/lib/audit';
import { verifySession } from '@/lib/auth/verifySession';

export async function recordAdminAction(
  action: string,
  resourceType: string,
  resourceId: string,
  metadata?: Record<string, unknown>
) {
  // Security: Derive actor identity from the verified session, never from client input
  const session = await verifySession();
  if (!session || session.admin !== true) {
    console.warn('Unauthorized audit log attempt');
    return { success: false };
  }

  try {
    await logAdminAuditEvent({
      actorUid: session.uid,
      actorEmail: session.email || null,
      action,
      resourceType,
      resourceId,
      metadata,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to log admin action:", error);
    return { success: false };
  }
}

import { revalidatePath, revalidateTag } from 'next/cache';

export async function revalidateShopCache() {
  // Security: Only admins can trigger cache revalidation to prevent DDoS
  const session = await verifySession();
  if (!session || session.admin !== true) {
    console.warn('Unauthorized cache revalidation attempt');
    return;
  }

  // @ts-ignore - Next.js 16 signature requires 2 args in typings, but works with 1 at runtime.
  revalidateTag('products');
  revalidatePath('/shop');
  revalidatePath('/');
}
