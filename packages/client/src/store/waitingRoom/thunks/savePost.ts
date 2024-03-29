/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios';

import { AppThunk } from '../../store.interface';
import { initSavePosts, successSavePosts, failSavePosts } from '../action';
import { BACKEND_API } from '../../../constants/envs';
import { getPosts } from './getPosts';
import { PostStatus } from '../../../models/posts';

export const savePost =
  (post: SavePost, search?: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(initSavePosts());
    try {
      const {
        app: { auth },
      } = getState();
      await axios.patch(
        `${BACKEND_API}/posts`,
        {
          post,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        },
      );
      dispatch(successSavePosts());
      dispatch(getPosts(search));
    } catch (e: any) {
      dispatch(failSavePosts(e));
    }
  };

interface SavePost {
  id: string;
  categories?: string[];
  content?: {
    title: string;
    content: string;
  };
  status?: PostStatus;
}
