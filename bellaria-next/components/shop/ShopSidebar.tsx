import React from 'react';
import Link from 'next/link';

const ShopSidebar = () => {
    return (
        <aside className="sidebar theiaStickySidebar">
            <div className="sticky-sidebar">
                {/* Search Widget */}
                <div className="sidebar-widget search-widget">
                    <form method="post" action="#">
                        <div className="form-group">
                            <input type="search" name="search-field" placeholder="Search products…" required />
                            <button type="submit"><span className="icon fa fa-search"></span></button>
                        </div>
                    </form>
                </div>

                {/* Cart Widget */}
                <div className="sidebar-widget cart-widget">
                    <div className="widget-content">
                        <h3 className="widget-title">Cart</h3>

                        <div className="shopping-cart">
                            <ul className="shopping-cart-items">
                                <li className="cart-item">
                                    <img src="/assets/images/resource/service-birthday-transparent-v3.png" alt="#" className="thumb" />
                                    <span className="item-name">Birthday Cake</span>
                                    <span className="item-quantity">1 x <span className="item-amount">$84.00</span></span>
                                    <Link href="#" className="product-detail"></Link>
                                    <button className="remove-item"><span className="fa fa-times"></span></button>
                                </li>

                                <li className="cart-item">
                                    <img src="/assets/images/resource/service-donuts-transparent-v3.png" alt="#" className="thumb" />
                                    <span className="item-name">Donuts</span>
                                    <span className="item-quantity">1 x <span className="item-amount">$13.00</span></span>
                                    <Link href="#" className="product-detail"></Link>
                                    <button className="remove-item"><span className="fa fa-times"></span></button>
                                </li>
                            </ul>

                            <div className="cart-footer">
                                <div className="shopping-cart-total"><strong>Subtotal:</strong> $97.00</div>
                                <Link href="#" className="theme-btn">View Cart</Link>
                                <Link href="#" className="theme-btn">Checkout</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Range Slider Widget */}
                <div className="sidebar-widget rangeslider-widget">
                    <div className="widget-content">
                        <h3 className="widget-title">Price Filter</h3>

                        <div className="range-slider-one clearfix">
                            <div className="price-range-slider"></div>
                            <div className="clearfix">
                                <div className="pull-left input-box">
                                    <div className="title">Price:</div>
                                    <div className="input"><input type="text" className="property-amount" name="field-name" readOnly /></div>
                                </div>
                                <div className="pull-right btn-box">
                                    <Link href="#" className="theme-btn"><span className="btn-title">Filter</span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </aside>
    );
};

export default ShopSidebar;
