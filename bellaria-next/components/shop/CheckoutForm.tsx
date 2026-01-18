import React from 'react';
import Link from 'next/link';

const CheckoutForm = () => {
    return (
        <section className="checkout-page">
            <div className="auto-container">
                {/*Default Links*/}
                <div className="default-links">
                    <div className="message-box with-icon info"><div className="icon-box"><span className="icon fa fa-info"></span></div> Have a coupon? <Link href="#">Click here to enter your code</Link></div>
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
                                        <input type="text" name="field-name" placeholder="" />
                                    </div>

                                    {/*Form Group*/}
                                    <div className="form-group">
                                        <div className="field-label">Last name <sup>*</sup></div>
                                        <input type="text" name="field-name" placeholder="" />
                                    </div>

                                    {/*Form Group*/}
                                    <div className="form-group">
                                        <div className="field-label">Company name (optional)</div>
                                        <input type="text" name="field-name" placeholder="" />
                                    </div>

                                    {/*Form Group*/}
                                    <div className="form-group">
                                        <div className="field-label">Country <sup>*</sup></div>
                                        <select className="custom-select-box">
                                            <option>Pakistan</option>
                                            <option>United States</option>
                                            <option>United Kingdom</option>
                                            <option>Germany</option>
                                            <option>France</option>
                                        </select>
                                    </div>

                                    {/*Form Group*/}
                                    <div className="form-group">
                                        <div className="field-label">Street address <sup>*</sup></div>
                                        <input type="text" name="field-name" placeholder="House number and street name" />
                                    </div>

                                    <div className="form-group">
                                        <input type="text" name="field-name" placeholder="Apartment,suite,unit etc. (optional)" />
                                    </div>

                                    {/*Form Group*/}
                                    <div className="form-group">
                                        <div className="field-label">Town / City <sup>*</sup></div>
                                        <input type="text" name="field-name" placeholder="" required />
                                    </div>

                                    {/*Form Group*/}
                                    <div className="form-group">
                                        <div className="field-label">State / County <sup>*</sup></div>
                                        <input type="text" name="field-name" placeholder="" required />
                                    </div>

                                    {/*Form Group*/}
                                    <div className="form-group">
                                        <div className="field-label">Postcode/ ZIP <sup>*</sup></div>
                                        <input type="text" name="field-name" placeholder="" required />
                                    </div>

                                    {/*Form Group*/}
                                    <div className="form-group">
                                        <div className="field-label">Phone</div>
                                        <input type="text" name="field-name" placeholder="" />
                                    </div>

                                    {/*Form Group*/}
                                    <div className="form-group">
                                        <div className="field-label">Email Address</div>
                                        <input type="text" name="field-name" placeholder="" />
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
                                        <textarea placeholder="Notes about your order,e.g. special notes for delivery." ></textarea>
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
                            <tr className="cart-item">
                                <td className="product-name">Birthday Cake&nbsp;
                                    <strong className="product-quantity">× 1</strong>
                                </td>
                                <td className="product-total">
                                    <span className="woocommerce-Price-amount amount"><span className="woocommerce-Price-currencySymbol">$</span>84.00</span>
                                </td>
                            </tr>

                            <tr className="cart-item">
                                <td className="product-name">Donuts&nbsp;
                                    <strong className="product-quantity">× 1</strong>
                                </td>
                                <td className="product-total">
                                    <span className="woocommerce-Price-amount amount"><span className="woocommerce-Price-currencySymbol">$</span>15.00</span>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr className="cart-subtotal">
                                <th>Subtotal</th>
                                <td><span className="amount">$99.00</span></td>
                            </tr>
                            <tr className="order-total">
                                <th>Total</th>
                                <td><strong className="amount">$99.00</strong> </td>
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
                            <div className="text">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <Link href="#">privacy policy.</Link></div>
                        </div>
                    </div>
                    <div className="lower-box">
                        <Link href="#" className="theme-btn"><span className="btn-title">Place Order</span></Link>
                    </div>
                </div>
                {/*End Payment Box*/}
            </div>
        </section>
    );
};

export default CheckoutForm;
