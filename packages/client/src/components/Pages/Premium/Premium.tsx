import React, { FC } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useTranslation } from 'react-i18next';

import './Premium.scss';
import PageContainer from '../../Shared/PageElements/PageContainer/PageContainer';
import PageHeading from '../../Shared/PageElements/PageHeading/PageHeading';
import { PaymentForm } from './PaymentForm';
import { STRIPE_CLIENT_ID } from '../../../constants/envs';
import { usePremiumUser } from '../../../hooks/usePremiumUser';
import { PremiumUserSection } from './PremiumUserSection';

const stripePromise = loadStripe(STRIPE_CLIENT_ID);

export const Payment: FC = () => {
  const { t } = useTranslation();
  const { isPremium } = usePremiumUser();

  return (
    <>
      <PageHeading title={t('Premium')} className="single-page-heading" />
      <PageContainer
        className="single-page payment inputs-for-light-bg  premium-page"
        maxWidth="lg"
      >
        {!isPremium ? (
          <Elements stripe={stripePromise}>
            <PaymentForm />
          </Elements>
        ) : (
          <PremiumUserSection />
        )}
      </PageContainer>
    </>
  );
};
