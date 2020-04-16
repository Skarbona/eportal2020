import { GameActions } from './action.interface';
import { GameEnum } from './enum';
import { gameInitialState } from './initialState';
import { GameStateInterface } from './initialState.interface';
import { convertedPosts } from '../../utils/post-data-for-game';
import { ErrorTypes } from '../../models/errors';

const gameReducer = (state = gameInitialState, action: GameActions): GameStateInterface => {
  switch (action.type) {
    case GameEnum.InitFetchPosts:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GameEnum.SuccessFetchPosts: {
      const { posts } = action.data;

      return {
        ...state,
        loading: false,
        posts: convertedPosts(posts),
      };
    }
    case GameEnum.FailFetchPosts: {
      const { error } = action.data;
      let errorType = ErrorTypes.ServerError;
      const errorStatus = error.response?.status;
      if (!errorStatus || errorStatus >= 500) {
        errorType = ErrorTypes.ServerError;
      } else if (errorStatus === 401) {
        errorType = ErrorTypes.UnAuthorized;
      } else {
        errorType = ErrorTypes.FetchingPosts;
      }
      return {
        ...state,
        ...gameInitialState,
        loading: false,
        error,
        errorType,
      };
    }
    case GameEnum.SetFormValues:
      return {
        ...state,
        config: {
          ...state.config,
          ...action.data.values,
        },
      };
    case GameEnum.CleanGameData:
      return gameInitialState;
    case GameEnum.SaveGameStatus:
      return {
        ...state,
        gameStatus: action.data.gameStatus,
      };
    default:
      return state;
  }
};

export default gameReducer;
