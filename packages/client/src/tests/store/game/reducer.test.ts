import { GameStateInterface } from '../../../store/game/initialState.interface';
import { gameInitialState as initialState } from '../../../store/game/initialState';
import gameReducer from '../../../store/game/reducer';
import { GameEnum } from '../../../store/game/enum';
import * as I from '../../../store/game/action.interface';
import { postsResponseMock } from '../../../mocks/responses';
import { convertPosts, checkIfHasEnoughPosts } from '../../../utils/post-data-for-game';
import { ErrorTypes, NetworkError } from '../../../models/errors';

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
    const expectedState: GameStateInterface = {
      ...initialState,
      loading: true,
      error: null,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle SuccessFetchPosts', () => {
    const posts = postsResponseMock();
    const action: I.SuccessFetchPosts = {
      type: GameEnum.SuccessFetchPosts,
      data: {
        posts,
        makeCheck: false,
      },
    };
    const state = gameReducer(initialState, action);
    const convertedPosts = convertPosts(posts);
    const expectedState: GameStateInterface = {
      ...initialState,
      loading: false,
      posts: convertedPosts,
      isReadyToStartGame: null,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle FailFetchPosts', () => {
    const error = { response: { status: 422 } } as NetworkError;
    const action: I.FailFetchPosts = {
      type: GameEnum.FailFetchPosts,
      data: {
        error,
      },
    };
    const state = gameReducer(initialState, action);
    const expectedState: GameStateInterface = {
      ...initialState,
      loading: false,
      error,
      errorType: ErrorTypes.FetchingPosts,
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
    const expectedState: GameStateInterface = {
      ...initialState,
      config: {
        ...initialState.config,
        ...values,
      },
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle CleanGameData', () => {
    const action: I.CleanGameData = {
      type: GameEnum.CleanGameData,
    };
    const state = gameReducer(initialState, action);
    expect(state).toEqual(initialState);
  });
});
