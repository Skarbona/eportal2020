import axios from 'axios';
import { AppThunk } from '../store.interface';
import { initFetchCategories, successFetchCategories, failFetchCategories } from './action';

export const fetchCategories = (): AppThunk => async dispatch => {
  console.log('wszedlem tutaj')
  dispatch(initFetchCategories());
  try {
    // TODO: Fetch only selected CatsID
    const { data } = await axios.get('http://localhost:5000/api/categories');
    dispatch(successFetchCategories(data.categories));
  } catch (e) {
    // TODO: Handle error to users
    dispatch(failFetchCategories(e))
  }
};
