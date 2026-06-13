"use client";

import React, { useState } from 'react';
import { Product, ProductSize, addProduct, updateProduct, StockStatus } from '@/lib/db/products';
import { CldUploadWidget } from 'next-cloudinary';
import toast from 'react-hot-toast';

interface ProductFormProps {
    product?: Product;
    onClose: () => void;
    onSuccess: () => void;
}

export default function ProductForm({ product, onClose, onSuccess }: ProductFormProps) {
    // Basic Info
    const [name, setName] = useState(product?.name || '');
    const [category, setCategory] = useState(product?.category || '');
    const [shortDescription, setShortDescription] = useState(product?.shortDescription || '');
    const [rating, setRating] = useState(product?.rating || 5);
    const [stock, setStock] = useState<StockStatus>(product?.stock || 'in_stock');
    const [ctaText, setCtaText] = useState(product?.ctaText || 'Add to Cart');
    const [sale, setSale] = useState(product?.sale || false);

    // Media
    const [images, setImages] = useState<string[]>(product?.images || (product?.image ? [product.image] : []));

    // Details
    const [description, setDescription] = useState(product?.description || ''); 
    const [fullDescription, setFullDescription] = useState(product?.fullDescription || '');

    // Variations
    const [sizes, setSizes] = useState<ProductSize[]>(product?.sizes || []);
    const [flavors, setFlavors] = useState<string>(product?.flavors?.join(', ') || '');
    const [dietaryTags, setDietaryTags] = useState<string>(product?.dietaryTags?.join(', ') || '');

    // Delivery & Limits
    const [maxQuantity, setMaxQuantity] = useState(product?.maxQuantity || 10);
    const [deliveryFee, setDeliveryFee] = useState(product?.deliveryConfig?.fee || 0);
    const [leadTimeHours, setLeadTimeHours] = useState(product?.deliveryConfig?.leadTimeHours || 24);

    // Customization
    const [allowMessage, setAllowMessage] = useState(product?.customization?.allowMessage || false);
    const [allowTopper, setAllowTopper] = useState(product?.customization?.allowTopper || false);
    const [topperOptions, setTopperOptions] = useState<string>(product?.customization?.topperOptions?.join(', ') || 'Chocolate ganache, Nuts (chopped), Sprinkles and nonpareils');
    const [allowPhotoUpload, setAllowPhotoUpload] = useState(product?.customization?.allowPhotoUpload || false);

    const [loading, setLoading] = useState(false);

    const handleAddSize = () => {
        setSizes([...sizes, { id: Date.now().toString(), label: '', servings: '', priceModifier: 0 }]);
    };

    const handleUpdateSize = (index: number, field: keyof ProductSize, value: any) => {
        const newSizes = [...sizes];
        newSizes[index] = { ...newSizes[index], [field]: value };
        setSizes(newSizes);
    };

    const handleRemoveSize = (index: number) => {
        setSizes(sizes.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (images.length === 0) {
            toast.error('Please upload at least one image.');
            return;
        }

        setLoading(true);
        const productData: Omit<Product, 'id'> = {
            name,
            category,
            shortDescription,
            description,
            fullDescription,
            price: sizes.length > 0 ? sizes[0].priceModifier : 0,
            oldPrice: '',
            rating: Number(rating),
            image: images[0],
            images,
            sale,
            stock,
            ctaText,
            sizes: sizes.filter(s => s.label.trim() !== ''),
            flavors: flavors.split(',').map(f => f.trim()).filter(f => f !== ''),
            dietaryTags: dietaryTags.split(',').map(t => t.trim()).filter(t => t !== ''),
            maxQuantity: Number(maxQuantity),
            deliveryConfig: {
                fee: Number(deliveryFee),
                leadTimeHours: Number(leadTimeHours)
            },
            customization: {
                allowMessage,
                allowTopper,
                topperOptions: allowTopper ? topperOptions.split(',').map(t => t.trim()).filter(t => t !== '') : [],
                allowPhotoUpload
            }
        };

        if (product?.id) {
            const success = await updateProduct(product.id, productData);
            if (success) {
                toast.success('Product updated!');
                onSuccess();
            } else {
                toast.error('Failed to update product.');
            }
        } else {
            const id = await addProduct(productData);
            if (id) {
                toast.success('Product added!');
                onSuccess();
            } else {
                toast.error('Failed to add product.');
            }
        }
        setLoading(false);
    };

    const sectionStyle = {
        background: '#f9f9f9',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        border: '1px solid #eee'
    };

    const labelStyle = { fontWeight: 'bold', display: 'block', marginBottom: '5px' };
    const inputStyle = { width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '15px' };

    return (
        <div className="contact-form" style={{ marginTop: '20px' }}>
            <div className="sec-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>{product ? 'Edit Product' : 'Add New Product'}</h3>
                <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
                <div style={sectionStyle}>
                    <h4 style={{ marginBottom: '15px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>1. Basic Information</h4>
                    <div className="row clearfix">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <label style={labelStyle}>Product Title *</label>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} required style={inputStyle} />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <label style={labelStyle}>Category</label>
                            <input type="text" value={category} onChange={e => setCategory(e.target.value)} style={inputStyle} />
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <label style={labelStyle}>Short Description (One-line summary)</label>
                            <input type="text" value={shortDescription} onChange={e => setShortDescription(e.target.value)} maxLength={200} style={inputStyle} />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <label style={labelStyle}>Stock Status *</label>
                            <select value={stock} onChange={e => setStock(e.target.value as StockStatus)} style={inputStyle} required>
                                <option value="in_stock">In Stock</option>
                                <option value="low_stock">Low Stock</option>
                                <option value="out_of_stock">Out of Stock</option>
                                <option value="preorder">Pre-order</option>
                            </select>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <label style={labelStyle}>Call to Action Text</label>
                            <input type="text" value={ctaText} onChange={e => setCtaText(e.target.value)} placeholder="e.g. Add to Cart, Buy Now" style={inputStyle} />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12" style={{ display: 'flex', alignItems: 'center' }}>
                            <label style={{ cursor: 'pointer', fontWeight: 'bold', marginTop: '30px' }}>
                                <input type="checkbox" checked={sale} onChange={e => setSale(e.target.checked)} style={{ marginRight: '8px' }} />
                                On Sale Badge
                            </label>
                        </div>
                    </div>
                </div>

                <div style={sectionStyle}>
                    <h4 style={{ marginBottom: '15px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>2. Media</h4>
                    <label style={labelStyle}>Product Gallery (First image is primary) *</label>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
                        {images.map((img, index) => (
                            <div key={index} style={{ position: 'relative', width: '100px', height: '100px' }}>
                                <img src={img} alt={`Preview ${index}`} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }} />
                                <div 
                                    role="button"
                                    onClick={() => setImages(images.filter((_, i) => i !== index))}
                                    style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'red', color: 'white', borderRadius: '50%', width: '24px', height: '24px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}
                                >
                                    ×
                                </div>
                            </div>
                        ))}
                    </div>
                    <CldUploadWidget 
                        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ml_default"}
                        options={{ multiple: true }}
                        onSuccess={(result: any) => setImages(prev => [...prev, result.info.secure_url])}
                    >
                        {({ open }) => (
                            <button type="button" onClick={() => open()} className="theme-btn btn-style-three" style={{ padding: '8px 15px' }}>
                                Upload Images
                            </button>
                        )}
                    </CldUploadWidget>
                </div>

                <div style={sectionStyle}>
                    <h4 style={{ marginBottom: '15px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>3. Detailed Description</h4>
                    <label style={labelStyle}>Full Description / Ingredients / Allergens</label>
                    <textarea value={fullDescription} onChange={e => setFullDescription(e.target.value)} style={{ ...inputStyle, minHeight: '150px' }} placeholder="Provide rich text description, ingredients, and allergen info here..."></textarea>
                    
                    <label style={labelStyle}>Legacy Description (Optional)</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} style={{ ...inputStyle, minHeight: '80px' }}></textarea>
                </div>

                <div style={sectionStyle}>
                    <h4 style={{ marginBottom: '15px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>4. Variations & Options</h4>
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <label style={labelStyle}>Flavors / Fillings (Comma separated)</label>
                            <input type="text" value={flavors} onChange={e => setFlavors(e.target.value)} placeholder="e.g. Vanilla, Chocolate, Red Velvet" style={inputStyle} />
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <label style={labelStyle}>Dietary Tags (Comma separated)</label>
                            <input type="text" value={dietaryTags} onChange={e => setDietaryTags(e.target.value)} placeholder="e.g. eggless, vegan, gluten_free" style={inputStyle} />
                        </div>
                    </div>
                    
                    <label style={labelStyle}>Sizes & Weights</label>
                    {sizes.map((size, index) => (
                        <div key={size.id} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                            <input type="text" placeholder="Label (e.g. 1 Kg)" value={size.label} onChange={e => handleUpdateSize(index, 'label', e.target.value)} style={{ ...inputStyle, marginBottom: 0, flex: 2 }} />
                            <input type="text" placeholder="Servings (e.g. 8-10)" value={size.servings} onChange={e => handleUpdateSize(index, 'servings', e.target.value)} style={{ ...inputStyle, marginBottom: 0, flex: 2 }} />
                            <input type="text" placeholder="Price (₹)" value={size.priceModifier === 0 ? '' : size.priceModifier} onChange={e => handleUpdateSize(index, 'priceModifier', Number(e.target.value.replace(/[^0-9.-]+/g,"")))} style={{ ...inputStyle, marginBottom: 0, flex: 1 }} />
                            <button type="button" onClick={() => handleRemoveSize(index)} style={{ background: '#ff4444', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer' }}>Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddSize} style={{ background: '#eee', padding: '8px 15px', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', marginTop: '5px' }}>+ Add Size Option</button>
                </div>

                <div style={sectionStyle}>
                    <h4 style={{ marginBottom: '15px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>5. Customizations</h4>
                    <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', marginBottom: '15px' }}>
                        <label style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                            <input type="checkbox" checked={allowMessage} onChange={e => setAllowMessage(e.target.checked)} style={{ marginRight: '8px' }} />
                            Allow Custom Message on Cake
                        </label>
                        <label style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                            <input type="checkbox" checked={allowTopper} onChange={e => setAllowTopper(e.target.checked)} style={{ marginRight: '8px' }} />
                            Allow Topper Selection
                        </label>
                        <label style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                            <input type="checkbox" checked={allowPhotoUpload} onChange={e => setAllowPhotoUpload(e.target.checked)} style={{ marginRight: '8px' }} />
                            Allow Photo Upload
                        </label>
                    </div>
                    {allowTopper && (
                        <div>
                            <label style={labelStyle}>Topper Options (Comma separated)</label>
                            <input type="text" value={topperOptions} onChange={e => setTopperOptions(e.target.value)} placeholder="e.g. Chocolate ganache, Nuts (chopped)" style={inputStyle} />
                        </div>
                    )}
                </div>

                <div style={sectionStyle}>
                    <h4 style={{ marginBottom: '15px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>6. Delivery & Limits</h4>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <label style={labelStyle}>Max Quantity per Order</label>
                            <input type="number" value={maxQuantity} onChange={e => setMaxQuantity(Number(e.target.value))} min="1" style={inputStyle} />
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <label style={labelStyle}>Est. Delivery Fee (₹)</label>
                            <input type="number" value={deliveryFee} onChange={e => setDeliveryFee(Number(e.target.value))} min="0" style={inputStyle} />
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <label style={labelStyle}>Lead Time (Hours)</label>
                            <input type="number" value={leadTimeHours} onChange={e => setLeadTimeHours(Number(e.target.value))} min="0" style={inputStyle} />
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '15px', marginTop: '20px', paddingBottom: '30px' }}>
                    <button type="submit" disabled={loading} style={{ background: '#ff7a7a', color: '#fff', padding: '12px 30px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
                        {loading ? 'Saving...' : 'Save Product'}
                    </button>
                    <button type="button" onClick={onClose} style={{ background: '#eee', color: '#333', padding: '12px 30px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
