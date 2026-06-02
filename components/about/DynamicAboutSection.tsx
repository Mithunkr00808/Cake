"use client";

import React, { useEffect, useState } from 'react';
import AboutSection from './AboutSection';
import { getSettings } from '@/lib/db/settings';

export default function DynamicAboutSection() {
    const [aboutUsText, setAboutUsText] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchSettings = async () => {
            const settings = await getSettings();
            if (settings?.aboutUsText) {
                setAboutUsText(settings.aboutUsText);
            }
        };
        fetchSettings();
    }, []);

    return <AboutSection aboutUsText={aboutUsText} />;
}
