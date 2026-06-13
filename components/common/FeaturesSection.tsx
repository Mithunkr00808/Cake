import React from 'react';
import Link from 'next/link';

export interface FeatureBlock {
    title: string;
    description: string;
    iconSvg: React.ReactNode;
    iconClass?: string;
}

interface FeaturesSectionProps {
    title?: string;
    description?: string;
    backgroundImage?: string;
    features: FeatureBlock[];
    extraClass?: string;
    buttonText?: string;
    buttonLink?: string;
    lightTitle?: boolean;
}

const FeaturesSection = ({
    title,
    description,
    backgroundImage = "/assets/images/background/features-bg.png",
    features,
    extraClass = "",
    buttonText,
    buttonLink,
    lightTitle = false
}: FeaturesSectionProps) => {
    return (
        <section className={`features-section ${extraClass}`}>
            <div className="shape_wrapper shape_one">
                <div className="shape_inner shape_two" style={{ backgroundImage: `url(${backgroundImage})` }}>
                    <div className="overlay"></div>
                </div>
            </div>

            <div className="auto-container">
                {title && (
                    <div className={`sec-title text-center ${lightTitle ? 'light' : ''}`}>
                        <h2>{title}</h2>
                        {description && <div className="text" dangerouslySetInnerHTML={{ __html: description }}></div>}
                    </div>
                )}
                
                <div className="row">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-block col-lg-3 col-md-6 col-sm-12">
                            <div className="inner-box">
                                <div className="icon-box">
                                    <div>
                                        {feature.iconSvg}
                                    </div>
                                    {feature.iconClass && <div className={`icon ${feature.iconClass}`}></div>}
                                </div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {buttonText && buttonLink && (
                    <div className="btn-box text-center">
                        <Link href={buttonLink} className="theme-btn btn-style-two large"><span></span>{buttonText}<span></span></Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturesSection;
