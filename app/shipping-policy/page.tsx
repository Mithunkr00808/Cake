import React from 'react';
import { Metadata } from 'next';
import PageTitle from '@/components/common/PageTitle';
import { getCachedSettings } from '@/lib/db/cache';

export const metadata: Metadata = {
    title: "Shipping & Delivery Policy",
    description: "Shipping and Delivery Policy for Slice of Cake.",
};

const ShippingPolicy = async () => {
    const settings = await getCachedSettings();
    const shippingText = settings?.shippingPolicy;

    return (
        <div className="page-wrapper">
             <PageTitle 
                title="Shipping & Delivery Policy"
                breadcrumb={[
                    { label: 'Home', href: '/' },
                    { label: 'Shipping Policy' }
                ]}
                backgroundImage="/assets/images/background/about-title-bg.png"
            />
            <section className="sidebar-page-container">
                <div className="auto-container">
                    <div className="row clearfix">
                        <div className="content-side col-lg-12 col-md-12 col-sm-12">
                            <div className="blog-single">
                                <div className="inner-box" style={{ padding: '40px', background: '#fff', border: '1px solid #f4f4f4', boxShadow: '0px 0px 20px rgba(0,0,0,0.05)', borderRadius: '10px' }}>
                                    {shippingText ? (
                                        <div style={{ whiteSpace: 'pre-wrap' }}>{shippingText}</div>
                                    ) : (
                                        <div>
                                            <h3>Shipping & Delivery Policy</h3>
                                            <p>Last updated: {new Date().toLocaleDateString()}</p>
                                            
                                            <h4 className="mt-4 mb-2 font-bold">1. Delivery Areas</h4>
                                            <p>We currently deliver our freshly baked cakes and products within select pincodes in and around Thrissur, Kerala. You can verify if we deliver to your area using the pincode checker on our product pages.</p>
                                            
                                            <h4 className="mt-4 mb-2 font-bold">2. Delivery Timings</h4>
                                            <p>Standard deliveries are made between 10:00 AM and 8:00 PM. Specific time slots can be requested but are subject to availability and traffic conditions.</p>
                                            
                                            <h4 className="mt-4 mb-2 font-bold">3. Delivery Charges</h4>
                                            <p>Delivery charges are calculated based on the distance from our bakery to your delivery address and will be displayed at checkout before payment.</p>
                                            
                                            <h4 className="mt-4 mb-2 font-bold">4. Handling of Products</h4>
                                            <p>Cakes are delicate items. We ensure they are dispatched in perfect condition. Once delivered, please ensure they are stored correctly (usually refrigerated) as per our instructions.</p>
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

export default ShippingPolicy;
