import { GameStateInterface } from '../../../store/game/initialState.interface';
import { gameInitialState as initialState } from '../../../store/game/initialState';
import gameReducer from '../../../store/game/reducer';
import { GameEnum } from '../../../store/game/enum';
import * as I from '../../../store/game/action.interface';
import { postsResponseMock } from '../../../mocks/responses';
import { convertPosts } from '../../../utils/posts/posts';
import { AlertTypes, NetworkError } from '../../../models/alerts';
import { GameStatus, Gender } from '../../../models/game-models';
import { mockedStore, mockPost } from '../../../mocks/store';

describe('Reducer: Game', () => {
  let reducerState: GameStateInterface;

  beforeEach(() => {
    reducerState = initialState;
  });

  it('should return initial state', () => {
    const state = gameReducer(initialState, {} as any);
    expect(state).toEqual(initialState);
  });

  it('should handle CleanGameAlerts', () => {
    const action: I.CleanGameAlerts = {
      type: GameEnum.CleanGameAlerts,
    };
    const state = gameReducer(initialState, action);
    const expectedState: GameStateInterface = {
      ...initialState,
      alertType: null,
      error: null,
      alert: null,
    };
    expect(state).toEqual(expectedState);
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
      alertType: AlertTypes.FetchingPosts,
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
    expect(state).toEqual({ ...initialState, gameStatus: GameStatus.NewGame });
  });

  it('should handle CleanIsReadyToGameData', () => {
    const action: I.CleanGameData = {
      type: GameEnum.CleanGameData,
    };
    const expectedState: GameStateInterface = {
      ...initialState,
      isReadyToStartGame: null,
      gameStatus: GameStatus.NewGame,
    };
    const state = gameReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it('should handle SaveGameStatus', () => {
    const action: I.SaveGameStatus = {
      type: GameEnum.SaveGameStatus,
      data: {
        gameStatus: GameStatus.Level1,
      },
    };
    const expectedState: GameStateInterface = {
      ...initialState,
      gameStatus: GameStatus.Level1,
    };
    const state = gameReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it('should handle SaveActiveGameData', () => {
    const mockedPost = mockPost();
    const action: I.SaveActiveGameData = {
      type: GameEnum.SaveActiveGameData,
      data: {
        currentTask: mockedPost,
        removedPosts: [[], [], []],
      },
    };
    const expectedState: GameStateInterface = {
      ...initialState,
      currentTask: mockedPost,
    };
    const state = gameReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it('should handle RandomizeTask', () => {
    const action: I.RandomizeTask = {
      type: GameEnum.RandomizeTask,
      data: {
        activePerson: Gender.Woman,
      },
    };
    const stateForGameInProgress: GameStateInterface = mockedStore().game;
    stateForGameInProgress.gameStatus = GameStatus.Level1;

    const state = gameReducer(stateForGameInProgress, action);
    expect(state.currentTask).toBeTruthy();
    expect(state.posts.level1.removedPosts).toHaveLength(1);
  });

  it('should handle CleanCurrentTask', () => {
    const action: I.CleanCurrentTask = {
      type: GameEnum.CleanCurrentTask,
    };

    const state = gameReducer(initialState, action);
    expect(state).toEqual(initialState);
  });

  it('should handle SetPoints', () => {
    const action: I.SetPoints = {
      type: GameEnum.SetPoints,
      data: {
        man: 3,
        woman: 3,
      },
    };

    const state = gameReducer(initialState, action);
    const expectedState: GameStateInterface = {
      ...initialState,
      points: {
        man: 3,
        woman: 3,
      },
    };

    expect(state).toEqual(expectedState);
  });
});
