"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { user, loading: authLoading, isAdmin } = useAuth();

    // If already logged in as admin, redirect
    useEffect(() => {
        if (!authLoading && user && isAdmin) {
            router.push('/admin');
        }
    }, [user, authLoading, isAdmin, router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const cred = await signInWithEmailAndPassword(auth, email, password);
            const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
            if (!adminEmail || cred.user.email !== adminEmail) {
                await auth.signOut();
                toast.error('Access denied. This login is for admins only.');
                setLoading(false);
                return;
            }
            toast.success('Welcome back, Admin!');
            router.push('/admin');
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to log in.';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) return null;

    return (
        <>
            <section className="page-title" style={{ backgroundImage: 'url(/assets/images/main-slider/slide_2.jpg)' }}>
                <div className="auto-container">
                    <h1>Admin Login</h1>
                    <ul className="page-breadcrumb">
                        <li><Link href="/">Home</Link></li>
                        <li>Admin Login</li>
                    </ul>
                </div>
            </section>

            <section className="login-section" style={{ padding: '80px 0' }}>
                <div className="auto-container">
                    <div style={{
                        maxWidth: '440px', margin: '0 auto',
                        background: '#fff', borderRadius: '12px',
                        boxShadow: '0 4px 30px rgba(0,0,0,0.08)', padding: '44px 40px',
                    }}>
                        {/* Admin badge */}
                        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                            <div style={{
                                width: '60px', height: '60px', borderRadius: '50%',
                                background: 'linear-gradient(135deg, #2d2d2d, #555)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                margin: '0 auto 14px', fontSize: '24px',
                            }}>🔐</div>
                            <h2 style={{ fontSize: '22px', color: '#222', marginBottom: '6px' }}>Admin Panel</h2>
                            <p style={{ color: '#999', fontSize: '13px' }}>Restricted access — authorized personnel only</p>
                        </div>

                        <form onSubmit={handleLogin}>
                            <div className="form-group" style={{ marginBottom: '18px' }}>
                                <label style={{ fontSize: '13px', fontWeight: 600, color: '#444', display: 'block', marginBottom: '6px' }}>
                                    Admin Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    placeholder="admin@example.com"
                                    style={{
                                        width: '100%', padding: '11px 14px', border: '1px solid #ddd',
                                        borderRadius: '6px', fontSize: '14px', outline: 'none',
                                        boxSizing: 'border-box',
                                    }}
                                />
                            </div>

                            <div className="form-group" style={{ marginBottom: '24px' }}>
                                <label style={{ fontSize: '13px', fontWeight: 600, color: '#444', display: 'block', marginBottom: '6px' }}>
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    style={{
                                        width: '100%', padding: '11px 14px', border: '1px solid #ddd',
                                        borderRadius: '6px', fontSize: '14px', outline: 'none',
                                        boxSizing: 'border-box',
                                    }}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    width: '100%', padding: '13px', background: '#2d2d2d',
                                    color: '#fff', border: 'none', borderRadius: '6px',
                                    fontSize: '15px', fontWeight: 700, cursor: 'pointer',
                                    opacity: loading ? 0.7 : 1, transition: 'background 0.2s',
                                }}
                            >
                                {loading ? 'Signing in...' : 'Sign In to Admin Panel'}
                            </button>
                        </form>

                        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#aaa' }}>
                            Not an admin?{' '}
                            <Link href="/login" style={{ color: '#ff7a7a', fontWeight: 600 }}>
                                Customer Login →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
