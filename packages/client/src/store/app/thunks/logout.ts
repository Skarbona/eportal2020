/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppThunk } from '../../store.interface';
import { cleanAppDataHandler } from './cleanAppDataHandler';

export const logout = (): AppThunk => (dispatch) => {
  dispatch(cleanAppDataHandler());
  window.localStorage.clear();
};
