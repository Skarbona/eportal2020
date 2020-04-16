/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppThunk } from '../../store.interface';
import { LocalStorage } from '../../../models/local-storage';
import { cleanAppDataHandler } from './cleanAppDataHandler';

export const logout = (): AppThunk => (dispatch) => {
  dispatch(cleanAppDataHandler());
  window.localStorage.removeItem(LocalStorage.UserDataAccessToken);
  window.localStorage.removeItem(LocalStorage.UserDataRefreshToken);
  window.localStorage.removeItem(LocalStorage.GameConfig);
  window.localStorage.removeItem(LocalStorage.GameStatus);
};
