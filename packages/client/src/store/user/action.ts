import { ActionCreator } from 'redux';

import * as I from './action.interface';
import { UserEnum } from './enum';

export const cleanUserAlerts: ActionCreator<I.CleanUserAlerts> = () => ({
  type: UserEnum.CleanUserAlerts,
});

export const initGetResetPasswordLink: ActionCreator<I.InitGetResetPasswordLink> = () => ({
  type: UserEnum.InitGetResetPasswordLink,
});

export const successGetResetPasswordLink: ActionCreator<I.SuccessGetResetPasswordLink> = () => ({
  type: UserEnum.SuccessGetResetPasswordLink,
});

export const successSetPassword: ActionCreator<I.SuccessSetPassword> = () => ({
  type: UserEnum.SuccessSetPassword,
});

export const failGetResetPasswordLink: ActionCreator<I.FailGetResetPasswordLink> = (error) => ({
  type: UserEnum.FailGetResetPasswordLink,
  data: {
    error,
  },
});

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
    user: userData,
  },
});

export const failAuthorization: ActionCreator<I.FailAuthorization> = (error) => ({
  type: UserEnum.FailAuthorization,
  data: {
    error,
  },
});

export const cleanUserData: ActionCreator<I.CleanUserData> = () => ({
  type: UserEnum.CleanUserData,
});

export const initDeleteUser: ActionCreator<I.InitDeleteUser> = () => ({
  type: UserEnum.InitDeleteUser,
});

export const successDeleteUser: ActionCreator<I.SuccessDeleteUser> = () => ({
  type: UserEnum.SuccessDeleteUser,
});

export const failDeleteUser: ActionCreator<I.FailDeleteUser> = (error) => ({
  type: UserEnum.FailDeleteUser,
  data: {
    error,
  },
});
