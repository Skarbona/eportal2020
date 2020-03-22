import { GameStateInterface, GameStatus } from './initialState.interface';

export const gameInitialState: GameStateInterface = {
  gameStatus: GameStatus.None,
  posts: {
    level1: {
      data: null,
      removedPosts: [],
    },
    level2: {
      data: null,
      removedPosts: [],
    },
    level3: {
      data: null,
      removedPosts: [],
    },
  },
  config: null,
  loading: false,
};
