import { UserStateInterface } from './initialState.interface';

export const userInitialState: UserStateInterface = {
  userData: {
    id: null,
    date: null,
    name: null,
    email: null,
    type: null,
    gameDefaults: null,
  },
  loading: false,
  userPosts: [],
};
