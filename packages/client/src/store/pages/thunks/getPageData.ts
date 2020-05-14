/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios';

import { initGetPage, failGetPage, successGetPage } from '../action';
import { AppThunk } from '../../store.interface';

export const getPageData = (slug: string): AppThunk => async (dispatch) => {
  dispatch(initGetPage());
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_API}/pages/${slug}`);
    dispatch(successGetPage(data.page));
  } catch (e) {
    dispatch(failGetPage(e));
  }
};
