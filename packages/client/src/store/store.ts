import { createStore, applyMiddleware, compose, AnyAction } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import reducers from './reducers';
import { formInitialState } from './form/initialState';
import { Actions, RootState } from './store.interface';

export const initialRootState: RootState = {
  form: formInitialState,
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore<RootState, Actions, null, AnyAction>(
  reducers,
  initialRootState,
  composeEnhancers(applyMiddleware(thunk as ThunkMiddleware<RootState, Actions>)),
);
