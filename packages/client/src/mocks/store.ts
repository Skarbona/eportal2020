import { RootState } from '../store/store.interface';
import { CategoryInterface } from '../store/categories/initialState.interface';
import { GameStatus, TimeMode } from '../models/game-models';
import {
  PostResponseInterface,
  PostStatus,
} from '../../../service/src/models/shared-interfaces/post';
import { chance } from './chance';

import { FormValues, UserType } from '../../../service/src/models/shared-interfaces/user';

const catId1 = chance.string();
const catId2 = chance.string();
const catId3 = chance.string();

const mockPost = (): PostResponseInterface => ({
  content: {
    title: chance.string(),
    content: chance.sentence(),
  },
  id: chance.string(),
  author: chance.string(),
  image: chance.string(),
  date: new Date(),
  slug: chance.string(),
  categories: [catId1, catId2, catId3],
  status: PostStatus.Publish,
});

const mockDefaults = (): FormValues => ({
  names: {
    she: chance.name(),
    he: chance.name(),
  },
  place: chance.string(),
  catsQuery: {
    catsInclude: [catId1, catId2],
    catsExclude: [catId3],
  },
  levels: {
    level1: 11,
    level2: 11,
    level3: 11,
  },
  time: {
    type: TimeMode.Single,
    value: [2],
  },
  saveAsDefault: false,
});

const mockedCategory = (name: string, nested = 0): CategoryInterface => ({
  id: name,
  date: new Date(),
  slug: name,
  name,
  children:
    nested > 0
      ? [
          mockedCategory('children1', nested - 1),
          mockedCategory('children2', nested - 1),
          mockedCategory('children1', nested - 1),
        ]
      : [],
});

export const mockedStore = (): RootState => ({
  app: {
    auth: {
      accessToken: chance.string(),
      accessTokenExpiration: new Date(),
      refreshToken: chance.string(),
      refreshTokenExpiration: new Date(),
    },
  },
  categories: {
    categories: {
      preferences: mockedCategory('preferences', 2),
      gender: mockedCategory('gender', 1),
      places: mockedCategory('places', 1),
      levels: mockedCategory('levels', 1),
    },
    loading: false,
  },
  game: {
    currentTask: null,
    isReadyToStartGame: null,
    gameStatus: GameStatus.NewGame,
    posts: {
      level1: {
        data: {
          man: [mockPost(), mockPost()],
          woman: [mockPost(), mockPost()],
        },
        removedPosts: [],
      },
      level2: {
        data: {
          man: [mockPost(), mockPost()],
          woman: [mockPost(), mockPost()],
        },
        removedPosts: [],
      },
      level3: {
        data: {
          man: [mockPost(), mockPost()],
          woman: [mockPost(), mockPost()],
        },
        removedPosts: [],
      },
    },
    config: mockDefaults(),
    loading: false,
  },
  user: {
    userData: {
      id: chance.word(),
      date: new Date(),
      name: chance.name(),
      email: chance.email(),
      type: UserType.User,
      gameDefaults: mockDefaults(),
    },
    loading: false,
  },
});
