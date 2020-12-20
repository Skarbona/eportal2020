/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios';

import { AppThunk } from '../../store.interface';
import * as A from '../action';
import { BACKEND_API } from '../../../constants/envs';

export const saveFavourites = (postId: string, remove = false): AppThunk => async (
  dispatch,
  getState,
) => {
  dispatch(A.initSetUserData());
  const {
    app: { auth },
  } = getState();
  try {
    if (!remove) {
      const { data } = await axios.patch(`${BACKEND_API}/users/favourites/${postId}`, null, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      dispatch(A.successSetUserData(data.user));
    } else {
      const { data } = await axios.delete(`${BACKEND_API}/users/favourites/${postId}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      dispatch(A.successSetUserData(data.user));
    }
  } catch (e) {
    dispatch(A.failSetUserData(e));
  }
};
