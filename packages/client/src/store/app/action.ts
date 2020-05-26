import { ActionCreator } from 'redux';

import * as I from './action.interface';
import { AppEnum } from './enum';

export const cleanAppAlerts: ActionCreator<I.CleanAppAlerts> = () => ({
  type: AppEnum.CleanAppAlerts,
});

export const cleanAppData: ActionCreator<I.CleanAppData> = () => ({
  type: AppEnum.CleanAppData,
});

export const initRefreshTokens: ActionCreator<I.InitRefreshTokens> = () => ({
  type: AppEnum.InitRefreshTokens,
});

export const failRefreshTokens: ActionCreator<I.FailRefreshTokens> = (error) => ({
  type: AppEnum.FailRefreshTokens,
  data: {
    error,
  },
});

export const setAccessTokenData: ActionCreator<I.SetAccessTokenData> = ({
  accessToken,
  accessTokenExpiration,
}: I.SetAccessTokenData['data']) => ({
  type: AppEnum.SetAccessTokenData,
  data: {
    accessToken,
    accessTokenExpiration,
  },
});

export const setRefreshTokenData: ActionCreator<I.SetRefreshTokenData> = ({
  refreshToken,
  refreshTokenExpiration,
}: I.SetRefreshTokenData['data']) => ({
  type: AppEnum.SetRefreshTokenData,
  data: {
    refreshToken,
    refreshTokenExpiration,
  },
});
