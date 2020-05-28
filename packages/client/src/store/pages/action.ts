import { ActionCreator } from 'redux';

import * as I from './action.interface';
import { PagesEnum } from './enum';
import { SinglePageData } from './initialState.interface';

export const cleanPagesAlerts: ActionCreator<I.CleanPagesAlerts> = () => ({
  type: PagesEnum.CleanPagesAlerts,
});

export const initGetPage: ActionCreator<I.InitGetPage> = () => ({
  type: PagesEnum.InitGetPage,
});

export const failGetPage: ActionCreator<I.FailGetPage> = (error) => ({
  type: PagesEnum.FailGetPage,
  data: {
    error,
  },
});

export const successGetPage: ActionCreator<I.SuccessGetPage> = (page: SinglePageData) => ({
  type: PagesEnum.SuccessGetPage,
  data: {
    page,
  },
});
