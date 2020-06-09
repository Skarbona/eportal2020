/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios';

import { AppThunk } from '../../store.interface';
import * as A from '../action';
import { logout } from '../../app/thunks/logout';
import { BACKEND_API } from '../../../constants/envs';

export const deleteUser = (): AppThunk => async (dispatch, getState) => {
  dispatch(A.initDeleteUser());
  const {
    user: { userData },
    app: { auth },
  } = getState();
  try {
    await axios.delete(`${BACKEND_API}/users/${userData.id}`, {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    dispatch(A.successDeleteUser());
    dispatch(logout());
  } catch (e) {
    dispatch(A.failDeleteUser(e));
  }
};
