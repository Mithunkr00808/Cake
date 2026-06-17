import React from 'react';
import Link from 'next/link';

interface AboutSectionProps {
    aboutUsText?: string;
}

const AboutSection = ({ aboutUsText }: AboutSectionProps) => {
    return (
        <section className="about-section-two alternate" style={{ backgroundImage: 'url(/assets/images/background/our-story-bg.png)' }}>
            <div className="auto-container">
                <div className="sec-title text-center">

                    <h2>Our Legacy of Baking</h2>
                </div>
                <div className="content-box">
                    <span className="devider_icon_one"></span>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{aboutUsText}</p>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
