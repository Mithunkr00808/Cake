"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of a Cart Item
export interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

// Define the Context State
interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
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
        const savedCart = localStorage.getItem('bellaria_cart');
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
            localStorage.setItem('bellaria_cart', JSON.stringify(cartItems));
        }
    }, [cartItems, isLoaded]);

    // Add Item to Cart
    const addToCart = (product: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);
            const quantityToAdd = product.quantity || 1;

            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantityToAdd }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity: quantityToAdd }];
        });
    };

    // Remove Item from Cart
    const removeFromCart = (id: number) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    // Update Item Quantity
    const updateQuantity = (id: number, quantity: number) => {
        if (quantity < 1) return; // Prevent 0 or negative
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    // Clear Cart
    const clearCart = () => {
        setCartItems([]);
    };

    // Derived State
    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartTotal,
            cartCount
        }}>
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
