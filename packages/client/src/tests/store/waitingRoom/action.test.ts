import * as I from '../../../store/waitingRoom/action.interface';
import { WaitingRoomEnum } from '../../../store/waitingRoom/enum';
import * as A from '../../../store/waitingRoom/action';
import { mockedStore } from '../../../mocks/store';

describe('Actions: WaitingRoom', () => {
  it('should create CleanAlerts action', () => {
    const expectedAction: I.CleanAlerts = {
      type: WaitingRoomEnum.CleanAlerts,
    };

    const action = A.cleanAlerts();
    expect(action).toEqual(expectedAction);
  });

  it('should create InitSavePosts action', () => {
    const expectedAction: I.InitSavePosts = {
      type: WaitingRoomEnum.InitSavePosts,
    };

    const action = A.initSavePosts();
    expect(action).toEqual(expectedAction);
  });

  it('should create SuccessSavePosts action', () => {
    const expectedAction: I.SuccessSavePosts = {
      type: WaitingRoomEnum.SuccessSavePosts,
    };

    const action = A.successSavePosts();
    expect(action).toEqual(expectedAction);
  });

  it('should create InitGetPosts action', () => {
    const expectedAction: I.InitGetPosts = {
      type: WaitingRoomEnum.InitGetPosts,
    };

    const action = A.initGetPosts();
    expect(action).toEqual(expectedAction);
  });

  it('should create SuccessGetPosts action', () => {
    const { waitingRoom } = mockedStore();
    const expectedAction: I.SuccessGetPosts = {
      type: WaitingRoomEnum.SuccessGetPosts,
      data: {
        posts: waitingRoom.posts,
      },
    };

    const action = A.successGetPosts(waitingRoom.posts);
    expect(action).toEqual(expectedAction);
  });

  it('should create failGetPosts action', () => {
    const error = new Error();
    const expectedAction: I.FailGetPosts = {
      type: WaitingRoomEnum.FailGetPosts,
      data: {
        error,
      },
    };

    const action = A.failGetPosts(error);
    expect(action).toEqual(expectedAction);
  });

  it('should create failSavePosts action', () => {
    const error = new Error();
    const expectedAction: I.FailSavePosts = {
      type: WaitingRoomEnum.FailSavePosts,
      data: {
        error,
      },
    };

    const action = A.failSavePosts(error);
    expect(action).toEqual(expectedAction);
  });
});
