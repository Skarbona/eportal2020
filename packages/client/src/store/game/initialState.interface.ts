import { PostResponseInterface } from '../../../../service/src/models/shared-interfaces/post';
import { FormValues } from '../../../../service/src/models/shared-interfaces/user';
import { ErrorTypes, NetworkError } from '../../models/errors';

export enum GameStatus {
  'Level1',
  'Level2',
  'Level3',
  'Summary',
  'None',
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
  config: FormValues;
  loading: boolean;
  error?: NetworkError;
  errorType?: ErrorTypes;
}
