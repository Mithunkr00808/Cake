import React from 'react';
import { Metadata } from 'next';
import PageTitle from '@/components/common/PageTitle';
import { getCachedSettings } from '@/lib/db/cache';

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Privacy Policy for Slice of Cake.",
    robots: { index: true, follow: true },
};

const PrivacyPolicy = async () => {
    const settings = await getCachedSettings();
    const privacyPolicyText = settings?.privacyPolicy;

    return (
        <div className="page-wrapper">
             <PageTitle 
                title="Privacy Policy"
                breadcrumb={[
                    { label: 'Home', href: '/' },
                    { label: 'Privacy Policy' }
                ]}
                backgroundImage="/assets/images/background/about-title-bg.png"
            />
            <section className="sidebar-page-container">
                <div className="auto-container">
                    <div className="row clearfix">
                        <div className="content-side col-lg-12 col-md-12 col-sm-12">
                            <div className="blog-single">
                                <div className="inner-box" style={{ padding: '40px', background: '#fff', border: '1px solid #f4f4f4', boxShadow: '0px 0px 20px rgba(0,0,0,0.05)', borderRadius: '10px' }}>
                                    {privacyPolicyText ? (
                                        <div style={{ whiteSpace: 'pre-wrap' }}>{privacyPolicyText}</div>
                                    ) : (
                                        <div>
                                            <h3>Privacy Policy</h3>
                                            <p>Last updated: {new Date().toLocaleDateString()}</p>
                                            
                                            <h4 className="mt-4 mb-2 font-bold">1. Introduction</h4>
                                            <p>Welcome to Slice of Cake. We respect your privacy and are committed to protecting your personal data.</p>
                                            
                                            <h4 className="mt-4 mb-2 font-bold">2. Data We Collect</h4>
                                            <p>We may collect personal identification information including your name, email address, phone number, and delivery address when you place an order or contact us.</p>
                                            
                                            <h4 className="mt-4 mb-2 font-bold">3. How We Use Your Data</h4>
                                            <p>We use your data to process and fulfill your orders, communicate with you regarding your purchases, and improve our services.</p>
                                            
                                            <h4 className="mt-4 mb-2 font-bold">4. Data Sharing</h4>
                                            <p>We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information with our business partners and trusted affiliates.</p>
                                            
                                            <h4 className="mt-4 mb-2 font-bold">5. Data Security</h4>
                                            <p>We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information, username, password, transaction information, and data stored on our site.</p>
                                            
                                            <h4 className="mt-4 mb-2 font-bold">6. Contact Us</h4>
                                            <p>If you have any questions about this Privacy Policy, please contact us at <strong>sliceofcake2026@gmail.com</strong>.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
