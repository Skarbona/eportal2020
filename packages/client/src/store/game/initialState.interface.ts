import { PostResponseInterface } from '../../../../service/src/models/shared-interfaces/post';
import { FormValues } from '../../../../service/src/models/shared-interfaces/user';
import { ErrorTypes, NetworkError } from '../../models/errors';
import { GameStatus } from '../../models/game-models';

export interface CheckIfHasEnoughPosts {
  hasEnough: boolean;
  canStartWithSmallerAmount: boolean;
  level1: {
    hasEnough: boolean;
    expected: number;
    has: number;
  };
  level2: {
    hasEnough: boolean;
    expected: number;
    has: number;
  };
  level3: {
    hasEnough: boolean;
    expected: number;
    has: number;
  };
}

export interface GameStateInterface {
  gameStatus: GameStatus;
  currentTask: PostResponseInterface;
  points: {
    man: number;
    woman: number;
  };
  posts: {
    level1: {
      data: {
        man: PostResponseInterface[];
        woman: PostResponseInterface[];
      };
      removedPosts?: string[];
    };
    level2: {
      data: {
        man: PostResponseInterface[];
        woman: PostResponseInterface[];
      };
      removedPosts?: string[];
    };
    level3: {
      data: {
        man: PostResponseInterface[];
        woman: PostResponseInterface[];
      };
      removedPosts?: string[];
    };
  };
  isReadyToStartGame: CheckIfHasEnoughPosts;
  config: FormValues;
  loading: boolean;
  error?: NetworkError;
  errorType?: ErrorTypes;
}
