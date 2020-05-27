/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppThunk } from '../../store.interface';
import { cleanAppDataHandler } from './cleanAppDataHandler';
import { finishAuthorization } from '../action';

export const logout = (): AppThunk => (dispatch) => {
  dispatch(cleanAppDataHandler());
  dispatch(finishAuthorization());
  window.localStorage.clear();
};
