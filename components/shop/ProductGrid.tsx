"use client";

import React, { useCallback, useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

import { useCart } from '@/context/CartContext';

import { Product } from '@/lib/db/products';

const sortOptions = [
    { value: 'popularity', label: 'Sort by our most loved' },
    { value: 'rating', label: 'Sort by highest rated' },
    { value: 'date', label: 'Sort by newest creations' },
    { value: 'price', label: 'Sort by price: low to high' },
    { value: 'price-desc', label: 'Sort by price: high to low' }
];

interface ProductGridProps {
    initialProducts?: Product[];
}

const ProductGrid = ({ initialProducts = [] }: ProductGridProps) => {
    const { addToCart } = useCart();
    const prefersReducedMotion = useReducedMotion();
    const searchParams = useSearchParams();
    const categoryFilter = searchParams.get('category');
    
    // Custom dropdown state
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [sortBy, setSortBy] = useState('popularity');
    const sortRef = useRef<HTMLDivElement>(null);

    // Handle outside click for dropdown
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
                setIsSortOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleAddToCart = useCallback((e: React.MouseEvent, product: Product) => {
        e.preventDefault();
        addToCart({
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            image: product.image
        });
        toast.success(`${product.name} added to cart!`);
    }, [addToCart]);

    // Derive sorted products directly from initialProducts
    const sortedProducts = useMemo(() => {
        const productsCopy = [...initialProducts];
        
        switch (sortBy) {
            case 'price':
                return productsCopy.sort((a, b) => a.price - b.price);
            case 'price-desc':
                return productsCopy.sort((a, b) => b.price - a.price);
            case 'rating':
                return productsCopy.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            case 'date':
                // Assuming newer products have higher IDs or createdAt if they existed
                // For now, reverse the default order as a proxy for newness
                return productsCopy.reverse();
            case 'popularity':
            default:
                return productsCopy; // Assume default order is by popularity
        }
    }, [initialProducts, sortBy]);

    return (
        <div className="our-shop">
            <div className="shop-upper-box clearfix mb-[50px]">
                <div className="items-label float-left text-[#4b4342] text-[17px] py-[5px]">
                    Displaying {sortedProducts.length} artisanal selections {categoryFilter ? `for "${categoryFilter}"` : ''}
                    {categoryFilter && (
                        <Link href="/shop" className="ml-3 text-[14px] text-[#ff7a7a] hover:underline whitespace-nowrap">
                            (Clear filter)
                        </Link>
                    )}
                </div>
                <div className="orderby relative w-[280px] float-right" ref={sortRef}>
                    <div 
                        onClick={() => setIsSortOpen(!isSortOpen)}
                        className={`w-full bg-[#f2f2f2] text-[#4b4342] text-[14px] h-[44px] px-4 cursor-pointer flex items-center justify-between border ${isSortOpen ? 'border-[#aaa]' : 'border-[#e5e5e5]'}`}
                    >
                        <span className="truncate flex-1 text-left pr-2">{sortOptions.find(opt => opt.value === sortBy)?.label}</span>
                        <i className="fa fa-angle-down text-[#4b4342] text-[14px] opacity-80 flex-shrink-0"></i>
                    </div>
                    
                    {isSortOpen && (
                        <div className="absolute top-[43px] left-0 z-50 w-full bg-white border border-[#aaa] shadow-md">
                            <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
                                {sortOptions.map((option, index) => (
                                    <div 
                                        key={option.value}
                                        onClick={() => { setSortBy(option.value); setIsSortOpen(false); }}
                                        className={`px-5 py-2 text-[14px] cursor-pointer bg-white hover:bg-gray-100 ${sortBy === option.value ? 'text-[#5fcac7]' : 'text-[#4b4342]'} ${index !== 0 ? 'border-t border-[#eee]' : ''}`}
                                    >
                                        {option.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="row clearfix">
                {sortedProducts.length === 0 ? (
                    <div className="col-12 text-center py-5">
                        <p>Our pastry chefs are currently curating this collection. Please check back soon for fresh, artisanal offerings.</p>
                    </div>
                ) : sortedProducts.map((product) => (
                    <article className="shop-item col-lg-4 col-md-6 col-sm-12" key={product.id}>
                        <div className="inner-box">
                            <div className="image-box">

                                {product.sale && (
                                    <div className="sale" style={{ position: 'absolute', top: '15px', right: '15px', zIndex: 1, backgroundColor: '#ff7a7a', color: 'white', padding: '5px 15px', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>Sale!</div>
                                )}
                                <figure className="image" style={{ position: 'relative', width: '100%', height: '300px' }}>
                                    <Link href={`/shop/${product.slug || product.id}`}>
                                        <Image
                                            src={product.image || (product.images && product.images[0]) || ''}
                                            alt={product.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </Link>
                                </figure>
                                <div className="btn-box">
                                    <motion.button 
                                        whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                                        whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                                        style={{ background: 'none', border: 'none', width: '100%' }}
                                    >
                                        <Link href={`/shop/${product.slug || product.id}`}>View</Link>
                                    </motion.button>
                                </div>
                            </div>
                            <div className="lower-content">
                                <h4 className="name"><Link href={`/shop/${product.slug || product.id}`}>{product.name}</Link></h4>
                                <div className="rating">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={`fa fa-star ${i < Math.floor(product.rating || 0) ? '' : 'light'}`}></span>
                                    ))}
                                </div>
                                <div className="price">
                                    {product.oldPrice && <del>{product.oldPrice}</del>} ₹{(product.price || 0).toFixed(2)}
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;
