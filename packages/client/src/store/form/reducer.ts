import { formInitialState } from './initialState';
import { FormStateInterface } from './initialState.interface';
import { FormActions } from './action.interface';
import { FormActionEnum } from './enum';

const formReducer = (state = formInitialState, action: FormActions): FormStateInterface => {
  switch (action.type) {
    case FormActionEnum.PlaceholderAction:
      return state;
    default:
      return state;
  }
};

export default formReducer;
