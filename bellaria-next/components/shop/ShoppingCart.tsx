import React from 'react';
import Link from 'next/link';

const ShoppingCart = () => {
    return (
        <section className="cart-section">
            <div className="auto-container">
                {/*Cart Outer*/}
                <div className="cart-outer">
                    <div className="table-outer">
                        <table className="cart-table">
                            <thead className="cart-header">
                                <tr>
                                    <th className="product-thumbnail">&nbsp;</th>
                                    <th className="product-name">Product</th>
                                    <th className="product-price">Price</th>
                                    <th className="product-quantity">Quantity</th>
                                    <th className="product-subtotal">Total</th>
                                    <th className="product-remove">&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="cart-item">
                                    <td className="product-thumbnail">
                                        <Link href="#"><img src="/assets/images/resource/service-birthday-transparent-v3.png" alt="" style={{ width: '100px', height: '100px', objectFit: 'contain' }} /></Link>
                                    </td>
                                    <td className="product-name"><Link href="#">Birthday Cake</Link></td>
                                    <td className="product-price">$84.00</td>
                                    <td className="product-quantity">
                                        <div className="quantity">
                                            <label>Quantity</label>
                                            <input type="number" className="qty" name="qty" defaultValue="1" />
                                        </div>
                                    </td>
                                    <td className="product-subtotal"><span className="amount">$84.00</span></td>
                                    <td className="product-remove"> <Link href="#" className="remove"><span className="fa fa-times"></span></Link></td>
                                </tr>

                                <tr className="cart-item">
                                    <td className="product-thumbnail">
                                        <Link href="#"><img src="/assets/images/resource/service-donuts-transparent-v3.png" alt="" style={{ width: '100px', height: '100px', objectFit: 'contain' }} /></Link>
                                    </td>
                                    <td className="product-name"><Link href="#">Donuts</Link></td>
                                    <td className="product-price">$15.00</td>
                                    <td className="product-quantity">
                                        <div className="quantity">
                                            <label>Quantity</label>
                                            <input type="number" className="qty" name="qty" defaultValue="1" />
                                        </div>
                                    </td>
                                    <td className="product-subtotal"><span className="amount">$15.00</span></td>
                                    <td className="product-remove"> <Link href="#" className="remove"><span className="fa fa-times"></span></Link></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="cart-options clearfix">
                        <div className="pull-left">
                            <div className="apply-coupon clearfix">
                                <div className="form-group clearfix">
                                    <input type="text" name="coupon-code" placeholder="Coupon Code" />
                                </div>
                                <div className="form-group clearfix">
                                    <button type="button" className="theme-btn coupon-btn">Apply Coupon</button>
                                </div>
                            </div>
                        </div>

                        <div className="pull-right">
                            <button type="button" className="theme-btn cart-btn">update cart</button>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-between">
                    <div className="column col-lg-4 offset-lg-8 col-md-6 col-sm-12">
                        {/*Totals Table*/}
                        <ul className="totals-table">
                            <li><h3>Cart Totals</h3></li>
                            <li className="clearfix"><span className="col">Subtotal</span><span className="col price">$99.00</span></li>
                            <li className="clearfix"><span className="col">Total</span><span className="col total-price">$99.00</span></li>
                            <li className="text-right"><button type="submit" className="theme-btn proceed-btn">Proceed to Checkout</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShoppingCart;
