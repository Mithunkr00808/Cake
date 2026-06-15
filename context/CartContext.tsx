"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from 'react';

export interface CartItemOptions {
    size?: { label: string, priceModifier: number };
    flavor?: string;
    message?: string;
    topper?: string;
    photoUrl?: string;
}

export interface CartItem {
    id: string; // Unique cart item ID (composite if it has options)
    productId?: string | number; // Base product ID
    slug?: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    options?: CartItemOptions;
}

// Define the Context State
interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Omit<CartItem, 'quantity' | 'id'> & { id?: string, quantity?: number }) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider Component
export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from LocalStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('sliceofcake_cart');
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart data", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to LocalStorage whenever cart changes (only after initial load)
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('sliceofcake_cart', JSON.stringify(cartItems));
        }
    }, [cartItems, isLoaded]);

    // Add Item to Cart (memoized to prevent re-creation on every render)
    const addToCart = useCallback((product: Omit<CartItem, 'quantity' | 'id'> & { id?: string, quantity?: number }) => {
        setCartItems((prevItems) => {
            // Generate a unique ID based on product ID and selected options
            const baseId = product.id || product.productId;
            const optionsHash = product.options ? JSON.stringify(product.options) : '';
            const cartItemId = optionsHash ? `${baseId}-${optionsHash}` : String(baseId);

            const existingItemIndex = prevItems.findIndex((item) => item.id === cartItemId);
            const quantityToAdd = product.quantity || 1;

            if (existingItemIndex >= 0) {
                const newItems = [...prevItems];
                newItems[existingItemIndex] = {
                    ...newItems[existingItemIndex],
                    quantity: newItems[existingItemIndex].quantity + quantityToAdd
                };
                return newItems;
            }
            return [...prevItems, { ...product, id: cartItemId, productId: baseId, quantity: quantityToAdd }];
        });
    }, []);

    // Remove Item from Cart (memoized)
    const removeFromCart = useCallback((id: string) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }, []);

    // Update Item Quantity (memoized)
    const updateQuantity = useCallback((id: string, quantity: number) => {
        if (quantity < 1) return; // Prevent 0 or negative
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    }, []);

    // Clear Cart (memoized)
    const clearCart = useCallback(() => {
        setCartItems([]);
    }, []);

    // Derived State (memoized to prevent recalculation on every render)
    const cartTotal = useMemo(() => 
        cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
        [cartItems]
    );
    
    const cartCount = useMemo(() => 
        cartItems.reduce((count, item) => count + item.quantity, 0),
        [cartItems]
    );

    // Memoize context value to prevent unnecessary re-renders of consumers
    const contextValue = useMemo(() => ({
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount
    }), [cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount]);

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

// Custom Hook
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
