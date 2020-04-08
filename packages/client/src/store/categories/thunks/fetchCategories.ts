/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios';

import { categoriesIds } from '../../../constants/categoriesIds';
import { initFetchCategories, successFetchCategories, failFetchCategories } from '../action';
import { AppThunk } from '../../store.interface';

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
    dispatch(failFetchCategories(e));
  }
};
