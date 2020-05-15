import { PagesActions } from './action.interface';
import { PagesEnum } from './enum';
import { pagesInitialState } from './initialState';
import { PagesStateInterface } from './initialState.interface';
import { ErrorTypes } from '../../models/errors';

const pagesReducer = (state = pagesInitialState, action: PagesActions): PagesStateInterface => {
  switch (action.type) {
    case PagesEnum.InitGetPage: {
      return {
        ...state,
        loading: true,
      };
    }
    case PagesEnum.SuccessGetPage: {
      const { slug, content } = action.data.page;
      return {
        ...state,
        loading: false,
        page: {
          ...state.page,
          [slug]: {
            content,
          },
        },
      };
    }
    case PagesEnum.FailGetPage: {
      return {
        ...state,
        error: action.data.error,
        errorType: ErrorTypes.ServerError, // TODO: Small error
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default pagesReducer;