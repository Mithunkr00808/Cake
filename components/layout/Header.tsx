"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';


const Header = () => {
    const pathname = usePathname();
    const [isSticky, setIsSticky] = useState(false);
    const [isStickyHidden, setIsStickyHidden] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
    const { cartItems, cartCount, cartTotal, removeFromCart } = useCart();
    const { user } = useAuth();

    // Sticky Header Scroll Logic (optimized with throttling)
    useEffect(() => {
        let lastScrollY = window.scrollY;
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
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
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
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
    const renderItemsLeft = (mobile = false) => (
        <>
            <li className={`${pathname === '/' ? 'current' : ''}`}>
                <Link href="/" onClick={mobile ? closeMobileMenu : undefined}>Home</Link>
            </li>

            <li className={pathname === '/portfolio' ? 'current' : ''}>
                <Link href="/portfolio" onClick={mobile ? closeMobileMenu : undefined}>Portfolio</Link>
            </li>
        </>
    );

    // Navigation Items - Right Part
    const renderItemsRight = (mobile = false) => (
        <>

            <li className={`dropdown ${pathname.startsWith('/shop') || pathname === '/cart' || pathname === '/checkout' || pathname === '/login' ? 'current' : ''}`}>
                <Link href="/shop" onClick={mobile ? closeMobileMenu : undefined}>Shop</Link>
                <div className="dropdown-btn" onClick={(e) => { e.preventDefault(); toggleMobileDropdown('shop'); }}><span className="fa fa-plus"></span></div>
                <ul style={{ display: mobile && activeMobileDropdown === 'shop' ? 'block' : undefined }}>
                    <li className={pathname === '/shop' ? 'current' : ''}><Link href="/shop" onClick={mobile ? closeMobileMenu : undefined}>Shop</Link></li>
                    <li className={pathname === '/cart' ? 'current' : ''}><Link href="/cart" onClick={mobile ? closeMobileMenu : undefined}>Cart</Link></li>
                    <li className={pathname === '/checkout' ? 'current' : ''}><Link href="/checkout" onClick={mobile ? closeMobileMenu : undefined}>Checkout</Link></li>
                    <li className={pathname === '/my-account' || pathname === '/login' ? 'current' : ''}>
                        <Link href={user ? '/my-account' : '/login'} onClick={mobile ? closeMobileMenu : undefined}>
                            {user ? 'My Account' : 'Login'}
                        </Link>
                    </li>
                </ul>
            </li>
            <li className={pathname === '/about-us' ? 'current' : ''}><Link href="/about-us" onClick={mobile ? closeMobileMenu : undefined}>About Us</Link></li>
        </>
    );

    // Mobile Menu (Unified)
    const renderNavLinksMobile = (mobile = true) => (
        <ul className="navigation clearfix" style={{ display: 'block' }}>
            {renderItemsLeft(mobile)}
            {renderItemsRight(mobile)}
        </ul>
    );

    // Desktop Left Menu
    const renderNavLinksLeft = () => (
        <ul className="navigation menu-left clearfix" style={{ visibility: 'visible', opacity: 1, zIndex: 100, position: 'relative' }}>
            {renderItemsLeft(false)}
        </ul>
    );

    // Desktop Right Menu
    const renderNavLinksRight = () => (
        <ul className="navigation menu-right clearfix" style={{ visibility: 'visible', opacity: 1, zIndex: 100, position: 'relative' }}>
            {renderItemsRight(false)}
        </ul>
    );

    return (
        <header className={`main-header ${isSticky ? 'fixed-header' : ''} ${isSearchOpen ? 'search-active' : ''}`} style={{ position: 'relative', backgroundColor: 'transparent' }}>
            {/* Menu Wave */}
            <div className="menu_wave" style={{ display: isSticky ? 'none' : 'block' }}></div>

            {/* Main box */}
            <div className="main-box" style={{ display: isSticky ? 'none' : 'block' }}>
                <div className="menu-box">
                    <div className="hidden md:block" style={{ position: 'absolute', left: '40px', top: '50%', transform: 'translateY(-50%)', fontWeight: 'bold', fontSize: '14px', letterSpacing: '2px', color: '#4b4342', zIndex: 10 }}>
                        <i className="fa fa-map-marker-alt" style={{ marginRight: '8px', color: '#ff7a7a' }}></i>
                        THRISSUR
                    </div>
                    <div className="logo" style={{ top: '55%', transform: 'translate(-50%, -50%)', marginLeft: 0 }}>
                        <a href="/" style={{ fontSize: '30px', fontWeight: 'bold', fontFamily: 'Leckerli One, cursive', color: '#4b4342', textDecoration: 'none' }}>Slice of Cake</a>
                    </div>

                    {/*Nav Box*/}
                    <div className="nav-outer clearfix">
                        {/* Main Menu */}
                        <nav className="main-menu navbar-expand-md navbar-light" aria-label="Main navigation">
                            <div className="clearfix">
                                {/* Desktop Menu: Using shared components to ensure sync between Main, Sticky, and Mobile menus */}
                                {renderNavLinksLeft()}
                                {renderNavLinksRight()}
                            </div>
                        </nav>
                        {/* Main Menu End*/}

                        <div className="outer-box clearfix">
                            {/* Shoppping Car */}
                            <div className="cart-btn">
                                <Link href="/cart"><i className="icon flaticon-commerce"></i> <span className="count">{cartCount}</span></Link>

                                <div className="shopping-cart">
                                    <ul className="shopping-cart-items">
                                        {cartItems.length === 0 ? (
                                            <li className="cart-item" style={{ textAlign: 'center', padding: '10px' }}>Cart is empty</li>
                                        ) : (
                                            cartItems.map((item) => (
                                                <li className="cart-item" key={item.id}>
                                                    <img src={item.image} alt={item.name} className="thumb" />
                                                    <span className="item-name">{item.name}</span>
                                                    <span className="item-quantity">{item.quantity} x <span className="item-amount">₹{item.price.toFixed(2)}</span></span>
                                                    <Link href={`/shop/${item.id}`} className="product-detail"></Link>
                                                    <a href="#" className="remove-item" onClick={(e) => { e.preventDefault(); removeFromCart(item.id); }}><span className="fa fa-times"></span></a>
                                                </li>
                                            ))
                                        )}
                                    </ul>

                                    <div className="cart-footer">
                                        <div className="shopping-cart-total"><strong>Subtotal:</strong> ₹{cartTotal.toFixed(2)}</div>
                                        <Link href="/cart" className="theme-btn">View Cart</Link>
                                        <button 
                                            onClick={() => {
                                                if (cartItems.length === 0) {
                                                    toast.error("Please add items to cart first");
                                                } else {
                                                    window.location.href = "/checkout";
                                                }
                                            }} 
                                            className="theme-btn"
                                        >
                                            Checkout
                                        </button>
                                    </div>
                                </div> {/*end shopping-cart */}
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
                        <nav className="main-menu" aria-label="Main navigation">
                            {/* Sticky Header Desktop Menu */}
                            <div className="collapse navbar-collapse show clearfix">
                                {renderNavLinksLeft()}
                                {renderNavLinksRight()}
                            </div>
                        </nav>{/* Main Menu End*/}
                    </div>
                </div>
            </div>{/* End Sticky Menu */}

            {/* Mobile Header */}
            <div className="mobile-header">
                <div className="auto-container flex items-center justify-between px-4 py-3 relative z-[100]">
                    <div className="logo relative z-10">
                        <a href="/" style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'Leckerli One, cursive', color: '#4b4342', textDecoration: 'none', display: 'block', lineHeight: '1' }}>Slice of Cake</a>
                        <span style={{ fontSize: '10px', fontWeight: 'bold', letterSpacing: '2px', color: '#4b4342', display: 'block', marginTop: '2px' }}>
                            <i className="fa fa-map-marker-alt" style={{ marginRight: '4px', color: '#ff7a7a', fontSize: '9px' }}></i>
                            THRISSUR
                        </span>
                    </div>

                    {/*Nav Box*/}
                    <div className="nav-outer flex items-center gap-5">

                        <div className="cart-btn !static !float-none !m-0 !translate-x-0">
                            <Link href="/cart" className="relative block"><i className="icon flaticon-commerce text-[20px]"></i> <span className="count absolute -top-2 -right-3">{cartCount}</span></Link>
                        </div>
                        <div className="mobile-nav-toggler !static !float-none !m-0 !translate-x-0 !block h-auto leading-none" onClick={toggleMobileMenu}><span className="icon fa fa-bars text-[24px]"></span></div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu  */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'visible' : ''}`}>
                <div className="menu-backdrop" onClick={closeMobileMenu}></div>
                <div className="close-btn" onClick={closeMobileMenu}><span className="icon fa fa-times"></span></div>

                <nav className="menu-box" aria-label="Mobile navigation">
                    <div className="nav-logo"><Link href="/" style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'Leckerli One, cursive', color: '#4b4342', textDecoration: 'none' }}>Slice of Cake</Link></div>
                    <div className="menu-outer">
                        {renderNavLinksMobile(true)}
                    </div>
                </nav>
            </div>{/* End Mobile Menu */}



        </header>
    );
};

export default Header;
