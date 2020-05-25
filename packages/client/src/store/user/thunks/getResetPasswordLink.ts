/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios';

import { ReturnAppThunk } from '../../store.interface';
import * as A from '../action';
import i18n from '../../../settings/translation-settings';

export const getResetPasswordLink = (email: string): ReturnAppThunk<boolean> => async (
  dispatch,
) => {
  dispatch(A.initGetResetPasswordLink());
  try {
    const requestBody = { email };

    await axios.post(
      `${process.env.REACT_APP_BACKEND_API}/users/reset-password/?lang=${i18n.language}`,
      requestBody,
    );
    dispatch(A.successGetResetPasswordLink());
    return true;
  } catch (e) {
    dispatch(A.failGetResetPasswordLink(e));
  }
};
