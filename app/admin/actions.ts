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
