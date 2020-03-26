/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios';

import { AppThunk } from '../store.interface';
import {
  initFetchUserData,
  initSetUserData,
  successFetchUserData,
  successSetUserData,
  failFetchUserData,
  failSetUserData,
} from './action';

export const setUserData = (password?: string): AppThunk => async (dispatch, getState) => {
  dispatch(initSetUserData());
  const {
    game: { config },
  } = getState();
  try {
    // TODO: get user ID from store when JWT implementention
    const { data } = await axios.patch(
      `${process.env.REACT_APP_BACKEND_API}/users/5e6e45dfdfec533ce0ebc6ee`,
      {
        gameDefaults: config,
        password,
      },
    );
    dispatch(successSetUserData(data.user));
  } catch (e) {
    // TODO: Minor error
    dispatch(failSetUserData(e));
  }
};

export const fetchUserData = (): AppThunk => async (dispatch, getState) => {
  dispatch(initFetchUserData());
  try {
    // TODO: ADD JWT
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}/users/5e6e45dfdfec533ce0ebc6ee`,
    );
    dispatch(successFetchUserData(data.user));
  } catch (e) {
    // TODO: Big error
    dispatch(failFetchUserData(e));
  }
};
