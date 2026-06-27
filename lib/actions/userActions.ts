"use server";

import { getUserProfile, updateUserProfile, UserProfile } from '../db/users';
import { verifySession } from '@/lib/auth/verifySession';

export async function getUserProfileServerAction(userId: string): Promise<UserProfile | null> {
    if (!userId) return null;

    // Security: Verify the caller is the profile owner or an admin
    const session = await verifySession();
    if (!session) return null;
    if (session.uid !== userId && session.admin !== true) {
        console.warn(`Unauthorized profile read attempt: caller=${session.uid}, target=${userId}`);
        return null;
    }

    return await getUserProfile(userId);
}

export async function updateUserProfileServerAction(userId: string, data: Partial<UserProfile>): Promise<boolean> {
    if (!userId) return false;

    // Security: Verify the caller is the profile owner or an admin
    const session = await verifySession();
    if (!session) return false;
    if (session.uid !== userId && session.admin !== true) {
        console.warn(`Unauthorized profile update attempt: caller=${session.uid}, target=${userId}`);
        return false;
    }

    try {
        await updateUserProfile(userId, data);
        return true;
    } catch (error) {
        console.error("Failed to update profile", error);
        return false;
    }
}
