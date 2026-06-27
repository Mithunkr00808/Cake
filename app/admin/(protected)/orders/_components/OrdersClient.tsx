"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { getOrders, Order, OrderStatus } from '@/lib/db/orders';
import { updateOrderStatusServer } from '../actions';
import toast from 'react-hot-toast';

const STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'processing', label: 'Processing' },
    { value: 'out_for_delivery', label: 'Out for Delivery' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
];

const STATUS_COLORS: Record<OrderStatus, { bg: string; color: string }> = {
    pending:          { bg: '#FFF8E1', color: '#F57F17' },
    confirmed:        { bg: '#E3F2FD', color: '#1565C0' },
    processing:       { bg: '#FFF3E0', color: '#E65100' },
    out_for_delivery: { bg: '#F3E5F5', color: '#6A1B9A' },
    delivered:        { bg: '#E8F5E9', color: '#1B5E20' },
    cancelled:        { bg: '#FFEBEE', color: '#B71C1C' },
};

function StatusBadge({ status }: { status: OrderStatus }) {
    const style = STATUS_COLORS[status] || { bg: '#eee', color: '#333' };
    return (
        <span style={{
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.5px',
            background: style.bg,
            color: style.color,
            textTransform: 'capitalize',
        }}>
            {STATUS_OPTIONS.find(s => s.value === status)?.label || status}
        </span>
    );
}

export default function OrdersClient({ initialOrders }: { initialOrders: Order[] }) {
    const [orders, setOrders] = useState<Order[]>(initialOrders);
    const [loading, setLoading] = useState(false);
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        const data = await getOrders();
        setOrders(data);
        setLoading(false);
    }, []);

    const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
        setUpdatingId(orderId);
        try {
            const { success, error } = await updateOrderStatusServer(orderId, newStatus);
            if (success) {
                setOrders(prev =>
                    prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o)
                );
                toast.success('Order status updated and email sent!');
            } else {
                toast.error(error || 'Failed to update status.');
            }
        } catch (err) {
            console.error("Action error:", err);
            const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
            toast.error(errorMessage);
        } finally {
            setUpdatingId(null);
        }
    };

    const renderDate = (ts: unknown) => {
        if (!ts) return '—';
        let dateObj;
        if (typeof ts === 'string') {
            dateObj = new Date(ts);
        } else if (typeof ts === 'object' && ts !== null && 'toDate' in ts && typeof (ts as any).toDate === 'function') {
            dateObj = (ts as any).toDate();
        } else if (typeof ts === 'object' && ts !== null && '_seconds' in ts) {
            dateObj = new Date((ts as any)._seconds * 1000);
        } else {
            return '—';
        }
        const dateStr = dateObj.toLocaleDateString('en-IN', {
            day: '2-digit', month: 'short', year: 'numeric'
        });
        const timeStr = dateObj.toLocaleTimeString('en-IN', {
            hour: '2-digit', minute: '2-digit'
        });
        return (
            <>
                <div style={{ color: '#444', fontWeight: 500 }}>{dateStr}</div>
                <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>{timeStr}</div>
            </>
        );
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <h2 style={{ margin: 0, fontSize: '22px', color: '#222' }}>Orders</h2>
                    <p style={{ color: '#888', margin: '4px 0 0', fontSize: '14px' }}>
                        {orders.length} order{orders.length !== 1 ? 's' : ''} total
                    </p>
                </div>
                <button
                    onClick={fetchOrders}
                    style={{
                        padding: '8px 18px', borderRadius: '6px', border: '1px solid #ddd',
                        background: '#fff', cursor: 'pointer', fontSize: '13px', color: '#555',
                    }}
                >
                    ↻ Refresh
                </button>
            </div>

            {loading ? (
                <div style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                        {[1, 2, 3, 4, 5].map(i => <div key={i} style={{ flex: 1, height: '40px', background: '#f5f5f5', borderRadius: '4px' }} />)}
                    </div>
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} style={{ height: '60px', background: '#fafafa', borderRadius: '4px', marginBottom: '10px' }} />
                    ))}
                </div>
            ) : orders.length === 0 ? (
                <div style={{
                    textAlign: 'center', padding: '60px', background: '#fafafa',
                    borderRadius: '10px', border: '1px dashed #ddd', color: '#aaa',
                }}>
                    <div style={{ fontSize: '40px', marginBottom: '12px' }}>📦</div>
                    <p>No orders yet.</p>
                </div>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                        <thead>
                            <tr style={{ background: '#f9f9f9', borderBottom: '2px solid #eee' }}>
                                {['Order ID', 'Customer', 'Items', 'Total', 'Payment', 'Date', 'Status'].map(h => (
                                    <th key={h} style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600, color: '#555', whiteSpace: 'nowrap' }}>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <React.Fragment key={order.id}>
                                    <tr
                                        style={{
                                            borderBottom: '1px solid #f0f0f0',
                                            background: expandedId === order.id ? '#FAFFFE' : '#fff',
                                            transition: 'background 0.2s',
                                        }}
                                    >
                                        {/* Order ID */}
                                        <td style={{ padding: '14px', fontFamily: 'monospace', fontSize: '13px', color: '#888', whiteSpace: 'nowrap' }}>
                                            <button
                                                onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                                                style={{
                                                    background: 'none', border: 'none', cursor: 'pointer',
                                                    marginRight: '8px', fontSize: '16px', fontWeight: 'bold', color: '#555',
                                                    padding: 0,
                                                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                                    transition: 'transform 0.2s',
                                                    transform: expandedId === order.id ? 'rotate(90deg)' : 'rotate(0deg)'
                                                }}
                                                title="View details"
                                            >
                                                &gt;
                                            </button>
                                            #{order.id.slice(0, 8)}...
                                        </td>

                                        {/* Customer */}
                                        <td style={{ padding: '14px', minWidth: '200px' }}>
                                            <div style={{ fontWeight: 600, color: '#222' }}>
                                                {order.customer.firstName} {order.customer.lastName}
                                            </div>
                                            <div style={{ fontSize: '12px', color: '#888' }}>{order.customer.phone}</div>
                                            {order.customer.email && (
                                                <div style={{ fontSize: '12px', color: '#aaa', wordBreak: 'break-all' }}>{order.customer.email}</div>
                                            )}
                                        </td>

                                        {/* Items count */}
                                        <td style={{ padding: '14px' }}>
                                            <span style={{ color: '#555' }}>
                                                {order.items.reduce((a, i) => a + i.quantity, 0)} item(s)
                                            </span>
                                        </td>

                                        {/* Total */}
                                        <td style={{ padding: '14px', fontWeight: 600, color: '#222' }}>
                                            ₹{order.total.toFixed(2)}
                                        </td>

                                        {/* Payment */}
                                        <td style={{ padding: '14px', color: '#666', fontSize: '12px' }}>
                                            {order.paymentMethod}
                                        </td>

                                        {/* Date */}
                                        <td style={{ padding: '14px', fontSize: '12px', whiteSpace: 'nowrap' }}>
                                            {renderDate(order.createdAt)}
                                        </td>

                                        {/* Status & Action */}
                                        <td style={{ padding: '14px', minWidth: '160px' }}>
                                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                                <select
                                                    value={order.status}
                                                    onChange={e => handleStatusChange(order.id, e.target.value as OrderStatus)}
                                                    disabled={updatingId === order.id}
                                                    style={{
                                                        padding: '4px 28px 4px 12px', borderRadius: '20px', 
                                                        border: `1px solid ${STATUS_COLORS[order.status]?.color || '#ddd'}`,
                                                        fontSize: '12px', 
                                                        backgroundColor: STATUS_COLORS[order.status]?.bg || '#fff', 
                                                        color: STATUS_COLORS[order.status]?.color || '#333',
                                                        fontWeight: 600, letterSpacing: '0.5px',
                                                        cursor: 'pointer', outline: 'none',
                                                        opacity: updatingId === order.id ? 0.6 : 1,
                                                        appearance: 'none',
                                                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='${encodeURIComponent(STATUS_COLORS[order.status]?.color || '#333')}' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                                                        backgroundRepeat: 'no-repeat',
                                                        backgroundPosition: 'right 10px center',
                                                    }}
                                                >
                                                    {STATUS_OPTIONS.map(s => (
                                                        <option key={s.value} value={s.value}>{s.label}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Expanded Details Row */}
                                    {expandedId === order.id && (
                                        <tr style={{ background: '#F0FDF8' }}>
                                            <td colSpan={7} style={{ padding: '20px 24px' }}>
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                                    {/* Order Items */}
                                                    <div>
                                                        <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#333' }}>🛒 Items Ordered</h4>
                                                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                                                            <thead>
                                                                <tr style={{ borderBottom: '1px solid #ddd' }}>
                                                                    <th style={{ textAlign: 'left', padding: '6px 8px', color: '#888', fontWeight: 500 }}>Product</th>
                                                                    <th style={{ textAlign: 'center', padding: '6px 8px', color: '#888', fontWeight: 500 }}>Qty</th>
                                                                    <th style={{ textAlign: 'right', padding: '6px 8px', color: '#888', fontWeight: 500 }}>Price</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {order.items.map((item, idx) => (
                                                                    <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                                                                        <td style={{ padding: '8px' }}>
                                                                            <div style={{ fontWeight: 500, color: '#333' }}>{item.name}</div>
                                                                            {item.options && (
                                                                                <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                                                                                    {item.options.size && <div><span style={{ color: '#999' }}>Size:</span> {item.options.size.label}</div>}
                                                                                    {item.options.flavor && <div><span style={{ color: '#999' }}>Flavor:</span> {item.options.flavor}</div>}
                                                                                    {item.options.topper && <div><span style={{ color: '#999' }}>Topper:</span> {item.options.topper}</div>}
                                                                                    {item.options.message && <div><span style={{ color: '#999' }}>Message:</span> {item.options.message}</div>}
                                                                                </div>
                                                                            )}
                                                                        </td>
                                                                        <td style={{ padding: '8px', textAlign: 'center', verticalAlign: 'top' }}>×{item.quantity}</td>
                                                                        <td style={{ padding: '8px', textAlign: 'right', fontWeight: 600, verticalAlign: 'top' }}>
                                                                            ₹{(item.price * item.quantity).toFixed(2)}
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                                <tr>
                                                                    <td colSpan={2} style={{ padding: '10px 8px', fontWeight: 700, textAlign: 'right', color: '#222' }}>Total</td>
                                                                    <td style={{ padding: '10px 8px', textAlign: 'right', fontWeight: 700, color: '#222' }}>
                                                                        ₹{order.total.toFixed(2)}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                    {/* Customer Info */}
                                                    <div>
                                                        <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#333' }}>📍 Delivery Address</h4>
                                                        <div style={{ fontSize: '13px', color: '#555', lineHeight: '1.8' }}>
                                                            <div><strong>{order.customer.firstName} {order.customer.lastName}</strong></div>
                                                            <div>{order.customer.address}</div>
                                                            {order.customer.apartment && <div>{order.customer.apartment}</div>}
                                                            <div>{order.customer.city}, {order.customer.state} - {order.customer.pincode}</div>
                                                            <div>{order.customer.country}</div>
                                                            <div style={{ marginTop: '8px' }}>📞 {order.customer.phone}</div>
                                                            {order.customer.email && <div>✉️ {order.customer.email}</div>}
                                                        </div>

                                                        {order.notes && (
                                                            <div style={{ marginTop: '16px' }}>
                                                                <h4 style={{ marginBottom: '8px', fontSize: '14px', color: '#333' }}>📝 Notes</h4>
                                                                <p style={{ fontSize: '13px', color: '#666', fontStyle: 'italic' }}>{order.notes}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
