import Stripe from 'stripe';
import User from '../models/user';
import { stripe } from '../startup/app';

export const getOrCreateCustomer = async (
  userId: string,
  params?: Stripe.CustomerCreateParams,
): Promise<Stripe.Response<Stripe.Customer>> => {
  const user = await User.findById(userId);

  const { stripeCustomerId, email } = user;

  // If missing customerID, create it
  if (!stripeCustomerId) {
    // CREATE new customer
    const customer = await stripe.customers.create({
      email,
      metadata: {
        userId,
      },
      ...params,
    });
    user.stripeCustomerId = customer.id;
    await user.save();
    return customer;
  } else {
    return (await stripe.customers.retrieve(stripeCustomerId)) as Stripe.Response<Stripe.Customer>;
  }
};
