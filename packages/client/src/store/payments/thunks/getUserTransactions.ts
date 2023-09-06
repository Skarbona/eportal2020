import axios from 'axios';
import { BACKEND_API } from '../../../constants/envs';
import * as A from '../action';
import { ReturnAppThunk } from '../../store.interface';
import { UserTransactions } from '../../../../../service/src/models/shared-interfaces/payments';

export const getUserTransactions =
  (): ReturnAppThunk<UserTransactions[]> => async (dispatch, getState) => {
    dispatch(A.fetchUserTransactionsStart());
    try {
      const {
        app: { auth },
      } = getState();
      const { data } = await axios.get<{ payments: { data: UserTransactions[] } }>(
        `${BACKEND_API}/payments/transactions`,
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        },
      );
      dispatch(A.fetchUserTransactionsSuccess());
      return data.payments.data;
    } catch (e) {
      dispatch(A.fetchUserTransactionsFail(e));
      return undefined;
    }
  };
