import { UserResponse } from '../../../../service/src/models/shared-interfaces/user';
import { AlertTypes, NetworkError } from '../../models/alerts';
import { PostResponseInterface } from '../../../../service/src/models/shared-interfaces/post';

export interface UserStateInterface {
  userData: UserResponse;
  loading: boolean;
  error?: NetworkError;
  alert?: boolean;
  alertType?: AlertTypes;
  token?: string;
  tokenExpirationDate?: Date;
  userPosts: PostResponseInterface[];
}
