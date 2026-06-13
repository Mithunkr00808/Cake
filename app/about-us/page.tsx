import React from 'react';
import { Metadata } from 'next';
import PageTitle from '@/components/common/PageTitle';
import AboutSection from '@/components/about/AboutSection';
import { getCachedSettings } from '@/lib/db/cache';

export const metadata: Metadata = {
    title: "About Us – Our Story & Passion for Baking",
    description:
        "Learn about Slice of Cake, Thrissur's premier bakery. Discover our passion for handcrafted cakes, premium ingredients, and the love we layer into every creation.",
    alternates: {
        canonical: "https://sliceofcake.in/about-us",
    },
    openGraph: {
        title: "About Slice of Cake – Our Story",
        description:
            "Discover our passion for handcrafted cakes, premium ingredients, and the love we layer into every creation at Thrissur's premier bakery.",
        url: "https://sliceofcake.in/about-us",
        images: [
            {
                url: "/assets/images/background/about-title-bg.png",
                width: 1200,
                height: 630,
                alt: "About Slice of Cake",
            },
        ],
    },
};
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
