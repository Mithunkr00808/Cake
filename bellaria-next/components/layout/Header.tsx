import Link from 'next/link';
import React from 'react';

const Header = () => {
    return (
        <header className="main-header">
            {/* Menu Wave */}
            <div className="menu_wave"></div>

            {/* Main box */}
            <div className="main-box">
                <div className="menu-box">
                    <div className="logo" style={{ top: '55%', transform: 'translate(-50%, -50%)', marginLeft: 0 }}><Link href="/" style={{ fontSize: '30px', fontWeight: 'bold', fontFamily: 'Leckerli One, cursive', color: '#4b4342', textDecoration: 'none' }}>Slice of Cake</Link></div>

                    {/*Nav Box*/}
                    <div className="nav-outer clearfix">
                        {/* Main Menu */}
                        <nav className="main-menu navbar-expand-md navbar-light">
                            <div className="collapse navbar-collapse clearfix" id="navbarSupportedContent">
                                <ul className="navigation menu-left clearfix" style={{ visibility: 'visible', opacity: 1 }}>
                                    <li className="current dropdown"><Link href="/">Home</Link>
                                        <ul>
                                            <li className="current"><Link href="/">Cakes</Link></li>
                                            <li><Link href="#">Lollipop</Link></li>
                                            <li><Link href="#">Wedding</Link></li>
                                            <li><Link href="#">Coffee</Link></li>
                                            <li><Link href="#">Ice-Cream</Link></li>
                                            <li><Link href="#">Macaron</Link></li>
                                            <li><Link href="#">Shop</Link></li>
                                            <li><Link href="#">Landing</Link></li>
                                        </ul>
                                    </li>
                                    <li className="dropdown"><Link href="#">Pages</Link>
                                        <ul>
                                            <li><Link href="#">About Us</Link></li>
                                            <li><Link href="#">Our Staff</Link></li>
                                            <li><Link href="#">Pricing Tables</Link></li>
                                            <li><Link href="#">Content Elements</Link></li>
                                            <li><Link href="#">Recipes Grid</Link></li>
                                        </ul>
                                    </li>
                                    <li className="dropdown"><Link href="#">Portfolio</Link>
                                        <ul>
                                            <li><Link href="#">Masonry</Link></li>
                                            <li><Link href="#">Masonry Wide</Link></li>
                                            <li><Link href="#">Wide</Link></li>
                                            <li><Link href="#">With Filter</Link></li>
                                            <li><Link href="#">Two Columns</Link></li>
                                            <li><Link href="#">With Sidebar</Link></li>
                                            <li><Link href="#">Square</Link></li>
                                            <li><Link href="#">single Post</Link></li>
                                        </ul>
                                    </li>
                                </ul>

                                <ul className="navigation menu-right clearfix" style={{ visibility: 'visible', opacity: 1 }}>
                                    <li className="dropdown"><Link href="#">Blog</Link>
                                        <ul>
                                            <li><Link href="#">Checkerboard</Link></li>
                                            <li><Link href="#">Standard</Link></li>
                                            <li><Link href="#">Masonry</Link></li>
                                            <li><Link href="#">Masonry Full Width</Link></li>
                                            <li><Link href="#">Two Columns Grid</Link></li>
                                            <li><Link href="#">Three Columns Wide</Link></li>
                                            <li className="dropdown"><Link href="#">Post Types</Link>
                                                <ul>
                                                    <li><Link href="#">Standard Post</Link></li>
                                                    <li><Link href="#">Gallery Post</Link></li>
                                                    <li><Link href="#">Video Post</Link></li>
                                                    <li><Link href="#">Audio Post</Link></li>
                                                    <li><Link href="#">Quote Post</Link></li>
                                                    <li><Link href="#">Link Post</Link></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="dropdown"><Link href="#">Shop</Link>
                                        <ul>
                                            <li><Link href="#">Shop</Link></li>
                                            <li><Link href="#">Cart</Link></li>
                                            <li><Link href="#">Checkout</Link></li>
                                            <li><Link href="#">My account</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link href="#">Contacts</Link></li>
                                </ul>
                            </div>
                        </nav>
                        {/* Main Menu End*/}

                        <div className="outer-box clearfix">
                            {/* Shoppping Car */}
                            <div className="cart-btn">
                                <Link href="#"><i className="icon flaticon-commerce"></i> <span className="count">2</span></Link>

                                <div className="shopping-cart">
                                    <ul className="shopping-cart-items">
                                        <li className="cart-item">
                                            <img src="https://via.placeholder.com/300x300" alt="#" className="thumb" />
                                            <span className="item-name">Birthday Cake</span>
                                            <span className="item-quantity">1 x <span className="item-amount">$84.00</span></span>
                                            <Link href="#" className="product-detail"></Link>
                                            <button className="remove-item"><span className="fa fa-times"></span></button>
                                        </li>

                                        <li className="cart-item">
                                            <img src="https://via.placeholder.com/300x300" alt="#" className="thumb" />
                                            <span className="item-name">French Macaroon</span>
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
                                </div> {/*end shopping-cart */}
                            </div>

                            {/* Search Btn */}
                            <div className="search-box">
                                <button className="search-btn"><i className="fa fa-search"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Header  */}
            <div className="sticky-header">
                <div className="auto-container clearfix">
                    {/*Logo*/}
                    <div className="logo" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', marginLeft: 0 }}>
                        <Link href="#" title="Sticky Logo" style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'Leckerli One, cursive', color: '#4b4342', textDecoration: 'none' }}>Slice of Cake</Link>
                    </div>

                    {/*Nav Outer*/}
                    <div className="nav-outer">
                        {/* Main Menu */}
                        <nav className="main-menu">
                            {/*Keep This Empty / Menu will come through Javascript*/}
                        </nav>{/* Main Menu End*/}
                    </div>
                </div>
            </div>{/* End Sticky Menu */}

            {/* Mobile Header */}
            <div className="mobile-header">
                <div className="logo"><Link href="/" style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'Leckerli One, cursive', color: '#4b4342', textDecoration: 'none' }}>Slice of Cake</Link></div>

                {/*Nav Box*/}
                <div className="nav-outer clearfix">
                    {/*Keep This Empty / Menu will come through Javascript*/}
                </div>
            </div>

            {/* Mobile Menu  */}
            <div className="mobile-menu">
                <nav className="menu-box">
                    <div className="nav-logo"><Link href="/" style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'Leckerli One, cursive', color: '#4b4342', textDecoration: 'none' }}>Slice of Cake</Link></div>
                    {/*Here Menu Will Come Automatically Via Javascript / Same Menu as in Header*/}
                </nav>
            </div>{/* End Mobile Menu */}

            {/* Header Search */}
            <div className="search-popup">
                <span className="search-back-drop"></span>

                <div className="search-inner">
                    <button className="close-search"><span className="fa fa-times"></span></button>
                    <form method="post" action="#">
                        <div className="form-group">
                            <input type="search" name="search-field" placeholder="Search..." required />
                            <button type="submit"><i className="fa fa-search"></i></button>
                        </div>
                    </form>
                </div>
            </div>
            {/* End Header Search */}

        </header>
    );
};

export default Header;
