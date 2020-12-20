import { GameActions } from './action.interface';
import { GameEnum } from './enum';
import { gameInitialState } from './initialState';
import { GameStateInterface } from './initialState.interface';
import {
  checkIfHasEnoughPosts,
  convertPosts,
  randomizeNewTask,
  filterRemovedPosts,
} from '../../utils/posts/posts';
import { AlertTypes } from '../../models/alerts';
import { GameStatus } from '../../models/game-models';

const gameReducer = (state = gameInitialState, action: GameActions): GameStateInterface => {
  switch (action.type) {
    case GameEnum.CleanGameAlerts: {
      return {
        ...state,
        error: null,
        alert: null,
        alertType: null,
      };
    }
    case GameEnum.InitFetchPosts:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GameEnum.SuccessFetchPosts: {
      const { posts, makeCheck } = action.data;
      const convertedPosts = convertPosts(posts);
      return {
        ...state,
        loading: false,
        posts: convertedPosts,
        isReadyToStartGame: makeCheck
          ? checkIfHasEnoughPosts(convertedPosts, state.config.levels)
          : null,
      };
    }
    case GameEnum.FailFetchPosts: {
      const { error } = action.data;
      let alertType = AlertTypes.ServerError;
      const errorStatus = error.response?.status;
      if (!errorStatus || errorStatus >= 500) {
        alertType = AlertTypes.ServerError;
      } else if (errorStatus === 401) {
        alertType = AlertTypes.UnAuthorized;
      } else {
        alertType = AlertTypes.FetchingPosts;
      }
      return {
        ...state,
        loading: false,
        error,
        alertType,
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
      return {
        ...gameInitialState,
        gameStatus: GameStatus.NewGame,
      };
    case GameEnum.CleanIsReadyToGameData: {
      return {
        ...state,
        isReadyToStartGame: null,
      };
    }
    case GameEnum.SaveGameStatus:
      return {
        ...state,
        gameStatus: action.data.gameStatus,
      };

    case GameEnum.SaveActiveGameData: {
      const { currentTask, removedPosts } = action.data;
      const newState = {
        ...state,
        posts: {
          ...state.posts,
          level1: {
            ...state.posts.level1,
            removedPosts: [...removedPosts[0]],
          },
          level2: {
            ...state.posts.level2,
            removedPosts: [...removedPosts[1]],
          },
          level3: {
            ...state.posts.level3,
            removedPosts: [...removedPosts[2]],
          },
        },
      };

      const posts = filterRemovedPosts(newState.posts);

      return {
        ...newState,
        posts,
        currentTask,
      };
    }
    case GameEnum.CleanCurrentTask: {
      return {
        ...state,
        currentTask: null,
      };
    }
    case GameEnum.SetPoints: {
      const { man, woman } = action.data;
      return {
        ...state,
        points: {
          man: state.points.man + man,
          woman: state.points.woman + woman,
        },
      };
    }
    case GameEnum.RandomizeTask: {
      const { activePerson, favouritesPosts, onlyFavourites } = action.data;
      const newState = { ...state };
      const { currentTask, posts } = randomizeNewTask(newState, {
        gender: activePerson,
        favouritesPosts,
        onlyFavourites,
      });
      return {
        ...newState,
        currentTask,
        posts,
      };
    }
    default:
      return state;
  }
};

export default gameReducer;
