import axios from 'axios';
import { BACKEND_API } from '../../../constants/envs';
import * as A from '../action';
import { ReturnAppThunk } from '../../store.interface';

export const cancelSubscription =
  (): ReturnAppThunk<boolean | undefined> => async (dispatch, getState) => {
    dispatch(A.cancelUserSubscriptionStart());
    try {
      const {
        app: { auth },
      } = getState();
      await axios.delete(`${BACKEND_API}/payments/subscriptions/`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      dispatch(A.cancelUserSubscriptionSuccess());
      return true;
    } catch (e) {
      dispatch(A.cancelUserSubscriptionFail(e));
      return false;
    }
  };
