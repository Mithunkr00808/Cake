import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export interface StoreSettings {
    aboutUsText?: string;
    contactEmail?: string;
    contactPhone?: string;
    deliverablePincodes?: string[];
    privacyPolicyText?: string;
    termsOfUseText?: string;
    refundPolicyText?: string;
}

export const getSettings = async (): Promise<StoreSettings | null> => {
    try {
        const docRef = doc(db, 'store', 'settings');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            return docSnap.data() as StoreSettings;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching settings:", error);
        return null;
    }
};

export const updateSettings = async (settings: Partial<StoreSettings>): Promise<boolean> => {
    try {
        const docRef = doc(db, 'store', 'settings');
        await setDoc(docRef, settings, { merge: true });
        return true;
    } catch (error) {
        console.error("Error updating settings:", error);
        return false;
    }
};
