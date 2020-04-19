import { GameEnum } from './enum';
import { FormValues } from '../../../../service/src/models/shared-interfaces/user';
import { PostResponseInterface } from '../../../../service/src/models/shared-interfaces/post';
import { NetworkError } from '../../models/errors';
import { GameStatus } from './initialState.interface';

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
    makeCheck?: boolean;
  };
}

export interface FailFetchPosts extends ActionInterface {
  type: GameEnum.FailFetchPosts;
  data: {
    error: NetworkError;
  };
}

export interface SetFormValues extends ActionInterface {
  type: GameEnum.SetFormValues;
  data: {
    values: Partial<FormValues>;
  };
}

export interface CleanGameData extends ActionInterface {
  type: GameEnum.CleanGameData;
}

export interface SaveGameStatus extends ActionInterface {
  type: GameEnum.SaveGameStatus;
  data: {
    gameStatus: GameStatus;
  };
}

export interface CleanIsReadyToGameData extends ActionInterface {
  type: GameEnum.CleanIsReadyToGameData;
}

export type GameActions =
  | InitFetchPosts
  | SuccessFetchPosts
  | FailFetchPosts
  | CleanIsReadyToGameData
  | SetFormValues
  | SaveGameStatus
  | CleanGameData;
