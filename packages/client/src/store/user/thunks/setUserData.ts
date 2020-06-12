/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios';

import { AppThunk } from '../../store.interface';
import * as A from '../action';
import { BACKEND_API } from '../../../constants/envs';

export const setUserData = (): AppThunk => async (dispatch, getState) => {
  dispatch(A.initSetUserData());
  const {
    user: { userData },
    game: { config },
    app: { auth },
  } = getState();
  try {
    const requestBody = { gameDefaults: config };

    const { data } = await axios.patch(`${BACKEND_API}/users/${userData.id}`, requestBody, {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    dispatch(A.successSetUserData(data.user));
  } catch (e) {
    dispatch(A.failSetUserData(e));
  }
};
