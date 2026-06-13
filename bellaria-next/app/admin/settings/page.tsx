"use client";

import React, { useEffect, useState } from 'react';
import { getSettings, updateSettings, StoreSettings } from '@/lib/db/settings';
import toast from 'react-hot-toast';
import Skeleton from '@/components/common/Skeleton';

export default function SettingsPage() {
    const [settings, setSettings] = useState<StoreSettings>({ aboutUsText: '', contactEmail: '', contactPhone: '', deliverablePincodes: [], privacyPolicyText: '', termsOfUseText: '', refundPolicyText: '' });
    const [pincodesInput, setPincodesInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const loadSettings = async () => {
            const data = await getSettings();
            if (data) {
                setSettings({
                    aboutUsText: data.aboutUsText || '',
                    contactEmail: data.contactEmail || '',
                    contactPhone: data.contactPhone || '',
                    deliverablePincodes: data.deliverablePincodes || [],
                    privacyPolicyText: data.privacyPolicyText || '',
                    termsOfUseText: data.termsOfUseText || '',
                    refundPolicyText: data.refundPolicyText || '',
                    homeCtaTitle: data.homeCtaTitle || '',
                    homeCtaDescription: data.homeCtaDescription || ''
                });
                if (data.deliverablePincodes) {
                    setPincodesInput(data.deliverablePincodes.join(', '));
                }
            }
            setLoading(false);
        };
        loadSettings();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        
        // Convert comma-separated string back to array, trimming whitespace
        const parsedPincodes = pincodesInput.split(',').map(pin => pin.trim()).filter(pin => pin.length > 0);
        const updatedSettings = { ...settings, deliverablePincodes: parsedPincodes };
        
        const success = await updateSettings(updatedSettings);
        if (success) {
            toast.success("Settings updated!");
        } else {
            toast.error("Failed to update settings.");
        }
        setSaving(false);
    };

    if (loading) return (
        <div>
            <div className="sec-title">
                <h2>Store Settings</h2>
            </div>
            <div className="contact-form">
                <div className="row clearfix">
                    {[1, 2].map(n => (
                        <div key={n} className="col-lg-6 col-md-6 col-sm-12 form-group">
                            <Skeleton type="text" width="150px" height="20px" style={{ marginBottom: '10px' }} />
                            <Skeleton type="text" width="100%" height="50px" />
                        </div>
                    ))}
                    {[1, 2, 3, 4, 5, 6].map(n => (
                        <div key={n + 2} className="col-lg-12 col-md-12 col-sm-12 form-group">
                            <Skeleton type="text" width="200px" height="20px" style={{ marginBottom: '10px' }} />
                            <Skeleton type="text" width="100%" height="200px" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <div className="sec-title">
                <h2>Store Settings</h2>
            </div>
            <div className="contact-form">
                <form onSubmit={handleSubmit}>
                    <div className="row clearfix">
                        <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                            <label style={{ fontWeight: 'bold' }}>Contact Email</label>
                            <input type="email" value={settings.contactEmail} onChange={e => setSettings({...settings, contactEmail: e.target.value})} />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                            <label style={{ fontWeight: 'bold' }}>Contact Phone</label>
                            <input type="text" value={settings.contactPhone} onChange={e => setSettings({...settings, contactPhone: e.target.value})} />
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                            <label style={{ fontWeight: 'bold' }}>Serviceable Pincodes (Comma-separated)</label>
                            <textarea 
                                value={pincodesInput} 
                                onChange={e => setPincodesInput(e.target.value)} 
                                style={{ height: '100px', overflowY: 'auto', resize: 'vertical' }}
                                placeholder="e.g. 110001, 400001, 560001"
                            ></textarea>
                            <small style={{ color: '#666' }}>Enter all pincodes where delivery is supported, separated by commas.</small>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                            <label style={{ fontWeight: 'bold' }}>About Us Text</label>
                            <textarea value={settings.aboutUsText} onChange={e => setSettings({...settings, aboutUsText: e.target.value})} style={{ height: '200px', overflowY: 'auto', resize: 'vertical' }}></textarea>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                            <label style={{ fontWeight: 'bold' }}>Privacy Policy Text</label>
                            <textarea value={settings.privacyPolicyText} onChange={e => setSettings({...settings, privacyPolicyText: e.target.value})} style={{ height: '200px', overflowY: 'auto', resize: 'vertical' }}></textarea>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                            <label style={{ fontWeight: 'bold' }}>Terms of Use Text</label>
                            <textarea value={settings.termsOfUseText} onChange={e => setSettings({...settings, termsOfUseText: e.target.value})} style={{ height: '200px', overflowY: 'auto', resize: 'vertical' }}></textarea>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                            <label style={{ fontWeight: 'bold' }}>Home Page Call-To-Action Title</label>
                            <input type="text" value={settings.homeCtaTitle} onChange={e => setSettings({...settings, homeCtaTitle: e.target.value})} placeholder="e.g. Magic Processing" />
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                            <label style={{ fontWeight: 'bold' }}>Home Page Call-To-Action Description</label>
                            <textarea value={settings.homeCtaDescription} onChange={e => setSettings({...settings, homeCtaDescription: e.target.value})} style={{ height: '100px', overflowY: 'auto', resize: 'vertical' }} placeholder="Enter the text that appears beneath the title..."></textarea>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                            <label style={{ fontWeight: 'bold' }}>Refund Policy Text</label>
                            <textarea value={settings.refundPolicyText} onChange={e => setSettings({...settings, refundPolicyText: e.target.value})} style={{ height: '200px', overflowY: 'auto', resize: 'vertical' }}></textarea>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                            <button 
                                type="submit" 
                                disabled={saving} 
                                style={{
                                    background: '#ff7a7a',
                                    color: '#fff',
                                    padding: '12px 30px',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                    marginTop: '20px'
                                }}
                            >
                                {saving ? 'Saving...' : 'Save Settings'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
