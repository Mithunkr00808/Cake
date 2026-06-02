"use client";

import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

import PageTitle from '@/components/common/PageTitle';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, loading, isAdmin } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && (!user || !isAdmin)) {
            router.push('/login');
        }
    }, [user, loading, isAdmin, router]);

    if (loading || !isAdmin) {
        return (
            <div className="auto-container" style={{ padding: '100px 0', textAlign: 'center' }}>
                <h3>Loading Admin Panel...</h3>
            </div>
        );
    }

    const handleLogout = async () => {
        await signOut(auth);
        router.push('/');
    };

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
                                            <li><Link href="/admin/settings">Store Settings</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="sidebar-widget">
                                    <button onClick={handleLogout} className="theme-btn btn-style-two" style={{ width: '100%', padding: '10px 0', marginTop: '20px' }}>
                                        <span></span>Logout<span></span>
                                    </button>
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
