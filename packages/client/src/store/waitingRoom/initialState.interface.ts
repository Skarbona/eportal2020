import { AlertTypes, NetworkError } from '../../models/alerts';
import { PostResponseInterface } from '../../../../service/src/models/shared-interfaces/post';

export interface WaitingRoomInterface {
  posts: PostResponseInterface[];
  loading: boolean;
  error?: NetworkError;
  alert?: boolean;
  alertType?: AlertTypes;
}
