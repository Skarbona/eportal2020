import { FormActionEnum } from './enum';

interface ActionInterface {
  type: FormActionEnum;
}

export interface PlaceHolderAction extends ActionInterface {
  type: FormActionEnum.PlaceholderAction;
}

export type FormActions = PlaceHolderAction;
