/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios';

import { AppThunk, ReturnAppThunk } from '../store.interface';
import * as A from './action';
import { AuthorizationEndpoints } from '../../models/endpoint-models';
import { AuthRequest } from '../../../../service/src/models/shared-interfaces/user';
import { login } from '../app/thunk';

export const setUserData = (token: string, userId = '', password?: string): AppThunk => async (
  dispatch,
  getState,
) => {
  dispatch(A.initSetUserData());
  const {
    game: { config },
  } = getState();
  try {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_BACKEND_API}/users/${userId}`,
      {
        gameDefaults: config,
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    dispatch(A.successSetUserData(data.user));
  } catch (e) {
    dispatch(A.failSetUserData(e));
  }
};

export const fetchUserData = (token: string, storageId = ''): AppThunk => async (dispatch) => {
  dispatch(A.initFetchUserData());
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_API}/users/${storageId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(A.successFetchUserData(data.user));
  } catch (e) {
    dispatch(A.failFetchUserData(e));
  }
};

export const authorizeUser = (
  type: AuthorizationEndpoints,
  requestData: AuthRequest,
): ReturnAppThunk<boolean> => async (dispatch) => {
  dispatch(A.initAuthorization());
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}/users/${type}`, {
      ...requestData,
    });
    const { userData, accessToken, refreshToken } = data;
    await dispatch(
      login({
        userId: userData.id,
        accessTokenData: { accessToken },
        refreshTokenData: { refreshToken },
      }),
    );

    await dispatch(A.successAuthorization({ userData: data.userData }));
    return true;
  } catch (e) {
    await dispatch(A.failAuthorization(e));
    return false;
  }
};
