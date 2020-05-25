import { SuccessGetResetPasswordLink } from './action.interface';

export enum UserEnum {
  InitFetchUserData = 'initFetchUserData',
  SuccessFetchUserData = 'successFetchUserData',
  FailFetchUserData = 'failFetchUserData',
  InitSetUserData = 'initSetUserData',
  SuccessSetUserData = 'successSetUserData',
  FailSetUserData = 'failSetUserData',
  InitAuthorization = 'initAuthorization',
  SuccessAuthorization = 'successAuthorization',
  FailAuthorization = 'failAuthorization',
  CleanUserData = 'cleanUserData',
  InitDeleteUser = 'initDeleteUser',
  SuccessDeleteUser = 'successDeleteUser',
  FailDeleteUser = 'failDeleteUser',
  InitGetResetPasswordLink = 'InitGetResetPasswordLink',
  SuccessGetResetPasswordLink = 'SuccessGetResetPasswordLink',
  FailGetResetPasswordLink = 'FailGetResetPasswordLink',
}
