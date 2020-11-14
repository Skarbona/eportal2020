/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios';

import { AppThunk } from '../../store.interface';
import { PostResponseInterface } from '../../../../../service/src/models/shared-interfaces/post';
import { fetchUserPostsStart, fetchUserPostsSuccess, fetchUserPostsFail } from '../action';
import { BACKEND_API } from '../../../constants/envs';
import { PostStatus } from '../../../models/posts';

export const fetchUserPosts = (): AppThunk => async (dispatch, getState) => {
  dispatch(fetchUserPostsStart());
  try {
    const {
      app: { auth },
      user: { userData },
    } = getState();
    const { data } = await axios.get(
      `${BACKEND_API}/posts?author=${userData.id}&status=${PostStatus.Archival},${PostStatus.AwaitingForApproval},${PostStatus.Publish}`,
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      },
    );
    dispatch(fetchUserPostsSuccess(data.posts as PostResponseInterface[]));
  } catch (e) {
    dispatch(fetchUserPostsFail());
  }
};
