/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios';

import { AppThunk } from '../../store.interface';
import { initSavePosts, successSavePosts, failSavePosts } from '../action';
import { BACKEND_API } from '../../../constants/envs';
import { getPosts } from './getPosts';

export const createPost = (payload: CreatePost): AppThunk => async (dispatch, getState) => {
  dispatch(initSavePosts());
  try {
    const {
      app: { auth },
      user: {
        userData: { id },
      },
    } = getState();
    await axios.post(
      `${BACKEND_API}/posts`,
      {
        posts: [{ ...payload, author: id }],
      },
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      },
    );
    dispatch(successSavePosts());
    dispatch(getPosts());
  } catch (e) {
    dispatch(failSavePosts(e));
  }
};

interface CreatePost {
  categories: string[];
  content: {
    title: string;
    content: string;
  };
  meta?: {
    newCategory?: string;
  };
}
