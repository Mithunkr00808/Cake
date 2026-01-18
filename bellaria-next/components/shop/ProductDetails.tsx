"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ProductDetails = () => {
    const [activeTab, setActiveTab] = useState('details');

    return (
        <div className="shop-single">
            {/* Product Detail */}
            <div className="product-details">
                {/*Basic Details*/}
                <div className="basic-details">
                    <div className="row clearfix">
                        <div className="image-column col-md-6 col-sm-12">
                            <figure className="image">
                                <a href="/assets/images/resource/service-birthday-transparent-v3.png" className="lightbox-image" title="Image Caption Here">
                                    <img src="/assets/images/resource/service-birthday-transparent-v3.png" alt="" style={{ background: '#f9f9f9' }} />
                                    <span className="icon fa fa-search"></span>
                                </a>
                            </figure>
                        </div>
                        <div className="info-column col-md-6 col-sm-12">
                            <div className="details-header">
                                <h4>Birthday Cake</h4>
                                <div className="rating">
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                </div>
                                <a className="reviews" href="#">(2 Customer Reviews)</a>
                                <div className="item-price">$84.00</div>
                                <div className="text">Accumsan lectus, consectetuer et sagittis et commodo, massa et, sed facilisi mi, sit diam. Ultrices facilisi convallis nullam duis. Aliquam lacinia orci convallis erat ac, vitae neque in class.</div>
                            </div>

                            <div className="other-options clearfix">
                                <div className="item-quantity">Quantity <input className="qty" type="number" defaultValue="1" name="quantity" /></div>
                                <button type="button" className="theme-btn add-to-cart"><span className="btn-title">Add To Cart</span></button>
                                <ul className="product-meta">
                                    <li className="posted_in">Category: <Link href="#">Cake</Link></li>
                                    <li className="tagged_as">Tag: <Link href="#">Nuts</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/*Basic Details*/}

                {/*Product Info Tabs*/}
                <div className="product-info-tabs">
                    {/*Product Tabs*/}
                    <div className="prod-tabs tabs-box">

                        {/*Tab Btns*/}
                        <ul className="tab-btns tab-buttons clearfix">
                            <li onClick={() => setActiveTab('details')} className={`tab-btn ${activeTab === 'details' ? 'active-btn' : ''}`}>Description</li>
                            <li onClick={() => setActiveTab('reviews')} className={`tab-btn ${activeTab === 'reviews' ? 'active-btn' : ''}`}>Review (2)</li>
                        </ul>

                        {/*Tabs Container*/}
                        <div className="tabs-content">

                            {/*Tab*/}
                            <div className={`tab ${activeTab === 'details' ? 'active-tab' : ''}`} id="prod-details">
                                <h2 className="title">Description</h2>
                                <div className="content">
                                    <p>Accumsan lectus, consectetuer et sagittis et commodo, massa et, sed facilisi mi, sit diam. Ultrices facilisi convallis nullam duis. Aliquam lacinia orci convallis erat ac, vitae neque in class. Suscipit vel, rhoncus est quis nibh netus, aenean eleifend et viverra, neque accumsan maecenas nec in. Morbi bibendum non ullamcorper aliquam natoque, tortor dui, vestibulum vulputate pulvinar iaculis magna lectus ut, facilisis id mollis risus lorem. Massa nulla cum nunc litora ac amet, accumsan faucibus integer, vestibulum turpis cras, ante imperdiet tincidunt accumsan, vivamus lacinia bibendum augue maiores mauris.</p>
                                </div>
                            </div>

                            {/*Tab*/}
                            <div className={`tab ${activeTab === 'reviews' ? 'active-tab' : ''}`} id="prod-reviews">
                                <h2 className="title">2 reviews for Birthday Cake</h2>
                                {/*Reviews Container*/}
                                <div className="comments-area">
                                    {/*Comment Box*/}
                                    <div className="comment-box">
                                        <div className="comment">
                                            <div className="author-thumb" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', borderRadius: '50%' }}>
                                                <span className="fa fa-user" style={{ fontSize: '24px', color: '#ccc' }}></span>
                                            </div>
                                            <div className="comment-inner">
                                                <div className="comment-info clearfix">
                                                    <strong className="name">Stuart</strong>
                                                    <span className="date">– 07 Jun</span>
                                                </div>
                                                <div className="rating">
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star light"></span>
                                                </div>
                                                <div className="text">This will go great with my Hoodie that I ordered a few weeks ago.</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/*Comment Box*/}
                                    <div className="comment-box">
                                        <div className="comment">
                                            <div className="author-thumb" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', borderRadius: '50%' }}>
                                                <span className="fa fa-user" style={{ fontSize: '24px', color: '#ccc' }}></span>
                                            </div>
                                            <div className="comment-inner">
                                                <div className="comment-info clearfix">
                                                    <strong className="name">Maria</strong>
                                                    <span className="date">– 07 Jun</span>
                                                </div>
                                                <div className="rating">
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star light"></span>
                                                </div>
                                                <div className="text">Love this shirt! The ninja near and dear to my heart.</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/*Comment Form*/}
                                <div className="comment-form">
                                    <div className="sub-title">Add a review</div>
                                    <div className="form-outer">
                                        <p>Your email address will not be published. Required fields are marked *</p>
                                        <div className="rating-box">
                                            <div className="field-label">Your Rating</div>
                                            <div className="rating">
                                                <Link href="#"><span className="fa fa-star"></span></Link>
                                                <Link href="#"><span className="fa fa-star"></span></Link>
                                                <Link href="#"><span className="fa fa-star"></span></Link>
                                                <Link href="#"><span className="fa fa-star"></span></Link>
                                                <Link href="#"><span className="fa fa-star"></span></Link>
                                            </div>
                                        </div>
                                        <form method="post" action="#">
                                            <div className="row clearfix">
                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                    <div className="field-label">Your review *</div>
                                                    <textarea name="message" placeholder=""></textarea>
                                                </div>

                                                <div className="col-lg-6 col-md-12 col-sm-12 form-group">
                                                    <div className="field-label">Name *</div>
                                                    <input type="text" name="username" placeholder="" required />
                                                </div>

                                                <div className="col-lg-6 col-md-12 col-sm-12 form-group">
                                                    <div className="field-label">Email *</div>
                                                    <input type="email" name="email" placeholder="" required />
                                                </div>

                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group text-right">
                                                    <input type="submit" name="submit" value="Submit" />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*End Product Info Tabs*/}

                {/* Related Products */}
                <div className="related-products">
                    <div className="sec-title">
                        <h2>Related products</h2>
                    </div>

                    <div className="row clearfix">
                        {/* Shop Item */}
                        <div className="shop-item col-lg-4 col-md-6 col-sm-12">
                            <div className="inner-box">
                                <div className="image-box">
                                    <div className="sale-tag">sale!</div>
                                    <figure className="image"><Link href="/shop/donuts"><img src="/assets/images/resource/service-donuts-transparent-v3.png" alt="" style={{ background: '#f9f9f9', width: '100%', height: '300px', objectFit: 'contain' }} /></Link></figure>
                                    <div className="btn-box"><Link href="/cart">Add to cart</Link></div>
                                </div>
                                <div className="lower-content">
                                    <h4 className="name"><Link href="/shop/donuts">Donuts</Link></h4>
                                    <div className="rating"><span className="fa fa-star"></span><span className="fa fa-star"></span><span className="fa fa-star"></span><span className="fa fa-star"></span><span className="fa fa-star light"></span></div>
                                    <div className="price">$17.00</div>
                                </div>
                            </div>
                        </div>

                        {/* Shop Item */}
                        <div className="shop-item col-lg-4 col-md-6 col-sm-12">
                            <div className="inner-box">
                                <div className="image-box">
                                    <figure className="image"><Link href="/shop/coffee"><img src="/assets/images/resource/service-coffee-transparent-v3.png" alt="" style={{ background: '#f9f9f9', width: '100%', height: '300px', objectFit: 'contain' }} /></Link></figure>
                                    <div className="btn-box"><Link href="/cart">Add to cart</Link></div>
                                </div>
                                <div className="lower-content">
                                    <h4 className="name"><Link href="/shop/coffee">Coffee</Link></h4>
                                    <div className="rating"><span className="fa fa-star"></span><span className="fa fa-star"></span><span className="fa fa-star"></span><span className="fa fa-star"></span><span className="fa fa-star light"></span></div>
                                    <div className="price">$35.00</div>
                                </div>
                            </div>
                        </div>

                        {/* Shop Item */}
                        <div className="shop-item col-lg-4 col-md-6 col-sm-12">
                            <div className="inner-box">
                                <div className="image-box">
                                    <figure className="image"><Link href="/shop/hearts-lollipop"><img src="/assets/images/resource/service-lollipop-transparent-v3.png" alt="" style={{ background: '#f9f9f9', width: '100%', height: '300px', objectFit: 'contain' }} /></Link></figure>
                                    <div className="btn-box"><Link href="/cart">Add to cart</Link></div>
                                </div>
                                <div className="lower-content">
                                    <h4 className="name"><Link href="/shop/hearts-lollipop">Hearts Lollipop</Link></h4>
                                    <div className="rating"><span className="fa fa-star"></span><span className="fa fa-star"></span><span className="fa fa-star"></span><span className="fa fa-star"></span><span className="fa fa-star light"></span></div>
                                    <div className="price">$17.00</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>{/* End Related Products */}
            </div>{/* Product Detail */}
        </div>
    );
};

export default ProductDetails;
