import { AppStateInterface } from './initialState.interface';

export const appInitialState: AppStateInterface = {
  auth: {
    isAuthorizationDone: false,
    accessToken: null,
    accessTokenExpiration: null,
    refreshToken: null,
    refreshTokenExpiration: null,
  },
  showContactForm: false,
};
