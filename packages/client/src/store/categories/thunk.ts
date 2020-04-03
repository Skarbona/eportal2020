/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios';

import { categoriesIds } from '../../constants/categoriesIds';
import { AppThunk } from '../store.interface';
import { failFetchCategories, initFetchCategories, successFetchCategories } from './action';

export const fetchCategories = (token: string): AppThunk => async (dispatch) => {
  dispatch(initFetchCategories());
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}/categories?ids=${categoriesIds.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    dispatch(successFetchCategories(data.categories));
  } catch (e) {
    // TODO: Handle error to users
    dispatch(failFetchCategories(e));
  }
};
