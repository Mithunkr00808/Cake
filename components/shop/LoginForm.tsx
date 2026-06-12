"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence, sendPasswordResetEmail, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '@/context/AuthContext';

const LoginForm = () => {
    const { user, loading: authLoading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);
    
    // Forgot Password State
    const [isResetMode, setIsResetMode] = useState(false);
    const [resetSent, setResetSent] = useState(false);
    
    const router = useRouter();

    useEffect(() => {
        if (!authLoading && user) {
            // Redirect logged-in users away from the login page
            if (user.email === 'sliceofcake2026@gmail.com') {
                router.push('/admin');
            } else {
                router.push('/');
            }
        }
    }, [user, authLoading, router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const persistenceType = rememberMe ? browserLocalPersistence : browserSessionPersistence;
            await setPersistence(auth, persistenceType);
            
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            toast.success("Logged in successfully!");
            
            // If it's the admin, redirect to admin panel
            if (userCredential.user.email === 'sliceofcake2026@gmail.com') {
                router.push('/admin');
            } else {
                router.push('/');
            }
        } catch (error: any) {
            toast.error("Invalid email or password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            const persistenceType = rememberMe ? browserLocalPersistence : browserSessionPersistence;
            await setPersistence(auth, persistenceType);
            
            const userCredential = await signInWithPopup(auth, googleProvider);
            toast.success("Logged in with Google successfully!");
            
            // If it's the admin, redirect to admin panel
            if (userCredential.user.email === 'sliceofcake2026@gmail.com') {
                router.push('/admin');
            } else {
                router.push('/');
            }
        } catch (error: any) {
            toast.error(error.message || "Google Sign-In failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter your email address.");
            return;
        }
        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
            setResetSent(true);
            toast.success("Password reset email sent!");
        } catch (error: any) {
            toast.error(error.message || "Failed to send reset email.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="login-section" style={{ padding: '80px 0', backgroundColor: '#fdfdfd' }}>
            <div className="auto-container" style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{
                    background: '#ffffff',
                    padding: '40px',
                    borderRadius: '20px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
                    width: '100%',
                    maxWidth: '450px',
                    border: '1px solid #f0f0f0'
                }}>
                    
                    {!isResetMode ? (
                        <>
                            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                                <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#1a1a1a', marginBottom: '8px' }}>Welcome Back</h2>
                                <p style={{ color: '#666', fontSize: '15px', margin: 0 }}>Please enter your details to sign in.</p>
                            </div>

                            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>Email address</label>
                                    <input 
                                        type="email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        required 
                                        style={{
                                            width: '100%',
                                            padding: '14px 16px',
                                            borderRadius: '10px',
                                            border: '1px solid #e0e0e0',
                                            fontSize: '15px',
                                            outline: 'none',
                                            transition: 'border 0.2s',
                                            backgroundColor: '#fafafa',
                                            boxSizing: 'border-box'
                                        }}
                                        onFocus={(e) => e.target.style.border = '1px solid #ff7a7a'}
                                        onBlur={(e) => e.target.style.border = '1px solid #e0e0e0'}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>Password</label>
                                    <input 
                                        type="password" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required 
                                        style={{
                                            width: '100%',
                                            padding: '14px 16px',
                                            borderRadius: '10px',
                                            border: '1px solid #e0e0e0',
                                            fontSize: '15px',
                                            outline: 'none',
                                            transition: 'border 0.2s',
                                            backgroundColor: '#fafafa',
                                            boxSizing: 'border-box'
                                        }}
                                        onFocus={(e) => e.target.style.border = '1px solid #ff7a7a'}
                                        onBlur={(e) => e.target.style.border = '1px solid #e0e0e0'}
                                    />
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#555' }}>
                                        <input 
                                            type="checkbox" 
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            style={{ width: '16px', height: '16px', accentColor: '#ff7a7a', cursor: 'pointer' }}
                                        />
                                        Remember for 30 days
                                    </label>
                                    <button 
                                        onClick={() => setIsResetMode(true)} 
                                        type="button"
                                        style={{ background: 'none', border: 'none', color: '#ff7a7a', fontWeight: '600', cursor: 'pointer', padding: 0 }}
                                    >
                                        Forgot password?
                                    </button>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={loading}
                                    style={{
                                        background: '#ff7a7a',
                                        color: '#fff',
                                        padding: '14px',
                                        border: 'none',
                                        borderRadius: '10px',
                                        cursor: 'pointer',
                                        width: '100%',
                                        fontWeight: 'bold',
                                        fontSize: '16px',
                                        marginTop: '5px',
                                        boxShadow: '0 4px 14px rgba(255, 122, 122, 0.3)',
                                        transition: 'transform 0.1s',
                                        opacity: loading ? 0.7 : 1
                                    }}
                                    onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                                    onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    {loading ? 'Signing in...' : 'Sign in'}
                                </button>

                                <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                                    <div style={{ flex: 1, height: '1px', background: '#e0e0e0' }}></div>
                                    <span style={{ padding: '0 15px', color: '#999', fontSize: '13px', fontWeight: '500' }}>OR</span>
                                    <div style={{ flex: 1, height: '1px', background: '#e0e0e0' }}></div>
                                </div>

                                <button 
                                    type="button" 
                                    onClick={handleGoogleSignIn}
                                    disabled={loading}
                                    style={{
                                        background: '#fff',
                                        color: '#333',
                                        padding: '14px',
                                        border: '1px solid #dcdcdc',
                                        borderRadius: '10px',
                                        cursor: 'pointer',
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '12px',
                                        fontWeight: '600',
                                        fontSize: '15px',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                                        transition: 'all 0.2s ease',
                                        opacity: loading ? 0.7 : 1
                                    }}
                                    onMouseOver={(e) => { e.currentTarget.style.background = '#f9f9f9'; e.currentTarget.style.borderColor = '#d0d0d0'; }}
                                    onMouseOut={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#dcdcdc'; }}
                                    onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                                    onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = '#fff'; }}
                                >
                                    <FcGoogle size={24} />
                                    Sign in with Google
                                </button>
                            </form>
                        </>
                    ) : (
                        <>
                            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                                {resetSent ? (
                                    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', borderRadius: '50%', background: '#e8f5e9', color: '#4caf50', fontSize: '30px', marginBottom: '20px' }}>✓</div>
                                ) : (
                                    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', borderRadius: '50%', background: '#fff0f0', color: '#ff7a7a', fontSize: '24px', marginBottom: '20px' }}>🔒</div>
                                )}
                                <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#1a1a1a', marginBottom: '8px' }}>
                                    {resetSent ? 'Check your email' : 'Reset Password'}
                                </h2>
                                <p style={{ color: '#666', fontSize: '15px', margin: 0, lineHeight: '1.5' }}>
                                    {resetSent 
                                        ? <>We have sent a secure link to reset your password for <strong>{email}</strong>.</>
                                        : "Enter your email address and we'll send you a link to reset your password."
                                    }
                                </p>
                            </div>

                            {resetSent ? (
                                <button 
                                    onClick={() => {
                                        setIsResetMode(false);
                                        setResetSent(false);
                                        setPassword('');
                                    }} 
                                    type="button"
                                    style={{
                                        width: '100%',
                                        padding: '14px',
                                        background: '#f5f5f5',
                                        color: '#333',
                                        border: '1px solid #ddd',
                                        borderRadius: '10px',
                                        cursor: 'pointer',
                                        fontWeight: 'bold',
                                        fontSize: '15px',
                                        transition: 'background 0.2s'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.background = '#eee'}
                                    onMouseOut={(e) => e.currentTarget.style.background = '#f5f5f5'}
                                >
                                    Back to Login
                                </button>
                            ) : (
                                <form onSubmit={handleForgotPassword} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>Email address</label>
                                        <input 
                                            type="email" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            required 
                                            style={{
                                                width: '100%',
                                                padding: '14px 16px',
                                                borderRadius: '10px',
                                                border: '1px solid #e0e0e0',
                                                fontSize: '15px',
                                                outline: 'none',
                                                transition: 'border 0.2s',
                                                backgroundColor: '#fafafa',
                                                boxSizing: 'border-box'
                                            }}
                                            onFocus={(e) => e.target.style.border = '1px solid #ff7a7a'}
                                            onBlur={(e) => e.target.style.border = '1px solid #e0e0e0'}
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        disabled={loading || !email}
                                        style={{
                                            background: '#ff7a7a',
                                            color: '#fff',
                                            padding: '14px',
                                            border: 'none',
                                            borderRadius: '10px',
                                            cursor: 'pointer',
                                            width: '100%',
                                            fontWeight: 'bold',
                                            fontSize: '16px',
                                            marginTop: '5px',
                                            boxShadow: '0 4px 14px rgba(255, 122, 122, 0.3)',
                                            transition: 'transform 0.1s',
                                            opacity: (loading || !email) ? 0.6 : 1
                                        }}
                                        onMouseDown={(e) => { if(!loading && email) e.currentTarget.style.transform = 'scale(0.98)' }}
                                        onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    >
                                        {loading ? 'Sending...' : 'Send Reset Link'}
                                    </button>
                                    <div style={{ textAlign: 'center', marginTop: '5px' }}>
                                        <button 
                                            onClick={() => setIsResetMode(false)} 
                                            type="button"
                                            style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}
                                        >
                                            ← Back to Login
                                        </button>
                                    </div>
                                </form>
                            )}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default LoginForm;
