import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { Actions, RootState } from './store.interface';

/* eslint-disable-next-line */
export type ReduxDispatch = ThunkDispatch<RootState, any, Actions>;
export const useReduxDispatch = (): ReduxDispatch => useDispatch<ReduxDispatch>();
