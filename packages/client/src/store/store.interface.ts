import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { CategoriesActions } from './categories/action.interface';
import { GameActions } from './game/action.interface';
import { CategoriesStateInterface } from './categories/initialState.interface';
import { GameStateInterface } from "./game/initialState.interface";

export interface RootState {
  categories: CategoriesStateInterface;
  game: GameStateInterface;
}

export type Actions = CategoriesActions | GameActions;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, null, Action<string>>;
