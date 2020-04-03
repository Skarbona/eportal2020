import { UserEnum } from './enum';
import { AuthResponse, UserResponse } from '../../../../service/src/models/shared-interfaces/user';

interface ActionInterface {
  type: UserEnum;
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
    error: Error;
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
    error: Error;
  };
}

export interface InitAuthorization extends ActionInterface {
  type: UserEnum.InitAuthorization;
}

export interface SuccessAuthorization extends ActionInterface {
  type: UserEnum.SuccessAuthorization;
  data: {
    userData: UserResponse;
  };
}

export interface FailAuthorization extends ActionInterface {
  type: UserEnum.FailAuthorization;
  data: {
    error: Error;
  };
}

export type UserActions =
  | InitFetchUserData
  | SuccessFetchUserData
  | FailFetchUserData
  | InitSetUserData
  | SuccessSetUserData
  | FailSetUserData
  | InitAuthorization
  | SuccessAuthorization
  | FailAuthorization;
