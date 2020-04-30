import { GameStateInterface } from './initialState.interface';
import { GameStatus } from '../../models/game-models';

export const gameInitialState: GameStateInterface = {
  gameStatus: GameStatus.Summary,
  currentTask: null,
  points: {
    man: 0,
    woman: 0,
  },
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
  isReadyToStartGame: null,
  config: null,
  loading: false,
};
