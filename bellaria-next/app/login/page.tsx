"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

export default function LoginPage() {
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();

    // If already logged in, redirect to My Account
    useEffect(() => {
        if (!authLoading && user) {
            router.push('/my-account');
        }
    }, [user, authLoading, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (mode === 'login') {
                await signInWithEmailAndPassword(auth, email, password);
                toast.success('Welcome back!');
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
                toast.success('Account created! Welcome 🎉');
            }
            router.push('/my-account');
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Something went wrong.';
            // Make Firebase error messages friendlier
            if (message.includes('user-not-found') || message.includes('wrong-password') || message.includes('invalid-credential')) {
                toast.error('Invalid email or password.');
            } else if (message.includes('email-already-in-use')) {
                toast.error('An account with this email already exists.');
            } else if (message.includes('weak-password')) {
                toast.error('Password must be at least 6 characters.');
            } else {
                toast.error(message);
            }
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) return null;

    return (
        <>
            <section className="page-title" style={{ backgroundImage: 'url(/assets/images/main-slider/slide_2.jpg)' }}>
                <div className="auto-container">
                    <h1>My Account</h1>
                    <ul className="page-breadcrumb">
                        <li><Link href="/">Home</Link></li>
                        <li>My Account</li>
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
                        {/* Avatar */}
                        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                            <div style={{
                                width: '60px', height: '60px', borderRadius: '50%',
                                background: 'linear-gradient(135deg, #ff7a7a, #ffb347)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                margin: '0 auto 14px', fontSize: '26px',
                            }}>🎂</div>
                            <h2 style={{ fontSize: '22px', color: '#222', marginBottom: '6px' }}>
                                {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                            </h2>
                            <p style={{ color: '#999', fontSize: '13px' }}>
                                {mode === 'login' ? 'Sign in to your Slice of Cake account' : 'Join us and start ordering!'}
                            </p>
                        </div>

                        {/* Tab switcher */}
                        <div style={{
                            display: 'flex', background: '#f5f5f5', borderRadius: '8px',
                            padding: '4px', marginBottom: '24px', gap: '4px',
                        }}>
                            {(['login', 'register'] as const).map(m => (
                                <button
                                    key={m}
                                    onClick={() => setMode(m)}
                                    style={{
                                        flex: 1, padding: '8px', border: 'none', cursor: 'pointer',
                                        borderRadius: '6px', fontSize: '13px', fontWeight: 600,
                                        background: mode === m ? '#fff' : 'transparent',
                                        color: mode === m ? '#ff7a7a' : '#888',
                                        boxShadow: mode === m ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    {m === 'login' ? 'Sign In' : 'Register'}
                                </button>
                            ))}
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '18px' }}>
                                <label style={{ fontSize: '13px', fontWeight: 600, color: '#444', display: 'block', marginBottom: '6px' }}>
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    placeholder="you@example.com"
                                    style={{
                                        width: '100%', padding: '11px 14px', border: '1px solid #ddd',
                                        borderRadius: '6px', fontSize: '14px', outline: 'none',
                                        boxSizing: 'border-box',
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: '24px' }}>
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
                                    width: '100%', padding: '13px',
                                    background: 'linear-gradient(135deg, #ff7a7a, #ffb347)',
                                    color: '#fff', border: 'none', borderRadius: '6px',
                                    fontSize: '15px', fontWeight: 700, cursor: 'pointer',
                                    opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s',
                                }}
                            >
                                {loading
                                    ? (mode === 'login' ? 'Signing in...' : 'Creating account...')
                                    : (mode === 'login' ? 'Sign In' : 'Create Account')
                                }
                            </button>
                        </form>

                        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#aaa' }}>
                            Are you an admin?{' '}
                            <Link href="/admin/login" style={{ color: '#555', fontWeight: 600 }}>
                                Admin Login →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
