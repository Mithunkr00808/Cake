"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import toast from 'react-hot-toast';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            toast.success("Logged in successfully!");
            
            // If it's the admin, redirect to admin panel
            if (userCredential.user.email === 'sliceofcake2026@gmail.com') {
                router.push('/admin');
            } else {
                router.push('/');
            }
        } catch (error: any) {
            console.error("Login Error", error);
            toast.error(error.message || "Failed to log in.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="login-section">
            <div className="auto-container">
                <div className="login-form">
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

                        <div className="form-group">
                            <input type="checkbox" name="shipping-option" id="account-option-1" />&nbsp; <label htmlFor="account-option-1">Remember me</label>
                        </div>

                        <div className="form-group pass">
                            <Link href="#" className="psw">Lost your password?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default LoginForm;
