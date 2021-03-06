/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios';

import { categoriesIds } from '../../../constants/categoriesIds';
import { initFetchCategories, successFetchCategories, failFetchCategories } from '../action';
import { AppThunk } from '../../store.interface';
import { BACKEND_API } from '../../../constants/envs';

export const fetchCategories = (): AppThunk => async (dispatch, getState) => {
  dispatch(initFetchCategories());
  try {
    const {
      app: { auth },
    } = getState();
    const { data } = await axios.get(`${BACKEND_API}/categories?ids=${categoriesIds.toString()}`, {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    dispatch(successFetchCategories(data.categories));
  } catch (e) {
    dispatch(failFetchCategories(e));
  }
};
