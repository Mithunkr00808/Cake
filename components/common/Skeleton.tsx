import React from 'react';

interface SkeletonProps {
    type?: 'image' | 'title' | 'text' | 'button' | 'avatar' | 'thumbnail' | 'custom';
    width?: string | number;
    height?: string | number;
    className?: string;
    style?: React.CSSProperties;
}

const Skeleton: React.FC<SkeletonProps> = ({ 
    type = 'text', 
    width, 
    height,
    className = '',
    style = {}
}) => {
    // Base Tailwind classes for all skeletons. Using a light pink color to match the site theme.
    const baseClasses = 'animate-pulse bg-[#ffe4e8]';
    
    // Type-specific classes and styles
    let typeClasses = '';
    let defaultStyle: React.CSSProperties = {};

    switch (type) {
        case 'image':
            typeClasses = 'rounded-lg w-full';
            defaultStyle = { height: height || '250px' };
            break;
        case 'title':
            typeClasses = 'rounded w-3/4';
            defaultStyle = { height: height || '24px', marginBottom: '10px' };
            break;
        case 'text':
            typeClasses = 'rounded w-full';
            defaultStyle = { height: height || '16px', marginBottom: '8px' };
            break;
        case 'button':
            typeClasses = 'rounded-md w-32';
            defaultStyle = { height: height || '40px' };
            break;
        case 'avatar':
            typeClasses = 'rounded-full';
            defaultStyle = { width: width || '50px', height: height || '50px' };
            break;
        case 'thumbnail':
            typeClasses = 'rounded';
            defaultStyle = { width: width || '80px', height: height || '80px' };
            break;
        case 'custom':
            typeClasses = 'rounded';
            break;
        default:
            typeClasses = 'rounded w-full';
            defaultStyle = { height: height || '16px' };
    }

    // Override with explicit width/height if provided
    const finalStyle = {
        ...defaultStyle,
        ...style,
        ...(width ? { width } : {}),
        ...(height ? { height } : {})
    };

    return (
        <div 
            className={`${baseClasses} ${typeClasses} ${className}`} 
            style={finalStyle}
        />
    );
};

export default Skeleton;
