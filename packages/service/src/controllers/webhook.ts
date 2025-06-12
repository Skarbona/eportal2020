import { NextFunction, Request, Response } from 'express';

import HttpError from '../models/http-error';
import { stripe } from '../startup/app';
import { EMAIL_USER, WEBHOOK_SECRET } from '../constants/envs';
import User from '../models/user';
import { DataObject } from '../models/webhook';
import Stripe from 'stripe';
import createEmailTransporter from '../utils/create-transport';
import {
  account1montActivation,
  account24hActivation,
  checkoutSessionSuccess,
  failedPayment,
  subscriptionRemoval,
  successfullyPayment,
} from '../templetes/emails/subscriptions';
import { LanguageApp } from '../models/languages';
import { logControllerError } from '../utils/error-logs';

export const listenStripe = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  let data;
  let eventType;
  const webhookSecret = WEBHOOK_SECRET;

  if (webhookSecret) {
    let event;
    try {
      const signature = req.headers['stripe-signature'];
      event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
      data = event.data;
      eventType = event.type;
    } catch (e) {
      logControllerError('listenStripe webhookSecret', e);
      return next(new HttpError('Webhook signature verification failed.' + e, 401));
    }
  } else {
    return next(new HttpError('Webhook signature verification failed. webhookSecret empty', 401));
  }

  let user;
  const typedData = data as DataObject;
  try {
    const stripeCostumer = (await stripe.customers.retrieve(
      typedData.object.customer,
    )) as Stripe.Customer;

    user = await User.findById(stripeCostumer.metadata.userId);

    if (!user) {
      throw new Error();
    }
  } catch (e) {
    logControllerError('listenStripe user', e);
    return next(new HttpError('User does not exist: ' + e, 404));
  }

  switch (eventType) {
    // Sent when a customer clicks the Pay or Subscribe button in Checkout, informing you of a new purchase.
    case 'checkout.session.completed':
      {
        try {
          const transporter = createEmailTransporter();
          const content = checkoutSessionSuccess(LanguageApp);
          await transporter.sendMail({
            from: `<${EMAIL_USER}>`,
            to: user.email,
            ...content,
          });
        } catch (e) {
          logControllerError('listenStripe checkout.session.completed', e);
          return next(new HttpError('Something went wrong: ' + e, 500));
        }
      }
      break;
    // Sent each billing interval when a payment succeeds.
    case 'invoice.paid':
      {
        try {
          if (
            typedData.object.billing_reason === 'subscription_cycle' ||
            typedData.object.billing_reason === 'subscription_create'
          ) {
            const plan = typedData.object.lines.data[0].plan.id;
            const date = new Date();
            const backupDate = new Date(date.setMonth(date.getMonth() + 1));
            const currentPeriodEnd = typedData.object.lines.data[0].period.end;
            user.activePlan = plan;
            user.currentPeriodEnd = currentPeriodEnd
              ? new Date(currentPeriodEnd * 1000)
              : backupDate;
            await user.save();
            const transporter = createEmailTransporter();
            let dateObj;
            if (currentPeriodEnd) {
              dateObj = new Date(currentPeriodEnd * 1000);
            } else {
              dateObj = backupDate;
            }
            const formattedDate = dateObj.toLocaleDateString(LanguageApp, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
            const content = account1montActivation(LanguageApp, formattedDate);
            await transporter.sendMail({
              from: `<${EMAIL_USER}>`,
              to: user.email,
              ...content,
            });

            // Send notification email to admin for subscription creation
            if (typedData.object.billing_reason === 'subscription_create') {
              await transporter.sendMail({
                from: `<${EMAIL_USER}>`,
                to: EMAIL_USER,
                subject: '1 month account activation',
                text: `User: ${user.email} activated 1 month account`,
              });
            }
          } else {
            const transporter = createEmailTransporter();
            const content = successfullyPayment(LanguageApp);
            await transporter.sendMail({
              from: `<${EMAIL_USER}>`,
              to: user.email,
              ...content,
            });
          }
        } catch (e) {
          logControllerError('listenStripe invoice.paid', e);
          return next(new HttpError('Something went wrong: ' + e, 500));
        }
      }
      break;
    // Sent each billing interval if there is an issue with your customer’s payment method.
    case 'invoice.payment_failed':
      {
        try {
          const invoiceObj = typedData.object;
          const paymentIntentId = invoiceObj.payment_intent;
          let paymentIntent;
          if (paymentIntentId) {
            paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
          }

          if (
            paymentIntent &&
            (paymentIntent.status === 'requires_action' || paymentIntent.status === 'processing')
          ) {
            // Do not send an email, as the customer may still confirm the payment
            break;
          }

          // If the paymentIntent is canceled or requires_payment_method, then the payment has actually failed
          const transporter = createEmailTransporter();
          const content = failedPayment(LanguageApp);
          await transporter.sendMail({
            from: `<${EMAIL_USER}>`,
            to: user.email,
            ...content,
          });
        } catch (e) {
          logControllerError('listenStripe invoice.payment_failed', e);
          return next(new HttpError('Something went wrong: ' + e, 500));
        }
      }
      break;
    case 'payment_intent.succeeded':
      {
        try {
          const plan = typedData.object?.metadata.plan;
          const created = typedData.object?.created;

          // it one time payment for 24h period
          if (plan) {
            const twentyFourHours = 60 * 60 * 24 * 1000;
            const currentPeriodEnd = new Date(new Date(created * 1000).getTime() + twentyFourHours);
            user.activePlan = plan;
            user.currentPeriodEnd = currentPeriodEnd;
            await user.save();
            const transporter = createEmailTransporter();
            const formattedDate = currentPeriodEnd.toLocaleDateString(LanguageApp, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
            const content = account24hActivation(LanguageApp, formattedDate);
            await transporter.sendMail({
              from: `<${EMAIL_USER}>`,
              to: user.email,
              ...content,
            });
            await transporter.sendMail({
              from: `<${EMAIL_USER}>`,
              to: EMAIL_USER,
              subject: '24h account activation',
              text: `User: ${user.email} activated 24h account`,
            });
          }
        } catch (e) {
          logControllerError('listenStripe payment_intent.succeeded', e);
          const transporter = createEmailTransporter();
          await transporter.sendMail({
            from: `<${EMAIL_USER}>`,
            to: EMAIL_USER,
            subject: 'Issue with 24h account activation.',
            text: `User: ${user.email} has issue with account activation: ${e}.`,
          });
          return next(new HttpError('Something went wrong: ' + e, 500));
        }
      }
      break;
    case 'customer.subscription.deleted':
      {
        try {
          user.activePlan = '';
          await user.save();
          const transporter = createEmailTransporter();
          const content = subscriptionRemoval(LanguageApp);
          await transporter.sendMail({
            from: `<${EMAIL_USER}>`,
            to: user.email,
            ...content,
          });

          await transporter.sendMail({
            from: `<${EMAIL_USER}>`,
            to: EMAIL_USER,
            subject: 'Subscription was removed',
            text: `User: ${user.email} removed his subscription`,
          });
        } catch (e) {
          logControllerError('listenStripe customer.subscription.deleted', e);
          const transporter = createEmailTransporter();
          await transporter.sendMail({
            from: `<${EMAIL_USER}>`,
            to: EMAIL_USER,
            subject: 'User cannot remove his subscription.',
            text: `User: ${user.email} cannot remove his subscription ${e}.`,
          });
          return next(new HttpError('Something went wrong: ' + e, 500));
        }
      }
      break;
    default: {
      // Do Nothing. Checks logs in the stripe
    }
  }

  res.sendStatus(200);
};
