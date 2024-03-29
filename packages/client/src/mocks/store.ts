import { RootState } from '../store/store.interface';
import { CategoryInterface } from '../store/categories/initialState.interface';
import { GameStatus, TimeMode } from '../models/game-models';
import {
  PostResponseInterface,
  PostStatus,
} from '../../../service/src/models/shared-interfaces/post';
import { chance } from './chance';

import { FormValues, UserType } from '../../../service/src/models/shared-interfaces/user';
import { CheckIfHasEnoughPosts } from '../store/game/initialState.interface';

const catId1 = chance.string();
const catId2 = chance.string();
const catId3 = chance.string();

export const CheckIfHasEnoughPostsMock = (): CheckIfHasEnoughPosts => ({
  hasEnough: true,
  canStartWithSmallerAmount: true,
  level1: {
    hasEnough: true,
    expected: 10,
    has: 20,
  },
  level2: {
    hasEnough: true,
    expected: 5,
    has: 11,
  },
  level3: {
    hasEnough: true,
    expected: 12,
    has: 15,
  },
});

export const mockPost = (): PostResponseInterface => ({
  content: {
    title: chance.string(),
    content: chance.sentence(),
  },
  id: chance.string(),
  author: {
    name: chance.string(),
  },
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
    type: TimeMode.Range,
    value: [3, 5],
  },
  saveAsDefault: false,
});

export const mockedCategory = (name: string, nested = 0): CategoryInterface => ({
  id: name,
  date: new Date(),
  slug: name,
  name,
  children:
    nested > 0
      ? [
          mockedCategory('children1', nested - 1),
          mockedCategory('children2', nested - 1),
          mockedCategory('children3', nested - 1),
        ]
      : [],
});

export const mockedStore = (): RootState => ({
  payments: {
    loading: false,
  },
  waitingRoom: {
    posts: [mockPost(), mockPost(), mockPost()],
    loading: false,
  },
  pages: {
    page: {},
  },
  app: {
    showContactForm: false,
    auth: {
      isAuthorizationDone: true,
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
    allCatsMap: new Map(),
  },
  game: {
    points: {
      man: 0,
      woman: 0,
    },
    currentTask: null,
    isReadyToStartGame: null,
    gameStatus: GameStatus.Summary,
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
      favouritesPosts: [],
      id: chance.word(),
      date: new Date(),
      name: chance.name(),
      email: chance.email(),
      type: UserType.User,
      gameDefaults: mockDefaults(),
    },
    loading: false,
    userPosts: null,
  },
});
