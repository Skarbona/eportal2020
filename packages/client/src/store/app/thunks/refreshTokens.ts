/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios';

import { AppThunk } from '../../store.interface';
import { failRefreshTokens, initRefreshTokens } from '../action';
import { login } from './login';
import { BACKEND_API } from '../../../constants/envs';

export const refreshTokens = (): AppThunk => async (dispatch, getState) => {
  dispatch(initRefreshTokens());
  try {
    const { app, user } = getState();
    const tokens = app.auth;
    const userId = user.userData.id;
    const { data } = await axios.get(`${BACKEND_API}/token/refresh`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken} ${tokens.refreshToken}`,
      },
    });
    const { accessToken, refreshToken } = data;
    dispatch(
      login({ userId, accessTokenData: { accessToken }, refreshTokenData: { refreshToken } }),
    );
  } catch (e) {
    dispatch(failRefreshTokens(e));
  }
};
