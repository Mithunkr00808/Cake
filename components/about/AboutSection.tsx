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

                    <h2>Our Story</h2>
                </div>
                <div className="content-box">
                    <span className="devider_icon_one"></span>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{aboutUsText || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nisi et dolor ornare pellentesque. Nullam porttitor, odio id facilisis dapibus, mauris dolor rhoncus elit, ultricies nulla eros at dui. In suscipit leo sagittis aliquam. Integer tristique tempus urna. et pharetra dui urna volutpat elit odio at."}</p>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
