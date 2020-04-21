import { ActionCreator } from 'redux';

import * as I from './action.interface';
import { GameEnum } from './enum';
import { PostResponseInterface } from '../../../../service/src/models/shared-interfaces/post';
import { ActivePerson, GameStatus } from '../../models/game-models';

export const initFetchPosts: ActionCreator<I.InitFetchPosts> = () => ({
  type: GameEnum.InitFetchPosts,
});

export const successFetchPosts: ActionCreator<I.SuccessFetchPosts> = (
  posts: PostResponseInterface[],
  makeCheck?: boolean,
) => ({
  type: GameEnum.SuccessFetchPosts,
  data: {
    posts,
    makeCheck,
  },
});

export const failFetchPosts: ActionCreator<I.FailFetchPosts> = (error) => ({
  type: GameEnum.FailFetchPosts,
  data: {
    error,
  },
});

export const setFormValues: ActionCreator<I.SetFormValues> = (values) => ({
  type: GameEnum.SetFormValues,
  data: {
    values,
  },
});

export const cleanGameData: ActionCreator<I.CleanGameData> = () => ({
  type: GameEnum.CleanGameData,
});

export const saveGameStatus: ActionCreator<I.SaveGameStatus> = (gameStatus: GameStatus) => ({
  type: GameEnum.SaveGameStatus,
  data: {
    gameStatus,
  },
});

export const cleanIsReadyToGameData: ActionCreator<I.CleanIsReadyToGameData> = () => ({
  type: GameEnum.CleanIsReadyToGameData,
});

export const saveActiveGameData: ActionCreator<I.SaveActiveGameData> = (
  currentTask: PostResponseInterface,
  removedPosts: string[][],
) => ({
  type: GameEnum.SaveActiveGameData,
  data: {
    currentTask,
    removedPosts,
  },
});

export const cleanCurrentTask: ActionCreator<I.CleanCurrentTask> = () => ({
  type: GameEnum.CleanCurrentTask,
});

export const randomizeTask: ActionCreator<I.RandomizeTask> = (activePerson: ActivePerson) => ({
  type: GameEnum.RandomizeTask,
  data: {
    activePerson,
  },
});
