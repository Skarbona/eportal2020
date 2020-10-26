import { Action } from 'redux';

import { WaitingRoomEnum } from './enum';
import { NetworkError } from '../../models/alerts';
import { PostResponseInterface } from '../../../../service/src/models/shared-interfaces/post';

export interface InitGetPosts extends Action {
  type: WaitingRoomEnum.InitGetPosts;
}

export interface SuccessGetPosts extends Action {
  type: WaitingRoomEnum.SuccessGetPosts;
  data: {
    posts: PostResponseInterface[];
  };
}

export interface FailGetPosts extends Action {
  type: WaitingRoomEnum.FailGetPosts;
  data: {
    error: NetworkError;
  };
}

export interface InitSavePosts extends Action {
  type: WaitingRoomEnum.InitSavePosts;
}

export interface SuccessSavePosts extends Action {
  type: WaitingRoomEnum.SuccessSavePosts;
}

export interface FailSavePosts extends Action {
  type: WaitingRoomEnum.FailSavePosts;
  data: {
    error: NetworkError;
  };
}

export type WaitingRoomActions =
  | InitSavePosts
  | SuccessSavePosts
  | FailSavePosts
  | InitGetPosts
  | SuccessGetPosts
  | FailGetPosts;
