import { combineReducers, Reducer } from 'redux';

import form from './form/reducer';
import { RootState } from './store.interface';

const reducers: Reducer<RootState> = combineReducers<RootState>({
  form,
});

export default reducers;
