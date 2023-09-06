import { PaymentsEnum } from './enum';
import { NetworkError } from '../../models/alerts';

interface ActionInterface {
  type: PaymentsEnum;
}

export interface FetchCheckoutSessionIdFail extends ActionInterface {
  type: PaymentsEnum.FetchCheckoutSessionIdFail;
  data: {
    error: NetworkError;
  };
}

export interface FetchCheckoutSessionIdStart extends ActionInterface {
  type: PaymentsEnum.FetchCheckoutSessionIdStart;
}

export interface FetchCheckoutSessionIdSuccess extends ActionInterface {
  type: PaymentsEnum.FetchCheckoutSessionIdSuccess;
}

export interface FetchUserTransactionsFail extends ActionInterface {
  type: PaymentsEnum.FetchUserTransactionsFail;
  data: {
    error: NetworkError;
  };
}

export interface FetchUserTransactionsStart extends ActionInterface {
  type: PaymentsEnum.FetchUserTransactionsStart;
}

export interface FetchUserTransactionsSuccess extends ActionInterface {
  type: PaymentsEnum.FetchUserTransactionsSuccess;
}

export interface CancelUserSubscriptionFail extends ActionInterface {
  type: PaymentsEnum.CancelUserSubscriptionFail;
  data: {
    error: NetworkError;
  };
}

export interface CancelUserSubscriptionStart extends ActionInterface {
  type: PaymentsEnum.CancelUserSubscriptionStart;
}

export interface CancelUserSubscriptionSuccess extends ActionInterface {
  type: PaymentsEnum.CancelUserSubscriptionSuccess;
}

export type PaymentsActions =
  | CancelUserSubscriptionFail
  | CancelUserSubscriptionStart
  | CancelUserSubscriptionSuccess
  | FetchCheckoutSessionIdSuccess
  | FetchCheckoutSessionIdFail
  | FetchCheckoutSessionIdStart
  | FetchUserTransactionsSuccess
  | FetchUserTransactionsFail
  | FetchUserTransactionsStart;
