"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { createOrderServerAction } from '@/lib/actions/orderActions';
import { updateUserProfileServerAction } from '@/lib/actions/userActions';
import { useAuth } from '@/context/AuthContext';

interface CheckoutProps {
    initialProfile?: any;
    validPincodes: string[];
    authData?: any;
}

const Checkout = ({ initialProfile, validPincodes, authData }: CheckoutProps) => {
    const { cartItems, cartTotal, clearCart, deliveryPincode } = useCart();
    const { user } = useAuth();
    const router = useRouter();
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        // Small delay to allow hydration of cart from localStorage
        const timer = setTimeout(() => {
            if (cartItems.length === 0 && !orderPlaced) {
                router.replace('/shop');
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [cartItems.length, orderPlaced, router]);
    const [formData, setFormData] = useState({
        firstName: initialProfile?.firstName || (authData?.name ? authData.name.split(' ')[0] : ''),
        lastName: initialProfile?.lastName || (authData?.name ? authData.name.split(' ').slice(1).join(' ') : ''),
        companyName: '',
        country: initialProfile?.country || 'India',
        streetAddress: initialProfile?.streetAddress || '',
        apartment: initialProfile?.apartment || '',
        city: initialProfile?.city || '',
        state: initialProfile?.state || '',
        zip: deliveryPincode || initialProfile?.zip || '',
        phone: initialProfile?.phone || authData?.phone || '',
        email: initialProfile?.email || authData?.email || '',
        orderNotes: ''
    });

    useEffect(() => {
        // If they navigate directly with a pincode from cart, ensure it gets applied if the zip field is empty or they aren't logged in
        if (deliveryPincode && !formData.zip) {
            setFormData(prev => ({ ...prev, zip: deliveryPincode }));
        }
    }, [deliveryPincode]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const getFieldError = (name: string, value: string) => {
        switch (name) {
            case 'firstName': return !value.trim() ? "First name is required." : "";
            case 'lastName': return !value.trim() ? "Last name is required." : "";
            case 'streetAddress': return !value.trim() ? "Street address is required." : "";
            case 'city': return !value.trim() ? "City is required." : "";
            case 'state': return !value.trim() ? "State is required." : "";
            case 'zip': return !value.trim() ? "ZIP/Postcode is required." : "";
            case 'phone': 
                if (!value.trim()) return "Phone number is required.";
                if (!/^\d{10}$/.test(value)) return "Please enter a valid 10-digit Indian phone number.";
                return "";
            case 'email':
                if (!value.trim()) return "Email is required.";
                if (!/\S+@\S+\.\S+/.test(value)) return "Please enter a valid email address.";
                return "";
            default: return "";
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const error = getFieldError(name, value);
        if (error !== errors[name]) {
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<{[key: string]: string}>({});

    const handlePlaceOrder = async (e?: React.MouseEvent) => {
        if (e) e.preventDefault();
        
        // Basic validation
        let newErrors: {[key: string]: string} = {};
        const fieldsToValidate = ['firstName', 'lastName', 'streetAddress', 'city', 'state', 'zip', 'phone', 'email'];
        fieldsToValidate.forEach(field => {
            const error = getFieldError(field, (formData as any)[field]);
            if (error) newErrors[field] = error;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            toast.error("Please fill in all required fields correctly.");
            return;
        }

        if (cartItems.length === 0) {
            toast.error("Your cart is empty.");
            return;
        }

        setSubmitting(true);

        // Validate pincode directly against the pre-fetched validPincodes array
        if (!validPincodes.includes(formData.zip)) {
            setErrors({ zip: "This pincode is not serviceable. Please check delivery availability." });
            setSubmitting(false);
            toast.error("Sorry, we do not deliver to this pincode.");
            return;
        }

        const orderId = await createOrderServerAction({
            userId: user?.uid,
            customer: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                address: formData.streetAddress,
                apartment: formData.apartment,
                city: formData.city,
                state: formData.state,
                pincode: formData.zip,
                country: formData.country || 'India',
            },
            items: cartItems.map(item => ({
                id: item.id,
                productId: item.productId,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image,
                options: item.options,
            })),
            total: cartTotal,
            paymentMethod: 'Cash on Delivery',
            notes: formData.orderNotes,
            status: 'pending',
        });

        if (orderId) {
            setIsSuccess(true);
            if (user) {
                // Save this address to their profile
                await updateUserProfileServerAction(user.uid, {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    streetAddress: formData.streetAddress,
                    apartment: formData.apartment,
                    city: formData.city,
                    state: formData.state,
                    zip: formData.zip,
                    phone: formData.phone,
                    country: formData.country || 'India'
                });
            }

            setOrderPlaced(true);
            clearCart();
            toast.success('🎉 Order placed successfully!');
            
            // Start the page fade-out transition slightly before redirecting
            setTimeout(() => {
                setIsTransitioning(true);
            }, 1000);
            
            // Redirect after the fade-out completes
            setTimeout(() => {
                setSubmitting(false);
                router.replace(`/order-confirmation?id=${orderId}`);
            }, 1500);
        } else {
            setSubmitting(false);
            toast.error('Failed to place order. Please try again later.');
        }  
    };


    return (
        <motion.div 
            initial={{ opacity: 1 }}
            animate={{ opacity: isTransitioning ? 0 : 1, y: isTransitioning ? -20 : 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
        <section className="checkout-page">
            <div className="auto-container">
                {/*Default Links*/}
                <div className="default-links">
                    {/* Coupon removed */}
                </div>
                
                {/*Checkout Details*/}
                <style>{`
                    .checkout-form .field-label {
                        font-size: 15px;
                        font-weight: bold !important;
                        color: #4b4342;
                        margin-bottom: 8px;
                    }
                    .checkout-form .field-label sup {
                        color: #ff7a7a;
                        font-size: 16px;
                        top: -0.1em;
                    }
                    .checkout-form textarea {
                        overflow-y: auto;
                        resize: vertical;
                        min-height: 120px;
                    }
                    .checkout-form textarea::placeholder,
                    .checkout-form input::placeholder {
                        color: #a0a0a0 !important;
                        font-weight: 300 !important;
                        font-style: italic !important;
                    }
                `}</style>
                <div className="checkout-form">
                    <form method="post" action="#">
                        <div className="row clearfix">
                            {/*Column*/}
                            <div className="column col-lg-6 col-md-12 col-sm-12">
                                <div className="inner-column">
                                    <div className="sec-title">
                                        <h3>Billing details</h3>
                                    </div>

                                    {/*Form Group*/}
                                    <div className="form-group">
                                        <div className="field-label">First name <sup>*</sup></div>
                                        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} onBlur={handleBlur} placeholder="" required style={{ borderColor: errors.firstName ? '#ff7a7a' : '' }} />
                                        {errors.firstName && <div style={{ color: '#ff7a7a', fontSize: '13px', marginTop: '5px' }}>{errors.firstName}</div>}
                                    </div>
                                    
                                    {/*Form Group*/}
                                    <div className="form-group">
                                        <div className="field-label">Last name <sup>*</sup></div>
                                        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} onBlur={handleBlur} placeholder="" required style={{ borderColor: errors.lastName ? '#ff7a7a' : '' }} />
                                        {errors.lastName && <div style={{ color: '#ff7a7a', fontSize: '13px', marginTop: '5px' }}>{errors.lastName}</div>}
                                    </div>
                                    

                                    {/*Form Group*/}
                                    <div className="form-group">
                                        <div className="field-label">Street address <sup>*</sup></div>
                                        <input type="text" name="streetAddress" value={formData.streetAddress} onChange={handleInputChange} onBlur={handleBlur} placeholder="House number and street name" required style={{ borderColor: errors.streetAddress ? '#ff7a7a' : '' }} />
                                        {errors.streetAddress && <div style={{ color: '#ff7a7a', fontSize: '13px', marginTop: '5px' }}>{errors.streetAddress}</div>}
                                    </div>

                                    <div className="form-group">
                                        <input type="text" name="apartment" value={formData.apartment} onChange={handleInputChange} onBlur={handleBlur} placeholder="Apartment,suite,unit etc. (optional)" />
                                    </div>
                                    
                                    {/*Form Group*/}
                                    <div className="form-group">
                                        <div className="field-label">Town / City <sup>*</sup></div>
                                        <input type="text" name="city" value={formData.city} onChange={handleInputChange} onBlur={handleBlur} placeholder="" required style={{ borderColor: errors.city ? '#ff7a7a' : '' }} />
                                        {errors.city && <div style={{ color: '#ff7a7a', fontSize: '13px', marginTop: '5px' }}>{errors.city}</div>}
                                    </div>
                                    
                                    {/*Form Group*/}
                                    <div className="form-group">
                                        <div className="field-label">State / County <sup>*</sup></div>
                                        <input type="text" name="state" value={formData.state} onChange={handleInputChange} onBlur={handleBlur} placeholder="" required style={{ borderColor: errors.state ? '#ff7a7a' : '' }} />
                                        {errors.state && <div style={{ color: '#ff7a7a', fontSize: '13px', marginTop: '5px' }}>{errors.state}</div>}
                                    </div>
                                    
                                    {/*Form Group*/}
                                    <div className="form-group">
                                        <div className="field-label">Postcode/ ZIP <sup>*</sup></div>
                                        <input type="text" name="zip" value={formData.zip} onChange={handleInputChange} onBlur={handleBlur} placeholder="" required style={{ borderColor: errors.zip ? '#ff7a7a' : '' }} />
                                        {errors.zip && <div style={{ color: '#ff7a7a', fontSize: '13px', marginTop: '5px' }}>{errors.zip}</div>}
                                    </div>
                                    
                                    {/*Form Group*/}
                                    <div className="form-group">
                                        <div className="field-label">Phone <sup>*</sup></div>
                                        <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} onBlur={handleBlur} placeholder="" required style={{ borderColor: errors.phone ? '#ff7a7a' : '' }} />
                                        {errors.phone && <div style={{ color: '#ff7a7a', fontSize: '13px', marginTop: '5px' }}>{errors.phone}</div>}
                                    </div>

                                    {/*Form Group*/}
                                    <div className="form-group">
                                        <div className="field-label">Email Address <sup>*</sup></div>
                                        <input type="text" name="email" value={formData.email} onChange={handleInputChange} onBlur={handleBlur} placeholder="" required readOnly={!!user} style={{ borderColor: errors.email ? '#ff7a7a' : '', backgroundColor: user ? '#f9f9f9' : 'transparent', color: user ? '#888' : 'inherit' }} />
                                        {errors.email && <div style={{ color: '#ff7a7a', fontSize: '13px', marginTop: '5px' }}>{errors.email}</div>}
                                    </div>
                                </div>
                            </div>

                            {/*Column*/}
                            <div className="column col-lg-6 col-md-12 col-sm-12">
                                <div className="inner-column">
                                    <div className="sec-title">
                                        <h3>Additional information</h3>
                                    </div>
                                
                                    {/*Form Group*/}
                                    <div className="form-group ">
                                        <div className="field-label">Order notes (optional)</div>
                                        <textarea name="orderNotes" value={formData.orderNotes} onChange={handleInputChange} onBlur={handleBlur} placeholder="Notes about your order,e.g. special notes for delivery."></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                {/*End Checkout Details*/}
                
                {/*Order Box*/}
                <div className="order-box">
                    <table>
                        <thead>
                            <tr>
                                <th className="product-name">Product</th>
                                <th className="product-total">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr className="cart-item" key={item.id}>
                                    <td className="product-name" style={{ padding: '20px 15px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                            {item.image && (
                                                <div style={{ width: '65px', height: '65px', flexShrink: 0, borderRadius: '8px', overflow: 'hidden', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                                                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                </div>
                                            )}
                                            <div>
                                                <div style={{ fontWeight: '700', fontSize: '15px', color: '#4b4342' }}>{item.name} <strong className="product-quantity" style={{ color: '#ff7a7a', marginLeft: '5px' }}>× {item.quantity}</strong></div>
                                                {item.options && (
                                                    <div style={{ fontSize: '13px', color: '#777', marginTop: '8px', lineHeight: '1.6', backgroundColor: '#fdfdfd', padding: '8px 12px', borderRadius: '6px', border: '1px solid #f0f0f0' }}>
                                                        {item.options.size && <div><span style={{ color: '#aaa', fontWeight: 500, marginRight: '4px' }}>Size:</span> <span style={{ color: '#555' }}>{item.options.size.label}</span></div>}
                                                        {item.options.flavor && <div><span style={{ color: '#aaa', fontWeight: 500, marginRight: '4px' }}>Flavor:</span> <span style={{ color: '#555' }}>{item.options.flavor}</span></div>}
                                                        {item.options.message && <div style={{ fontStyle: 'italic', color: '#666' }}><span style={{ color: '#aaa', fontWeight: 500, fontStyle: 'normal', marginRight: '4px' }}>Msg:</span> "{item.options.message}"</div>}
                                                        {item.options.topper && <div><span style={{ color: '#aaa', fontWeight: 500, marginRight: '4px' }}>Topper:</span> <span style={{ color: '#555' }}>{item.options.topper}</span></div>}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td> 
                                    <td className="product-total" style={{ verticalAlign: 'middle', fontWeight: '700', fontSize: '16px', color: '#4b4342', padding: '20px 15px' }}>
                                        <span className="woocommerce-Price-amount amount"><span className="woocommerce-Price-currencySymbol" style={{ marginRight: '2px', color: '#ff7a7a' }}>₹</span>{(item.price * item.quantity).toFixed(2)}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="cart-subtotal">
                                <th>Subtotal</th>
                                <td><span className="amount">₹{cartTotal.toFixed(2)}</span></td>
                            </tr>
                            <tr className="order-total">
                                <th>Total</th>
                                <td><strong className="amount">₹{cartTotal.toFixed(2)}</strong> </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                {/*End Order Box*/}
                
                {/*Payment Box*/}
                <div className="payment-box">
                    <div className="upper-box">
                        {/*Payment Options*/}
                        <div className="payment-options">
                            <ul>
                                <li>
                                    <div className="radio-option">
                                        <input type="radio" name="payment-group" id="payment-3" defaultChecked />
                                        <label htmlFor="payment-3"><strong>Cash on Delivery</strong><span className="small-text">Pay with cash upon delivery. Your order will be shipped and you can pay when it arrives.</span></label>
                                    </div>
                                </li>
                            </ul>
                            <div className="text" style={{ fontSize: '13px', color: '#777', marginTop: '15px', lineHeight: '1.6' }}>
                                Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <Link href="/privacy-policy" style={{ color: '#ff7a7a', textDecoration: 'underline', fontWeight: '500' }}>privacy policy.</Link>
                            </div>
                        </div>
                    </div>
                    <div className="lower-box">
                        <a href="#" className="theme-btn" onClick={(e) => { e.preventDefault(); handlePlaceOrder(); }} style={{ opacity: submitting ? 0.7 : 1, pointerEvents: submitting ? 'none' : 'auto' }}>
                            <span className="btn-title">{submitting ? 'Placing Order...' : 'Place Order'}</span>
                        </a>
                    </div>
                </div>
                {/*End Payment Box*/}
            </div>
        </section>
        </motion.div>
    );
};

export default Checkout;
