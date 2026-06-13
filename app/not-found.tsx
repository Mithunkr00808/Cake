"use client";

import React from 'react';
import Link from 'next/link';
import PageTitle from '@/components/common/PageTitle';

export default function NotFound() {
    return (
        <div className="page-wrapper">
            <PageTitle 
                title="Page Not Found"
                breadcrumb={[
                    { label: 'Home', href: '/' },
                    { label: '404' }
                ]}
                backgroundImage="/assets/images/background/about-title-bg.png"
            />
            
            <section style={{ padding: '120px 0', textAlign: 'center', backgroundColor: '#fdfdfd' }}>
                <div className="auto-container">
                    <div style={{
                        maxWidth: '600px',
                        margin: '0 auto',
                        padding: '50px 30px',
                        backgroundColor: '#fff',
                        borderRadius: '24px',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.04)',
                        border: '1px solid #f0f0f0'
                    }}>
                        <span aria-hidden="true" style={{ 
                            fontSize: '140px', 
                            fontWeight: '900', 
                            color: '#ff7a7a', 
                            margin: '0', 
                            lineHeight: '1',
                            textShadow: '0 10px 20px rgba(255, 122, 122, 0.2)',
                            display: 'block',
                        }}>
                            404
                        </span>
                        <h1 style={{ 
                            fontSize: '32px', 
                            fontWeight: '800', 
                            color: '#1a1a1a', 
                            marginTop: '20px', 
                            marginBottom: '15px' 
                        }}>
                            Oops! Looks like you're lost.
                        </h1>
                        <p style={{ 
                            fontSize: '16px', 
                            color: '#666', 
                            margin: '0 auto 40px auto', 
                            lineHeight: '1.6' 
                        }}>
                            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back to something delicious!
                        </p>
                        <Link href="/" style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#ff7a7a',
                            color: '#fff',
                            padding: '16px 40px',
                            borderRadius: '30px',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            textDecoration: 'none',
                            boxShadow: '0 8px 20px rgba(255, 122, 122, 0.3)',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.boxShadow = '0 12px 25px rgba(255, 122, 122, 0.4)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 8px 20px rgba(255, 122, 122, 0.3)';
                        }}
                        onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(1px)'}
                        onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                        >
                            Return to Homepage
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
