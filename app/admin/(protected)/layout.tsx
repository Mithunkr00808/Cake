import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import PageTitle from '@/components/common/PageTitle';
import { verifySession } from '@/lib/auth/verifySession';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    // Cryptographically verify the session token.
    // This is the true security boundary for all /admin routes.
    const decodedClaims = await verifySession();

    // Ensure the token has the Cryptographic Admin Custom Claim
    if (!decodedClaims || decodedClaims.admin !== true) {
        redirect('/admin/login');
    }

    return (
        <>
            <PageTitle 
                title="Admin Dashboard"
                breadcrumb={[
                    { label: 'Home', href: '/' },
                    { label: 'Admin Dashboard' }
                ]}
                backgroundImage="/assets/images/background/about-title-bg.png"
            />
            
            <section className="sidebar-page-container">
                <div className="auto-container">
                    <div className="row clearfix">
                        {/* Sidebar */}
                        <div className="sidebar-side col-lg-3 col-md-12 col-sm-12">
                            <aside className="sidebar">
                                {/* Navigation Widget */}
                                <div className="sidebar-widget categories-widget">
                                    <h4 className="widget-title">Navigation</h4>
                                    <div className="widget-content">
                                        <ul className="blog-cat">
                                            <li><Link href="/admin">Dashboard</Link></li>
                                            <li><Link href="/admin/inventory">Inventory</Link></li>
                                            <li><Link href="/admin/orders">Orders</Link></li>
                                            <li><Link href="/admin/settings">Store Settings</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="sidebar-widget">
                                    <Link href="/login" className="theme-btn btn-style-two" style={{ width: '100%', padding: '10px 0', marginTop: '20px', textAlign: 'center', display: 'block' }}>
                                        <span></span>Sign Out<span></span>
                                    </Link>
                                </div>
                            </aside>
                        </div>

                        {/* Content Side */}
                        <div className="content-side col-lg-9 col-md-12 col-sm-12">
                            <div className="blog-single">
                                <div className="inner-box" style={{ padding: '40px', background: '#fff', border: '1px solid #f4f4f4', boxShadow: '0px 0px 20px rgba(0,0,0,0.05)', borderRadius: '10px' }}>
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
