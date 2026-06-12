"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import toast from 'react-hot-toast';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);
    
    // Forgot Password State
    const [isResetMode, setIsResetMode] = useState(false);
    const [resetSent, setResetSent] = useState(false);
    
    const router = useRouter();

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
        <section className="login-section">
            <div className="auto-container">
                <div className="login-form">
                    
                    {!isResetMode ? (
                        <>
                            <h2>Login</h2>
                            <form onSubmit={handleLogin}>
                                <div className="form-group">
                                    <label>Username or email address *</label>
                                    <input 
                                        type="email" 
                                        name="username" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required 
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Password *</label>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required 
                                    />
                                </div>

                                <div className="form-group">
                                    <button 
                                        className="theme-btn" 
                                        type="submit" 
                                        disabled={loading}
                                        style={{
                                            background: '#ff7a7a',
                                            color: '#fff',
                                            padding: '10px 30px',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {loading ? 'Logging in...' : 'Log in'}
                                    </button>
                                </div>

                                <div className="form-group flex items-center justify-between">
                                    <div>
                                        <input 
                                            type="checkbox" 
                                            name="remember-me" 
                                            id="account-option-1"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                        />&nbsp; <label htmlFor="account-option-1">Remember me</label>
                                    </div>
                                    <button 
                                        onClick={() => setIsResetMode(true)} 
                                        type="button"
                                        style={{ background: 'none', border: 'none', color: '#ff7a7a', cursor: 'pointer', fontSize: '14px' }}
                                    >
                                        Lost your password?
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <>
                            <h2>Reset Password</h2>
                            {resetSent ? (
                                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                    <div style={{ color: '#4caf50', fontSize: '48px', marginBottom: '15px' }}>✓</div>
                                    <h4 style={{ marginBottom: '10px' }}>Check your email</h4>
                                    <p style={{ color: '#666', marginBottom: '25px', lineHeight: '1.6' }}>
                                        If an account exists for <strong>{email}</strong>, we have sent a secure link to reset your password.
                                    </p>
                                    <button 
                                        onClick={() => {
                                            setIsResetMode(false);
                                            setResetSent(false);
                                            setPassword('');
                                        }} 
                                        type="button"
                                        style={{ background: 'none', border: '1px solid #ddd', color: '#333', cursor: 'pointer', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold' }}
                                    >
                                        Back to Login
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleForgotPassword}>
                                    <p style={{ marginBottom: '20px', color: '#666' }}>
                                        Enter your email address below and we'll send you a link to securely reset your password.
                                    </p>
                                    <div className="form-group">
                                        <label>Email address *</label>
                                        <input 
                                            type="email" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            required 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <button 
                                            className="theme-btn" 
                                            type="submit" 
                                            disabled={loading || !email}
                                            style={{
                                                background: '#ff7a7a',
                                                color: '#fff',
                                                padding: '10px 30px',
                                                border: 'none',
                                                borderRadius: '5px',
                                                cursor: 'pointer',
                                                opacity: (loading || !email) ? 0.6 : 1
                                            }}
                                        >
                                            {loading ? 'Sending...' : 'Send Reset Link'}
                                        </button>
                                    </div>
                                    <div className="form-group" style={{ textAlign: 'center', marginTop: '15px' }}>
                                        <button 
                                            onClick={() => setIsResetMode(false)} 
                                            type="button"
                                            style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '14px' }}
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
