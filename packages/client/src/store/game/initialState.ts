import { GameStateInterface, GameStatus } from './initialState.interface';

export const gameInitialState: GameStateInterface = {
  gameStatus: GameStatus.None,
  posts: {
    level1: {
      data: {
        man: [],
        woman: [],
      },
      removedPosts: [],
    },
    level2: {
      data: {
        man: [],
        woman: [],
      },
      removedPosts: [],
    },
    level3: {
      data: {
        man: [],
        woman: [],
      },
      removedPosts: [],
    },
  },
  config: null,
  loading: false,
};
