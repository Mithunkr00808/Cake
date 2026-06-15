"use server";

import { logAdminAuditEvent } from '@/lib/audit';

export async function recordAdminAction(
  actorUid: string,
  actorEmail: string | null,
  action: string,
  resourceType: string,
  resourceId: string,
  metadata?: Record<string, unknown>
) {
  try {
    await logAdminAuditEvent({
      actorUid,
      actorEmail,
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
  // @ts-ignore - Next.js 16 signature requires 2 args in typings, but works with 1 at runtime.
  revalidateTag('products');
  revalidatePath('/shop');
  revalidatePath('/');
}
