import { ActionCreator } from 'redux';

import * as I from './action.interface';
import { UserEnum } from './enum';

export const initFetchUserData: ActionCreator<I.InitFetchUserData> = () => ({
  type: UserEnum.InitFetchUserData,
});

export const successFetchUserData: ActionCreator<I.SuccessFetchUserData> = (user) => ({
  type: UserEnum.SuccessFetchUserData,
  data: {
    user,
  },
});

export const failFetchUserData: ActionCreator<I.FailFetchUserData> = (error) => ({
  type: UserEnum.FailFetchUserData,
  data: {
    error,
  },
});

export const initSetUserData: ActionCreator<I.InitSetUserData> = () => ({
  type: UserEnum.InitSetUserData,
});

export const successSetUserData: ActionCreator<I.SuccessSetUserData> = (user) => ({
  type: UserEnum.SuccessSetUserData,
  data: {
    user,
  },
});

export const failSetUserData: ActionCreator<I.FailSetUserData> = (error) => ({
  type: UserEnum.FailSetUserData,
  data: {
    error,
  },
});

export const initAuthorization: ActionCreator<I.InitAuthorization> = () => ({
  type: UserEnum.InitAuthorization,
});

export const successAuthorization: ActionCreator<I.SuccessAuthorization> = ({ userData }) => ({
  type: UserEnum.SuccessAuthorization,
  data: {
    userData,
  },
});

export const failAuthorization: ActionCreator<I.FailAuthorization> = (error) => ({
  type: UserEnum.FailAuthorization,
  data: {
    error,
  },
});
