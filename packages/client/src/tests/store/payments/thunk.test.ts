import axios from 'axios';

import * as cancelSubscriptionThunk from '../../../store/payments/thunks/cancelSubscription';
import * as getSessionIdThunk from '../../../store/payments/thunks/getSessionId';
import * as getUserTransactionsThunk from '../../../store/payments/thunks/getUserTransactions';
import * as paymentsActions from '../../../store/payments/action';
import { RootState } from '../../../store/store.interface';
import { mockedStore } from '../../../mocks/store';

describe('Thunk: payments', () => {
  let dispatch: any;
  let store: RootState;
  let cancelUserSubscriptionStartSpy: any;
  let cancelUserSubscriptionSuccessSpy: any;
  let cancelUserSubscriptionFailSpy: any;
  let fetchUserTransactionsStartSpy: any;
  let fetchUserTransactionsSuccessSpy: any;
  let fetchUserTransactionsFailSpy: any;
  let fetchCheckoutSessionIdStartSpy: any;
  let fetchCheckoutSessionIdSuccessSpy: any;
  let fetchCheckoutSessionIdFailSpy: any;

  beforeEach(() => {
    store = mockedStore();
    dispatch = jest.fn();
    cancelUserSubscriptionStartSpy = jest.spyOn(paymentsActions, 'cancelUserSubscriptionStart');
    cancelUserSubscriptionSuccessSpy = jest.spyOn(paymentsActions, 'cancelUserSubscriptionSuccess');
    cancelUserSubscriptionFailSpy = jest.spyOn(paymentsActions, 'cancelUserSubscriptionFail');
    fetchUserTransactionsStartSpy = jest.spyOn(paymentsActions, 'fetchUserTransactionsStart');
    fetchUserTransactionsSuccessSpy = jest.spyOn(paymentsActions, 'fetchUserTransactionsSuccess');
    fetchUserTransactionsFailSpy = jest.spyOn(paymentsActions, 'fetchUserTransactionsFail');
    fetchCheckoutSessionIdStartSpy = jest.spyOn(paymentsActions, 'fetchCheckoutSessionIdStart');
    fetchCheckoutSessionIdSuccessSpy = jest.spyOn(paymentsActions, 'fetchCheckoutSessionIdSuccess');
    fetchCheckoutSessionIdFailSpy = jest.spyOn(paymentsActions, 'fetchCheckoutSessionIdFail');
  });

  afterEach(() => {
    cancelUserSubscriptionStartSpy.mockClear();
    cancelUserSubscriptionSuccessSpy.mockClear();
    cancelUserSubscriptionFailSpy.mockClear();
    fetchUserTransactionsStartSpy.mockClear();
    fetchUserTransactionsSuccessSpy.mockClear();
    fetchUserTransactionsFailSpy.mockClear();
    fetchCheckoutSessionIdStartSpy.mockClear();
    fetchCheckoutSessionIdSuccessSpy.mockClear();
    fetchCheckoutSessionIdFailSpy.mockClear();
  });

  describe('cancelSubscription thunk', () => {
    it('should call all required action in success path', async () => {
      jest.spyOn(axios, 'delete').mockImplementation(() => Promise.resolve());
      await cancelSubscriptionThunk.cancelSubscription()(dispatch, () => store, null);
      expect(cancelUserSubscriptionStartSpy).toHaveBeenCalled();
      expect(cancelUserSubscriptionSuccessSpy).toHaveBeenCalled();
    });

    it('should call all required action in fail path', async () => {
      const error = new Error();
      jest.spyOn(axios, 'delete').mockImplementation(() => Promise.reject(error));
      await cancelSubscriptionThunk.cancelSubscription()(dispatch, () => store, null);
      expect(cancelUserSubscriptionStartSpy).toHaveBeenCalled();
      expect(cancelUserSubscriptionFailSpy).toHaveBeenCalledWith(error);
    });
  });

  describe('getSessionId thunk', () => {
    it('should call all required actions and thunks', async () => {
      jest.spyOn(axios, 'post').mockImplementation(() => Promise.resolve({ data: { id: 'id' } }));
      await getSessionIdThunk.getSessionId('1 day')(dispatch, () => store, null);
      expect(fetchCheckoutSessionIdStartSpy).toHaveBeenCalled();
      expect(fetchCheckoutSessionIdSuccessSpy).toHaveBeenCalled();
    });

    it('should call all required action in fail path', async () => {
      const error = new Error();
      jest.spyOn(axios, 'post').mockImplementation(() => Promise.reject(error));
      await getSessionIdThunk.getSessionId('1 day')(dispatch, () => store, null);
      expect(fetchCheckoutSessionIdStartSpy).toHaveBeenCalled();
      expect(fetchCheckoutSessionIdFailSpy).toHaveBeenCalledWith(error);
    });
  });

  describe('getUserTransactionsThunk thunk', () => {
    it('should call all required actions and thunks', async () => {
      jest
        .spyOn(axios, 'get')
        .mockImplementation(() => Promise.resolve({ payments: { data: [] } }));
      await getUserTransactionsThunk.getUserTransactions()(dispatch, () => store, null);
      expect(fetchUserTransactionsStartSpy).toHaveBeenCalled();
      expect(fetchUserTransactionsSuccessSpy).toHaveBeenCalled();
    });

    it('should call all required action in fail path', async () => {
      const error = new Error();
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(error));
      await getUserTransactionsThunk.getUserTransactions()(dispatch, () => store, null);
      expect(fetchUserTransactionsStartSpy).toHaveBeenCalled();
      expect(fetchUserTransactionsFailSpy).toHaveBeenCalledWith(error);
    });
  });
});
