import { UserResponse } from '../../../../service/src/models/shared-interfaces/user';
import { ErrorTypes, NetworkError } from '../../models/errors';

export interface UserStateInterface {
  userData: UserResponse;
  loading: boolean;
  error?: NetworkError;
  errorType?: ErrorTypes;
  token?: string;
  tokenExpirationDate?: Date;
}
