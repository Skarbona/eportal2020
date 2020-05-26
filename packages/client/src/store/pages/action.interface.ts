import { PagesEnum } from './enum';
import { NetworkError } from '../../models/alerts';
import { SinglePageData } from './initialState.interface';

interface ActionInterface {
  type: PagesEnum;
}

export interface InitGetPage extends ActionInterface {
  type: PagesEnum.InitGetPage;
}

export interface FailGetPage extends ActionInterface {
  type: PagesEnum.FailGetPage;
  data: {
    error: NetworkError;
  };
}

export interface SuccessGetPage extends ActionInterface {
  type: PagesEnum.SuccessGetPage;
  data: {
    page: SinglePageData;
  };
}

export type PagesActions = InitGetPage | SuccessGetPage | FailGetPage;
