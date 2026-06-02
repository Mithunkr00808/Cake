"use client";

import React, { useState } from 'react';
import { Product, addProduct, updateProduct } from '@/lib/db/products';
import { CldUploadWidget } from 'next-cloudinary';
import toast from 'react-hot-toast';

interface ProductFormProps {
    product?: Product;
    onClose: () => void;
    onSuccess: () => void;
}

export default function ProductForm({ product, onClose, onSuccess }: ProductFormProps) {
    const [name, setName] = useState(product?.name || '');
    const [price, setPrice] = useState(product?.price || 0);
    const [oldPrice, setOldPrice] = useState(product?.oldPrice || '');
    const [rating, setRating] = useState(product?.rating || 5);
    const [images, setImages] = useState<string[]>(product?.images || (product?.image ? [product.image] : []));
    const [sale, setSale] = useState(product?.sale || false);
    const [description, setDescription] = useState(product?.description || '');
    const [category, setCategory] = useState(product?.category || '');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (images.length === 0) {
            toast.error('Please upload at least one image.');
            return;
        }

        setLoading(true);
        const productData = {
            name,
            price: Number(price),
            oldPrice,
            rating: Number(rating),
            image: images[0],
            images,
            sale,
            description,
            category
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
                        <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} required style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>
                    
                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                        <label style={{ fontWeight: 'bold' }}>Old Price (Optional)</label>
                        <input type="text" value={oldPrice} onChange={e => setOldPrice(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>
                    
                    <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                        <label style={{ fontWeight: 'bold' }}>Category</label>
                        <input type="text" value={category} onChange={e => setCategory(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
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
                    
                    <div className="col-lg-12 col-md-12 col-sm-12 form-group" style={{ border: '1px dashed #ccc', padding: '20px', borderRadius: '4px' }}>
                        <label style={{ fontWeight: 'bold' }}>Product Images</label><br/>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
                            {images.map((img, index) => (
                                <div key={index} style={{ position: 'relative', width: '100px', height: '100px' }}>
                                    <img src={img} alt={`Preview ${index}`} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }} />
                                    <div 
                                        role="button"
                                        onClick={() => setImages(images.filter((_, i) => i !== index))}
                                        style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'red', color: 'white', borderRadius: '50%', width: '24px', height: '24px', minWidth: '24px', minHeight: '24px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}
                                    >
                                        ×
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <CldUploadWidget 
                            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ml_default"}
                            options={{ multiple: true }}
                            onSuccess={(result: any) => {
                                setImages(prev => [...prev, result.info.secure_url]);
                            }}
                        >
                            {({ open }) => {
                                return (
                                    <button type="button" onClick={() => open()} className="theme-btn btn-style-three" style={{ display: 'block', padding: '10px 20px' }}>
                                        Upload Images
                                    </button>
                                );
                            }}
                        </CldUploadWidget>
                        <small style={{ color: '#888', display: 'block', marginTop: '8px' }}>Requires an unsigned upload preset named "{process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ml_default"}" in Cloudinary.</small>
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
