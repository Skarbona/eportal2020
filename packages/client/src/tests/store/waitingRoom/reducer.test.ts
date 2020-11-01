import { WaitingRoomInterface } from '../../../store/waitingRoom/initialState.interface';
import { waitingRoomInitialState as initialState } from '../../../store/waitingRoom/initialState';
import userReducer from '../../../store/waitingRoom/reducer';
import { WaitingRoomEnum } from '../../../store/waitingRoom/enum';
import * as I from '../../../store/waitingRoom/action.interface';
import { mockedStore } from '../../../mocks/store';
import { AlertTypes, NetworkError } from '../../../models/alerts';

describe('Reducer: WaitingRoom', () => {
  let reducerState: WaitingRoomInterface;

  beforeEach(() => {
    reducerState = initialState;
  });

  it('should return initial state', () => {
    const state = userReducer(initialState, {} as any);
    expect(state).toEqual(initialState);
  });

  it('should handle InitSavePosts', () => {
    const action: I.InitSavePosts = {
      type: WaitingRoomEnum.InitSavePosts,
    };
    const state = userReducer(initialState, action);
    const expectedState: WaitingRoomInterface = {
      ...initialState,
      alert: false,
      error: null,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle InitGetPosts', () => {
    const action: I.InitGetPosts = {
      type: WaitingRoomEnum.InitGetPosts,
    };
    const state = userReducer(initialState, action);
    const expectedState: WaitingRoomInterface = {
      ...initialState,
      loading: true,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle SuccessGetPosts', () => {
    const { waitingRoom } = mockedStore();
    const action: I.SuccessGetPosts = {
      type: WaitingRoomEnum.SuccessGetPosts,
      data: {
        posts: waitingRoom.posts,
      },
    };
    const state = userReducer(initialState, action);
    const expectedState: WaitingRoomInterface = {
      ...initialState,
      loading: false,
      posts: waitingRoom.posts,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle SuccessSavePosts', () => {
    const action: I.SuccessSavePosts = {
      type: WaitingRoomEnum.SuccessSavePosts,
    };
    const state = userReducer(initialState, action);
    const expectedState: WaitingRoomInterface = {
      ...initialState,
      alert: true,
      alertType: AlertTypes.SavePost,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle CleanAlerts', () => {
    const action: I.CleanAlerts = {
      type: WaitingRoomEnum.CleanAlerts,
    };
    const state = userReducer(initialState, action);
    const expectedState: WaitingRoomInterface = {
      ...initialState,
      alert: false,
      error: null,
      alertType: null,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle FailSavePosts', () => {
    const error = new Error() as NetworkError;
    const action: I.FailSavePosts = {
      type: WaitingRoomEnum.FailSavePosts,
      data: {
        error,
      },
    };
    const state = userReducer(initialState, action);
    const expectedState: WaitingRoomInterface = {
      ...initialState,
      loading: false,
      error,
      alertType: AlertTypes.ServerError,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle FailGetPosts', () => {
    const error = new Error() as NetworkError;
    const action: I.FailGetPosts = {
      type: WaitingRoomEnum.FailGetPosts,
      data: {
        error,
      },
    };
    const state = userReducer(initialState, action);
    const expectedState: WaitingRoomInterface = {
      ...initialState,
      loading: false,
      error,
      alertType: AlertTypes.ServerError,
    };
    expect(state).toEqual(expectedState);
  });
});
