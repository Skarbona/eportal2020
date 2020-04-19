import axios from 'axios';

import * as startGameThunk from '../../../store/game/thunks/startGame';
import * as fetchPostsForGameThunk from '../../../store/game/thunks/fetchPostsForGame';
import * as setUserDataThunk from '../../../store/user/thunks/setUserData';
import * as gameActions from '../../../store/game/action';
import * as userActions from '../../../store/user/action';
import { RootState } from '../../../store/store.interface';
import { mockedStore } from '../../../mocks/store';

describe('Thunk: game', () => {
  let dispatch: any;
  let store: RootState;
  let failFetchPostsSpy: any;
  let successFetchPostsSpy: any;
  let initFetchPostsSpy: any;
  let initSetUserDataSpy: any;
  let successSetUserDataSpy: any;
  let failSetUserDataSpy: any;
  let setInLocalStorageSpy: any;
  let setUserDataSpy: any;
  let fetchPostsForGameSpy: any;

  beforeEach(() => {
    store = mockedStore();
    dispatch = jest.fn();
    failFetchPostsSpy = jest.spyOn(gameActions, 'failFetchPosts');
    successFetchPostsSpy = jest.spyOn(gameActions, 'successFetchPosts');
    initFetchPostsSpy = jest.spyOn(gameActions, 'initFetchPosts');
    initSetUserDataSpy = jest.spyOn(userActions, 'initSetUserData');
    successSetUserDataSpy = jest.spyOn(userActions, 'successSetUserData');
    failSetUserDataSpy = jest.spyOn(userActions, 'failSetUserData');
    fetchPostsForGameSpy = jest.spyOn(fetchPostsForGameThunk, 'fetchPostsForGame');
    setInLocalStorageSpy = jest.spyOn(window.localStorage.__proto__, 'setItem');
    setUserDataSpy = jest
      .spyOn(setUserDataThunk, 'setUserData')
      .mockImplementation(() => jest.fn());
  });

  afterEach(() => {
    failFetchPostsSpy.mockClear();
    successFetchPostsSpy.mockClear();
    initFetchPostsSpy.mockClear();
    initSetUserDataSpy.mockClear();
    successSetUserDataSpy.mockClear();
    failSetUserDataSpy.mockClear();
    setInLocalStorageSpy.mockClear();
    setUserDataSpy.mockClear();
    fetchPostsForGameSpy.mockClear();
  });

  describe('fetchPostsForGame thunk', () => {
    it('should call all required action in success path', async () => {
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: { posts: [] } }));
      await fetchPostsForGameThunk.fetchPostsForGame(false)(dispatch, () => store, null);
      expect(initFetchPostsSpy).toHaveBeenCalled();
      expect(successFetchPostsSpy).toHaveBeenCalledWith([], false);
    });

    it('should call all required action in fail path', async () => {
      const error = new Error();
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(error));
      await fetchPostsForGameThunk.fetchPostsForGame()(dispatch, () => store, null);
      expect(initFetchPostsSpy).toHaveBeenCalled();
      expect(failFetchPostsSpy).toHaveBeenCalledWith(error);
    });
  });

  describe('startGameHandler thunk', () => {
    it('should call all required actions and thunks', async () => {
      await startGameThunk.startGameHandler()(dispatch, () => store, null);

      expect(setUserDataSpy).not.toHaveBeenCalled();
      expect(fetchPostsForGameSpy).toHaveBeenCalled();

      expect(window.localStorage.setItem).toHaveBeenCalled();
    });

    it('should call all required actions and thunks if saveAsDefault selected', async () => {
      store.game.config.saveAsDefault = true;
      await startGameThunk.startGameHandler()(dispatch, () => store, null);

      expect(setUserDataSpy).toHaveBeenCalled();
      expect(fetchPostsForGameSpy).toHaveBeenCalled();

      expect(window.localStorage.setItem).toHaveBeenCalled();
    });
  });
});
