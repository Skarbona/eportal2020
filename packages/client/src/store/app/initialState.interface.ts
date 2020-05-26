import { AlertTypes, NetworkError } from '../../models/alerts';

export interface AppStateInterface {
  auth: {
    isAuthorizationDone: boolean;
    accessToken: string;
    accessTokenExpiration: Date;
    refreshToken: string;
    refreshTokenExpiration: Date;
  };
  error?: NetworkError;
  alert?: boolean;
  alertType?: AlertTypes;
}
