import { combineReducers, Reducer } from 'redux';

import categories from './categories/reducer';
import game from './game/reducer';
import user from './user/reducer';
import { RootState } from './store.interface';

const reducers: Reducer<RootState> = combineReducers<RootState>({
  categories,
  game,
  user,
});

export default reducers;
