"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAdmin: boolean;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    isAdmin: false,
    logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Use cryptographic custom claims, not a public env var
                const idTokenResult = await user.getIdTokenResult(true);
                setIsAdmin(idTokenResult.claims.admin === true);

                // User signed in, sync session cookie
                const idToken = idTokenResult.token;
                await fetch('/api/auth/session', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ idToken }),
                });
            } else {
                setIsAdmin(false);
                // User signed out, clear session
                await fetch('/api/auth/session/logout', { method: 'POST' });
            }
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        await fetch('/api/auth/session/logout', { method: 'POST' });
        await auth.signOut();
        setIsAdmin(false);
    };

    return (
        <AuthContext.Provider value={{ user, loading, isAdmin, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
