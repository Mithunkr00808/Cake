import React from 'react';
import { Metadata } from 'next';
import PageTitle from '@/components/common/PageTitle';
import DynamicAboutSection from '@/components/about/DynamicAboutSection';

const AboutUs = () => {
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
            <DynamicAboutSection />
        </div>
    );
};

export default AboutUs;
