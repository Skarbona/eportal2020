import * as I from './action.interface';
import { WaitingRoomEnum } from './enum';
import { PostResponseInterface } from '../../../../service/src/models/shared-interfaces/post';
import { NetworkError } from '../../models/alerts';

export const initGetPosts = (): I.InitGetPosts => ({
  type: WaitingRoomEnum.InitGetPosts,
});

export const successGetPosts = (posts: PostResponseInterface[]): I.SuccessGetPosts => ({
  type: WaitingRoomEnum.SuccessGetPosts,
  data: {
    posts,
  },
});

export const failGetPosts = (error: NetworkError): I.FailGetPosts => ({
  type: WaitingRoomEnum.FailGetPosts,
  data: {
    error,
  },
});

export const cleanAlerts = (): I.CleanAlerts => ({
  type: WaitingRoomEnum.CleanAlerts,
});

export const initSavePosts = (): I.InitSavePosts => ({
  type: WaitingRoomEnum.InitSavePosts,
});

export const successSavePosts = (): I.SuccessSavePosts => ({
  type: WaitingRoomEnum.SuccessSavePosts,
});

export const failSavePosts = (error: NetworkError): I.FailSavePosts => ({
  type: WaitingRoomEnum.FailSavePosts,
  data: {
    error,
  },
});
