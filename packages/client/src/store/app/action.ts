import { ActionCreator } from 'redux';

import * as I from './action.interface';
import { AppEnum } from './enum';

export const cleanAppData: ActionCreator<I.CleanAppData> = () => ({
  type: AppEnum.CleanAppData,
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
