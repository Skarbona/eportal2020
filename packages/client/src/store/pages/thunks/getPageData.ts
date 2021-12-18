/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios';

import { initGetPage, failGetPage, successGetPage } from '../action';
import { AppThunk } from '../../store.interface';
import { BACKEND_API } from '../../../constants/envs';

export const getPageData =
  (slug: string): AppThunk =>
  async (dispatch) => {
    dispatch(initGetPage());
    try {
      const { data } = await axios.get(`${BACKEND_API}/pages/${slug}`);
      dispatch(successGetPage(data.page));
    } catch (e) {
      dispatch(failGetPage(e));
    }
  };
