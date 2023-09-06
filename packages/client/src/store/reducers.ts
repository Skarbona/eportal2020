import { combineReducers, Reducer } from 'redux';

import categories from './categories/reducer';
import game from './game/reducer';
import user from './user/reducer';
import app from './app/reducer';
import pages from './pages/reducer';
import waitingRoom from './waitingRoom/reducer';
import payments from './payments/reducer';
import { RootState } from './store.interface';

const reducers: Reducer<RootState> = combineReducers<RootState>({
  waitingRoom,
  categories,
  game,
  user,
  app,
  pages,
  payments,
});

export default reducers;
