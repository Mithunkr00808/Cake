"use client";

import React, { useState } from 'react';
import { updateSettings, StoreSettings } from '@/lib/db/settings';
import { revalidateSettingsCache } from '../actions';
import toast from 'react-hot-toast';

const TagInput = ({ tags, setTags, placeholder }: { tags: string[], setTags: (tags: string[]) => void, placeholder: string }) => {
    const [input, setInput] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const val = input.trim();
            if (val && !tags.includes(val)) {
                setTags([...tags, val]);
            }
            setInput('');
        }
    };

    const removeTag = (indexToRemove: number) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '8px', borderRadius: '4px', display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', background: '#fff' }}>
            {tags.map((tag, index) => (
                <div key={index} style={{ background: '#ff7a7a', color: 'white', padding: '6px 12px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 500 }}>
                    <span>{tag}</span>
                    <span 
                        role="button" 
                        onClick={() => removeTag(index)} 
                        style={{ background: 'rgba(0,0,0,0.15)', cursor: 'pointer', fontSize: '14px', width: '20px', height: '20px', minWidth: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', lineHeight: 1 }}
                    >
                        &times;
                    </span>
                </div>
            ))}
            <input 
                type="text" 
                value={input} 
                onChange={e => setInput(e.target.value)} 
                onKeyDown={handleKeyDown} 
                placeholder={tags.length === 0 ? placeholder : 'Add another...'}
                style={{ border: 'none', outline: 'none', flex: 1, minWidth: '120px', padding: '4px', background: 'transparent' }} 
            />
        </div>
    );
};

export default function SettingsClient({ initialSettings }: { initialSettings: StoreSettings }) {
    const [settings, setSettings] = useState<StoreSettings>(initialSettings);
    const [pincodes, setPincodes] = useState<string[]>(
        initialSettings.deliverablePincodes || []
    );
    const [categories, setCategories] = useState<string[]>(
        initialSettings.categories || ['Birthday Cakes', 'Wedding Cakes', 'Custom Cakes', 'Cupcakes', 'Pastries', 'Brownies', 'Vegan Cakes', 'Gluten-Free Cakes', 'Other']
    );
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        
        const updatedSettings = { 
            ...settings, 
            deliverablePincodes: pincodes,
            categories: categories 
        };
        
        try {
            const success = await updateSettings(updatedSettings);
            if (success) {
                await revalidateSettingsCache();
                toast.success("Settings updated!");
            } else {
                toast.error("Failed to update settings.");
            }
        } catch (error) {
            toast.error("An error occurred while updating settings.");
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

                        {/* Home Page Call To Action */}
                        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                            <label style={{ fontWeight: 'bold' }}>Home Page Call-To-Action Title</label>
                            <input type="text" value={settings.homeCtaTitle || ''} onChange={e => setSettings({...settings, homeCtaTitle: e.target.value})} placeholder="e.g. Magic Processing" />
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                            <label style={{ fontWeight: 'bold' }}>Home Page Call-To-Action Description</label>
                            <textarea value={settings.homeCtaDescription || ''} onChange={e => setSettings({...settings, homeCtaDescription: e.target.value})} style={{ height: '100px', overflowY: 'auto', resize: 'vertical' }} placeholder="Enter the text that appears beneath the title..."></textarea>
                        </div>

                        {/* Delivery Pincodes */}
                        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                            <label style={{ fontWeight: 'bold' }}>Serviceable Pincodes</label>
                            <TagInput tags={pincodes} setTags={setPincodes} placeholder="Type a pincode and press Enter" />
                            <small style={{ color: '#666', display: 'block', marginTop: '8px' }}>Press <kbd>Enter</kbd> or comma to add a pincode.</small>
                        </div>

                        {/* Product Categories */}
                        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                            <label style={{ fontWeight: 'bold' }}>Product Categories</label>
                            <TagInput tags={categories} setTags={setCategories} placeholder="Type a category and press Enter" />
                            <small style={{ color: '#666', display: 'block', marginTop: '8px' }}>Press <kbd>Enter</kbd> or comma to add a category. These will appear in the Inventory Add/Edit form.</small>
                        </div>

                        {/* About Us */}
                        <div className="form-group col-lg-12 col-md-12 col-sm-12">
                            <label style={{ fontWeight: 'bold' }}>About Us Text</label>
                            <textarea value={settings.aboutUsText} onChange={e => setSettings({...settings, aboutUsText: e.target.value})} style={{ minHeight: '150px', overflowY: 'auto', resize: 'vertical' }}></textarea>
                        </div>

                        {/* Policies */}
                        <div className="form-group col-lg-12 col-md-12 col-sm-12">
                            <label>Refund Policy</label>
                            <textarea placeholder="Enter your full refund policy..." value={settings.refundPolicy} onChange={e => setSettings({...settings, refundPolicy: e.target.value})} style={{ minHeight: '150px', overflowY: 'auto', resize: 'vertical' }}></textarea>
                        </div>
                        <div className="form-group col-lg-12 col-md-12 col-sm-12">
                            <label>Terms of Use</label>
                            <textarea placeholder="Enter your terms of use..." value={settings.termsOfUse} onChange={e => setSettings({...settings, termsOfUse: e.target.value})} style={{ minHeight: '150px', overflowY: 'auto', resize: 'vertical' }}></textarea>
                        </div>
                        <div className="form-group col-lg-12 col-md-12 col-sm-12">
                            <label>Privacy Policy</label>
                            <textarea placeholder="Enter your privacy policy..." value={settings.privacyPolicy || ''} onChange={e => setSettings({...settings, privacyPolicy: e.target.value})} style={{ minHeight: '150px', overflowY: 'auto', resize: 'vertical' }}></textarea>
                        </div>
                        <div className="form-group col-lg-12 col-md-12 col-sm-12">
                            <label>Shipping Policy</label>
                            <textarea placeholder="Enter your shipping policy..." value={settings.shippingPolicy || ''} onChange={e => setSettings({...settings, shippingPolicy: e.target.value})} style={{ minHeight: '150px', overflowY: 'auto', resize: 'vertical' }}></textarea>
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
