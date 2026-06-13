import React from 'react';
import { Metadata } from 'next';
import PageTitle from '@/components/common/PageTitle';
import PolicyPageContent from '@/components/common/PolicyPageContent';

export const metadata: Metadata = {
    title: 'Refund Policy | Bellaria',
    description: 'Refund Policy of Bellaria Cake Shop'
};

const RefundPolicy = () => {
    return (
        <div className="page-wrapper">
             <PageTitle 
                title="Refund Policy"
                breadcrumb={[
                    { label: 'Home', href: '/' },
                    { label: 'Refund Policy' }
                ]}
                backgroundImage="/assets/images/background/about-title-bg.png"
            />
            <PolicyPageContent policyType="refundPolicyText" />
        </div>
    );
};

export default RefundPolicy;
