/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { cleanGameData } from '../../game/action';
import { AppThunk } from '../../store.interface';
import { cleanAppData } from '../action';
import { cleanUserData } from '../../user/action';
import { cleanCategoriesData } from '../../categories/action';

export const cleanAppDataHandler = (): AppThunk => (dispatch) => {
  dispatch(cleanAppData());
  dispatch(cleanCategoriesData());
  dispatch(cleanGameData());
  dispatch(cleanUserData());
};
