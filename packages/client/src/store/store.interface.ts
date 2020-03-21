import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { CategoriesActions } from './categories/action.interface';
import { CategoriesStateInterface } from './categories/initialState.interface';

export interface RootState {
  categories: CategoriesStateInterface;
}

// TODO: Move to helpers
export type Actions = CategoriesActions;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, null, Action<string>>;
