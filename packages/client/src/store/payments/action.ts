import { ActionCreator } from 'redux';

import * as I from './action.interface';
import { PaymentsEnum } from './enum';

export const fetchCheckoutSessionIdFail: ActionCreator<I.FetchCheckoutSessionIdFail> = (error) => ({
  type: PaymentsEnum.FetchCheckoutSessionIdFail,
  data: {
    error,
  },
});

export const fetchCheckoutSessionIdSuccess: ActionCreator<
  I.FetchCheckoutSessionIdSuccess
> = () => ({
  type: PaymentsEnum.FetchCheckoutSessionIdSuccess,
});

export const fetchCheckoutSessionIdStart: ActionCreator<I.FetchCheckoutSessionIdStart> = () => ({
  type: PaymentsEnum.FetchCheckoutSessionIdStart,
});

export const fetchUserTransactionsFail: ActionCreator<I.FetchUserTransactionsFail> = (error) => ({
  type: PaymentsEnum.FetchUserTransactionsFail,
  data: {
    error,
  },
});

export const fetchUserTransactionsSuccess: ActionCreator<I.FetchUserTransactionsSuccess> = () => ({
  type: PaymentsEnum.FetchUserTransactionsSuccess,
});

export const fetchUserTransactionsStart: ActionCreator<I.FetchUserTransactionsStart> = () => ({
  type: PaymentsEnum.FetchUserTransactionsStart,
});

export const cancelUserSubscriptionFail: ActionCreator<I.CancelUserSubscriptionFail> = (error) => ({
  type: PaymentsEnum.CancelUserSubscriptionFail,
  data: {
    error,
  },
});

export const cancelUserSubscriptionSuccess: ActionCreator<
  I.CancelUserSubscriptionSuccess
> = () => ({
  type: PaymentsEnum.CancelUserSubscriptionSuccess,
});

export const cancelUserSubscriptionStart: ActionCreator<I.CancelUserSubscriptionStart> = () => ({
  type: PaymentsEnum.CancelUserSubscriptionStart,
});
