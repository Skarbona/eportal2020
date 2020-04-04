export interface AppStateInterface {
  auth: {
    accessToken: string;
    accessTokenExpiration: Date;
    refreshToken: string;
    refreshTokenExpiration: Date;
  };
}
