import { AppEnum } from './enum';

interface ActionInterface {
  type: AppEnum;
}

export interface CleanAppData extends ActionInterface {
  type: AppEnum.CleanAppData;
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

export type AppActions = CleanAppData | SetAccessTokenData | SetRefreshTokenData;

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
