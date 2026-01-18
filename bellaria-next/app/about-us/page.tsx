import React from 'react';
import { Metadata } from 'next';
import PageTitle from '@/components/common/PageTitle';
import AboutSection from '@/components/about/AboutSection';

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
            <AboutSection />
        </div>
    );
};

export default AboutUs;
