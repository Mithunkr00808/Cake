"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signOut, updateProfile, updatePassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { getOrdersByUserId, Order } from '@/lib/db/orders';
import toast from 'react-hot-toast';
import PageTitle from '@/components/common/PageTitle';
import Skeleton from '@/components/common/Skeleton';

type Tab = 'profile' | 'orders' | 'password';

const STATUS_LABELS: Record<string, string> = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    processing: 'Processing',
    out_for_delivery: 'Out for Delivery',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
};

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
    pending:          { bg: '#FFF8E1', color: '#F57F17' },
    confirmed:        { bg: '#E3F2FD', color: '#1565C0' },
    processing:       { bg: '#FFF3E0', color: '#E65100' },
    out_for_delivery: { bg: '#F3E5F5', color: '#6A1B9A' },
    delivered:        { bg: '#E8F5E9', color: '#1B5E20' },
    cancelled:        { bg: '#FFEBEE', color: '#B71C1C' },
};

export default function MyAccountPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<Tab>('profile');

    // Profile state
    const [profile, setProfile] = useState({
        displayName: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        email: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [savingProfile, setSavingProfile] = useState(false);
    const [profileLoading, setProfileLoading] = useState(true);

    // Hydrate from cache on mount
    useEffect(() => {
        try {
            const cachedProfile = sessionStorage.getItem('my_account_profile');
            if (cachedProfile) {
                setProfile(JSON.parse(cachedProfile));
                setProfileLoading(false);
            }
            const cachedOrders = sessionStorage.getItem('my_account_orders');
            if (cachedOrders) {
                setOrders(JSON.parse(cachedOrders));
                setLoadingOrders(false);
            }
        } catch (e) {}
    }, []);

    const validateField = (name: keyof typeof profile, value: string) => {
        let error = '';
        switch (name) {
            case 'displayName':
                if (value.trim().length < 3) error = 'Full name must be at least 3 characters.';
                break;
            case 'phone':
                if (!/^[6-9]\d{9}$/.test(value)) error = 'Please enter a valid Indian phone number.';
                break;
            case 'pincode':
                if (!/^[1-9]\d{5}$/.test(value)) error = 'Please enter a valid Indian pincode.';
                break;
            case 'address':
                if (!value.trim()) error = 'Address is required.';
                break;
            case 'city':
                if (!value.trim()) error = 'City is required.';
                break;
            case 'state':
                if (!value.trim()) error = 'State is required.';
                break;
        }
        setErrors(prev => ({ ...prev, [name]: error }));
        return !error;
    };

    const handleBlur = (name: keyof typeof profile, value: string) => {
        validateField(name, value);
    };

    // Password state
    const [passwordForm, setPasswordForm] = useState({ newPassword: '', confirmPassword: '' });
    const [savingPassword, setSavingPassword] = useState(false);

    // Orders state
    const [orders, setOrders] = useState<Order[]>([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

    // Redirect if not logged in
    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);


    // Load profile from Firestore
    useEffect(() => {
        if (!user) return;
        const fetchProfile = async () => {
            try {
                const docRef = doc(db, 'users', user.uid);
                const snap = await getDoc(docRef);
                let newProfile = { ...profile };
                if (snap.exists()) {
                    const data = snap.data();
                    newProfile = {
                        displayName: user.displayName || data.displayName || '',
                        email: user.email || data.email || '',
                        phone: data.phone || '',
                        address: data.address || '',
                        city: data.city || '',
                        state: data.state || '',
                        pincode: data.pincode || '',
                    };
                } else {
                    newProfile = { ...profile, displayName: user.displayName || '', email: user.email || '' };
                }
                setProfile(newProfile);
                sessionStorage.setItem('my_account_profile', JSON.stringify(newProfile));
            } finally {
                setProfileLoading(false);
            }
        };
        fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    // Load user's orders
    const fetchOrders = useCallback(async () => {
        if (!user) return;
        // Only show loading spinner if we don't have orders and haven't cached an empty state
        if (!sessionStorage.getItem('my_account_orders')) {
            setLoadingOrders(true);
        }
        try {
            const myOrders = await getOrdersByUserId(user.uid);
            setOrders(myOrders);
            sessionStorage.setItem('my_account_orders', JSON.stringify(myOrders));
        } finally {
            setLoadingOrders(false);
        }
    }, [user]);

    useEffect(() => {
        if (activeTab === 'orders') fetchOrders();
    }, [activeTab, fetchOrders]);

    const handleProfileSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        // Run all validations before save
        const isNameValid = validateField('displayName', profile.displayName);
        const isPhoneValid = validateField('phone', profile.phone);
        const isAddressValid = validateField('address', profile.address);
        const isCityValid = validateField('city', profile.city);
        const isStateValid = validateField('state', profile.state);
        const isPincodeValid = validateField('pincode', profile.pincode);

        if (!isNameValid || !isPhoneValid || !isAddressValid || !isCityValid || !isStateValid || !isPincodeValid) {
            toast.error('Please fix the errors before saving.');
            return;
        }

        setSavingProfile(true);
        try {
            // Update Firebase Auth display name
            if (profile.displayName !== user.displayName) {
                await updateProfile(user, { displayName: profile.displayName });
            }
            // Save full profile to Firestore
            await setDoc(doc(db, 'users', user.uid), {
                displayName: profile.displayName,
                email: user.email,
                phone: profile.phone,
                address: profile.address,
                city: profile.city,
                state: profile.state,
                pincode: profile.pincode,
            }, { merge: true });
            toast.success('Profile updated successfully!');
        } catch {
            toast.error('Failed to update profile.');
        } finally {
            setSavingProfile(false);
        }
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }
        if (passwordForm.newPassword.length < 6) {
            toast.error('Password must be at least 6 characters.');
            return;
        }
        setSavingPassword(true);
        try {
            await updatePassword(user, passwordForm.newPassword);
            toast.success('Password updated successfully!');
            setPasswordForm({ newPassword: '', confirmPassword: '' });
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Failed to update password.';
            if (message.includes('requires-recent-login')) {
                toast.error('Please log out and log back in before changing your password.');
            } else {
                toast.error(message);
            }
        } finally {
            setSavingPassword(false);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        toast.success('Logged out.');
        router.push('/');
    };

    const tabStyle = (tab: Tab): React.CSSProperties => ({
        padding: '10px 20px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: activeTab === tab ? 700 : 400,
        background: activeTab === tab ? '#ff7a7a' : 'transparent',
        color: activeTab === tab ? '#fff' : '#555',
        border: activeTab === tab ? '1px solid #ff7a7a' : '1px solid #e5e5e5',
        transition: 'all 0.2s',
        fontSize: '14px',
    });

    const inputStyle: React.CSSProperties = {
        width: '100%', padding: '10px 14px', border: '1px solid #ddd',
        borderRadius: '6px', fontSize: '14px', background: '#fafafa',
        outline: 'none', boxSizing: 'border-box', marginTop: '6px',
    };

    const labelStyle: React.CSSProperties = {
        fontSize: '13px', fontWeight: 600, color: '#444', display: 'block',
    };

    return (
        <>
            <PageTitle
                title="My Account"
                breadcrumb={[
                    { label: 'Home', href: '/' },
                    { label: 'My Account' },
                ]}
                backgroundImage="/assets/images/background/about-title-bg.png"
            />

            <section className="sidebar-page-container" style={{ padding: '60px 0' }}>
                <div className="auto-container">
                    <div className="row clearfix">
                        {/* Sidebar */}
                        <div className="sidebar-side col-lg-3 col-md-12 col-sm-12">
                            <aside className="sidebar">
                                {/* User Info Card */}
                                <div style={{
                                    background: 'linear-gradient(135deg, #ff7a7a, #ffb347)',
                                    borderRadius: '12px', padding: '24px', textAlign: 'center', marginBottom: '20px',
                                }}>
                                    <div style={{
                                        width: '70px', height: '70px', borderRadius: '50%',
                                        background: 'rgba(255,255,255,0.3)', display: 'flex',
                                        alignItems: 'center', justifyContent: 'center',
                                        margin: '0 auto 12px', fontSize: '28px', color: '#fff',
                                        fontWeight: 700,
                                    }}>
                                        {profileLoading ? '...' : (profile.displayName || user?.email || profile.email || 'U')[0].toUpperCase()}
                                    </div>
                                    <div style={{ color: '#fff', fontWeight: 700, fontSize: '16px' }}>
                                        {profileLoading ? <Skeleton type="text" width="80%" height="20px" style={{ margin: '0 auto' }} /> : (profile.displayName || 'User')}
                                    </div>
                                    <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '12px', marginTop: '4px', wordBreak: 'break-all' }}>
                                        {profileLoading ? <Skeleton type="text" width="60%" height="15px" style={{ margin: '4px auto 0 auto' }} /> : (user?.email || profile.email)}
                                    </div>
                                </div>

                                {/* Nav */}
                                <div className="sidebar-widget categories-widget">
                                    <div className="widget-content">
                                        <ul className="blog-cat" style={{ listStyle: 'none', padding: 0 }}>
                                            {[
                                                { id: 'profile', label: '👤 Profile' },
                                                { id: 'orders', label: '📦 My Orders' },
                                                { id: 'password', label: '🔒 Change Password' },
                                            ].map(item => (
                                                <li key={item.id} style={{ marginBottom: '6px' }}>
                                                    <button
                                                        onClick={() => setActiveTab(item.id as Tab)}
                                                        style={{
                                                            width: '100%', textAlign: 'left',
                                                            border: 'none', padding: '10px 12px', cursor: 'pointer',
                                                            borderRadius: '6px', fontSize: '14px',
                                                            color: activeTab === item.id ? '#ff7a7a' : '#555',
                                                            fontWeight: activeTab === item.id ? 700 : 400,
                                                            background: activeTab === item.id ? '#fff5f5' : 'none',
                                                        }}
                                                    >
                                                        {item.label}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <button
                                    onClick={handleLogout}
                                    style={{
                                        width: '100%', padding: '10px', marginTop: '12px',
                                        background: '#fff', border: '1px solid #ddd', borderRadius: '6px',
                                        cursor: 'pointer', color: '#e53935', fontWeight: 600, fontSize: '14px',
                                    }}
                                >
                                    🚪 Logout
                                </button>
                            </aside>
                        </div>

                        {/* Content */}
                        <div className="content-side col-lg-9 col-md-12 col-sm-12">
                            <div style={{
                                background: '#fff', borderRadius: '12px',
                                boxShadow: '0 2px 20px rgba(0,0,0,0.06)', padding: '36px',
                            }}>

                                {/* ── PROFILE TAB ── */}
                                {activeTab === 'profile' && (
                                    <form onSubmit={handleProfileSave}>
                                        <h3 style={{ marginBottom: '24px', fontSize: '20px', color: '#222' }}>Personal Information</h3>
                                        <div className="row clearfix">
                                            {profileLoading ? (
                                                // Skeleton Loaders
                                                <>
                                                    {[1, 2, 3, 4, 5, 6, 7].map(i => (
                                                        <div key={i} className={`col-lg-${i === 5 ? '12' : '6'} col-md-${i === 5 ? '12' : '6'} col-sm-12`} style={{ marginBottom: '18px' }}>
                                                            <Skeleton type="text" width="100px" height="15px" style={{ marginBottom: '6px' }} />
                                                            <Skeleton type="button" width="100%" height="40px" />
                                                        </div>
                                                    ))}
                                                </>
                                            ) : (
                                                // Actual Form
                                                <>
                                                    <div className="col-lg-6 col-md-6 col-sm-12" style={{ marginBottom: '18px' }}>
                                                        <label style={labelStyle}>Full Name</label>
                                                        <input
                                                            style={{ ...inputStyle, border: errors.displayName ? '1px solid #ff7a7a' : inputStyle.border }}
                                                            type="text"
                                                            value={profile.displayName}
                                                            onChange={e => {
                                                                setProfile(p => ({ ...p, displayName: e.target.value }));
                                                                if (errors.displayName) validateField('displayName', e.target.value);
                                                            }}
                                                            onBlur={() => handleBlur('displayName', profile.displayName)}
                                                            placeholder="Your full name"
                                                        />
                                                        {errors.displayName && <span style={{ color: '#ff7a7a', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.displayName}</span>}
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-12" style={{ marginBottom: '18px' }}>
                                                        <label style={labelStyle}>Email Address</label>
                                                        <input
                                                            style={{ ...inputStyle, background: '#f0f0f0', color: '#888' }}
                                                            type="email"
                                                            value={user?.email || profile.email || ''}
                                                            readOnly
                                                            title="Email cannot be changed here"
                                                        />
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-12" style={{ marginBottom: '18px' }}>
                                                        <label style={labelStyle}>Phone Number</label>
                                                        <input
                                                            style={{ ...inputStyle, border: errors.phone ? '1px solid #ff7a7a' : inputStyle.border }}
                                                            type="tel"
                                                            value={profile.phone}
                                                            onChange={e => {
                                                                const val = e.target.value.replace(/\D/g, '');
                                                                setProfile(p => ({ ...p, phone: val }));
                                                                if (errors.phone) validateField('phone', val);
                                                            }}
                                                            onBlur={() => handleBlur('phone', profile.phone)}
                                                            placeholder="+91 XXXXX XXXXX"
                                                            maxLength={10}
                                                        />
                                                        {errors.phone && <span style={{ color: '#ff7a7a', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.phone}</span>}
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-12" style={{ marginBottom: '18px' }}>
                                                        <label style={labelStyle}>City</label>
                                                        <input
                                                            style={{ ...inputStyle, border: errors.city ? '1px solid #ff7a7a' : inputStyle.border }}
                                                            type="text"
                                                            value={profile.city}
                                                            onChange={e => {
                                                                setProfile(p => ({ ...p, city: e.target.value }));
                                                                if (errors.city) validateField('city', e.target.value);
                                                            }}
                                                            onBlur={() => handleBlur('city', profile.city)}
                                                            placeholder="City"
                                                        />
                                                        {errors.city && <span style={{ color: '#ff7a7a', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.city}</span>}
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ marginBottom: '18px' }}>
                                                        <label style={labelStyle}>Street Address</label>
                                                        <input
                                                            style={{ ...inputStyle, border: errors.address ? '1px solid #ff7a7a' : inputStyle.border }}
                                                            type="text"
                                                            value={profile.address}
                                                            onChange={e => {
                                                                setProfile(p => ({ ...p, address: e.target.value }));
                                                                if (errors.address) validateField('address', e.target.value);
                                                            }}
                                                            onBlur={() => handleBlur('address', profile.address)}
                                                            placeholder="House No, Street name"
                                                        />
                                                        {errors.address && <span style={{ color: '#ff7a7a', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.address}</span>}
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-12" style={{ marginBottom: '18px' }}>
                                                        <label style={labelStyle}>State</label>
                                                        <input
                                                            style={{ ...inputStyle, border: errors.state ? '1px solid #ff7a7a' : inputStyle.border }}
                                                            type="text"
                                                            value={profile.state}
                                                            onChange={e => {
                                                                setProfile(p => ({ ...p, state: e.target.value }));
                                                                if (errors.state) validateField('state', e.target.value);
                                                            }}
                                                            onBlur={() => handleBlur('state', profile.state)}
                                                            placeholder="State"
                                                        />
                                                        {errors.state && <span style={{ color: '#ff7a7a', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.state}</span>}
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-12" style={{ marginBottom: '18px' }}>
                                                        <label style={labelStyle}>Pincode / ZIP</label>
                                                        <input
                                                            style={{ ...inputStyle, border: errors.pincode ? '1px solid #ff7a7a' : inputStyle.border }}
                                                            type="text"
                                                            value={profile.pincode}
                                                            onChange={e => {
                                                                let val = e.target.value.replace(/\D/g, '');
                                                                if (val.startsWith('0')) val = val.substring(1);
                                                                setProfile(p => ({ ...p, pincode: val }));
                                                                if (errors.pincode) validateField('pincode', val);
                                                            }}
                                                            onBlur={() => handleBlur('pincode', profile.pincode)}
                                                            placeholder="Pincode"
                                                            maxLength={6}
                                                        />
                                                        {errors.pincode && <span style={{ color: '#ff7a7a', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.pincode}</span>}
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        <div style={{ marginTop: '10px' }}>
                                            <button
                                                type="submit"
                                                disabled={savingProfile || loading || profileLoading}
                                                style={{
                                                    padding: '12px 32px', background: '#ff7a7a', color: '#fff',
                                                    border: 'none', borderRadius: '6px', cursor: 'pointer',
                                                    fontWeight: 700, fontSize: '14px',
                                                    opacity: (savingProfile || loading || profileLoading) ? 0.7 : 1,
                                                }}
                                            >
                                                {savingProfile ? 'Saving...' : 'Save Changes'}
                                            </button>
                                        </div>
                                    </form>
                                )}

                                {/* ── ORDERS TAB ── */}
                                {activeTab === 'orders' && (
                                    <div>
                                        <h3 style={{ marginBottom: '24px', fontSize: '20px', color: '#222' }}>My Orders</h3>
                                        {loadingOrders ? (
                                            <p style={{ color: '#aaa', textAlign: 'center', padding: '40px 0' }}>Loading orders...</p>
                                        ) : orders.length === 0 ? (
                                            <div style={{
                                                textAlign: 'center', padding: '60px', background: '#fafafa',
                                                borderRadius: '10px', border: '1px dashed #ddd',
                                            }}>
                                                <div style={{ fontSize: '40px', marginBottom: '12px' }}>📦</div>
                                                <p style={{ color: '#aaa' }}>You have no orders yet.</p>
                                                <Link href="/shop" className="theme-btn" style={{ display: 'inline-block', marginTop: '16px' }}>
                                                    <span className="btn-title">Start Shopping</span>
                                                </Link>
                                            </div>
                                        ) : (
                                            <div>
                                                {orders.map(order => {
                                                    const statusStyle = STATUS_COLORS[order.status] || { bg: '#eee', color: '#333' };
                                                    const isExpanded = expandedOrderId === order.id;
                                                    const date = order.createdAt && typeof (order.createdAt as unknown as { toDate?: () => Date }).toDate === 'function'
                                                        ? (order.createdAt as unknown as { toDate: () => Date }).toDate().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
                                                        : '—';

                                                    return (
                                                        <div key={order.id} style={{
                                                            border: '1px solid #eee', borderRadius: '10px',
                                                            marginBottom: '16px', overflow: 'hidden',
                                                        }}>
                                                            {/* Order Header */}
                                                            <div
                                                                onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                                                                style={{
                                                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                                                    padding: '16px 20px', cursor: 'pointer', background: '#fafafa',
                                                                    flexWrap: 'wrap', gap: '10px',
                                                                }}
                                                            >
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                                                                    <div>
                                                                        <div style={{ fontSize: '12px', color: '#aaa' }}>Order ID</div>
                                                                        <div style={{ fontFamily: 'monospace', fontSize: '13px', color: '#333' }}>
                                                                            #{order.id.slice(0, 12)}...
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <div style={{ fontSize: '12px', color: '#aaa' }}>Date</div>
                                                                        <div style={{ fontSize: '13px', color: '#333' }}>{date}</div>
                                                                    </div>
                                                                    <div>
                                                                        <div style={{ fontSize: '12px', color: '#aaa' }}>Total</div>
                                                                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#222' }}>
                                                                            ₹{order.total.toFixed(2)}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                                    <span style={{
                                                                        padding: '4px 14px', borderRadius: '20px',
                                                                        fontSize: '12px', fontWeight: 600,
                                                                        background: statusStyle.bg, color: statusStyle.color,
                                                                    }}>
                                                                        {STATUS_LABELS[order.status] || order.status}
                                                                    </span>
                                                                    <span style={{ color: '#aaa', fontSize: '16px' }}>{isExpanded ? '▲' : '▼'}</span>
                                                                </div>
                                                            </div>

                                                            {/* Expanded Details */}
                                                            {isExpanded && (
                                                                <div style={{ padding: '20px', borderTop: '1px solid #eee' }}>
                                                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                                                                        <thead>
                                                                            <tr style={{ borderBottom: '1px solid #eee' }}>
                                                                                <th style={{ textAlign: 'left', padding: '8px', color: '#888', fontWeight: 500 }}>Product</th>
                                                                                <th style={{ textAlign: 'center', padding: '8px', color: '#888', fontWeight: 500 }}>Qty</th>
                                                                                <th style={{ textAlign: 'right', padding: '8px', color: '#888', fontWeight: 500 }}>Price</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {order.items.map((item, i) => (
                                                                                <tr key={i} style={{ borderBottom: '1px solid #f5f5f5' }}>
                                                                                    <td style={{ padding: '10px 8px' }}>{item.name}</td>
                                                                                    <td style={{ padding: '10px 8px', textAlign: 'center', color: '#666' }}>×{item.quantity}</td>
                                                                                    <td style={{ padding: '10px 8px', textAlign: 'right', fontWeight: 600 }}>
                                                                                        ₹{(item.price * item.quantity).toFixed(2)}
                                                                                    </td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                        <tfoot>
                                                                            <tr>
                                                                                <td colSpan={2} style={{ textAlign: 'right', padding: '12px 8px', fontWeight: 700 }}>Total</td>
                                                                                <td style={{ textAlign: 'right', padding: '12px 8px', fontWeight: 700, color: '#ff7a7a' }}>
                                                                                    ₹{order.total.toFixed(2)}
                                                                                </td>
                                                                            </tr>
                                                                        </tfoot>
                                                                    </table>
                                                                    <div style={{ marginTop: '12px', fontSize: '13px', color: '#888' }}>
                                                                        Payment: <strong style={{ color: '#555' }}>{order.paymentMethod}</strong>
                                                                        &nbsp;•&nbsp;
                                                                        Delivery to: <strong style={{ color: '#555' }}>{order.customer.city}, {order.customer.state}</strong>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* ── PASSWORD TAB ── */}
                                {activeTab === 'password' && (
                                    <form onSubmit={handlePasswordChange}>
                                        <h3 style={{ marginBottom: '8px', fontSize: '20px', color: '#222' }}>Change Password</h3>
                                        <p style={{ color: '#888', marginBottom: '24px', fontSize: '14px' }}>
                                            For security, you may need to log in again after changing your password.
                                        </p>
                                        <div style={{ maxWidth: '420px' }}>
                                            <div style={{ marginBottom: '18px' }}>
                                                <label style={labelStyle}>New Password</label>
                                                <input
                                                    style={inputStyle}
                                                    type="password"
                                                    value={passwordForm.newPassword}
                                                    onChange={e => setPasswordForm(p => ({ ...p, newPassword: e.target.value }))}
                                                    placeholder="Min. 6 characters"
                                                    required
                                                />
                                            </div>
                                            <div style={{ marginBottom: '24px' }}>
                                                <label style={labelStyle}>Confirm New Password</label>
                                                <input
                                                    style={inputStyle}
                                                    type="password"
                                                    value={passwordForm.confirmPassword}
                                                    onChange={e => setPasswordForm(p => ({ ...p, confirmPassword: e.target.value }))}
                                                    placeholder="Repeat password"
                                                    required
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={savingPassword}
                                                style={{
                                                    padding: '12px 32px', background: '#ff7a7a', color: '#fff',
                                                    border: 'none', borderRadius: '6px', cursor: 'pointer',
                                                    fontWeight: 700, fontSize: '14px',
                                                    opacity: savingPassword ? 0.7 : 1,
                                                }}
                                            >
                                                {savingPassword ? 'Updating...' : 'Update Password'}
                                            </button>
                                        </div>
                                    </form>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
