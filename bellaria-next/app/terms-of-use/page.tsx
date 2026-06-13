import React from 'react';
import { Metadata } from 'next';
import PageTitle from '@/components/common/PageTitle';
import PolicyPageContent from '@/components/common/PolicyPageContent';

export const metadata: Metadata = {
    title: 'Terms of Use | Bellaria',
    description: 'Terms of Use of Bellaria Cake Shop'
};

const TermsOfUse = () => {
    return (
        <div className="page-wrapper">
             <PageTitle 
                title="Terms of Use"
                breadcrumb={[
                    { label: 'Home', href: '/' },
                    { label: 'Terms of Use' }
                ]}
                backgroundImage="/assets/images/background/about-title-bg.png"
            />
            <PolicyPageContent policyType="termsOfUseText" />
        </div>
    );
};

export default TermsOfUse;
