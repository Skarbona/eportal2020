import * as I from '../../../store/payments/action.interface';
import { PaymentsEnum } from '../../../store/payments/enum';
import * as A from '../../../store/payments/action';
import { postsResponseMock } from '../../../mocks/responses';
import { GameStatus, Gender } from '../../../models/game-models';
import { GameEnum } from '../../../store/game/enum';

describe('Actions: Payments', () => {
  it('should create cancelUserSubscriptionStart action', () => {
    const expectedAction: I.CancelUserSubscriptionStart = {
      type: PaymentsEnum.CancelUserSubscriptionStart,
    };

    const action = A.cancelUserSubscriptionStart();
    expect(action).toEqual(expectedAction);
  });

  it('should create CancelUserSubscriptionSuccess action', () => {
    const expectedAction: I.CancelUserSubscriptionSuccess = {
      type: PaymentsEnum.CancelUserSubscriptionSuccess,
    };

    const action = A.cancelUserSubscriptionSuccess();
    expect(action).toEqual(expectedAction);
  });

  it('should create cancelUserSubscriptionFail action', () => {
    const error = new Error();
    const expectedAction: I.CancelUserSubscriptionFail = {
      type: PaymentsEnum.CancelUserSubscriptionFail,
      data: {
        error,
      },
    };
    const action = A.cancelUserSubscriptionFail(error);
    expect(action).toEqual(expectedAction);
  });

  it('should create fetchCheckoutSessionIdStart action', () => {
    const expectedAction: I.FetchCheckoutSessionIdStart = {
      type: PaymentsEnum.FetchCheckoutSessionIdStart,
    };

    const action = A.fetchCheckoutSessionIdStart();
    expect(action).toEqual(expectedAction);
  });

  it('should create fetchCheckoutSessionIdSuccess action', () => {
    const expectedAction: I.FetchCheckoutSessionIdSuccess = {
      type: PaymentsEnum.FetchCheckoutSessionIdSuccess,
    };

    const action = A.fetchCheckoutSessionIdSuccess();
    expect(action).toEqual(expectedAction);
  });

  it('should create fetchCheckoutSessionIdFail action', () => {
    const error = new Error();
    const expectedAction: I.FetchCheckoutSessionIdFail = {
      type: PaymentsEnum.FetchCheckoutSessionIdFail,
      data: {
        error,
      },
    };
    const action = A.fetchCheckoutSessionIdFail(error);
    expect(action).toEqual(expectedAction);
  });

  it('should create fetchUserTransactionsStart action', () => {
    const expectedAction: I.FetchUserTransactionsStart = {
      type: PaymentsEnum.FetchUserTransactionsStart,
    };

    const action = A.fetchUserTransactionsStart();
    expect(action).toEqual(expectedAction);
  });

  it('should create fetchUserTransactionsSuccess action', () => {
    const expectedAction: I.FetchUserTransactionsSuccess = {
      type: PaymentsEnum.FetchUserTransactionsSuccess,
    };

    const action = A.fetchUserTransactionsSuccess();
    expect(action).toEqual(expectedAction);
  });

  it('should create fetchUserTransactionsFail action', () => {
    const error = new Error();
    const expectedAction: I.FetchUserTransactionsFail = {
      type: PaymentsEnum.FetchUserTransactionsFail,
      data: {
        error,
      },
    };
    const action = A.fetchUserTransactionsFail(error);
    expect(action).toEqual(expectedAction);
  });
});
