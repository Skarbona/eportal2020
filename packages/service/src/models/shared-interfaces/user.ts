import { TimeMode } from '../../../../client/src/models/game-models';

export enum UserType {
  Admin = 'admin',
  User = 'user',
}

export interface FormValues {
  names: {
    she: string;
    he: string;
  };
  place: string;
  catsQuery: {
    catsInclude: string[];
    catsExclude: string[];
  };
  levels: {
    level1: number;
    level2: number;
    level3: number;
  };
  time: {
    type: TimeMode;
    value: number[];
  };
  saveAsDefault?: boolean;
  onlyFavourites?: boolean;
}

export interface UserBasic {
  date: Date;
  name: string;
  email: string;
  type: UserType;
  gameDefaults: FormValues;
  favouritesPosts: string[];
}

export interface AuthResponse {
  userData: UserResponse;
  accessToken: string;
  refreshToken: string;
}

export interface AuthRequest {
  userName?: string;
  password: string;
  email: string;
}

export interface UserResponse extends UserBasic {
  id: string;
}
