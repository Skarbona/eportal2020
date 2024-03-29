/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios';

import { AppThunk } from '../../store.interface';
import { PostResponseInterface } from '../../../../../service/src/models/shared-interfaces/post';
import { failFetchPosts, initFetchPosts, successFetchPosts } from '../action';
import { BACKEND_API } from '../../../constants/envs';

export const fetchPostsForGame =
  (makeCheck?: boolean): AppThunk =>
  async (dispatch, getState) => {
    dispatch(initFetchPosts());
    try {
      const {
        game: {
          config: { place, catsQuery },
        },
        app: { auth },
      } = getState();
      const { data } = await axios.get(
        `${BACKEND_API}/posts?catsIncludeStrict=${place}&catsInclude=${catsQuery.catsInclude}&catsExclude=${catsQuery.catsExclude}`,
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        },
      );
      dispatch(successFetchPosts(data.posts as PostResponseInterface, makeCheck));
    } catch (e) {
      dispatch(failFetchPosts(e));
    }
  };
