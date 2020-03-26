import { GameStateInterface } from '../../../store/game/initialState.interface';
import { gameInitialState as initialState } from '../../../store/game/initialState';
import gameReducer from '../../../store/game/reducer';
import { GameEnum } from '../../../store/game/enum';
import * as I from '../../../store/game/action.interface';
import { postsResponseMock } from '../../../mocks/responses';
import { convertedPosts } from '../../../utils/post-data-for-game';

describe('Reducer: Game', () => {
  let reducerState: GameStateInterface;

  beforeEach(() => {
    reducerState = initialState;
  });

  it('should return initial state', () => {
    const state = gameReducer(initialState, {} as any);
    expect(state).toEqual(initialState);
  });

  it('should handle InitFetchPosts', () => {
    const action: I.InitFetchPosts = {
      type: GameEnum.InitFetchPosts,
    };
    const state = gameReducer(initialState, action);
    const expectedState = {
      ...initialState,
      loading: true,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle SuccessFetchPosts', () => {
    const posts = postsResponseMock();
    const action: I.SuccessFetchPosts = {
      type: GameEnum.SuccessFetchPosts,
      data: {
        posts,
      },
    };
    const state = gameReducer(initialState, action);
    const expectedState = {
      ...initialState,
      loading: false,
      posts: convertedPosts(posts),
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle FailFetchPosts', () => {
    const error = new Error();
    const action: I.FailFetchPosts = {
      type: GameEnum.FailFetchPosts,
      data: {
        error,
      },
    };
    const state = gameReducer(initialState, action);
    const expectedState = {
      ...initialState,
      loading: false,
      error,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle SetFormValues', () => {
    const values = { place: 'new-place-id' };
    const action: I.SetFormValues = {
      type: GameEnum.SetFormValues,
      data: {
        values,
      },
    };
    const state = gameReducer(initialState, action);
    const expectedState = {
      ...initialState,
      config: {
        ...initialState.config,
        ...values,
      },
    };
    expect(state).toEqual(expectedState);
  });
});
