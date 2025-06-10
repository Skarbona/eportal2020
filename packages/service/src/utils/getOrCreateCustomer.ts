import Stripe from 'stripe';
import User from '../models/user';
import { stripe } from '../startup/app';

export const getOrCreateCustomer = async (
  userId: string,
  params?: Stripe.CustomerCreateParams,
): Promise<Stripe.Response<Stripe.Customer>> => {
  console.error('getOrCreateCustomer called for userId:', userId);
  const user = await User.findById(userId);
  console.error('getOrCreateCustomer found user:', user);

  const { stripeCustomerId, email } = user;

  // If missing customerID, create it
  if (!stripeCustomerId) {
    // CREATE new customer
    console.warn('No stripeCustomerId, creating new Stripe customer for email:', email);
    const customer = await stripe.customers.create({
      email,
      metadata: {
        userId,
      },
      ...params,
    });
    user.stripeCustomerId = customer.id;
    await user.save();
    console.warn('Created new Stripe customer:', customer.id);
    return customer;
  } else {
    console.warn('stripeCustomerId exists, retrieving Stripe customer:', stripeCustomerId);
    return (await stripe.customers.retrieve(stripeCustomerId)) as Stripe.Response<Stripe.Customer>;
  }
};
