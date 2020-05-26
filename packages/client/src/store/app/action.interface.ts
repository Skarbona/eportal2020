import { AppEnum } from './enum';
import { NetworkError } from '../../models/alerts';

interface ActionInterface {
  type: AppEnum;
}

export interface FinishAuthorization extends ActionInterface {
  type: AppEnum.FinishAuthorization;
}

export interface CleanAppAlerts extends ActionInterface {
  type: AppEnum.CleanAppAlerts;
}

export interface CleanAppData extends ActionInterface {
  type: AppEnum.CleanAppData;
}

export interface InitRefreshTokens extends ActionInterface {
  type: AppEnum.InitRefreshTokens;
}

export interface FailRefreshTokens extends ActionInterface {
  type: AppEnum.FailRefreshTokens;
  data: {
    error: NetworkError;
  };
}

export interface SetAccessTokenData extends ActionInterface {
  type: AppEnum.SetAccessTokenData;
  data: {
    accessToken: string;
    accessTokenExpiration: Date;
  };
}

export interface SetRefreshTokenData extends ActionInterface {
  type: AppEnum.SetRefreshTokenData;
  data: {
    refreshToken: string;
    refreshTokenExpiration: Date;
  };
}

export type AppActions =
  | FinishAuthorization
  | CleanAppAlerts
  | CleanAppData
  | SetAccessTokenData
  | SetRefreshTokenData
  | InitRefreshTokens
  | FailRefreshTokens;

export interface Login {
  userId: string;
  accessTokenData: {
    accessToken: string;
    accessTokenExpiration?: Date;
  };
  refreshTokenData?: {
    refreshToken: string;
    refreshTokenExpiration?: Date;
  };
}
