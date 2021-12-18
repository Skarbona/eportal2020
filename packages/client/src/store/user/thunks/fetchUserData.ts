/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios';

import * as A from '../action';
import { AppThunk } from '../../store.interface';
import { BACKEND_API } from '../../../constants/envs';

export const fetchUserData =
  (token: string, userId = ''): AppThunk =>
  async (dispatch) => {
    dispatch(A.initFetchUserData());
    try {
      const { data } = await axios.get(`${BACKEND_API}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(A.successFetchUserData(data.user));
    } catch (e) {
      dispatch(A.failFetchUserData(e));
    }
  };
