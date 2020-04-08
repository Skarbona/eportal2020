import { ErrorTypes, NetworkError } from '../../models/errors';

export interface AppStateInterface {
  auth: {
    accessToken: string;
    accessTokenExpiration: Date;
    refreshToken: string;
    refreshTokenExpiration: Date;
  };
  error?: NetworkError;
  errorType?: ErrorTypes;
}
