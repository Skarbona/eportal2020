import { Action } from 'redux';
import { UserEnum } from './enum';
import { UserResponse } from '../../../../service/src/models/shared-interfaces/user';
import { NetworkError } from '../../models/alerts';
import { PostResponseInterface } from '../../../../service/src/models/shared-interfaces/post';

interface ActionInterface {
  type: UserEnum;
}

export interface CleanUserAlerts extends ActionInterface {
  type: UserEnum.CleanUserAlerts;
}

export interface InitFetchUserData extends ActionInterface {
  type: UserEnum.InitFetchUserData;
}

export interface SuccessFetchUserData extends ActionInterface {
  type: UserEnum.SuccessFetchUserData;
  data: {
    user: UserResponse;
  };
}

export interface FailFetchUserData extends ActionInterface {
  type: UserEnum.FailFetchUserData;
  data: {
    error: NetworkError;
  };
}

export interface InitGetResetPasswordLink extends ActionInterface {
  type: UserEnum.InitGetResetPasswordLink;
}

export interface SuccessGetResetPasswordLink extends ActionInterface {
  type: UserEnum.SuccessGetResetPasswordLink;
}

export interface SuccessSetPassword extends ActionInterface {
  type: UserEnum.SuccessSetPassword;
}

export interface FailGetResetPasswordLink extends ActionInterface {
  type: UserEnum.FailGetResetPasswordLink;
  data: {
    error: NetworkError;
  };
}

export interface InitDeleteUser extends ActionInterface {
  type: UserEnum.InitDeleteUser;
}

export interface SuccessDeleteUser extends ActionInterface {
  type: UserEnum.SuccessDeleteUser;
}

export interface FailDeleteUser extends ActionInterface {
  type: UserEnum.FailDeleteUser;
  data: {
    error: NetworkError;
  };
}

export interface InitSetUserData extends ActionInterface {
  type: UserEnum.InitSetUserData;
}

export interface SuccessSetUserData extends ActionInterface {
  type: UserEnum.SuccessSetUserData;
  data: {
    user: UserResponse;
  };
}

export interface FailSetUserData extends ActionInterface {
  type: UserEnum.FailSetUserData;
  data: {
    error: NetworkError;
  };
}

export interface InitAuthorization extends ActionInterface {
  type: UserEnum.InitAuthorization;
}

export interface SuccessAuthorization extends ActionInterface {
  type: UserEnum.SuccessAuthorization;
  data: {
    user: UserResponse;
  };
}

export interface FailAuthorization extends ActionInterface {
  type: UserEnum.FailAuthorization;
  data: {
    error: NetworkError;
  };
}

export interface CleanUserData extends ActionInterface {
  type: UserEnum.CleanUserData;
}

export interface FetchUserPostsStart extends Action {
  type: UserEnum.FetchUserPostsStart;
}

export interface FetchUserPostsSuccess extends Action {
  type: UserEnum.FetchUserPostsSuccess;
  data: {
    posts: PostResponseInterface[];
  };
}

export interface FetchUserPostsFail extends Action {
  type: UserEnum.FetchUserPostsFail;
}

export type UserActions =
  | FetchUserPostsSuccess
  | FetchUserPostsStart
  | CleanUserAlerts
  | SuccessSetPassword
  | InitGetResetPasswordLink
  | SuccessGetResetPasswordLink
  | FailGetResetPasswordLink
  | InitDeleteUser
  | SuccessDeleteUser
  | FailDeleteUser
  | InitFetchUserData
  | SuccessFetchUserData
  | FailFetchUserData
  | InitSetUserData
  | SuccessSetUserData
  | FailSetUserData
  | InitAuthorization
  | SuccessAuthorization
  | CleanUserData
  | FailAuthorization;
