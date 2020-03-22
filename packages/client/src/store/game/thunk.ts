/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios';

import { AppThunk } from '../store.interface';
import { failFetchPosts, successFetchPosts, initFetchPosts } from './action';
import { PostResponseInterface } from '../../../../service/src/models/post';
import { LocalStorage } from "../../models/local-storage";

export const fetchPosts = (): AppThunk => async (dispatch, getState) => {
  dispatch(initFetchPosts());
  try {
    const { game } = getState();
    // TODO: Filter posts!!
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_API}/posts`);
    dispatch(successFetchPosts(data.posts as PostResponseInterface));
  } catch (e) {
    dispatch(failFetchPosts(e));
  }
};

export const startGameHandler = (): AppThunk => async (dispatch, getState) => {
  const {
    game: { config },
  } = getState();
  if (config.saveAsDefault) {
    // TODO: Add fetching as default
    // TODO: IF Fail small error on website down
  }
  dispatch(fetchPosts());
  localStorage.setItem(LocalStorage.GameConfig, JSON.stringify(config));
};
