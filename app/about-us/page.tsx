import React from 'react';
import { Metadata } from 'next';
import PageTitle from '@/components/common/PageTitle';
import AboutSection from '@/components/about/AboutSection';
import { getCachedSettings } from '@/lib/db/cache';

const AboutUs = async () => {
    const settings = await getCachedSettings();
    const aboutUsText = settings?.aboutUsText || '';

    return (
        <div className="page-wrapper">
             <PageTitle 
                title="About Us"
                breadcrumb={[
                    { label: 'Home', href: '/' },
                    { label: 'About Us' }
                ]}
                backgroundImage="/assets/images/background/about-title-bg.png"
            />
            <AboutSection aboutUsText={aboutUsText} />
        </div>
    );
};

export default AboutUs;
