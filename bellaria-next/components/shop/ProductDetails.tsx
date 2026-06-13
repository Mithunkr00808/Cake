"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { Product, ProductSize } from '@/lib/db/products';
import { getSettings } from '@/lib/db/settings';
import { CldUploadWidget } from 'next-cloudinary';

interface ProductDetailsProps {
    product: Product;
    relatedProducts: Product[];
}

const ProductDetails = ({ product, relatedProducts }: ProductDetailsProps) => {
    const [activeTab, setActiveTab] = useState('details');
    const [pincode, setPincode] = useState('');
    const [deliveryStatus, setDeliveryStatus] = useState<'idle' | 'checking' | 'available' | 'unavailable'>('idle');

    // User Selections
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState<ProductSize | null>(product.sizes && product.sizes.length > 0 ? product.sizes[0] : null);
    const [selectedFlavor, setSelectedFlavor] = useState<string>(product.flavors && product.flavors.length > 0 ? product.flavors[0] : '');
    const [customMessage, setCustomMessage] = useState('');
    const [customTopper, setCustomTopper] = useState(product.customization?.topperOptions && product.customization.topperOptions.length > 0 ? product.customization.topperOptions[0] : '');
    const [photoUrl, setPhotoUrl] = useState('');

    const { addToCart } = useCart();
    
    // Dynamic Pricing (Variation price becomes the actual absolute price)
    const currentPrice = selectedSize && selectedSize.priceModifier > 0 
        ? selectedSize.priceModifier 
        : product.price;

    // Support multiple images
    const images = product.images && product.images.length > 0 
        ? product.images 
        : [product.image];
        
    const [mainImage, setMainImage] = useState(images[0]);

    const handlePincodeCheck = async () => {
        if (pincode.length !== 6) {
            toast.error("Please enter a valid 6-digit pincode");
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

    const handleAddToCart = () => {
        if (deliveryStatus !== 'available') {
            toast.error("Please check delivery availability for your pincode first.");
            return;
        }

        if (product.stock === 'out_of_stock') {
            toast.error("Sorry, this item is out of stock.");
            return;
        }
        
        addToCart({
            productId: product.id,
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
                            <figure className="image-box">
                                <a href={mainImage} className="lightbox-image" title={product.name}>
                                    <img src={mainImage} alt={product.name} style={{ width: '100%', height: '400px', objectFit: 'contain', background: '#f9f9f9', borderRadius: '8px' }} />
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
                                            <img src={img} alt={`Thumbnail ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Info Column */}
                        <div className="info-column col-md-6 col-sm-12">
                            <div className="details-header">
                                {/* Dietary Tags */}
                                {product.dietaryTags && product.dietaryTags.length > 0 && (
                                    <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
                                        {product.dietaryTags.map(tag => (
                                            <span key={tag} style={{ background: '#e0f7fa', color: '#00838f', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>{tag}</span>
                                        ))}
                                    </div>
                                )}
                                
                                <h2>{product.name}</h2>
                                
                                <div className="rating">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={`fa fa-star ${i < product.rating ? '' : 'light'}`}></span>
                                    ))}
                                </div>
                                
                                {/* Short Description */}
                                {product.shortDescription && <p style={{ color: '#666', marginTop: '10px', fontSize: '15px' }}>{product.shortDescription}</p>}

                                <div className="item-price" style={{ marginTop: '15px' }}>
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
                                                    <img src={photoUrl} alt="Custom upload" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #eee' }} />
                                                    <button onClick={() => setPhotoUrl('')} style={{ background: 'none', color: '#dc3545', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Remove Photo</button>
                                                </div>
                                            ) : (
                                                <CldUploadWidget 
                                                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ml_default"}
                                                    onSuccess={(result: any) => setPhotoUrl(result.info.secure_url)}
                                                >
                                                    {({ open }) => (
                                                        <button type="button" onClick={() => open()} style={{ padding: '10px 20px', background: '#fff', border: '1px dashed #aaa', borderRadius: '6px', cursor: 'pointer', width: '100%', color: '#666' }}>
                                                            <i className="fa fa-upload" style={{ marginRight: '8px' }}></i> Upload Image
                                                        </button>
                                                    )}
                                                </CldUploadWidget>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Pincode Checker */}
                            <div className="pincode-checker" style={{ marginTop: '20px', marginBottom: '20px', padding: '15px 0' }}>
                                <h5 style={{ marginBottom: '10px', fontSize: '16px', fontWeight: 'bold' }}>Check Delivery Availability</h5>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <input 
                                        type="text" 
                                        placeholder="Enter 6-digit Pincode" 
                                        value={pincode}
                                        onChange={(e) => {
                                            setPincode(e.target.value.replace(/\D/g, '').slice(0, 6));
                                            setDeliveryStatus('idle');
                                        }}
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
                                        Delivery available
                                    </p>
                                )}
                                {deliveryStatus === 'unavailable' && (
                                    <p style={{ color: '#dc3545', marginTop: '10px', marginBottom: 0, fontSize: '14px' }}>
                                        <i className="fa fa-times-circle" style={{ marginRight: '5px' }}></i>
                                        Sorry, delivery is not available for {pincode}.
                                    </p>
                                )}
                            </div>

                            {/* Delivery config info */}
                            {product.deliveryConfig && (product.deliveryConfig.leadTimeHours > 0 || product.deliveryConfig.fee > 0) && (
                                <div style={{ marginBottom: '20px', color: '#666', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <i className="fa fa-truck" style={{ color: '#ff7a7a' }}></i>
                                    <span>
                                        {product.deliveryConfig.leadTimeHours > 0 && `Requires ${product.deliveryConfig.leadTimeHours} hrs advance notice.`}
                                        {product.deliveryConfig.fee > 0 && ` Estimated delivery fee: ₹${product.deliveryConfig.fee}.`}
                                    </span>
                                </div>
                            )}

                            <div className="other-options clearfix" style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
                                <div className="item-quantity">Quantity 
                                    <input 
                                        className="qty" 
                                        type="number" 
                                        min="1" 
                                        max={product.maxQuantity || 99}
                                        value={quantity} 
                                        onChange={(e) => setQuantity(Math.min(parseInt(e.target.value) || 1, product.maxQuantity || 99))} 
                                        name="quantity" 
                                        style={{ marginLeft: '10px', borderRadius: '4px' }}
                                    />
                                </div>
                                
                                <motion.button 
                                    whileHover={product.stock === 'out_of_stock' ? {} : { scale: 1.05 }}
                                    whileTap={product.stock === 'out_of_stock' ? {} : { scale: 0.95 }}
                                    type="button" 
                                    className="theme-btn add-to-cart" 
                                    onClick={handleAddToCart}
                                    disabled={product.stock === 'out_of_stock'}
                                    style={product.stock === 'out_of_stock' ? { background: '#ccc', cursor: 'not-allowed', color: '#666' } : {}}
                                >
                                    <span className="btn-title">{product.stock === 'out_of_stock' ? 'Out of Stock' : (product.ctaText || 'Add To Cart')}</span>
                                </motion.button>
                                
                                <ul className="product-meta">
                                    {product.category && <li className="posted_in">Category: <Link href="#">{product.category}</Link></li>}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Info Tabs */}
                <div className="product-info-tabs" style={{ marginTop: '50px' }}>
                    <div className="prod-tabs tabs-box">
                        <ul className="tab-btns tab-buttons clearfix">
                            <li onClick={() => setActiveTab('details')} className={`tab-btn ${activeTab === 'details' ? 'active-btn' : ''}`}>Description</li>
                            {product.fullDescription && <li onClick={() => setActiveTab('ingredients')} className={`tab-btn ${activeTab === 'ingredients' ? 'active-btn' : ''}`}>Ingredients & Details</li>}
                        </ul>

                        <div className="tabs-content">
                            {activeTab === 'details' && (
                                <div className="tab active-tab" id="prod-details">
                                    <h2 className="title">Description</h2>
                                    <div className="content">
                                        <p>{product.description || 'No detailed description available.'}</p>
                                    </div>
                                </div>
                            )}
                            
                            {activeTab === 'ingredients' && product.fullDescription && (
                                <div className="tab active-tab" id="prod-ingredients">
                                    <h2 className="title">Ingredients & Details</h2>
                                    <div className="content" style={{ whiteSpace: 'pre-wrap' }}>
                                        <p>{product.fullDescription}</p>
                                    </div>
                                </div>
                            )}
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

                                            <figure className="image">
                                                <Link href={`/shop/${relProduct.id}`}>
                                                    <img src={relProduct.image || (relProduct.images && relProduct.images[0])} alt={relProduct.name} style={{ background: '#f9f9f9', width: '100%', height: '300px', objectFit: 'contain' }} />
                                                </Link>
                                            </figure>
                                            <div className="btn-box"><Link href={`/shop/${relProduct.id}`}>View Details</Link></div>
                                        </div>
                                        <div className="lower-content">
                                            <h4 className="name"><Link href={`/shop/${relProduct.id}`}>{relProduct.name}</Link></h4>
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
