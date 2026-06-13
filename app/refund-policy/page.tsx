import React from 'react';
import { Metadata } from 'next';
import PageTitle from '@/components/common/PageTitle';
import { getCachedSettings } from '@/lib/db/cache';

export const metadata: Metadata = {
    title: "Refund & Cancellation Policy",
    description: "Refund and Cancellation Policy for Slice of Cake.",
};

const RefundPolicy = async () => {
    const settings = await getCachedSettings();
    const refundText = settings?.refundPolicy;

    return (
        <div className="page-wrapper">
             <PageTitle 
                title="Refund & Cancellation Policy"
                breadcrumb={[
                    { label: 'Home', href: '/' },
                    { label: 'Refund Policy' }
                ]}
                backgroundImage="/assets/images/background/about-title-bg.png"
            />
            <section className="sidebar-page-container">
                <div className="auto-container">
                    <div className="row clearfix">
                        <div className="content-side col-lg-12 col-md-12 col-sm-12">
                            <div className="blog-single">
                                <div className="inner-box" style={{ padding: '40px', background: '#fff', border: '1px solid #f4f4f4', boxShadow: '0px 0px 20px rgba(0,0,0,0.05)', borderRadius: '10px' }}>
                                    {refundText ? (
                                        <div style={{ whiteSpace: 'pre-wrap' }}>{refundText}</div>
                                    ) : (
                                        <div>
                                            <h3>Refund & Cancellation Policy</h3>
                                            <p>Last updated: {new Date().toLocaleDateString()}</p>
                                            
                                            <h4 className="mt-4 mb-2 font-bold">1. Cancellation Policy</h4>
                                            <p>As our cakes and baked goods are perishable and often custom-made, cancellations are only accepted if requested at least 24 hours before the scheduled delivery or pickup time. Late cancellations will not be eligible for a refund.</p>
                                            
                                            <h4 className="mt-4 mb-2 font-bold">2. Refund Policy</h4>
                                            <p>Due to the perishable nature of our products, we do not accept returns. However, if you are not satisfied with the quality of your order, please contact us within 2 hours of receiving your order with photographic evidence.</p>
                                            
                                            <h4 className="mt-4 mb-2 font-bold">3. Defective or Damaged Items</h4>
                                            <p>If your order arrives damaged or if there is a severe defect in the product, we will offer a replacement or a full/partial refund based on the circumstances. Please ensure you report any damage immediately upon delivery.</p>
                                            
                                            <h4 className="mt-4 mb-2 font-bold">4. Processing Refunds</h4>
                                            <p>Approved refunds will be processed within 5-7 business days to the original method of payment.</p>
                                            
                                            <h4 className="mt-4 mb-2 font-bold">5. Contact Information</h4>
                                            <p>To request a cancellation or refund, please email us at <strong>sliceofcake2026@gmail.com</strong> or call us.</p>
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

export default RefundPolicy;
