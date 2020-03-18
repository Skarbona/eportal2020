import { combineReducers, Reducer } from 'redux';

import categories from './categories/reducer';
import { RootState } from './store.interface';

const reducers: Reducer<RootState> = combineReducers<RootState>({
  categories,
});

export default reducers;
