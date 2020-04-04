import { AppStateInterface } from './initialState.interface';

export const appInitialState: AppStateInterface = {
  auth: {
    accessToken: null,
    accessTokenExpiration: null,
    refreshToken: null,
    refreshTokenExpiration: null,
  },
};
