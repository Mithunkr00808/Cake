import React from 'react';
import { Metadata } from 'next';
import PageTitle from '@/components/common/PageTitle';
import { getCachedSettings } from '@/lib/db/cache';

export const metadata: Metadata = {
    title: "Terms of Use",
    description: "Terms of Use for Slice of Cake.",
    robots: { index: true, follow: true },
};

const TermsOfUse = async () => {
    const settings = await getCachedSettings();
    const termsOfUseText = settings?.termsOfUse;

    return (
        <div className="page-wrapper">
             <PageTitle 
                title="Terms of Use"
                breadcrumb={[
                    { label: 'Home', href: '/' },
                    { label: 'Terms of Use' }
                ]}
                backgroundImage="/assets/images/background/about-title-bg.png"
            />
            <section className="sidebar-page-container">
                <div className="auto-container">
                    <div className="row clearfix">
                        <div className="content-side col-lg-12 col-md-12 col-sm-12">
                            <div className="blog-single">
                                <div className="inner-box" style={{ padding: '40px', background: '#fff', border: '1px solid #f4f4f4', boxShadow: '0px 0px 20px rgba(0,0,0,0.05)', borderRadius: '10px' }}>
                                    {termsOfUseText ? (
                                        <div style={{ whiteSpace: 'pre-wrap' }}>{termsOfUseText}</div>
                                    ) : (
                                        <div>
                                            <h3>Terms of Use</h3>
                                            <p>Last updated: {new Date().toLocaleDateString()}</p>
                                            
                                            <h4 className="mt-4 mb-2 font-bold">1. Introduction</h4>
                                            <p>Welcome to Slice of Cake. By accessing our website, you agree to these Terms of Use.</p>
                                            
                                            <h4 className="mt-4 mb-2 font-bold">2. Products and Pricing</h4>
                                            <p>All products are subject to availability. Prices are subject to change without notice.</p>
                                            
                                            <h4 className="mt-4 mb-2 font-bold">3. Orders</h4>
                                            <p>We reserve the right to refuse any order you place with us. We may limit or cancel quantities purchased per person, per household, or per order.</p>
                                            
                                            <h4 className="mt-4 mb-2 font-bold">4. User Comments and Feedback</h4>
                                            <p>If you send creative ideas, suggestions, or proposals, you agree that we may use them without restriction and without compensation.</p>
                                            
                                            <h4 className="mt-4 mb-2 font-bold">5. Governing Law</h4>
                                            <p>These Terms of Use shall be governed by and construed in accordance with the laws of India.</p>
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

export default TermsOfUse;
