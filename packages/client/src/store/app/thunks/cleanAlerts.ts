/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppThunk } from '../../store.interface';
import { cleanGameAlerts } from '../../game/action';
import { cleanAppAlerts } from '../action';
import { cleanUserAlerts } from '../../user/action';
import { cleanCategoriesAlerts } from '../../categories/action';
import { cleanPagesAlerts } from '../../pages/action';

export const cleanAlertsHandler = (): AppThunk => (dispatch) => {
  dispatch(cleanGameAlerts());
  dispatch(cleanAppAlerts());
  dispatch(cleanUserAlerts());
  dispatch(cleanCategoriesAlerts());
  dispatch(cleanPagesAlerts());
};
