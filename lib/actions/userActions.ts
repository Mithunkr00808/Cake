"use server";

import { getUserProfile, updateUserProfile, UserProfile } from '../db/users';

export async function getUserProfileServerAction(userId: string): Promise<UserProfile | null> {
    if (!userId) return null;
    return await getUserProfile(userId);
}

export async function updateUserProfileServerAction(userId: string, data: Partial<UserProfile>): Promise<boolean> {
    if (!userId) return false;
    try {
        await updateUserProfile(userId, data);
        return true;
    } catch (error) {
        console.error("Failed to update profile", error);
        return false;
    }
}
