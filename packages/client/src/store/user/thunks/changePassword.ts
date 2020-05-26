/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios';

import { AppThunk } from '../../store.interface';
import * as A from '../action';
import { logout } from '../../app/thunks/logout';

export const changePassword = (password: string, token?: string): AppThunk => async (
  dispatch,
  getState,
) => {
  dispatch(A.initSetUserData());
  const {
    user: { userData },
    app: { auth },
  } = getState();
  try {
    const requestBody = { password };

    await axios.patch(
      `${process.env.REACT_APP_BACKEND_API}/users/${userData?.id || ''}`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${token || auth.accessToken}`,
        },
      },
    );
    dispatch(A.successSetPassword());
    if (!token) dispatch(logout());
  } catch (e) {
    dispatch(A.failSetUserData(e));
  }
};
