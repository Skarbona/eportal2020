import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { CategoriesActions } from './categories/action.interface';
import { GameActions } from './game/action.interface';
import { UserActions } from './user/action.interface';
import { AppActions } from './app/action.interface';
import { PagesActions } from './pages/action.interface';
import { CategoriesStateInterface } from './categories/initialState.interface';
import { GameStateInterface } from './game/initialState.interface';
import { UserStateInterface } from './user/initialState.interface';
import { AppStateInterface } from './app/initialState.interface';
import { PagesStateInterface } from './pages/initialState.interface';

export interface RootState {
  categories: CategoriesStateInterface;
  game: GameStateInterface;
  user: UserStateInterface;
  app: AppStateInterface;
  pages: PagesStateInterface;
}

export type Actions = CategoriesActions | GameActions | UserActions | AppActions | PagesActions;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, null, Action<string>>;

export type ReturnAppThunk<ReturnType> = ThunkAction<
  Promise<ReturnType>,
  RootState,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  Action<string>
>;
