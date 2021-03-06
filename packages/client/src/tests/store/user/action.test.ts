import * as I from '../../../store/user/action.interface';
import { UserEnum } from '../../../store/user/enum';
import * as A from '../../../store/user/action';
import { mockedStore } from '../../../mocks/store';

describe('Actions: User', () => {
  it('should create fetchUserPostsStart action', () => {
    const expectedAction: I.FetchUserPostsStart = {
      type: UserEnum.FetchUserPostsStart,
    };

    const action = A.fetchUserPostsStart();
    expect(action).toEqual(expectedAction);
  });

  it('should create fetchUserPostsSuccess action', () => {
    const { waitingRoom } = mockedStore();
    const expectedAction: I.FetchUserPostsSuccess = {
      type: UserEnum.FetchUserPostsSuccess,
      data: {
        posts: waitingRoom.posts,
      },
    };

    const action = A.fetchUserPostsSuccess(waitingRoom.posts);
    expect(action).toEqual(expectedAction);
  });

  it('should create fetchUserPostsFail action', () => {
    const expectedAction: I.FetchUserPostsFail = {
      type: UserEnum.FetchUserPostsFail,
    };

    const action = A.fetchUserPostsFail();
    expect(action).toEqual(expectedAction);
  });

  it('should create initGetResetPasswordLink action', () => {
    const expectedAction: I.InitGetResetPasswordLink = {
      type: UserEnum.InitGetResetPasswordLink,
    };

    const action = A.initGetResetPasswordLink();
    expect(action).toEqual(expectedAction);
  });

  it('should create successGetResetPasswordLink action', () => {
    const expectedAction: I.SuccessGetResetPasswordLink = {
      type: UserEnum.SuccessGetResetPasswordLink,
    };

    const action = A.successGetResetPasswordLink();
    expect(action).toEqual(expectedAction);
  });

  it('should create successSetPassword action', () => {
    const expectedAction: I.SuccessSetPassword = {
      type: UserEnum.SuccessSetPassword,
    };

    const action = A.successSetPassword();
    expect(action).toEqual(expectedAction);
  });

  it('should create cleanUserAlerts action', () => {
    const expectedAction: I.CleanUserAlerts = {
      type: UserEnum.CleanUserAlerts,
    };

    const action = A.cleanUserAlerts();
    expect(action).toEqual(expectedAction);
  });

  it('should create failGetResetPasswordLink action', () => {
    const error = new Error();
    const expectedAction: I.FailGetResetPasswordLink = {
      type: UserEnum.FailGetResetPasswordLink,
      data: {
        error,
      },
    };
    const action = A.failGetResetPasswordLink(error);
    expect(action).toEqual(expectedAction);
  });

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

  it('should create initAuthorization action', () => {
    const expectedAction: I.InitAuthorization = {
      type: UserEnum.InitAuthorization,
    };

    const action = A.initAuthorization();
    expect(action).toEqual(expectedAction);
  });

  it('should create SuccessAuthorization action', () => {
    const {
      user: { userData },
    } = mockedStore();
    const expectedAction: I.SuccessAuthorization = {
      type: UserEnum.SuccessAuthorization,
      data: {
        user: userData,
      },
    };
    const action = A.successAuthorization({ userData });
    expect(action).toEqual(expectedAction);
  });

  it('should create failAuthorization action', () => {
    const error = new Error();
    const expectedAction: I.FailAuthorization = {
      type: UserEnum.FailAuthorization,
      data: {
        error,
      },
    };
    const action = A.failAuthorization(error);
    expect(action).toEqual(expectedAction);
  });

  it('should create cleanUserData action', () => {
    const expectedAction: I.CleanUserData = {
      type: UserEnum.CleanUserData,
    };

    const action = A.cleanUserData();
    expect(action).toEqual(expectedAction);
  });
});
