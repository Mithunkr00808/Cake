"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useCart } from '@/context/CartContext';
import { createOrderServerAction } from '@/lib/actions/orderActions';

const CheckoutForm = () => {
    const router = useRouter();
    const { cartItems, cartTotal, clearCart } = useCart();

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        company: '',
        country: 'India',
        address: '',
        apartment: '',
        city: '',
        state: '',
        pincode: '',
        phone: '',
        email: '',
        notes: '',
        paymentMethod: 'cod',
    });

    const [submitting, setSubmitting] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        let val = e.target.value;
        if (e.target.name === 'phone') {
            val = val.replace(/\D/g, '').slice(0, 10);
        }
        if (e.target.name === 'pincode') {
            val = val.replace(/\D/g, '');
            if (val.startsWith('0')) val = val.substring(1);
            val = val.slice(0, 6);
        }
        setForm(prev => ({ ...prev, [e.target.name]: val }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            toast.error('Your cart is empty!');
            return;
        }
        if (!form.firstName || !form.lastName || !form.address || !form.city || !form.phone || !form.pincode) {
            toast.error('Please fill in all required fields.');
            return;
        }

        if (!/^[6-9]\d{9}$/.test(form.phone)) {
            toast.error('Please enter a valid Indian phone number.');
            return;
        }
        if (!/^[1-9]\d{5}$/.test(form.pincode)) {
            toast.error('Please enter a valid Indian pincode.');
            return;
        }

        setSubmitting(true);

        const paymentLabels: Record<string, string> = {
            bank: 'Direct Bank Transfer',
            cheque: 'Cheque Payment',
            cod: 'Cash on Delivery',
        };

        const orderId = await createOrderServerAction({
            customer: {
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                phone: form.phone,
                address: form.address,
                apartment: form.apartment,
                city: form.city,
                state: form.state,
                pincode: form.pincode,
                country: form.country,
            },
            items: cartItems.map(item => ({
                id: item.id,
                productId: item.productId || String(item.id).split('-{')[0],
                name: item.name,
                price: item.price, // Will be overridden by server with DB price
                quantity: item.quantity,
                image: item.image,
                options: item.options,
            })),
            total: cartTotal, // Will be recalculated by server
            paymentMethod: paymentLabels[form.paymentMethod] || form.paymentMethod,
            notes: form.notes || '',
            status: 'pending',
        });

        setSubmitting(false);

        if (orderId) {
            clearCart();
            toast.success('🎉 Order placed successfully!');
            router.push(`/order-confirmation?id=${orderId}`);
        } else {
            toast.error('Failed to place order. Please try again.');
        }
    };

    return (
        <section className="checkout-page">
            <div className="auto-container">
                <div className="checkout-form">
                    <form onSubmit={handleSubmit}>
                        <div className="row clearfix">
                            {/* Billing Details */}
                            <div className="column col-lg-6 col-md-12 col-sm-12">
                                <div className="inner-column">
                                    <div className="sec-title">
                                        <h3>Billing details</h3>
                                    </div>

                                    <div className="form-group">
                                        <div className="field-label">First name <sup>*</sup></div>
                                        <input type="text" name="firstName" value={form.firstName} onChange={handleChange} required />
                                    </div>

                                    <div className="form-group">
                                        <div className="field-label">Last name <sup>*</sup></div>
                                        <input type="text" name="lastName" value={form.lastName} onChange={handleChange} required />
                                    </div>

                                    <div className="form-group">
                                        <div className="field-label">Company name (optional)</div>
                                        <input type="text" name="company" value={form.company} onChange={handleChange} />
                                    </div>

                                    <div className="form-group">
                                        <div className="field-label">Country <sup>*</sup></div>
                                        <select name="country" value={form.country} onChange={handleChange} className="custom-select-box">
                                            <option value="India">India</option>
                                            <option value="United States">United States</option>
                                            <option value="United Kingdom">United Kingdom</option>
                                            <option value="Germany">Germany</option>
                                            <option value="France">France</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <div className="field-label">Street address <sup>*</sup></div>
                                        <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="House number and street name" required />
                                    </div>

                                    <div className="form-group">
                                        <input type="text" name="apartment" value={form.apartment} onChange={handleChange} placeholder="Apartment, suite, unit etc. (optional)" />
                                    </div>

                                    <div className="form-group">
                                        <div className="field-label">Town / City <sup>*</sup></div>
                                        <input type="text" name="city" value={form.city} onChange={handleChange} required />
                                    </div>

                                    <div className="form-group">
                                        <div className="field-label">State / County <sup>*</sup></div>
                                        <input type="text" name="state" value={form.state} onChange={handleChange} required />
                                    </div>

                                    <div className="form-group">
                                        <div className="field-label">Postcode / ZIP <sup>*</sup></div>
                                        <input type="text" name="pincode" value={form.pincode} onChange={handleChange} required maxLength={6} />
                                    </div>

                                    <div className="form-group">
                                        <div className="field-label">Phone <sup>*</sup></div>
                                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} required maxLength={10} />
                                    </div>

                                    <div className="form-group">
                                        <div className="field-label">Email Address</div>
                                        <input type="email" name="email" value={form.email} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>

                            {/* Additional Info */}
                            <div className="column col-lg-6 col-md-12 col-sm-12">
                                <div className="inner-column">
                                    <div className="sec-title">
                                        <h3>Additional information</h3>
                                    </div>
                                    <div className="form-group">
                                        <div className="field-label">Order notes (optional)</div>
                                        <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes about your order, e.g. special notes for delivery." />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="order-box">
                    <table>
                        <thead>
                            <tr>
                                <th className="product-name">Product</th>
                                <th className="product-total">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.length === 0 ? (
                                <tr>
                                    <td colSpan={2} style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
                                        Your cart is empty.
                                    </td>
                                </tr>
                            ) : (
                                cartItems.map(item => (
                                    <tr key={item.id} className="cart-item">
                                        <td className="product-name">
                                            {item.name}&nbsp;
                                            <strong className="product-quantity">× {item.quantity}</strong>
                                        </td>
                                        <td className="product-total">
                                            <span className="woocommerce-Price-amount amount">
                                                <span className="woocommerce-Price-currencySymbol">₹</span>
                                                {(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                        <tfoot>
                            <tr className="cart-subtotal">
                                <th>Subtotal</th>
                                <td><span className="amount">₹{cartTotal.toFixed(2)}</span></td>
                            </tr>
                            <tr className="order-total">
                                <th>Total</th>
                                <td><strong className="amount">₹{cartTotal.toFixed(2)}</strong></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Payment */}
                <div className="payment-box">
                    <div className="upper-box">
                        <div className="payment-options">
                            <ul>
                                <li>
                                    <div className="radio-option">
                                        <input type="radio" name="paymentMethod" id="payment-bank" value="bank"
                                            checked={form.paymentMethod === 'bank'} onChange={handleChange} />
                                        <label htmlFor="payment-bank">
                                            <strong>Direct Bank Transfer</strong>
                                            <span className="small-text">Make your payment directly into our bank account. Please use your Order ID as the payment reference.</span>
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <div className="radio-option">
                                        <input type="radio" name="paymentMethod" id="payment-cheque" value="cheque"
                                            checked={form.paymentMethod === 'cheque'} onChange={handleChange} />
                                        <label htmlFor="payment-cheque">
                                            <strong>Cheque Payments</strong>
                                            <span className="small-text">Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.</span>
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <div className="radio-option">
                                        <input type="radio" name="paymentMethod" id="payment-cod" value="cod"
                                            checked={form.paymentMethod === 'cod'} onChange={handleChange} />
                                        <label htmlFor="payment-cod">
                                            <strong>Cash on Delivery</strong>
                                            <span className="small-text">Pay with cash upon delivery.</span>
                                        </label>
                                    </div>
                                </li>
                            </ul>
                            <div className="text">Your personal data will be used to process your order and support your experience throughout this website.</div>
                        </div>
                    </div>
                    <div className="lower-box">
                        <button
                            type="submit"
                            className="theme-btn"
                            onClick={handleSubmit}
                            disabled={submitting}
                            style={{ border: 'none', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1 }}
                        >
                            <span className="btn-title">{submitting ? 'Placing Order...' : 'Place Order'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CheckoutForm;
