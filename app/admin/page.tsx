import React from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
    return (
        <div>
            <div className="sec-title">
                <h2>Dashboard</h2>
                <div className="text">Welcome to the Slice of Cake Admin Panel.</div>
            </div>
            
            <div className="row clearfix">
                <div className="col-lg-4 col-md-6 col-sm-12">
                    <Link href="/admin/inventory" style={{ textDecoration: 'none' }}>
                        <div className="services-block-two" style={{ border: '1px solid #eee', padding: '30px', borderRadius: '10px', transition: 'all 0.3s', cursor: 'pointer', textAlign: 'center' }}>
                            <div className="inner-box">
                                <h3 style={{ color: '#333', marginBottom: '15px' }}>Inventory Overview</h3>
                                <p style={{ color: '#666' }}>Manage your products, prices, and stock.</p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                    <Link href="/admin/orders" style={{ textDecoration: 'none' }}>
                        <div className="services-block-two" style={{ border: '1px solid #eee', padding: '30px', borderRadius: '10px', transition: 'all 0.3s', cursor: 'pointer', textAlign: 'center' }}>
                            <div className="inner-box">
                                <h3 style={{ color: '#333', marginBottom: '15px' }}>Orders</h3>
                                <p style={{ color: '#666' }}>View and manage customer orders and update delivery status.</p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                    <Link href="/admin/settings" style={{ textDecoration: 'none' }}>
                        <div className="services-block-two" style={{ border: '1px solid #eee', padding: '30px', borderRadius: '10px', transition: 'all 0.3s', cursor: 'pointer', textAlign: 'center' }}>
                            <div className="inner-box">
                                <h3 style={{ color: '#333', marginBottom: '15px' }}>Store Settings</h3>
                                <p style={{ color: '#666' }}>Update your About Us page and other global configurations.</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

        </div>
    );
}
