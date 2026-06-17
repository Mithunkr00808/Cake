import { db } from '../firebase-admin';

export interface UserProfile {
    firstName?: string;
    lastName?: string;
    streetAddress?: string;
    apartment?: string;
    city?: string;
    state?: string;
    zip?: string;
    phone?: string;
    country?: string;
}

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
        const docSnap = await db.collection('users').doc(userId).get();
        if (docSnap.exists) {
            return docSnap.data() as UserProfile;
        }
        return null;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return null;
    }
};

export const updateUserProfile = async (userId: string, data: Partial<UserProfile>): Promise<void> => {
    try {
        await db.collection('users').doc(userId).set(data, { merge: true });
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
};
