import Link from 'next/link';
import React from 'react';

interface PageTitleProps {
    title: string;
    breadcrumb: {
        label: string;
        href?: string;
    }[];
    backgroundImage?: string;
}

const PageTitle = ({ title, breadcrumb, backgroundImage = "https://via.placeholder.com/1920x400" }: PageTitleProps) => {
    return (
        <section className="page-title" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="auto-container">
                <h1>{title}</h1>
                <ul className="page-breadcrumb">
                    {breadcrumb.map((item, index) => (
                        <li key={index}>
                            {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default PageTitle;
