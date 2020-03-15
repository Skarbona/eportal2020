import { ActionCreator } from 'redux';

import { FormActionEnum } from './enum';
import * as FormActionsInterface from './action.interface';

export const placeholderAction: ActionCreator<FormActionsInterface.PlaceHolderAction> = () => ({
  type: FormActionEnum.PlaceholderAction,
});
