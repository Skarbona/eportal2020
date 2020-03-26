import { GameEnum } from './enum';
import { FormValues } from '../../../../service/src/models/shared-interfaces/user';
import { PostResponseInterface } from '../../../../service/src/models/shared-interfaces/post';

interface ActionInterface {
  type: GameEnum;
}

export interface InitFetchPosts extends ActionInterface {
  type: GameEnum.InitFetchPosts;
}

export interface SuccessFetchPosts extends ActionInterface {
  type: GameEnum.SuccessFetchPosts;
  data: {
    posts: PostResponseInterface[];
  };
}

export interface FailFetchPosts extends ActionInterface {
  type: GameEnum.FailFetchPosts;
  data: {
    error: Error;
  };
}

export interface SetFormValues extends ActionInterface {
  type: GameEnum.SetFormValues;
  data: {
    values: Partial<FormValues>;
  };
}

export type GameActions = InitFetchPosts | SuccessFetchPosts | FailFetchPosts | SetFormValues;
