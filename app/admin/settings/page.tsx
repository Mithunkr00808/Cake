import { db } from '@/lib/firebase-admin';
import SettingsClient from './_components/SettingsClient';
import { StoreSettings } from '@/lib/db/settings';

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
    let settings: StoreSettings = { 
        aboutUsText: '', 
        contactEmail: '', 
        contactPhone: '', 
        deliverablePincodes: [],
        instagram: '',
        facebook: '',
        refundPolicy: '',
        termsOfUse: '',
        isLive: true
    };

    try {
        const docSnap = await db.collection('store').doc('settings').get();
        if (docSnap.exists) {
            settings = { ...settings, ...docSnap.data() } as StoreSettings;
        }
    } catch (error) {
        console.error("Error fetching settings server-side:", error);
    }

    return <SettingsClient initialSettings={settings} />;
}
