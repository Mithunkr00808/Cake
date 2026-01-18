import React from 'react';
import Link from 'next/link';

const ProductSidebar = () => {
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
                                    <Link href="/shop/birthday-cake" className="product-detail"></Link>
                                    <button className="remove-item"><span className="fa fa-times"></span></button>
                                </li>

                                <li className="cart-item">
                                    <img src="/assets/images/resource/service-donuts-transparent-v3.png" alt="#" className="thumb" />
                                    <span className="item-name">Donuts</span>
                                    <span className="item-quantity">1 x <span className="item-amount">$13.00</span></span>
                                    <Link href="/shop/donuts" className="product-detail"></Link>
                                    <button className="remove-item"><span className="fa fa-times"></span></button>
                                </li>
                            </ul>

                            <div className="cart-footer">
                                <div className="shopping-cart-total"><strong>Subtotal:</strong> $97.00</div>
                                <Link href="/cart" className="theme-btn">View Cart</Link>
                                <Link href="/checkout" className="theme-btn">Checkout</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tags Widget */}
                <div className="sidebar-widget tags-widget">
                    <h3 className="widget-title">Tags</h3>
                    <ul className="tag-list clearfix">
                        <li><Link href="#">Bars</Link></li>
                        <li><Link href="#">Caramels</Link></li>
                        <li><Link href="#">Chocolate</Link></li>
                        <li><Link href="#">Fruit</Link></li>
                        <li><Link href="#">Nuts</Link></li>
                        <li><Link href="#">Toffees</Link></li>
                        <li><Link href="#">Top Rated</Link></li>
                        <li><Link href="#">Truffles</Link></li>
                    </ul>
                </div>
            </div>
        </aside>
    );
};

export default ProductSidebar;
