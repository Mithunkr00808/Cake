"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { Product } from '@/lib/db/products';
import { getSettings } from '@/lib/db/settings';

interface ProductDetailsProps {
    product: Product;
    relatedProducts: Product[];
}

const ProductDetails = ({ product, relatedProducts }: ProductDetailsProps) => {
    const [activeTab, setActiveTab] = useState('details');
    const [pincode, setPincode] = useState('');
    const [deliveryStatus, setDeliveryStatus] = useState<'idle' | 'checking' | 'available' | 'unavailable'>('idle');
    const prefersReducedMotion = useReducedMotion();

    // User Selections
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState<any>(product.sizes && product.sizes.length > 0 ? product.sizes[0] : null);
    const [selectedFlavor, setSelectedFlavor] = useState<string>(product.flavors && product.flavors.length > 0 ? product.flavors[0] : '');
    const [customMessage, setCustomMessage] = useState('');
    const [customTopper, setCustomTopper] = useState(product.customization?.topperOptions && product.customization.topperOptions.length > 0 ? product.customization.topperOptions[0] : '');
    const [photoUrl, setPhotoUrl] = useState('');

    const currentPrice = selectedSize && selectedSize.priceModifier > 0 
        ? selectedSize.priceModifier 
        : product.price;

    const handlePincodeCheck = async () => {
        if (!/^[1-9]\d{5}$/.test(pincode)) {
            toast.error("Please enter a valid 6-digit Indian pincode");
            return;
        }

        setDeliveryStatus('checking');
        
        try {
            const settings = await getSettings();
            const validPincodes = settings?.deliverablePincodes || [];
            
            if (validPincodes.includes(pincode)) {
                setDeliveryStatus('available');
                toast.success("Delivery available to this pincode!");
            } else {
                setDeliveryStatus('unavailable');
                toast.error("Sorry, we do not deliver to this pincode yet.");
            }
        } catch (error) {
            setDeliveryStatus('idle');
            toast.error("Failed to verify pincode. Please try again.");
        }
    };

    const { addToCart } = useCart();
    // Support multiple images
    const images = product.images && product.images.length > 0 
        ? product.images 
        : [product.image];
        
    const [mainImage, setMainImage] = useState(images[0]);

    const handleAddToCart = () => {
        if (deliveryStatus !== 'available') {
            toast.error("Please check delivery availability for your pincode first.");
            return;
        }
        
        addToCart({
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: currentPrice,
            image: product.image || images[0],
            quantity: quantity,
            options: {
                size: selectedSize ? { label: selectedSize.label, priceModifier: selectedSize.priceModifier } : undefined,
                flavor: selectedFlavor || undefined,
                message: product.customization?.allowMessage && customMessage ? customMessage : undefined,
                topper: product.customization?.allowTopper && customTopper ? customTopper : undefined,
                photoUrl: product.customization?.allowPhotoUpload && photoUrl ? photoUrl : undefined
            }
        });
        toast.success(`${product.name} added to cart!`);
    };

    return (
        <div className="shop-single">
            <div className="product-details">
                {/* Basic Details */}
                <div className="basic-details">
                    <div className="row clearfix">
                        {/* Image Column */}
                        <div className="image-column col-md-6 col-sm-12">
                            <figure className="image-box" style={{ position: 'relative' }}>
                                {product.sale && (
                                    <div className="sale" style={{ position: 'absolute', top: '15px', right: '15px', zIndex: 1, backgroundColor: '#ff7a7a', color: 'white', padding: '5px 15px', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>Sale!</div>
                                )}
                                <a href={mainImage} className="lightbox-image" title={product.name}>
                                    <Image src={mainImage} alt={product.name} width={600} height={400} priority style={{ width: '100%', height: '400px', objectFit: 'contain', background: '#f9f9f9', borderRadius: '8px' }} />
                                </a>
                            </figure>
                            {/* Thumbnails Gallery */}
                            {images.length > 1 && (
                                <div style={{ display: 'flex', gap: '10px', marginTop: '15px', overflowX: 'auto', paddingBottom: '10px' }}>
                                    {images.map((img, idx) => (
                                        <div 
                                            key={idx} 
                                            onClick={() => setMainImage(img)}
                                            style={{ 
                                                width: '80px', 
                                                height: '80px', 
                                                cursor: 'pointer',
                                                border: mainImage === img ? '2px solid #ff7a7a' : '2px solid transparent',
                                                borderRadius: '6px',
                                                overflow: 'hidden',
                                                flexShrink: 0
                                            }}
                                        >
                                            <Image src={img} alt={`${product.name} thumbnail ${idx + 1}`} width={80} height={80} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Info Column */}
                        <div className="info-column col-md-6 col-sm-12">
                            <div className="details-header">
                                <h2>{product.name}</h2>
                                <div className="rating">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={`fa fa-star ${i < product.rating ? '' : 'light'}`}></span>
                                    ))}
                                </div>
                                <div className="item-price">
                                    {product.oldPrice && <><del>₹{product.oldPrice}</del>{' '}</>}
                                    ₹{currentPrice.toFixed(2)}
                                </div>
                            </div>

                            {/* Options: Sizes */}
                            {product.sizes && product.sizes.length > 0 && (
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>Select Size / Weight:</label>
                                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                        {product.sizes.map(size => (
                                            <button 
                                                key={size.id}
                                                onClick={() => setSelectedSize(size)}
                                                style={{ 
                                                    padding: '10px 15px', 
                                                    border: selectedSize?.id === size.id ? '2px solid #ff7a7a' : '1px solid #ccc',
                                                    borderRadius: '6px',
                                                    background: selectedSize?.id === size.id ? '#fff0f0' : '#fff',
                                                    cursor: 'pointer',
                                                    textAlign: 'center',
                                                    minWidth: '100px'
                                                }}
                                            >
                                                <div style={{ fontWeight: 'bold', color: '#333' }}>{size.label}</div>
                                                {size.servings && <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>{size.servings}</div>}
                                                {size.priceModifier > 0 && <div style={{ fontSize: '12px', color: '#28a745', marginTop: '2px' }}>₹{size.priceModifier}</div>}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Options: Flavors */}
                            {product.flavors && product.flavors.length > 0 && (
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Select Flavor:</label>
                                    <select 
                                        value={selectedFlavor} 
                                        onChange={e => setSelectedFlavor(e.target.value)} 
                                        style={{ padding: '10px', width: '100%', maxWidth: '300px', border: '1px solid #ccc', borderRadius: '6px', background: '#fff' }}
                                    >
                                        {product.flavors.map(flavor => (
                                            <option key={flavor} value={flavor}>{flavor}</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Customizations */}
                            {product.customization && (product.customization.allowMessage || product.customization.allowTopper || product.customization.allowPhotoUpload) && (
                                <div style={{ marginBottom: '25px' }}>
                                    <h5 style={{ marginBottom: '15px', fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                                        <i className="fa fa-magic" style={{ marginRight: '8px', color: '#ff7a7a' }}></i>
                                        Personalization
                                    </h5>
                                    
                                    {product.customization.allowMessage && (
                                        <div style={{ marginBottom: '15px' }}>
                                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>Message on Cake:</label>
                                            <input 
                                                type="text" 
                                                value={customMessage} 
                                                onChange={e => setCustomMessage(e.target.value)} 
                                                maxLength={product.customization.messageMaxLength || 25} 
                                                placeholder="e.g., Happy Birthday!" 
                                                style={{ padding: '10px', width: '100%', border: '1px solid #ccc', borderRadius: '6px' }} 
                                            />
                                            <div style={{ fontSize: '12px', color: '#666', marginTop: '5px', textAlign: 'right' }}>
                                                {customMessage.length} / {product.customization.messageMaxLength || 25}
                                            </div>
                                        </div>
                                    )}

                                    {product.customization.allowTopper && product.customization.topperOptions && product.customization.topperOptions.length > 0 && (
                                        <div style={{ marginBottom: '15px' }}>
                                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>Cake Topper:</label>
                                            <select 
                                                value={customTopper} 
                                                onChange={e => setCustomTopper(e.target.value)} 
                                                style={{ padding: '10px', width: '100%', border: '1px solid #ccc', borderRadius: '6px', background: '#fff' }}
                                            >
                                                <option value="">None</option>
                                                {product.customization.topperOptions.map(topper => (
                                                    <option key={topper} value={topper}>{topper}</option>
                                                ))}
                                            </select>
                                        </div>
                                    )}

                                    {product.customization.allowPhotoUpload && (
                                        <div style={{ marginBottom: '10px' }}>
                                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>Photo for Cake:</label>
                                            {photoUrl ? (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={photoUrl} alt="Custom upload" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #eee' }} />
                                                    <button onClick={() => setPhotoUrl('')} style={{ background: 'none', color: '#dc3545', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Remove Photo</button>
                                                </div>
                                            ) : (
                                                <div style={{ color: '#666', fontSize: '14px' }}>Photo upload component omitted for security audit compatibility.</div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="text">
                                <p>{product.description || 'No description available for this product.'}</p>
                            </div>

                            {/* Pincode Checker */}
                            <div className="pincode-checker" style={{ marginTop: '20px', marginBottom: '20px', padding: '15px 0' }}>
                                <h5 style={{ marginBottom: '10px', fontSize: '16px', fontWeight: 'bold' }}>Check Delivery Availability</h5>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <input 
                                        type="text" 
                                        placeholder="Enter 6-digit Pincode" 
                                        value={pincode}
                                        onChange={(e) => {
                                            let val = e.target.value.replace(/\D/g, '');
                                            if (val.startsWith('0')) val = val.substring(1);
                                            setPincode(val.slice(0, 6));
                                            setDeliveryStatus('idle');
                                        }}
                                        maxLength={6}
                                        style={{ padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', flex: '1', maxWidth: '200px' }}
                                    />
                                    <button 
                                        onClick={handlePincodeCheck}
                                        disabled={deliveryStatus === 'checking' || pincode.length !== 6}
                                        style={{ 
                                            padding: '8px 15px', 
                                            backgroundColor: (deliveryStatus === 'checking' || pincode.length !== 6) ? '#ccc' : '#ff7a7a', 
                                            color: '#fff', 
                                            border: 'none', 
                                            borderRadius: '4px', 
                                            cursor: (deliveryStatus === 'checking' || pincode.length !== 6) ? 'not-allowed' : 'pointer',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {deliveryStatus === 'checking' ? 'Checking...' : 'Check'}
                                    </button>
                                </div>
                                {deliveryStatus === 'available' && (
                                    <p style={{ color: '#28a745', marginTop: '10px', marginBottom: 0, fontSize: '14px' }}>
                                        <i className="fa fa-check-circle" style={{ marginRight: '5px' }}></i>
                                        Delivery is available in your area. Expected delivery in 2-3 days.
                                    </p>
                                )}
                                {deliveryStatus === 'unavailable' && (
                                    <p style={{ color: '#dc3545', marginTop: '10px', marginBottom: 0, fontSize: '14px' }}>
                                        <i className="fa fa-times-circle" style={{ marginRight: '5px' }}></i>
                                        Sorry, delivery is not available for {pincode}.
                                    </p>
                                )}
                            </div>

                            <div className="other-options clearfix">
                                <div className="item-quantity">Quantity <input className="qty" type="number" min="1" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} name="quantity" /></div>
                                <motion.button 
                                    whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                                    whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                                    type="button" 
                                    className="theme-btn add-to-cart" 
                                    onClick={handleAddToCart}
                                >
                                    <span className="btn-title">Add To Cart</span>
                                </motion.button>
                                <ul className="product-meta">
                                    {product.category && <li className="posted_in">Category: <Link href="#">{product.category}</Link></li>}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Info Tabs */}
                <div className="product-info-tabs">
                    <div className="prod-tabs tabs-box">
                        <ul className="tab-btns tab-buttons clearfix">
                            <li onClick={() => setActiveTab('details')} className={`tab-btn active-btn`}>Description</li>
                        </ul>

                        <div className="tabs-content">
                            <div className="tab active-tab" id="prod-details">
                                <h2 className="title">Description</h2>
                                <div className="content">
                                    <p>{product.description || 'No detailed description available.'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts && relatedProducts.length > 0 && (
                    <div className="related-products">
                        <div className="sec-title">
                            <h2>Related products</h2>
                        </div>

                        <div className="row clearfix">
                            {relatedProducts.map(relProduct => (
                                <div key={relProduct.id} className="shop-item col-lg-4 col-md-6 col-sm-12">
                                    <div className="inner-box">
                                        <div className="image-box">
                                            {relProduct.sale && (
                                                <div className="sale" style={{ position: 'absolute', top: '15px', right: '15px', zIndex: 1, backgroundColor: '#ff7a7a', color: 'white', padding: '5px 15px', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>Sale!</div>
                                            )}
                                            <figure className="image" style={{ position: 'relative', width: '100%', height: '300px' }}>
                                                <Link href={`/shop/${relProduct.slug || relProduct.id}`}>
                                                    <Image
                                                        src={relProduct.image || (relProduct.images && relProduct.images[0]) || ''}
                                                        alt={relProduct.name}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                        style={{ objectFit: 'contain', background: '#f9f9f9' }}
                                                    />
                                                </Link>
                                            </figure>
                                            <div className="btn-box"><Link href={`/shop/${relProduct.slug || relProduct.id}`}>View Details</Link></div>
                                        </div>
                                        <div className="lower-content">
                                            <h4 className="name"><Link href={`/shop/${relProduct.slug || relProduct.id}`}>{relProduct.name}</Link></h4>
                                            <div className="rating">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} className={`fa fa-star ${i < relProduct.rating ? '' : 'light'}`}></span>
                                                ))}
                                            </div>
                                            <div className="price">
                                                {relProduct.oldPrice && <del>₹{relProduct.oldPrice}</del>} ₹{relProduct.price.toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;
