import { UserStateInterface } from '../../../store/user/initialState.interface';
import { userInitialState as initialState } from '../../../store/user/initialState';
import userReducer from '../../../store/user/reducer';
import { UserEnum } from '../../../store/user/enum';
import * as I from '../../../store/user/action.interface';
import { categoryResponseMock } from '../../../mocks/responses';
import { mockedStore } from '../../../mocks/store';

describe('Reducer: User', () => {
  let reducerState: UserStateInterface;

  beforeEach(() => {
    reducerState = initialState;
  });

  it('should return initial state', () => {
    const state = userReducer(initialState, {} as any);
    expect(state).toEqual(initialState);
  });

  it.skip('should handle InitFetchUserData', () => {
    const action: I.InitFetchUserData = {
      type: UserEnum.InitFetchUserData,
    };
    const state = userReducer(initialState, action);
    const expectedState = {
      ...initialState,
      loading: true,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle SuccessFetchUserData', () => {
    const {
      user: { userData },
    } = mockedStore();
    const action: I.SuccessFetchUserData = {
      type: UserEnum.SuccessFetchUserData,
      data: {
        user: userData,
      },
    };
    const state = userReducer(initialState, action);
    const expectedState = {
      ...initialState,
      loading: false,
      userData,
    };
    expect(state).toEqual(expectedState);
  });

  it.skip('should handle FailFetchUserData', () => {
    const error = new Error();
    const action: I.FailFetchUserData = {
      type: UserEnum.FailFetchUserData,
      data: {
        error,
      },
    };
    const state = userReducer(initialState, action);
    const expectedState = {
      ...initialState,
      loading: false,
      error,
    };
    expect(state).toEqual(expectedState);
  });

  it('should return initial state', () => {
    const state = userReducer(initialState, {} as any);
    expect(state).toEqual(initialState);
  });

  it.skip('should handle InitSetUserData', () => {
    const action: I.InitSetUserData = {
      type: UserEnum.InitSetUserData,
    };
    const state = userReducer(initialState, action);
    const expectedState = {
      ...initialState,
      loading: true,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle SuccessSetUserData', () => {
    const {
      user: { userData },
    } = mockedStore();
    const action: I.SuccessSetUserData = {
      type: UserEnum.SuccessSetUserData,
      data: {
        user: userData,
      },
    };
    const state = userReducer(initialState, action);
    const expectedState = {
      ...initialState,
      loading: false,
      userData,
    };
    expect(state).toEqual(expectedState);
  });

  it.skip('should handle FailSetUserData', () => {
    const error = new Error();
    const action: I.FailSetUserData = {
      type: UserEnum.FailSetUserData,
      data: {
        error,
      },
    };
    const state = userReducer(initialState, action);
    const expectedState = {
      ...initialState,
      loading: false,
      error,
    };
    expect(state).toEqual(expectedState);
  });
});
