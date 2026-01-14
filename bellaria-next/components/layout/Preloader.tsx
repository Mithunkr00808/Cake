'use client';

import React, { useEffect, useState } from 'react';

const Preloader = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time or wait for window load event if possible, 
        // but in SPA/Next.js effective 'load' is quick. 
        // Emulating the legacy delay(200).fadeOut(500)
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800); // 200ms delay + some buffer

        return () => clearTimeout(timer);
    }, []);

    if (!loading) return null;

    return (
        <div className="preloader" style={{ display: loading ? 'block' : 'none' }}>
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
