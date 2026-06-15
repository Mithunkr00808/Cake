"use client";

import React, { useState, useEffect } from 'react';
import { Product, addProduct, updateProduct } from '@/lib/db/products';
import { getSettings } from '@/lib/db/settings';
import { revalidateShopCache } from '../../actions';
import toast from 'react-hot-toast';

function createSlug(text: string) {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

interface ProductFormProps {
    product?: Product;
    onClose: () => void;
    onSuccess: () => void;
}

export default function ProductForm({ product, onClose, onSuccess }: ProductFormProps) {
    const [name, setName] = useState(product?.name || '');
    const [price, setPrice] = useState<string | number>(product?.price !== undefined ? product.price : '');
    const [oldPrice, setOldPrice] = useState<string | number>(product?.oldPrice || '');
    const [rating, setRating] = useState(product?.rating || 5);
    const [imageUploads, setImageUploads] = useState<{id: string, previewUrl: string, isUploading: boolean, secureUrl?: string}[]>(
        (product?.images || (product?.image ? [product.image] : [])).map((url, i) => ({
            id: `existing-${i}`,
            previewUrl: url,
            isUploading: false,
            secureUrl: url
        }))
    );
    const [sale, setSale] = useState(product?.sale || false);
    const [description, setDescription] = useState(product?.description || '');
    const [category, setCategory] = useState(product?.category || '');
    const [loading, setLoading] = useState(false);
    const [dynamicCategories, setDynamicCategories] = useState<string[]>([
        "Birthday Cakes", "Wedding Cakes", "Custom Cakes", "Cupcakes", "Pastries", "Brownies", "Vegan Cakes", "Gluten-Free Cakes", "Other"
    ]);

    // Advanced Options State
    const [shortDescription, setShortDescription] = useState(product?.shortDescription || '');
    const [fullDescription, setFullDescription] = useState(product?.fullDescription || '');
    const [sizes, setSizes] = useState<{id: string, label: string, servings: string, priceModifier: number}[]>(
        product?.sizes || []
    );
    const [flavors, setFlavors] = useState(product?.flavors?.join(', ') || '');
    const [dietaryTags, setDietaryTags] = useState(product?.dietaryTags?.join(', ') || '');
    
    // Customization State
    const [allowMessage, setAllowMessage] = useState(product?.customization?.allowMessage || false);
    const [allowTopper, setAllowTopper] = useState(product?.customization?.allowTopper || false);
    const [topperOptions, setTopperOptions] = useState(product?.customization?.topperOptions?.join(', ') || '');
    const [allowPhotoUpload, setAllowPhotoUpload] = useState(product?.customization?.allowPhotoUpload || false);
    
    // Limits and Delivery State
    const [maxQuantity, setMaxQuantity] = useState(product?.maxQuantity || 10);
    const [deliveryFee, setDeliveryFee] = useState(product?.deliveryConfig?.fee || 0);
    const [leadTimeHours, setLeadTimeHours] = useState(product?.deliveryConfig?.leadTimeHours || 24);

    const handleAddSize = () => {
        setSizes([...sizes, { id: Date.now().toString(), label: '', servings: '', priceModifier: 0 }]);
    };

    const handleUpdateSize = (index: number, field: string, value: string | number) => {
        const newSizes = [...sizes];
        newSizes[index] = { ...newSizes[index], [field]: value };
        setSizes(newSizes);
    };

    const handleRemoveSize = (index: number) => {
        setSizes(sizes.filter((_, i) => i !== index));
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const settings = await getSettings();
                if (settings?.categories && settings.categories.length > 0) {
                    setDynamicCategories(settings.categories);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;
        
        const files = Array.from(e.target.files);
        const newUploads = files.map(file => ({
            id: Math.random().toString(36).substring(7),
            previewUrl: URL.createObjectURL(file),
            isUploading: true,
            file
        }));

        setImageUploads(prev => [...prev, ...newUploads]);

        // Trigger background uploads
        newUploads.forEach(async (uploadItem) => {
            try {
                const formData = new FormData();
                formData.append('file', uploadItem.file as File);
                formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ml_default");

                const res = await fetch(
                    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dtnjy8o1m'}/image/upload`,
                    { method: 'POST', body: formData }
                );

                const data = await res.json();
                
                if (data.secure_url) {
                    setImageUploads(prev => prev.map(item => 
                        item.id === uploadItem.id 
                            ? { ...item, isUploading: false, secureUrl: data.secure_url } 
                            : item
                    ));
                } else {
                    toast.error('Failed to upload an image');
                    setImageUploads(prev => prev.filter(item => item.id !== uploadItem.id));
                }
            } catch (err) {
                console.error("Upload error:", err);
                toast.error('Failed to upload an image');
                setImageUploads(prev => prev.filter(item => item.id !== uploadItem.id));
            }
        });
        
        e.target.value = '';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (imageUploads.length === 0) {
            toast.error('Please upload at least one image.');
            return;
        }

        const isStillUploading = imageUploads.some(img => img.isUploading);
        if (isStillUploading) {
            toast.error('Please wait for images to finish uploading.');
            return;
        }

        if (Number(price) < 0) {
            toast.error('Price cannot be negative.');
            return;
        }

        const finalImages = imageUploads.map(img => img.secureUrl as string);

        setLoading(true);
        const productData = {
            name,
            price: Number(price),
            oldPrice: oldPrice ? String(oldPrice) : undefined,
            rating: Number(rating),
            image: finalImages[0],
            images: finalImages,
            sale,
            description,
            category,
            slug: createSlug(name),
            
            // Advanced fields
            fullDescription,
            shortDescription,
            sizes,
            flavors: flavors.split(',').map(f => f.trim()).filter(Boolean),
            dietaryTags: dietaryTags.split(',').map(t => t.trim()).filter(Boolean),
            maxQuantity,
            customization: {
                allowMessage,
                allowTopper,
                topperOptions: topperOptions.split(',').map(t => t.trim()).filter(Boolean),
                allowPhotoUpload
            },
            deliveryConfig: {
                fee: deliveryFee,
                leadTimeHours
            }
        };

        if (product?.id) {
            const success = await updateProduct(product.id, productData);
            if (success) {
                await revalidateShopCache();
                toast.success('Product updated!');
                onSuccess();
            } else {
                toast.error('Failed to update product.');
            }
        } else {
            const id = await addProduct(productData);
            if (id) {
                await revalidateShopCache();
                toast.success('Product added!');
                onSuccess();
            } else {
                toast.error('Failed to add product.');
            }
        }
        setLoading(false);
    };

    return (
        <div className="contact-form" style={{ marginTop: '20px' }}>
            <div className="sec-title">
                <h3>{product ? 'Edit Product' : 'Add New Product'}</h3>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="row clearfix">
                    <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                        <label style={{ fontWeight: 'bold' }}>Name</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>
                    
                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                        <label style={{ fontWeight: 'bold' }}>Price</label>
                        <input 
                            type="text" 
                            value={price} 
                            onChange={e => {
                                const val = e.target.value;
                                if (val === '' || /^\d*\.?\d*$/.test(val)) {
                                    setPrice(val);
                                }
                            }} 
                            required 
                            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} 
                        />
                    </div>
                    
                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                        <label style={{ fontWeight: 'bold' }}>Old Price (Optional)</label>
                        <input 
                            type="text" 
                            value={oldPrice} 
                            onChange={e => {
                                const val = e.target.value;
                                if (val === '' || /^\d*\.?\d*$/.test(val)) {
                                    setOldPrice(val);
                                }
                            }} 
                            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} 
                        />
                    </div>
                    
                    <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                        <label style={{ fontWeight: 'bold' }}>Category</label>
                        <select 
                            value={category} 
                            onChange={e => setCategory(e.target.value)} 
                            required
                            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', background: '#fff' }}
                        >
                            <option value="" disabled>Select a category</option>
                            {dynamicCategories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                        <label style={{ fontWeight: 'bold' }}>Description</label>
                        <textarea value={description} onChange={e => setDescription(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '100px' }}></textarea>
                    </div>
                    
                    <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                        <label style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                            <input type="checkbox" checked={sale} onChange={e => setSale(e.target.checked)} style={{ marginRight: '8px', width: 'auto', height: 'auto', display: 'inline-block' }} />
                            On Sale
                        </label>
                    </div>
                    
                    <div className="col-lg-12 col-md-12 col-sm-12 form-group" style={{ border: '1px dashed #ccc', padding: '20px', borderRadius: '4px', background: '#fafafa' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>Product Images</label>
                        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '5px' }}>
                            {imageUploads.map((img) => (
                                <div key={img.id} style={{ position: 'relative', width: '100px', height: '100px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #eee', background: '#fff' }}>
                                    <img src={img.previewUrl} alt={`Preview`} style={{ width: '100px', height: '100px', objectFit: 'cover', opacity: img.isUploading ? 0.6 : 1 }} />
                                    {img.isUploading && (
                                        <span style={{ fontSize: '11px', background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '2px 6px', borderRadius: '10px', position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>
                                            Uploading...
                                        </span>
                                    )}
                                    <div 
                                        role="button"
                                        onClick={() => setImageUploads(imageUploads.filter((item) => item.id !== img.id))}
                                        style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(0,0,0,0.5)', color: 'white', borderRadius: '50%', width: '22px', height: '22px', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}
                                    >
                                        &times;
                                    </div>
                                </div>
                            ))}
                            
                            <label style={{ width: '100px', height: '100px', border: '2px dashed #bbb', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: '#fff', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = '#f5f5f5'} onMouseOut={e => e.currentTarget.style.background = '#fff'}>
                                <span style={{ fontSize: '28px', color: '#888', lineHeight: 1 }}>+</span>
                                <span style={{ fontSize: '12px', color: '#888', fontWeight: 500, marginTop: '4px' }}>Browse</span>
                                <input type="file" multiple accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                            </label>
                        </div>
                    </div>

                    {/* Advanced Options UI */}
                    <div className="col-lg-12 col-md-12 col-sm-12 form-group" style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '4px', marginTop: '20px' }}>
                        <h4 style={{ marginBottom: '15px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>Detailed Description</h4>
                        <label style={{ fontWeight: 'bold' }}>Full Description / Ingredients / Allergens</label>
                        <textarea value={fullDescription} onChange={e => setFullDescription(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '150px' }} placeholder="Provide rich text description, ingredients, and allergen info here..."></textarea>
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12 form-group" style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '4px', marginTop: '20px' }}>
                        <h4 style={{ marginBottom: '15px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>Variations & Options</h4>
                        <div className="row">
                            <div className="col-lg-6 col-md-12">
                                <label style={{ fontWeight: 'bold' }}>Flavors / Fillings (Comma separated)</label>
                                <input type="text" value={flavors} onChange={e => setFlavors(e.target.value)} placeholder="e.g. Vanilla, Chocolate, Red Velvet" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                            </div>
                            <div className="col-lg-6 col-md-12">
                                <label style={{ fontWeight: 'bold' }}>Dietary Tags (Comma separated)</label>
                                <input type="text" value={dietaryTags} onChange={e => setDietaryTags(e.target.value)} placeholder="e.g. eggless, vegan, gluten_free" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                            </div>
                        </div>
                        
                        <label style={{ fontWeight: 'bold', marginTop: '15px' }}>Sizes & Weights</label>
                        {sizes.map((size, index) => (
                            <div key={size.id} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                                <input type="text" placeholder="Label (e.g. 1 Kg)" value={size.label} onChange={e => handleUpdateSize(index, 'label', e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', flex: 2 }} />
                                <input type="text" placeholder="Servings (e.g. 8-10)" value={size.servings} onChange={e => handleUpdateSize(index, 'servings', e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', flex: 2 }} />
                                <input type="number" placeholder="Price (₹)" value={size.priceModifier === 0 ? '' : size.priceModifier} onChange={e => handleUpdateSize(index, 'priceModifier', Number(e.target.value))} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', flex: 1 }} />
                                <button type="button" onClick={() => handleRemoveSize(index)} style={{ background: '#ff4444', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer' }}>Remove</button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddSize} style={{ background: '#eee', padding: '8px 15px', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', marginTop: '5px' }}>+ Add Size Option</button>
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12 form-group" style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '4px', marginTop: '20px' }}>
                        <h4 style={{ marginBottom: '15px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>Customizations</h4>
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
                            <div style={{ marginTop: '15px' }}>
                                <label style={{ fontWeight: 'bold' }}>Topper Options (Comma separated)</label>
                                <input type="text" value={topperOptions} onChange={e => setTopperOptions(e.target.value)} placeholder="e.g. Chocolate ganache, Nuts (chopped)" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                            </div>
                        )}
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12 form-group" style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '4px', marginTop: '20px' }}>
                        <h4 style={{ marginBottom: '15px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>Delivery & Limits</h4>
                        <div className="row">
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <label style={{ fontWeight: 'bold' }}>Max Quantity per Order</label>
                                <input type="number" value={maxQuantity} onChange={e => setMaxQuantity(Number(e.target.value))} min="1" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <label style={{ fontWeight: 'bold' }}>Est. Delivery Fee (₹)</label>
                                <input type="number" value={deliveryFee} onChange={e => setDeliveryFee(Number(e.target.value))} min="0" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <label style={{ fontWeight: 'bold' }}>Lead Time (Hours)</label>
                                <input type="number" value={leadTimeHours} onChange={e => setLeadTimeHours(Number(e.target.value))} min="0" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12 form-group" style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                        <button 
                            type="submit" 
                            disabled={loading} 
                            style={{
                                background: '#ff7a7a',
                                color: '#fff',
                                padding: '12px 30px',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '16px'
                            }}
                        >
                            {loading ? 'Saving...' : 'Save Product'}
                        </button>
                        <button 
                            type="button" 
                            onClick={onClose} 
                            style={{ 
                                background: '#eee', 
                                color: '#333', 
                                padding: '12px 30px',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '16px'
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
