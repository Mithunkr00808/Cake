import React from 'react';
import { Metadata } from 'next';
import PageTitle from '@/components/common/PageTitle';
import { getCachedSettings } from '@/lib/db/cache';

export const metadata: Metadata = {
    title: "Terms and Conditions",
    description: "Terms and Conditions for Slice of Cake.",
};

const Terms = async () => {
    const settings = await getCachedSettings();
    const termsText = settings?.termsOfUse;

    return (
        <div className="page-wrapper">
             <PageTitle 
                title="Terms and Conditions"
                breadcrumb={[
                    { label: 'Home', href: '/' },
                    { label: 'Terms and Conditions' }
                ]}
                backgroundImage="/assets/images/background/about-title-bg.png"
            />
            <section className="sidebar-page-container">
                <div className="auto-container">
                    <div className="row clearfix">
                        <div className="content-side col-lg-12 col-md-12 col-sm-12">
                            <div className="blog-single">
                                <div className="inner-box" style={{ padding: '40px', background: '#fff', border: '1px solid #f4f4f4', boxShadow: '0px 0px 20px rgba(0,0,0,0.05)', borderRadius: '10px' }}>
                                    {termsText ? (
                                        <div style={{ whiteSpace: 'pre-wrap' }}>{termsText}</div>
                                    ) : (
                                        <div>
                                            <h3>Terms and Conditions</h3>
                                            <p>Last updated: {new Date().toLocaleDateString()}</p>
                                            
                                            <h4 className="mt-4 mb-2 font-bold">1. Agreement to Terms</h4>
                                            <p>By accessing our website at sliceofcake.in, you agree to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
                                            
                                            <h4 className="mt-4 mb-2 font-bold">2. Use License</h4>
                                            <p>Permission is granted to temporarily download one copy of the materials (information or software) on Slice of Cake's website for personal, non-commercial transitory viewing only.</p>
                                            
                                            <h4 className="mt-4 mb-2 font-bold">3. Product Descriptions and Pricing</h4>
                                            <p>We strive to provide accurate product descriptions and pricing. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free. Prices and availability are subject to change without notice.</p>
                                            
                                            <h4 className="mt-4 mb-2 font-bold">4. Order Acceptance and Cancellation</h4>
                                            <p>We reserve the right to refuse or cancel any order for any reason, including limitations on quantities available for purchase, inaccuracies, or errors in product or pricing information.</p>
                                            
                                            <h4 className="mt-4 mb-2 font-bold">5. Governing Law</h4>
                                            <p>These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in Kerala.</p>
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

export default Terms;
