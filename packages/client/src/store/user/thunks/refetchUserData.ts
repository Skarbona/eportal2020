/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios';

import * as A from '../action';
import { AppThunk } from '../../store.interface';
import { BACKEND_API } from '../../../constants/envs';

export const reFetchUserData = (): AppThunk => async (dispatch, getState) => {
  dispatch(A.initFetchUserData());
  try {
    const {
      app: { auth },
      user: { userData },
    } = getState();
    const { data } = await axios.get(`${BACKEND_API}/users/${userData.id}`, {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    dispatch(A.successFetchUserData(data.user));
  } catch (e) {
    dispatch(A.failFetchUserData(e));
  }
};
