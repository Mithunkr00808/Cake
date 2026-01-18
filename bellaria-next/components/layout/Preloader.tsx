'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const Preloader = () => {
    const [loading, setLoading] = useState(true);
    const [fading, setFading] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleLoad = () => {
            setFading(true);
            setTimeout(() => setLoading(false), 500); // Small buffer for fade animation
        };

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
        }

        return () => window.removeEventListener('load', handleLoad);
    }, [pathname]);

    if (!loading) return null;

    return (
        <div className={`preloader ${fading ? 'fade-out' : ''}`}>
            <div className="loader_overlay"></div>
            <div className="loader_cogs">
                <div className="loader_cogs__top">
                    <div className="top_part"></div>
                    <div className="top_part"></div>
                    <div className="top_part"></div>
                    <div className="top_hole"></div>
                </div>
                <div className="loader_cogs__left">
                    <div className="left_part"></div>
                    <div className="left_part"></div>
                    <div className="left_part"></div>
                    <div className="left_hole"></div>
                </div>
                <div className="loader_cogs__bottom">
                    <div className="bottom_part"></div>
                    <div className="bottom_part"></div>
                    <div className="bottom_part"></div>
                    <div className="bottom_hole"></div>
                </div>
            </div>
        </div>
    );
};

export default Preloader;
