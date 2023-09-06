import { PaymentsEnum } from './enum';
import { paymentsInitialState } from './initialState';
import { PaymentsStateInterface } from './initialState.interface';
import { AlertTypes } from '../../models/alerts';
import { PaymentsActions } from './action.interface';

const paymentsReducer = (
  state = paymentsInitialState,
  action: PaymentsActions,
): PaymentsStateInterface => {
  switch (action.type) {
    case PaymentsEnum.FetchUserTransactionsStart:
    case PaymentsEnum.FetchCheckoutSessionIdStart: {
      return {
        ...state,
        loading: true,
      };
    }
    case PaymentsEnum.FetchUserTransactionsSuccess:
    case PaymentsEnum.FetchCheckoutSessionIdSuccess: {
      return {
        ...state,
        loading: false,
      };
    }
    case PaymentsEnum.FetchUserTransactionsFail:
    case PaymentsEnum.FetchCheckoutSessionIdFail: {
      const { error } = action.data;
      let alertType = AlertTypes.ServerError;
      const errorStatus = error.response?.status;
      if (!errorStatus || errorStatus >= 500) {
        alertType = AlertTypes.ServerError;
      } else if (errorStatus === 401) {
        alertType = AlertTypes.UnAuthorized;
      } else {
        alertType = AlertTypes.SomethingWentWrong;
      }
      return {
        ...state,
        loading: false,
        error,
        alertType,
      };
    }

    default:
      return state;
  }
};

export default paymentsReducer;
