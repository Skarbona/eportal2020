import { useStripe, useElements } from '@stripe/react-stripe-js';
import React, { FC, useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { InfoOutlined, StarRateSharp } from '@material-ui/icons';

import { SubmitEvent } from '../../../models/typescript-events';
import { useReduxDispatch } from '../../../store/helpers';
import { getSessionId } from '../../../store/payments/thunks/getSessionId';

export const PaymentForm: FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useReduxDispatch();
  const { t } = useTranslation();

  const [subscription, setSubscription] = useState<'1 day' | '1 month'>('1 month');
  const handleSubmit = async (event: SubmitEvent) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { id: sessionId } = await dispatch(getSessionId(subscription));

    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });

    if (error) {
      // TODO: DISPLAY ERROR MESSAGE
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="premium-features">
        <StarRateSharp color="primary" />
        <Typography>{t('Unlimited amount of tasks per level')} </Typography>
      </div>
      <div className="premium-features">
        <StarRateSharp color="primary" /> <Typography>{t('Time range type selection')}</Typography>
      </div>
      <div className="premium-features">
        <StarRateSharp color="primary" /> <Typography>{t('Time selection in game')}</Typography>
      </div>
      <div className="plan-selection">
        <Button
          size="large"
          variant={subscription === '1 day' ? 'contained' : 'text'}
          color="primary"
          onClick={() => setSubscription('1 day')}
        >
          {t('1 day')}
        </Button>
        <Button
          size="large"
          variant={subscription === '1 month' ? 'contained' : 'text'}
          color="primary"
          onClick={() => setSubscription('1 month')}
        >
          {t('1 month')}
        </Button>
      </div>
      <div className="info-section">
        <InfoOutlined color="primary" />
        <Typography color="primary">
          {subscription === '1 month' ? t('1 month subscription') : t('1 day access only')}
        </Typography>
      </div>
      <div className="stripe-btn">
        <Button
          type="submit"
          size="large"
          variant="outlined"
          color="primary"
          disabled={!stripe || !elements}
        >
          <span className="stripe-text">
            {t('Checkout with')}
            <img src="./media/stripe/stripe.png" alt="stripe payment" />
          </span>
        </Button>
      </div>
      <div className="payment-methods">
        <img src="./media/stripe/cards.png" alt="google-pay" />
        <img src="./media/stripe/google-pay.png" alt="google-pay" />
      </div>
    </form>
  );
};
