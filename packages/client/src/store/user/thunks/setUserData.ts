/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios';

import { AppThunk } from '../../store.interface';
import * as A from '../action';

export const setUserData = (password?: string): AppThunk => async (dispatch, getState) => {
  dispatch(A.initSetUserData());
  const {
    user: { userData },
    game: { config },
    app: { auth },
  } = getState();
  try {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_BACKEND_API}/users/${userData.id}`,
      {
        gameDefaults: config,
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      },
    );
    dispatch(A.successSetUserData(data.user));
  } catch (e) {
    dispatch(A.failSetUserData(e));
  }
};
