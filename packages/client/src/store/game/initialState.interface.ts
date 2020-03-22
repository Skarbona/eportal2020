import { PostResponseInterface } from '../../../../service/src/models/post';
import { TimeMode } from "../../components/Pages/Game/GameSettings/TimeForTask";

export enum GameStatus {
  'Level1',
  'Level2',
  'Level3',
  'Summary',
  'None'
}

export interface GameStateInterface {
  gameStatus: GameStatus,
  posts: {
    level1: {
      data: PostResponseInterface[];
      removedPosts: string[];
    };
    level2: {
      data: PostResponseInterface[];
      removedPosts: string[];
    };
    level3: {
      data: PostResponseInterface[];
      removedPosts: string[];
    };
  };
  config: FormValues;
  loading: boolean;
  error?: Error;
}


export interface FormValues {
  names: {
    she: string;
    he: string;
  };
  place: string;
  cats: string[];
  levels: {
    level1: number;
    level2: number;
    level3: number;
  };
  time: {
    type: TimeMode;
    value: number | number[];
  };
  saveAsDefault: boolean;
}

