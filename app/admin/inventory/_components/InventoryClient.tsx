"use client";

import React, { useState } from 'react';
import { getProducts, deleteProduct, Product } from '@/lib/db/products';
import ProductForm from '../ProductForm';
import Skeleton from '@/components/common/Skeleton';

export default function InventoryClient({ initialProducts }: { initialProducts: Product[] }) {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);

    const loadProducts = async () => {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
    };

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
                                    products.map(product => (
                                        <tr key={product.id}>
                                            <td className="prod-column">
                                                <div className="column-box">
                                                    <figure className="prod-thumb"><img src={product.image} alt={product.name} style={{ width: '80px', height: '80px', objectFit: 'cover' }} /></figure>
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
                                                    <button onClick={() => handleDelete(product.id)} style={{ padding: '8px 15px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}>Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
