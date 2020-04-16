/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { saveGameStatus } from '../action';
import { AppThunk } from '../../store.interface';
import { LocalStorage } from '../../../models/local-storage';
import { GameStatus } from '../initialState.interface';

export const setGameStatus = (gameStatus: GameStatus): AppThunk => (dispatch) => {
  dispatch(saveGameStatus(gameStatus));
  window.localStorage.setItem(LocalStorage.GameStatus, gameStatus);
};
