/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios';

import { AppThunk } from '../../store.interface';
import { PostResponseInterface } from '../../../../../service/src/models/shared-interfaces/post';
import { failFetchPosts, initFetchPosts, successFetchPosts } from '../action';
import { setGameStatus } from './setGameStatus';
import { GameStatus } from '../initialState.interface';

export const fetchPostsForGame = (gameStatus?: GameStatus): AppThunk => async (
  dispatch,
  getState,
) => {
  dispatch(initFetchPosts());
  try {
    const {
      game: {
        config: { place, catsQuery },
      },
      app: { auth },
    } = getState();
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}/posts?catsIncludeStrict=${place}&catsExclude=${catsQuery.catsExclude}`,
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      },
    );
    dispatch(successFetchPosts(data.posts as PostResponseInterface));
    dispatch(setGameStatus(gameStatus || GameStatus.Level1));
  } catch (e) {
    dispatch(failFetchPosts(e));
  }
};
