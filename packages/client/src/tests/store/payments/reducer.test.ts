import { paymentsInitialState as initialState } from '../../../store/payments/initialState';
import paymentsReducer from '../../../store/payments/reducer';
import { PaymentsEnum } from '../../../store/payments/enum';
import * as I from '../../../store/payments/action.interface';
import { AlertTypes, NetworkError } from '../../../models/alerts';
import { PaymentsStateInterface } from '../../../store/payments/initialState.interface';

describe('Reducer: Payments', () => {
  let reducerState: PaymentsStateInterface;

  beforeEach(() => {
    reducerState = initialState;
  });

  it('should return initial state', () => {
    const state = paymentsReducer(initialState, {} as any);
    expect(state).toEqual(initialState);
  });

  it('should handle CancelUserSubscriptionStart', () => {
    const action: I.CancelUserSubscriptionStart = {
      type: PaymentsEnum.CancelUserSubscriptionStart,
    };
    const state = paymentsReducer(initialState, action);
    const expectedState: PaymentsStateInterface = {
      ...initialState,
      loading: true,
      alertType: null,
      error: null,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle CancelUserSubscriptionSuccess', () => {
    const action: I.CancelUserSubscriptionSuccess = {
      type: PaymentsEnum.CancelUserSubscriptionSuccess,
    };
    const state = paymentsReducer(initialState, action);
    const expectedState: PaymentsStateInterface = {
      ...initialState,
      loading: false,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle CancelUserSubscriptionFail', () => {
    const error = { response: { status: 422 } } as NetworkError;
    const action: I.CancelUserSubscriptionFail = {
      type: PaymentsEnum.CancelUserSubscriptionFail,
      data: {
        error,
      },
    };
    const state = paymentsReducer(initialState, action);
    const expectedState: PaymentsStateInterface = {
      ...initialState,
      loading: false,
      error,
      alertType: AlertTypes.SomethingWentWrong,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle FetchCheckoutSessionIdStart', () => {
    const action: I.FetchCheckoutSessionIdStart = {
      type: PaymentsEnum.FetchCheckoutSessionIdStart,
    };
    const state = paymentsReducer(initialState, action);
    const expectedState: PaymentsStateInterface = {
      ...initialState,
      loading: true,
      alertType: null,
      error: null,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle FetchCheckoutSessionIdSuccess', () => {
    const action: I.FetchCheckoutSessionIdSuccess = {
      type: PaymentsEnum.FetchCheckoutSessionIdSuccess,
    };
    const state = paymentsReducer(initialState, action);
    const expectedState: PaymentsStateInterface = {
      ...initialState,
      loading: false,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle FetchCheckoutSessionIdFail', () => {
    const error = { response: { status: 422 } } as NetworkError;
    const action: I.FetchCheckoutSessionIdFail = {
      type: PaymentsEnum.FetchCheckoutSessionIdFail,
      data: {
        error,
      },
    };
    const state = paymentsReducer(initialState, action);
    const expectedState: PaymentsStateInterface = {
      ...initialState,
      loading: false,
      error,
      alertType: AlertTypes.SomethingWentWrong,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle FetchUserTransactionsStart', () => {
    const action: I.FetchUserTransactionsStart = {
      type: PaymentsEnum.FetchUserTransactionsStart,
    };
    const state = paymentsReducer(initialState, action);
    const expectedState: PaymentsStateInterface = {
      ...initialState,
      loading: true,
      alertType: null,
      error: null,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle FetchUserTransactionsSuccess', () => {
    const action: I.FetchUserTransactionsSuccess = {
      type: PaymentsEnum.FetchUserTransactionsSuccess,
    };
    const state = paymentsReducer(initialState, action);
    const expectedState: PaymentsStateInterface = {
      ...initialState,
      loading: false,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle FetchUserTransactionsFail', () => {
    const error = { response: { status: 422 } } as NetworkError;
    const action: I.FetchUserTransactionsFail = {
      type: PaymentsEnum.FetchUserTransactionsFail,
      data: {
        error,
      },
    };
    const state = paymentsReducer(initialState, action);
    const expectedState: PaymentsStateInterface = {
      ...initialState,
      loading: false,
      error,
      alertType: AlertTypes.SomethingWentWrong,
    };
    expect(state).toEqual(expectedState);
  });
});
