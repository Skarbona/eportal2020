import { GameActions } from './action.interface';
import { GameEnum } from './enum';
import { gameInitialState } from './initialState';
import { GameStateInterface } from './initialState.interface';

const gameReducer = (state = gameInitialState, action: GameActions): GameStateInterface => {
  switch (action.type) {
    case GameEnum.InitFetchPosts:
      return {
        ...state,
        loading: true,
      };
    case GameEnum.SuccessFetchPosts: {
      const { posts } = action.data;
      return {
        ...state,
        loading: false,
        // TODO: Set Posts data
      };
    }
    case GameEnum.FailFetchPosts:
      return {
        ...state,
        ...gameInitialState,
        loading: false,
        error: action.data.error,
      };
    case GameEnum.SetFormValues:
      return {
        ...state,
        config: {
          ...state.config,
          ...action.data.values,
        },
      };
    default:
      return state;
  }
};

export default gameReducer;
