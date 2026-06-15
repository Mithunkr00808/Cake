"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';

const RegisterForm = () => {
    const { user, loading: authLoading } = useAuth();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    const router = useRouter();

    useEffect(() => {
        if (!authLoading && user) {
            // Wait for context to update
            router.push('/');
        }
    }, [user, authLoading, router]);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            // Create user
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            // Update profile with name
            await updateProfile(userCredential.user, {
                displayName: `${firstName} ${lastName}`.trim()
            });

            // Get token and sync session immediately to prevent UI flash
            const idToken = await userCredential.user.getIdToken();
            await fetch('/api/auth/session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idToken }),
            });

            toast.success("Account created successfully!");
            router.push('/');
            
        } catch (error: unknown) {
            console.error("Registration error:", error);
            const err = error as { code?: string; message?: string };
            if (err.code === 'auth/email-already-in-use') {
                toast.error("An account with this email already exists.");
            } else if (err.code === 'auth/weak-password') {
                toast.error("Password should be at least 6 characters.");
            } else {
                toast.error(err.message || "Registration failed. Please try again.");
            }
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
                    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                        <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#1a1a1a', marginBottom: '8px' }}>Create an Account</h2>
                        <p style={{ color: '#666', fontSize: '15px', margin: 0 }}>Join Slice of Cake for premium treats.</p>
                    </div>

                    <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>First name</label>
                                <input 
                                    type="text" 
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="First Name"
                                    required 
                                    style={inputStyle}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>Last name</label>
                                <input 
                                    type="text" 
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Last Name"
                                    required 
                                    style={inputStyle}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>Email address</label>
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required 
                                style={inputStyle}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
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
                                minLength={6}
                                style={inputStyle}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>Confirm Password</label>
                            <input 
                                type="password" 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                required 
                                minLength={6}
                                style={inputStyle}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
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
                            {loading ? 'Creating Account...' : 'Sign up'}
                        </button>

                        <div style={{ textAlign: 'center', marginTop: '10px' }}>
                            <p style={{ color: '#666', fontSize: '14px' }}>
                                Already have an account?{' '}
                                <Link href="/login" style={{ color: '#ff7a7a', fontWeight: '600', textDecoration: 'none' }}>
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '10px',
    border: '1px solid #e0e0e0',
    fontSize: '15px',
    outline: 'none',
    transition: 'border 0.2s',
    backgroundColor: '#fafafa',
    boxSizing: 'border-box' as const
};

const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => e.target.style.border = '1px solid #ff7a7a';
const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => e.target.style.border = '1px solid #e0e0e0';

export default RegisterForm;
