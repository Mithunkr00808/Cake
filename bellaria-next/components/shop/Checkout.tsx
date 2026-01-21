"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { toast } from 'react-hot-toast';

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const router = useRouter();

    useEffect(() => {
        if (cartItems.length === 0) {
            // calculated based on if cart is empty or not
             const timer = setTimeout(() => {
                 if (cartItems.length === 0) {
                     toast.error("Your cart is empty. Redirecting...");
                     router.push('/shop');
                 }
             }, 500); // Small delay to allow hydration/state update check
             return () => clearTimeout(timer);
        }
    }, [cartItems, router]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        country: '',
        streetAddress: '',
        apartment: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
        email: '',
        orderNotes: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePlaceOrder = (e: React.MouseEvent) => {
        e.preventDefault();
        
        // Basic validation
        if (!formData.firstName || !formData.lastName || !formData.streetAddress || !formData.city || !formData.zip || !formData.phone || !formData.email) {
            toast.error("Please fill in all required fields.");
            return;
        }

        if (cartItems.length === 0) {
            toast.error("Your cart is empty.");
            return;
        }

        toast.success("Order placed successfully!");
        clearCart();
        // Here you would typically redirect to a thank you page
    };

    return (
        <section className="checkout-page">
            <div className="auto-container">
                {/*Default Links*/}
                <div className="default-links">
                    <div className="message-box with-icon info"><div className="icon-box"><span className="icon fa fa-info"></span></div> Have a coupon? <a href="#">Click here to enter your code</a></div>
                </div>
                
                {/*Checkout Details*/}
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
                                        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="" required />
                                    </div>
                                    
                                    {/*Form Group*/}
                                    <div className="form-group">
                                        <div className="field-label">Last name <sup>*</sup></div>
                                        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="" required />
                                    </div>
                                    
                                    {/*Form Group*/}
                                    <div className="form-group">
                                        <div className="field-label">Company name (optional)</div>
                                        <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="" />
                                    </div>
                                    
                                    {/*Form Group*/}
                                    <div className="form-group">
                                        <div className="field-label">Country <sup>*</sup></div>
                                        <select name="country" className="sortby-select" autoComplete="country" value={formData.country} onChange={handleInputChange}>
                                            <option value="">Select a country&hellip;</option>
                                            <option value="US">United States (US)</option>
                                            <option value="UK">United Kingdom (UK)</option>
                                            <option value="IN">India</option>
                                            <option value="AU">Australia</option>
                                        </select>
                                    </div>
                                    
                                    {/*Form Group*/}
                                    <div className="form-group">
                                        <div className="field-label">Street address <sup>*</sup></div>
                                        <input type="text" name="streetAddress" value={formData.streetAddress} onChange={handleInputChange} placeholder="House number and street name" required />
                                    </div>

                                    <div className="form-group">
                                        <input type="text" name="apartment" value={formData.apartment} onChange={handleInputChange} placeholder="Apartment,suite,unit etc. (optional)" />
                                    </div>
                                    
                                    {/*Form Group*/}
                                    <div className="form-group">
                                        <div className="field-label">Town / City <sup>*</sup></div>
                                        <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="" required />
                                    </div>
                                    
                                    {/*Form Group*/}
                                    <div className="form-group">
                                        <div className="field-label">State / County <sup>*</sup></div>
                                        <input type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="" required />
                                    </div>
                                    
                                    {/*Form Group*/}
                                    <div className="form-group">
                                        <div className="field-label">Postcode/ ZIP <sup>*</sup></div>
                                        <input type="text" name="zip" value={formData.zip} onChange={handleInputChange} placeholder="" required />
                                    </div>
                                    
                                    {/*Form Group*/}
                                    <div className="form-group">
                                        <div className="field-label">Phone</div>
                                        <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="" required />
                                    </div>

                                    {/*Form Group*/}
                                    <div className="form-group">
                                        <div className="field-label">Email Address</div>
                                        <input type="text" name="email" value={formData.email} onChange={handleInputChange} placeholder="" required />
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
                                        <textarea name="orderNotes" value={formData.orderNotes} onChange={handleInputChange} placeholder="Notes about your order,e.g. special notes for delivery."></textarea>
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
                                    <td className="product-name">{item.name}&nbsp;
                                        <strong className="product-quantity">× {item.quantity}</strong>
                                    </td> 
                                    <td className="product-total">
                                        <span className="woocommerce-Price-amount amount"><span className="woocommerce-Price-currencySymbol">$</span>{(item.price * item.quantity).toFixed(2)}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="cart-subtotal">
                                <th>Subtotal</th>
                                <td><span className="amount">${cartTotal.toFixed(2)}</span></td>
                            </tr>
                            <tr className="order-total">
                                <th>Total</th>
                                <td><strong className="amount">${cartTotal.toFixed(2)}</strong> </td>
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
                                        <input type="radio" name="payment-group" id="payment-2" defaultChecked />
                                        <label htmlFor="payment-2"><strong>Direct Bank Transfer</strong><span className="small-text">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</span></label>
                                    </div>
                                </li>
                                <li>
                                    <div className="radio-option">
                                        <input type="radio" name="payment-group" id="payment-1" />
                                        <label htmlFor="payment-1"><strong>Check Payments</strong><span className="small-text">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</span></label>
                                    </div>
                                </li>
                                
                                <li>
                                    <div className="radio-option">
                                        <input type="radio" name="payment-group" id="payment-3" />
                                        <label htmlFor="payment-3"><strong>Cash on Delivery</strong><span className="small-text">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</span></label>
                                    </div>
                                </li>
                            </ul>
                            <div className="text">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a href="#">privacy policy.</a></div>
                        </div>
                    </div>
                    <div className="lower-box">
                        <a href="#" className="theme-btn" onClick={handlePlaceOrder}><span className="btn-title">Place Order</span></a>
                    </div>
                </div>
                {/*End Payment Box*/}
            </div>
        </section>
    );
};

export default Checkout;
