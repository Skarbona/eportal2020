import { checkSchema } from 'express-validator';

const plan = {
  optional: { options: { nullable: true } },
  isString: {
    errorMessage: 'Please provide valid plan string',
  },
};

export const cancelSubscription = checkSchema({});

export const createStripeCheckoutSession = checkSchema({ plan });

export const getUserTransactions = checkSchema({});
