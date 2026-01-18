'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const Preloader = () => {
    const [loading, setLoading] = useState(true);
    const [fading, setFading] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setLoading(true);
        setFading(false);

        // Start fading out after 600ms
        const fadeTimer = setTimeout(() => {
            setFading(true);
        }, 600);

        // Remove from DOM after 1000ms (giving 400ms for fade out)
        const removeTimer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        };
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
