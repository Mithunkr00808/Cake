"use client";

import React, { useState } from 'react';
import { getProducts, deleteProduct, Product } from '@/lib/db/products';
import { auth } from '@/lib/firebase';
import ProductForm from '../ProductForm';
import Skeleton from '@/components/common/Skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export default function InventoryClient({ initialProducts }: { initialProducts: Product[] }) {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);

    const [productToDelete, setProductToDelete] = useState<Product | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const loadProducts = async () => {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
    };

    const handleDeleteClick = (product: Product) => {
        setProductToDelete(product);
    };

    const confirmDelete = async () => {
        if (!productToDelete) return;
        setIsDeleting(true);
        const idToDelete = productToDelete.id;
        const imagesToDelete = productToDelete.images || (productToDelete.image ? [productToDelete.image] : []);
        
        try {
            // Optimistic update: remove instantly
            setProducts(prev => prev.filter(p => p.id !== idToDelete));
            setProductToDelete(null); // Close modal
            
            // Delete product from database
            await deleteProduct(idToDelete);
            
            // Silently delete images from Cloudinary via secure server API
            if (imagesToDelete.length > 0) {
                const token = await auth.currentUser?.getIdToken();
                fetch('/api/cloudinary/delete', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ urls: imagesToDelete })
                }).catch(err => console.error("Background image cleanup failed:", err));
            }
            
            toast.success('Product deleted successfully');
        } catch (error) {
            console.error('Failed to delete:', error);
            toast.error('Failed to delete product');
            // Revert on failure
            loadProducts();
        } finally {
            setIsDeleting(false);
        }
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleAdd = () => {
        setEditingProduct(undefined);
        setShowForm(true);
    };

    return (
        <div className="cart-section" style={{ padding: 0 }}>
            <div className="sec-title">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2>Inventory Management</h2>
                    {!showForm && (
                        <button 
                            onClick={handleAdd} 
                            style={{
                                background: '#ff7a7a',
                                color: '#fff',
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '15px'
                            }}
                        >
                            Add New Product
                        </button>
                    )}
                </div>
            </div>

            {showForm ? (
                <ProductForm 
                    product={editingProduct} 
                    onClose={() => setShowForm(false)} 
                    onSuccess={() => {
                        setShowForm(false);
                        loadProducts();
                    }} 
                />
            ) : (
                <div className="cart-outer">
                    <div className="table-outer">
                        <table className="cart-table" style={{ width: '100%', minWidth: '700px' }}>
                            <thead className="cart-header">
                                <tr>
                                    <th className="prod-column">Image</th>
                                    <th className="prod-column">Name</th>
                                    <th className="price">Price</th>
                                    <th>Category</th>
                                    <th style={{ width: '200px' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    [1, 2, 3].map(n => (
                                        <tr key={n}>
                                            <td className="prod-column"><Skeleton type="thumbnail" width="80px" height="80px" style={{ margin: '0 auto' }} /></td>
                                            <td className="prod-column"><Skeleton type="text" width="150px" height="24px" /></td>
                                            <td className="price"><Skeleton type="text" width="80px" height="24px" /></td>
                                            <td><Skeleton type="text" width="100px" height="24px" /></td>
                                            <td><Skeleton type="button" width="120px" height="36px" /></td>
                                        </tr>
                                    ))
                                ) : products.length === 0 ? (
                                    <tr><td colSpan={5} style={{ padding: '30px', textAlign: 'center', color: '#888' }}>No products found. Add one!</td></tr>
                                ) : (
                                    <AnimatePresence mode="popLayout">
                                        {products.map(product => (
                                            <motion.tr 
                                                key={product.id}
                                                layout
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <td className="prod-column">
                                                    <div className="column-box">
                                                        <figure className="prod-thumb"><img src={product.image} alt={product.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} /></figure>
                                                    </div>
                                                </td>
                                                <td className="prod-column">
                                                    <h4 className="prod-title">{product.name}</h4>
                                                </td>
                                                <td className="price">₹{product.price.toFixed(2)}</td>
                                                <td>{product.category || '-'}</td>
                                                <td>
                                                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                                        <button onClick={() => handleEdit(product)} style={{ padding: '8px 15px', background: '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}>Edit</button>
                                                        <button onClick={() => handleDeleteClick(product)} style={{ padding: '8px 15px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}>Delete</button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Custom Confirm Modal */}
            <AnimatePresence>
                {productToDelete && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                            backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 9999,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            backdropFilter: 'blur(3px)'
                        }}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            style={{
                                background: '#fff', padding: '30px', borderRadius: '16px',
                                maxWidth: '400px', width: '90%', boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                            }}
                        >
                            <h3 style={{ margin: '0 0 12px 0', fontSize: '22px', fontWeight: 700, color: '#333' }}>Delete Product</h3>
                            <p style={{ color: '#666', marginBottom: '25px', lineHeight: 1.6, fontSize: '15px' }}>
                                Are you sure you want to delete <strong style={{color: '#333'}}>{productToDelete.name}</strong>? This action cannot be undone.
                            </p>
                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                                <button 
                                    onClick={() => setProductToDelete(null)}
                                    disabled={isDeleting}
                                    style={{
                                        padding: '10px 20px', background: '#f5f5f5', border: 'none',
                                        borderRadius: '8px', cursor: 'pointer', fontWeight: 600, color: '#555',
                                        transition: 'background 0.2s'
                                    }}
                                    onMouseOver={e => e.currentTarget.style.background = '#e5e5e5'}
                                    onMouseOut={e => e.currentTarget.style.background = '#f5f5f5'}
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={confirmDelete}
                                    disabled={isDeleting}
                                    style={{
                                        padding: '10px 24px', background: '#dc3545', border: 'none',
                                        borderRadius: '8px', cursor: 'pointer', fontWeight: 600, color: '#fff',
                                        opacity: isDeleting ? 0.7 : 1, transition: 'background 0.2s'
                                    }}
                                    onMouseOver={e => e.currentTarget.style.background = '#c82333'}
                                    onMouseOut={e => e.currentTarget.style.background = '#dc3545'}
                                >
                                    {isDeleting ? 'Deleting...' : 'Delete Permanently'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
