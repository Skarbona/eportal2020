/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { setUserData } from '../../user/thunks/setUserData';
import { AppThunk } from '../../store.interface';
import { fetchPostsForGame } from './fetchPostsForGame';

export const startGameHandler = (): AppThunk => async (dispatch, getState) => {
  const {
    game: { config },
  } = getState();
  if (config.saveAsDefault) {
    dispatch(setUserData());
  }
  dispatch(fetchPostsForGame(true));
};
