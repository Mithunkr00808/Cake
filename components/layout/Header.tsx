"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const Header = () => {
    const pathname = usePathname();
    const [isSticky, setIsSticky] = useState(false);
    const [isStickyHidden, setIsStickyHidden] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);

    // Sticky Header Scroll Logic
    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Fixed header class logic (> 700px)
            if (currentScrollY > 700) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }

            // Smart sticky hide/show logic
            if (currentScrollY > lastScrollY && currentScrollY > 700) {
                // Scrolling Down
                setIsStickyHidden(true);
            } else {
                // Scrolling Up
                setIsStickyHidden(false);
            }
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        if (!isMobileMenuOpen) {
            document.body.classList.add('mobile-menu-visible');
        } else {
            document.body.classList.remove('mobile-menu-visible');
        }
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        document.body.classList.remove('mobile-menu-visible');
    };

    const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
    const closeSearch = () => setIsSearchOpen(false);

    const toggleMobileDropdown = (name: string) => {
        setActiveMobileDropdown(activeMobileDropdown === name ? null : name);
    };

    // Navigation Items - Left Part
    const ItemsLeft = ({ mobile = false }) => (
        <>
            <li className={`${pathname === '/' ? 'current' : ''} dropdown`}>
                <a href="/" onClick={mobile ? closeMobileMenu : undefined}>Home</a>
                <div className="dropdown-btn" onClick={(e) => { e.preventDefault(); toggleMobileDropdown('home'); }}><span className="fa fa-plus"></span></div>
                <ul style={{ display: mobile && activeMobileDropdown === 'home' ? 'block' : undefined }}>
                    <li className="current"><Link href="/" onClick={mobile ? closeMobileMenu : undefined}>Cakes</Link></li>
                    <li><Link href="#" onClick={mobile ? closeMobileMenu : undefined}>Lollipop</Link></li>
                    <li><Link href="#" onClick={mobile ? closeMobileMenu : undefined}>Wedding</Link></li>
                    <li><Link href="#" onClick={mobile ? closeMobileMenu : undefined}>Coffee</Link></li>
                    <li><Link href="#" onClick={mobile ? closeMobileMenu : undefined}>Ice-Cream</Link></li>
                    <li><Link href="#" onClick={mobile ? closeMobileMenu : undefined}>Macaron</Link></li>
                    <li><Link href="#" onClick={mobile ? closeMobileMenu : undefined}>Shop</Link></li>
                    <li><Link href="#" onClick={mobile ? closeMobileMenu : undefined}>Landing</Link></li>
                </ul>
            </li>
            <li className="dropdown">
                <Link href="#" onClick={mobile ? closeMobileMenu : undefined}>Pages</Link>
                <div className="dropdown-btn" onClick={(e) => { e.preventDefault(); toggleMobileDropdown('pages'); }}><span className="fa fa-plus"></span></div>
                <ul style={{ display: mobile && activeMobileDropdown === 'pages' ? 'block' : undefined }}>
                    <li><Link href="#" onClick={mobile ? closeMobileMenu : undefined}>About Us</Link></li>
                    <li><Link href="#" onClick={mobile ? closeMobileMenu : undefined}>Our Staff</Link></li>
                    <li><Link href="#" onClick={mobile ? closeMobileMenu : undefined}>Pricing Tables</Link></li>
                    <li><Link href="#" onClick={mobile ? closeMobileMenu : undefined}>Content Elements</Link></li>
                    <li><Link href="#" onClick={mobile ? closeMobileMenu : undefined}>Recipes Grid</Link></li>
                </ul>
            </li>
            <li className="dropdown">
                <Link href="#" onClick={mobile ? closeMobileMenu : undefined}>Portfolio</Link>
                <div className="dropdown-btn" onClick={(e) => { e.preventDefault(); toggleMobileDropdown('portfolio'); }}><span className="fa fa-plus"></span></div>
                <ul style={{ display: mobile && activeMobileDropdown === 'portfolio' ? 'block' : undefined }}>
                    <li><Link href="#" onClick={mobile ? closeMobileMenu : undefined}>Masonry</Link></li>
                    <li><Link href="#" onClick={mobile ? closeMobileMenu : undefined}>Masonry Wide</Link></li>
                    <li><Link href="#" onClick={mobile ? closeMobileMenu : undefined}>Wide</Link></li>
                    <li><Link href="#" onClick={mobile ? closeMobileMenu : undefined}>With Filter</Link></li>
                    <li><Link href="#" onClick={mobile ? closeMobileMenu : undefined}>Two Columns</Link></li>
                    <li><Link href="#" onClick={mobile ? closeMobileMenu : undefined}>With Sidebar</Link></li>
                    <li><Link href="#" onClick={mobile ? closeMobileMenu : undefined}>Square</Link></li>
                    <li><Link href="#" onClick={mobile ? closeMobileMenu : undefined}>single Post</Link></li>
                </ul>
            </li>
        </>
    );

    // Navigation Items - Right Part
    const ItemsRight = ({ mobile = false }) => (
        <>
            <li className="dropdown">
                <Link href="#" onClick={mobile ? closeMobileMenu : undefined}>Blog</Link>
                <div className="dropdown-btn" onClick={(e) => { e.preventDefault(); toggleMobileDropdown('blog'); }}><span className="fa fa-plus"></span></div>
                <ul style={{ display: mobile && activeMobileDropdown === 'blog' ? 'block' : undefined }}>
                    <li><Link href="#" onClick={mobile ? closeMobileMenu : undefined}>Checkerboard</Link></li>
                    <li><Link href="#" onClick={mobile ? closeMobileMenu : undefined}>Standard</Link></li>
                    <li><Link href="#" onClick={mobile ? closeMobileMenu : undefined}>Masonry</Link></li>
                    <li><Link href="#" onClick={mobile ? closeMobileMenu : undefined}>Masonry Full Width</Link></li>
                    <li><Link href="#" onClick={mobile ? closeMobileMenu : undefined}>Two Columns Grid</Link></li>
                    <li><Link href="#" onClick={mobile ? closeMobileMenu : undefined}>Three Columns Wide</Link></li>
                    <li className="dropdown">
                        <Link href="#" onClick={mobile ? closeMobileMenu : undefined}>Post Types</Link>
                        <div className="dropdown-btn" onClick={(e) => { e.preventDefault(); toggleMobileDropdown('post-types'); }}><span className="fa fa-plus"></span></div>
                        <ul style={{ display: mobile && activeMobileDropdown === 'post-types' ? 'block' : undefined }}>
                            <li><Link href="#" onClick={mobile ? closeMobileMenu : undefined}>Standard Post</Link></li>
                            <li><Link href="#" onClick={mobile ? closeMobileMenu : undefined}>Gallery Post</Link></li>
                            <li><Link href="#" onClick={mobile ? closeMobileMenu : undefined}>Video Post</Link></li>
                            <li><Link href="#" onClick={mobile ? closeMobileMenu : undefined}>Audio Post</Link></li>
                            <li><Link href="#" onClick={mobile ? closeMobileMenu : undefined}>Quote Post</Link></li>
                            <li><Link href="#" onClick={mobile ? closeMobileMenu : undefined}>Link Post</Link></li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li className="dropdown">
                <Link href="#" onClick={mobile ? closeMobileMenu : undefined}>Shop</Link>
                <div className="dropdown-btn" onClick={(e) => { e.preventDefault(); toggleMobileDropdown('shop'); }}><span className="fa fa-plus"></span></div>
                <ul style={{ display: mobile && activeMobileDropdown === 'shop' ? 'block' : undefined }}>
                    <li><Link href="#" onClick={mobile ? closeMobileMenu : undefined}>Shop</Link></li>
                    <li><Link href="#" onClick={mobile ? closeMobileMenu : undefined}>Cart</Link></li>
                    <li><Link href="#" onClick={mobile ? closeMobileMenu : undefined}>Checkout</Link></li>
                    <li><Link href="#" onClick={mobile ? closeMobileMenu : undefined}>My account</Link></li>
                </ul>
            </li>
            <li><Link href="#" onClick={mobile ? closeMobileMenu : undefined}>Contacts</Link></li>
        </>
    );

    // Mobile Menu (Unified)
    const NavLinksMobile = ({ mobile = true }) => (
        <ul className="navigation clearfix" style={{ display: 'block' }}>
            <ItemsLeft mobile={mobile} />
            <ItemsRight mobile={mobile} />
        </ul>
    );

    // Desktop Left Menu
    const NavLinksLeft = () => (
        <ul className="navigation menu-left clearfix" style={{ visibility: 'visible', opacity: 1, zIndex: 100, position: 'relative' }}>
            <ItemsLeft />
        </ul>
    );

    // Desktop Right Menu
    const NavLinksRight = () => (
        <ul className="navigation menu-right clearfix" style={{ visibility: 'visible', opacity: 1, zIndex: 100, position: 'relative' }}>
            <ItemsRight />
        </ul>
    );

    return (
        <header className={`main-header ${isSticky ? 'fixed-header' : ''} ${isSearchOpen ? 'search-active' : ''}`} style={{ position: 'relative' }}>
            {/* Menu Wave */}
            <div className="menu_wave" style={{ display: isSticky ? 'none' : 'block' }}></div>

            {/* Main box */}
            <div className="main-box" style={{ display: isSticky ? 'none' : 'block' }}>
                <div className="menu-box">
                    <div className="logo" style={{ top: '55%', transform: 'translate(-50%, -50%)', marginLeft: 0 }}>
                        <a href="/" style={{ fontSize: '30px', fontWeight: 'bold', fontFamily: 'Leckerli One, cursive', color: '#4b4342', textDecoration: 'none' }}>Slice of Cake</a>
                    </div>

                    {/*Nav Box*/}
                    <div className="nav-outer clearfix">
                        {/* Main Menu */}
                        <nav className="main-menu navbar-expand-md navbar-light">
                            <div className="clearfix">
                                {/* Desktop Menu: Split into left and right logic manually for now to match design if needed, or use the unified NavLinks for both if we can style it via CSS.
                                    The original code had `menu-left` and `menu-right`. Let's reconstruct that locally to preserve exact layout.
                                */}
                                <ul className="navigation menu-left clearfix" style={{ visibility: 'visible', opacity: 1, zIndex: 100, position: 'relative' }}>
                                    <li className={`${pathname === '/' ? 'current' : ''} dropdown`}><a href="/">Home</a>
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

                                <ul className="navigation menu-right clearfix" style={{ visibility: 'visible', opacity: 1, zIndex: 100, position: 'relative' }}>
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
                                <button className="search-btn" onClick={toggleSearch}><i className="fa fa-search"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Header  */}
            <div className={`sticky-header ${isStickyHidden ? 'header-hidden' : ''}`} style={{
                visibility: isSticky ? 'visible' : 'hidden',
                opacity: isSticky ? 1 : 0,
                pointerEvents: isSticky ? 'auto' : 'none',
                transition: 'all 500ms cubic-bezier(0.4, 0.0, 0.2, 1)'
            }}>
                <div className="auto-container clearfix">
                    {/*Logo*/}
                    <div className="logo" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', marginLeft: 0 }}>
                        <a href="/" title="Sticky Logo" style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'Leckerli One, cursive', color: '#4b4342', textDecoration: 'none' }}>Slice of Cake</a>
                    </div>

                    {/*Nav Outer*/}
                    <div className="nav-outer">
                        {/* Main Menu */}
                        <nav className="main-menu">
                            {/* Sticky Header Desktop Menu */}
                            <div className="collapse navbar-collapse show clearfix">
                                <NavLinksLeft />
                                <NavLinksRight />
                            </div>
                        </nav>{/* Main Menu End*/}
                    </div>
                </div>
            </div>{/* End Sticky Menu */}

            {/* Mobile Header */}
            <div className="mobile-header">
                <div className="logo"><a href="/" style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'Leckerli One, cursive', color: '#4b4342', textDecoration: 'none' }}>Slice of Cake</a></div>

                {/*Nav Box*/}
                <div className="nav-outer clearfix">
                    <div className="outer-box">
                        <div className="search-box">
                            <button className="search-btn mobile-search-btn" onClick={toggleSearch}><i className="fa fa-search"></i></button>
                        </div>
                        <div className="cart-btn">
                            <Link href="#"><i className="icon flaticon-commerce"></i> <span className="count">2</span></Link>
                        </div>
                    </div>
                    <div className="mobile-nav-toggler" onClick={toggleMobileMenu}><span className="icon fa fa-bars"></span></div>
                </div>
            </div>

            {/* Mobile Menu  */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'visible' : ''}`}>
                <div className="menu-backdrop" onClick={closeMobileMenu}></div>
                <div className="close-btn" onClick={closeMobileMenu}><span className="icon fa fa-times"></span></div>

                <nav className="menu-box">
                    <div className="nav-logo"><Link href="/" style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'Leckerli One, cursive', color: '#4b4342', textDecoration: 'none' }}>Slice of Cake</Link></div>
                    <div className="menu-outer">
                        <NavLinksMobile mobile={true} />
                    </div>
                </nav>
            </div>{/* End Mobile Menu */}

            {/* Header Search */}
            <div className="search-popup">
                <span className="search-back-drop" onClick={closeSearch}></span>

                <div className="search-inner">
                    <button className="close-search" onClick={closeSearch}><span className="fa fa-times"></span></button>
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
