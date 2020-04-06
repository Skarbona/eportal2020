/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios';

import { AppThunk } from '../store.interface';
import { PostResponseInterface } from '../../../../service/src/models/shared-interfaces/post';

import { failFetchPosts, successFetchPosts, initFetchPosts } from './action';
import { setUserData } from '../user/thunk';
import { LocalStorage } from '../../models/local-storage';

export const fetchPostsForGame = (token: string): AppThunk => async (dispatch, getState) => {
  dispatch(initFetchPosts());
  try {
    const {
      game: {
        config: { place, catsQuery },
      },
    } = getState();
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}/posts?catsIncludeStrict=${place}&catsExclude=${catsQuery.catsExclude}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    dispatch(successFetchPosts(data.posts as PostResponseInterface));
  } catch (e) {
    dispatch(failFetchPosts(e));
  }
};

export const startGameHandler = (): AppThunk => async (dispatch, getState) => {
  const {
    game: { config },
    app: { auth },
  } = getState();
  if (config.saveAsDefault) {
    dispatch(setUserData(auth.accessToken));
  }
  dispatch(fetchPostsForGame(auth.accessToken));
  window.localStorage.setItem(LocalStorage.GameConfig, JSON.stringify(config));
};
