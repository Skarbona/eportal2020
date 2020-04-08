/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios';

import { AuthRequest } from '../../../../../service/src/models/shared-interfaces/user';
import * as A from '../action';
import { ReturnAppThunk } from '../../store.interface';
import { AuthorizationEndpoints } from '../../../models/endpoint-models';
import { login } from '../../app/thunks/login';

export const authorizeUser = (
  type: AuthorizationEndpoints,
  requestData: AuthRequest,
): ReturnAppThunk<boolean> => async (dispatch) => {
  dispatch(A.initAuthorization());
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}/users/${type}`, {
      ...requestData,
    });
    const { userData, accessToken, refreshToken } = data;
    await dispatch(
      login({
        userId: userData.id,
        accessTokenData: { accessToken },
        refreshTokenData: { refreshToken },
      }),
    );

    await dispatch(A.successAuthorization({ userData: data.userData }));
    return true;
  } catch (e) {
    await dispatch(A.failAuthorization(e));
    return false;
  }
};
