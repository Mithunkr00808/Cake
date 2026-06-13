import React from 'react';
import { Metadata } from 'next';
import PageTitle from '@/components/common/PageTitle';
import PolicyPageContent from '@/components/common/PolicyPageContent';

export const metadata: Metadata = {
    title: 'Privacy Policy | Bellaria',
    description: 'Privacy Policy of Bellaria Cake Shop'
};

const PrivacyPolicy = () => {
    return (
        <div className="page-wrapper">
             <PageTitle 
                title="Privacy Policy"
                breadcrumb={[
                    { label: 'Home', href: '/' },
                    { label: 'Privacy Policy' }
                ]}
                backgroundImage="/assets/images/background/about-title-bg.png"
            />
            <PolicyPageContent policyType="privacyPolicyText" />
        </div>
    );
};

export default PrivacyPolicy;
