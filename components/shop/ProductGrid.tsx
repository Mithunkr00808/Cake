"use client";

import React, { useCallback, useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

import { useCart } from '@/context/CartContext';
import Skeleton from '@/components/common/Skeleton';

import { Product } from '@/lib/db/products';

const sortOptions = [
    { value: 'popularity', label: 'Sort by popularity' },
    { value: 'rating', label: 'Sort by average rating' },
    { value: 'date', label: 'Sort by newness' },
    { value: 'price', label: 'Sort by price: low to high' },
    { value: 'price-desc', label: 'Sort by price: high to low' }
];

interface ProductGridProps {
    initialProducts?: Product[];
}

const ProductGrid = ({ initialProducts = [] }: ProductGridProps) => {
    const { addToCart } = useCart();
    const [products, setProducts] = useState<Product[]>(initialProducts);
    
    // Custom dropdown state
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [sortBy, setSortBy] = useState('popularity');
    const sortRef = useRef<HTMLDivElement>(null);

    // Update products if initialProducts change (e.g. navigation)
    useEffect(() => {
        setProducts(initialProducts);
    }, [initialProducts]);

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

    return (
        <div className="our-shop">
            <div className="shop-upper-box clearfix mb-[50px]">
                <div className="items-label float-left text-[#4b4342] text-[17px] py-[5px]">Showing all {products.length} results</div>
                <div className="orderby relative w-[270px] float-right" ref={sortRef}>
                    <div 
                        onClick={() => setIsSortOpen(!isSortOpen)}
                        className={`w-full bg-[#f2f2f2] text-[#4b4342] text-[14px] h-[44px] px-5 cursor-pointer flex items-center justify-between border ${isSortOpen ? 'border-[#aaa]' : 'border-[#e5e5e5]'}`}
                    >
                        <span className="leading-[42px]">{sortOptions.find(opt => opt.value === sortBy)?.label}</span>
                        <i className="fa fa-angle-down text-[#4b4342] text-[14px] opacity-80"></i>
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
                {products.length === 0 ? (
                    <div className="col-12 text-center py-5">
                        <p>No products found. Please seed the database.</p>
                    </div>
                ) : products.map((product) => (
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
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
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
                                        <span key={i} className={`fa fa-star ${i < Math.floor(product.rating) ? '' : 'light'}`}></span>
                                    ))}
                                </div>
                                <div className="price">
                                    {product.oldPrice && <del>{product.oldPrice}</del>} ₹{product.price.toFixed(2)}
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
