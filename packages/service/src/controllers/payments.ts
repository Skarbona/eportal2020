import { NextFunction, Request, Response } from 'express';

import HttpError from '../models/http-error';
import { stripe } from '../startup/app';
import { ONE_DAY_ACCESS, ONE_MONTH_ACCESS, PORTAL_ADRESS } from '../constants/envs';
import { getOrCreateCustomer } from '../utils/getOrCreateCustomer';

export const createStripeCheckoutSession = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const url = PORTAL_ADRESS;
  const { plan } = req.body;
  const { userId } = req.userData;

  const user = await getOrCreateCustomer(userId);

  const isOneMonthPlan = plan === '1 month';

  const data = isOneMonthPlan
    ? { metadata: { plan } }
    : {
        payment_intent_data: {
          metadata: { plan: ONE_DAY_ACCESS },
        },
      };

  try {
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
      success_url: `${url}/sukces-platnosci?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${url}/brak-platnosci`,
    });

    res.json(session);
  } catch (e) {
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
    return next(new HttpError('Something went wrong, could not cancel the subscription' + e, 500));
  }
};
