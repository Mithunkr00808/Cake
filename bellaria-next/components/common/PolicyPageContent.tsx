"use client";

import React, { useEffect, useState } from 'react';
import { getSettings } from '@/lib/db/settings';

interface PolicyPageContentProps {
    policyType: 'privacyPolicyText' | 'termsOfUseText' | 'refundPolicyText';
}

export default function PolicyPageContent({ policyType }: PolicyPageContentProps) {
    const [content, setContent] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            const settings = await getSettings();
            if (settings && settings[policyType]) {
                setContent(settings[policyType]);
            }
            setLoading(false);
        };
        fetchSettings();
    }, [policyType]);

    if (loading) {
        return (
            <div className="auto-container" style={{ padding: '50px 0', textAlign: 'center' }}>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <section className="policy-section" style={{ padding: '80px 0' }}>
            <div className="auto-container">
                {content ? (
                    <div className="policy-content" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>
                        {content}
                    </div>
                ) : (
                    <div className="text-center" style={{ padding: '50px 0', color: '#666' }}>
                        <p>This policy has not been updated yet. Please check back later.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
