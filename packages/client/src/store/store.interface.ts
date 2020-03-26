import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { CategoriesActions } from './categories/action.interface';
import { GameActions } from './game/action.interface';
import { UserActions } from './user/action.interface';
import { CategoriesStateInterface } from './categories/initialState.interface';
import { GameStateInterface } from './game/initialState.interface';
import { UserStateInterface } from './user/initialState.interface';

export interface RootState {
  categories: CategoriesStateInterface;
  game: GameStateInterface;
  user: UserStateInterface;
}

export type Actions = CategoriesActions | GameActions | UserActions;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, null, Action<string>>;
