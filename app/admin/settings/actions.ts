'use server';

import { updateTag } from 'next/cache';

export async function revalidateSettingsCache() {
    updateTag('settings');
}
