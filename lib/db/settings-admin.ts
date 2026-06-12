import { db } from '../firebase-admin';
import { StoreSettings } from './settings';

export const getSettingsAdmin = async (): Promise<StoreSettings | null> => {
    try {
        const docRef = db.collection('store').doc('settings');
        const docSnap = await docRef.get();
        
        if (docSnap.exists) {
            return docSnap.data() as StoreSettings;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching settings via Admin SDK:", error);
        return null;
    }
};
