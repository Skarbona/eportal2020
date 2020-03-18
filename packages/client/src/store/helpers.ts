import { ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';

import { Actions, RootState } from './store.interface';

export type ReduxDispatch = ThunkDispatch<RootState, any, Actions>;
export const useReduxDispatch = (): ReduxDispatch => useDispatch<ReduxDispatch>();
