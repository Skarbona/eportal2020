import * as I from '../../../store/user/action.interface';
import { UserEnum } from '../../../store/user/enum';
import * as A from '../../../store/user/action';
import { mockedStore } from '../../../mocks/store';

describe('Actions: User', () => {
  it('should create initFetchUserData action', () => {
    const expectedAction: I.InitFetchUserData = {
      type: UserEnum.InitFetchUserData,
    };

    const action = A.initFetchUserData();
    expect(action).toEqual(expectedAction);
  });

  it('should create successFetchUserData action', () => {
    const {
      user: { userData },
    } = mockedStore();
    const expectedAction: I.SuccessFetchUserData = {
      type: UserEnum.SuccessFetchUserData,
      data: {
        user: userData,
      },
    };
    const action = A.successFetchUserData(userData);
    expect(action).toEqual(expectedAction);
  });

  it('should create failFetchUserData action', () => {
    const error = new Error();
    const expectedAction: I.FailFetchUserData = {
      type: UserEnum.FailFetchUserData,
      data: {
        error,
      },
    };
    const action = A.failFetchUserData(error);
    expect(action).toEqual(expectedAction);
  });

  it('should create initSetUserData action', () => {
    const expectedAction: I.InitSetUserData = {
      type: UserEnum.InitSetUserData,
    };

    const action = A.initSetUserData();
    expect(action).toEqual(expectedAction);
  });

  it('should create successSetUserData action', () => {
    const {
      user: { userData },
    } = mockedStore();
    const expectedAction: I.SuccessSetUserData = {
      type: UserEnum.SuccessSetUserData,
      data: {
        user: userData,
      },
    };
    const action = A.successSetUserData(userData);
    expect(action).toEqual(expectedAction);
  });

  it('should create failSetUserData action', () => {
    const error = new Error();
    const expectedAction: I.FailSetUserData = {
      type: UserEnum.FailSetUserData,
      data: {
        error,
      },
    };
    const action = A.failSetUserData(error);
    expect(action).toEqual(expectedAction);
  });
});
