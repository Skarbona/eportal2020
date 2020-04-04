import { ActionCreator } from 'redux';

import * as I from './action.interface';
import { GameEnum } from './enum';

export const initFetchPosts: ActionCreator<I.InitFetchPosts> = () => ({
  type: GameEnum.InitFetchPosts,
});

export const successFetchPosts: ActionCreator<I.SuccessFetchPosts> = (posts) => ({
  type: GameEnum.SuccessFetchPosts,
  data: {
    posts,
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
