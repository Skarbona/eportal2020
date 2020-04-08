/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios';

import * as A from '../action';
import { AppThunk } from '../../store.interface';

export const fetchUserData = (token: string, userId = ''): AppThunk => async (dispatch) => {
  dispatch(A.initFetchUserData());
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_API}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(A.successFetchUserData(data.user));
  } catch (e) {
    dispatch(A.failFetchUserData(e));
  }
};
