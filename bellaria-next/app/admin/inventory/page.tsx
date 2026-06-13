"use client";

import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct, Product } from '@/lib/db/products';
import ProductForm from './ProductForm';
import Skeleton from '@/components/common/Skeleton';

export default function InventoryPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);

    const loadProducts = async () => {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(id);
            loadProducts();
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
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', minWidth: '700px' }}>
                        <thead>
                            <tr style={{ background: '#f9f9f9', borderBottom: '2px solid #eee' }}>
                                <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600, color: '#555' }}>Image</th>
                                <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600, color: '#555' }}>Name</th>
                                <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600, color: '#555' }}>Price</th>
                                <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600, color: '#555' }}>Category</th>
                                <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600, color: '#555', width: '200px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                [1, 2, 3].map(n => (
                                    <tr key={n} style={{ borderBottom: '1px solid #f0f0f0', background: '#fff' }}>
                                        <td style={{ padding: '14px' }}><Skeleton type="thumbnail" width="60px" height="60px" /></td>
                                        <td style={{ padding: '14px' }}><Skeleton type="text" width="150px" height="24px" /></td>
                                        <td style={{ padding: '14px' }}><Skeleton type="text" width="80px" height="24px" /></td>
                                        <td style={{ padding: '14px' }}><Skeleton type="text" width="100px" height="24px" /></td>
                                        <td style={{ padding: '14px' }}><Skeleton type="button" width="120px" height="36px" /></td>
                                    </tr>
                                ))
                            ) : products.length === 0 ? (
                                <tr><td colSpan={5} style={{ padding: '30px', textAlign: 'center', color: '#888' }}>No products found. Add one!</td></tr>
                            ) : (
                                products.map(product => (
                                    <tr key={product.id} style={{ borderBottom: '1px solid #f0f0f0', background: '#fff' }}>
                                        <td style={{ padding: '14px' }}>
                                            <img src={product.image} alt={product.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px' }} />
                                        </td>
                                        <td style={{ padding: '14px' }}>
                                            <div style={{ fontWeight: 600, color: '#222' }}>{product.name}</div>
                                        </td>
                                        <td style={{ padding: '14px', fontWeight: 600, color: '#222' }}>₹{product.price.toFixed(2)}</td>
                                        <td style={{ padding: '14px', color: '#555' }}>{product.category || '-'}</td>
                                        <td style={{ padding: '14px' }}>
                                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                                <button onClick={() => handleEdit(product)} style={{ padding: '6px 12px', background: '#f5f5f5', color: '#333', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}>Edit</button>
                                                <button onClick={() => handleDelete(product.id)} style={{ padding: '6px 12px', background: '#fff', color: '#dc3545', border: '1px solid #dc3545', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
