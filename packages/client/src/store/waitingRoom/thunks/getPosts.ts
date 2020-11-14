/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios';

import { AppThunk } from '../../store.interface';
import { PostResponseInterface } from '../../../../../service/src/models/shared-interfaces/post';
import { initGetPosts, successGetPosts, failGetPosts } from '../action';
import { BACKEND_API } from '../../../constants/envs';
import { PostStatus } from '../../../models/posts';

export const getPosts = (search?: string): AppThunk => async (dispatch, getState) => {
  dispatch(initGetPosts());
  try {
    const {
      app: { auth },
    } = getState();
    const { data } = await axios.get(
      `${BACKEND_API}/posts${search || `?status=${PostStatus.AwaitingForApproval}`}`,
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      },
    );
    dispatch(successGetPosts(data.posts as PostResponseInterface[]));
  } catch (e) {
    dispatch(failGetPosts(e));
  }
};
