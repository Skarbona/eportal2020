import { PostResponseInterface } from '../../../../service/src/models/shared-interfaces/post';
import { FormValues } from '../../../../service/src/models/shared-interfaces/user';
import { ErrorTypes, NetworkError } from '../../models/errors';

export enum GameStatus {
  'NewGame' = 'NewGame',
  'Level1' = 'Level1',
  'Level2' = 'Level2',
  'Level3' = 'Level3',
  'Summary' = 'Summary',
}

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
