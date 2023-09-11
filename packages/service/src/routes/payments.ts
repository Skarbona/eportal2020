import { Router } from 'express';

import * as controllers from '../controllers/payments';
import { authMiddleware } from '../middlewares/auth';
import * as validate from '../validation/payments';
import checkValidation from '../middlewares/check-validation';

const router = Router();

router.use(authMiddleware);

router.delete(
  '/subscriptions',
  validate.cancelSubscription,
  checkValidation,
  controllers.cancelSubscription,
);

router.post(
  '/subscriptions',
  validate.createStripeCheckoutSession,
  checkValidation,
  controllers.createStripeCheckoutSession,
);

router.get(
  '/transactions',
  validate.getUserTransactions,
  checkValidation,
  controllers.getUserTransactions,
);

export default router;
