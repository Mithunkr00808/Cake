import React from 'react';
import Link from 'next/link';

const AboutSection = () => {
    return (
        <section className="about-section-two alternate" style={{ backgroundImage: 'url(/assets/images/background/our-story-bg.png)' }}>
            <div className="auto-container">
                <div className="sec-title text-center">
                    <div className="divider"><img src="/assets/images/icons/divider_1.png" alt="" /></div>
                    <h2>Our Story</h2>
                </div>
                <div className="content-box">
                    <span className="devider_icon_one"></span>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nisi et dolor ornare pellentesque. Nullam porttitor, odio id facilisis dapibus, mauris dolor rhoncus elit, ultricies nulla eros at dui. In suscipit leo sagittis aliquam. Integer tristique tempus urna. et pharetra dui urna volutpat elit odio at.</p>
                </div>
                <div className="btn-box text-center">
                    <Link href="#" className="theme-btn btn-style-two regular"><span></span>Our Services<span></span></Link>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
