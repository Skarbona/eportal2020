import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { FormStateInterface } from './form/initialState.interface';
import { FormActions } from './form/action.interface';

export interface RootState {
  form: FormStateInterface;
}

export type Actions = FormActions;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, null, Action<string>>;
