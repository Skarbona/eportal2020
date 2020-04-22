import { GameEnum } from './enum';
import { FormValues } from '../../../../service/src/models/shared-interfaces/user';
import { PostResponseInterface } from '../../../../service/src/models/shared-interfaces/post';
import { NetworkError } from '../../models/errors';
import { ActivePerson, GameStatus } from '../../models/game-models';

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

export interface RandomizeTask extends ActionInterface {
  type: GameEnum.RandomizeTask;
  data: {
    activePerson: ActivePerson;
  };
}

export interface SaveActiveGameData extends ActionInterface {
  type: GameEnum.SaveActiveGameData;
  data: {
    currentTask: PostResponseInterface;
    removedPosts: string[][];
  };
}

export interface CleanCurrentTask extends ActionInterface {
  type: GameEnum.CleanCurrentTask;
}

export type GameActions =
  | InitFetchPosts
  | SuccessFetchPosts
  | FailFetchPosts
  | CleanIsReadyToGameData
  | SetFormValues
  | SaveGameStatus
  | RandomizeTask
  | CleanCurrentTask
  | SaveActiveGameData
  | CleanGameData;
