import axios from 'axios';
import { BACKEND_API } from '../../../constants/envs';
import * as A from '../action';
import { ReturnAppThunk } from '../../store.interface';

export const getSessionId =
  (product: '1 day' | '1 month'): ReturnAppThunk<{ id: string } | undefined> =>
  async (dispatch, getState) => {
    dispatch(A.fetchCheckoutSessionIdStart());
    try {
      const {
        app: { auth },
      } = getState();
      const { data } = await axios.post<{ id: string }>(
        `${BACKEND_API}/payments/subscriptions`,
        {
          plan: product,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        },
      );
      dispatch(A.fetchCheckoutSessionIdSuccess());
      return data;
    } catch (e) {
      dispatch(A.fetchCheckoutSessionIdFail(e));
      return undefined;
    }
  };
