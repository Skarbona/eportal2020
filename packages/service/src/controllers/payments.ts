import { NextFunction, Request, Response } from 'express';

import HttpError from '../models/http-error';
import { stripe } from '../startup/app';
import { ONE_DAY_ACCESS, ONE_MONTH_ACCESS, PORTAL_ADRESS } from '../constants/envs';
import { getOrCreateCustomer } from '../utils/getOrCreateCustomer';
import { LanguageApp } from '../models/languages';
import { logControllerError } from '../utils/error-logs';

export const createStripeCheckoutSession = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const url = PORTAL_ADRESS;
  const { plan } = req.body;
  const { userId } = req.userData;

  try {
    const user = await getOrCreateCustomer(userId);

    const isOneMonthPlan = plan === '1 month';
    const isOneDayPlan = plan === '1 day';

    const data = isOneMonthPlan
      ? { metadata: { plan } }
      : {
          payment_intent_data: {
            metadata: { plan: ONE_DAY_ACCESS },
          },
        };

    if (!isOneDayPlan && !isOneMonthPlan) throw new Error('Wrong Plan');
    const session = await stripe.checkout.sessions.create({
      ...data,
      customer: user.id,
      mode: isOneMonthPlan ? 'subscription' : 'payment',
      line_items: [
        {
          price: isOneMonthPlan ? ONE_MONTH_ACCESS : ONE_DAY_ACCESS,
          quantity: 1,
        },
      ],
      success_url:
        LanguageApp === 'en'
          ? `${url}/payment-success?session_id={CHECKOUT_SESSION_ID}`
          : `${url}/sukces-platnosci?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: LanguageApp === 'en' ? `${url}/no-payment` : `${url}/brak-platnosci`,
    });
    res.json(session);
  } catch (e) {
    logControllerError('createStripeCheckoutSession', e);
    return next(new HttpError('Something went wrong: ' + e, 500));
  }
};

export const getUserTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const { userId } = req.userData;

  try {
    const user = await getOrCreateCustomer(userId);
    const payments = await stripe.paymentIntents.list({ customer: user.id });

    res.status(201).json({ payments });
  } catch (e) {
    logControllerError('getUserTransactions', e);
    return next(new HttpError('Something went wrong, could not retrieve balance list' + e, 500));
  }
};

export const cancelSubscription = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const { userId } = req.userData;

  try {
    const user = await getOrCreateCustomer(userId);
    const subscriptionList = await stripe.subscriptions.list({ customer: user.id });
    const subscriptionId = subscriptionList.data[0]?.id;
    const subscription = await stripe.subscriptions.del(subscriptionId);

    res.json(subscription);
  } catch (e) {
    logControllerError('cancelSubscription', e);
    return next(new HttpError('Something went wrong, could not cancel the subscription' + e, 500));
  }
};
