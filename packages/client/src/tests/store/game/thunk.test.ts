import axios from 'axios';

import * as gameThunk from '../../../store/game/thunk';
import * as gameActions from '../../../store/game/action';
import * as userActions from '../../../store/user/action';
import { RootState } from '../../../store/store.interface';
import { mockedStore } from '../../../mocks/store';

jest.mock('../../../store/game/action', () => ({
  failFetchPosts: jest.fn(),
  successFetchPosts: jest.fn(),
  initFetchPosts: jest.fn(),
}));

jest.mock('../../../store/user/action', () => ({
  initSetUserData: jest.fn(),
  successSetUserData: jest.fn(),
  failSetUserData: jest.fn(),
}));

describe('Thunk: game', () => {
  let dispatch: any;
  let store: RootState;

  beforeEach(() => {
    store = mockedStore();
    dispatch = jest.fn();
  });

  describe('fetchPostsForGame thunk', () => {
    it('should call all required action in success path', async () => {
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: { posts: [] } }));
      await gameThunk.fetchPostsForGame()(dispatch, () => store, null);
      expect(gameActions.initFetchPosts).toHaveBeenCalled();
      expect(gameActions.successFetchPosts).toHaveBeenCalledWith([]);
    });

    it('should call all required action in fail path', async () => {
      const error = new Error();
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(error));
      await gameThunk.fetchPostsForGame()(dispatch, () => store, null);
      expect(gameActions.initFetchPosts).toHaveBeenCalled();
      expect(gameActions.failFetchPosts).toHaveBeenCalledWith(error);
    });
  });

  describe('startGameHandler thunk', () => {
    it('should call all required actions and thunks', async () => {
      jest.spyOn(window.localStorage.__proto__, 'setItem');
      window.localStorage.__proto__.setItem = jest.fn();

      await gameThunk.startGameHandler()(dispatch, () => store, null);

      // setUserData THUNK actions
      expect(userActions.initSetUserData).not.toHaveBeenCalled();

      // fetchPostsForGame THUNK actions
      expect(gameActions.initFetchPosts).toHaveBeenCalled();

      expect(window.localStorage.setItem).toHaveBeenCalled();
    });

    it('should call all required actions and thunks if saveAsDefault selected', async () => {
      jest.spyOn(window.localStorage.__proto__, 'setItem');
      window.localStorage.__proto__.setItem = jest.fn();
      store.game.config.saveAsDefault = true;

      await gameThunk.startGameHandler()(dispatch, () => store, null);

      // setUserData THUNK actions
      // TODO: Check why I cannot detect failSetUserData
      // expect(userActions.failSetUserData).toHaveBeenCalled();

      // fetchPostsForGame THUNK actions
      expect(gameActions.initFetchPosts).toHaveBeenCalled();

      expect(window.localStorage.setItem).toHaveBeenCalled();
    });
  });
});
