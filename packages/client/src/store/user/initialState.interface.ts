import { UserResponse } from '../../../../service/src/models/shared-interfaces/user';

export interface UserStateInterface {
  userData: UserResponse;
  loading: boolean;
  error?: Error;
  token?: string;
  tokenExpirationDate?: Date;
}
