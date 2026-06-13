'use server';

import { revalidateTag } from 'next/cache';

export async function revalidateSettingsCache() {
    revalidateTag('settings');
}
