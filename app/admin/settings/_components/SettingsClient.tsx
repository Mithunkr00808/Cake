"use client";

import React, { useState } from 'react';
import { updateSettings, StoreSettings } from '@/lib/db/settings';
import toast from 'react-hot-toast';

export default function SettingsClient({ initialSettings }: { initialSettings: StoreSettings }) {
    const [settings, setSettings] = useState<StoreSettings>(initialSettings);
    const [pincodesInput, setPincodesInput] = useState(
        initialSettings.deliverablePincodes ? initialSettings.deliverablePincodes.join(', ') : ''
    );
    const [saving, setSaving] = useState(false);

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

    return (
        <div>
            <div className="sec-title flex items-center justify-between">
                <h2>Store Settings</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontWeight: 'bold' }}>Store is Live?</span>
                    <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '34px' }}>
                        <input 
                            type="checkbox" 
                            checked={settings.isLive} 
                            onChange={e => setSettings({...settings, isLive: e.target.checked})} 
                            style={{ opacity: 0, width: 0, height: 0 }} 
                        />
                        <span style={{
                            position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
                            backgroundColor: settings.isLive ? '#ff7a7a' : '#ccc',
                            transition: '.4s', borderRadius: '34px'
                        }}>
                            <span style={{
                                position: 'absolute', content: '""', height: '26px', width: '26px', 
                                left: settings.isLive ? '30px' : '4px', bottom: '4px', 
                                backgroundColor: 'white', transition: '.4s', borderRadius: '50%'
                            }}></span>
                        </span>
                    </label>
                </div>
            </div>
            
            <div className="contact-form">
                <form onSubmit={handleSubmit}>
                    <div className="row clearfix">
                        {/* Contact Info */}
                        <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                            <label style={{ fontWeight: 'bold' }}>Contact Email</label>
                            <input type="email" value={settings.contactEmail} onChange={e => setSettings({...settings, contactEmail: e.target.value})} />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                            <label style={{ fontWeight: 'bold' }}>Contact Phone</label>
                            <input type="text" value={settings.contactPhone} onChange={e => setSettings({...settings, contactPhone: e.target.value})} />
                        </div>

                        {/* Social Links */}
                        <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                            <label style={{ fontWeight: 'bold' }}>Instagram URL</label>
                            <input type="url" placeholder="https://instagram.com/..." value={settings.instagram} onChange={e => setSettings({...settings, instagram: e.target.value})} />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                            <label style={{ fontWeight: 'bold' }}>Facebook URL</label>
                            <input type="url" placeholder="https://facebook.com/..." value={settings.facebook} onChange={e => setSettings({...settings, facebook: e.target.value})} />
                        </div>

                        {/* Delivery Pincodes */}
                        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                            <label style={{ fontWeight: 'bold' }}>Serviceable Pincodes (Comma-separated)</label>
                            <textarea 
                                value={pincodesInput} 
                                onChange={e => setPincodesInput(e.target.value)} 
                                style={{ minHeight: '100px' }}
                                placeholder="e.g. 110001, 400001, 560001"
                            ></textarea>
                            <small style={{ color: '#666' }}>Enter all pincodes where delivery is supported, separated by commas.</small>
                        </div>

                        {/* About Us */}
                        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                            <label style={{ fontWeight: 'bold' }}>About Us Text</label>
                            <textarea value={settings.aboutUsText} onChange={e => setSettings({...settings, aboutUsText: e.target.value})} style={{ minHeight: '150px' }}></textarea>
                        </div>

                        {/* Policies */}
                        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                            <label style={{ fontWeight: 'bold' }}>Refund Policy</label>
                            <textarea placeholder="Enter your full refund policy..." value={settings.refundPolicy} onChange={e => setSettings({...settings, refundPolicy: e.target.value})} style={{ minHeight: '150px' }}></textarea>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                            <label style={{ fontWeight: 'bold' }}>Terms of Use</label>
                            <textarea placeholder="Enter your terms of use..." value={settings.termsOfUse} onChange={e => setSettings({...settings, termsOfUse: e.target.value})} style={{ minHeight: '150px' }}></textarea>
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
