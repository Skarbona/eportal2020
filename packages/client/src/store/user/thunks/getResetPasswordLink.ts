/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios';

import { AppThunk } from '../../store.interface';
import * as A from '../action';
import i18n from '../../../settings/translation-settings';

export const getResetPasswordLink = (email: string): AppThunk => async (dispatch) => {
  dispatch(A.initGetResetPasswordLink());
  try {
    const requestBody = { email };

    await axios.post(
      `${process.env.REACT_APP_BACKEND_API}/users/reset-password/?lang=${i18n.language}`,
      requestBody,
    );
    dispatch(A.successGetResetPasswordLink());
  } catch (e) {
    dispatch(A.failGetResetPasswordLink(e));
  }
};
