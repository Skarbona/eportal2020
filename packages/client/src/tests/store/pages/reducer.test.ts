import { PagesStateInterface, PageNames } from '../../../store/pages/initialState.interface';
import { pagesInitialState as initialState } from '../../../store/pages/initialState';
import pagesReducer from '../../../store/pages/reducer';
import { PagesEnum } from '../../../store/pages/enum';
import * as I from '../../../store/pages/action.interface';
import { AlertTypes } from '../../../models/alerts';

describe('Reducer: Pages', () => {
  let reducerState: PagesStateInterface;

  beforeEach(() => {
    reducerState = initialState;
  });

  it('should return initial state', () => {
    const state = pagesReducer(initialState, {} as any);
    expect(state).toEqual(initialState);
  });

  it('should handle SuccessGetPage', () => {
    const page = {
      content: {
        title: '',
        content: '',
      },
      slug: PageNames.Rules,
    };
    const action: I.SuccessGetPage = {
      type: PagesEnum.SuccessGetPage,
      data: {
        page,
      },
    };
    const state = pagesReducer(initialState, action);
    const expectedState: PagesStateInterface = {
      ...initialState,
      page: {
        [PageNames.Rules]: {
          content: {
            content: '',
            title: '',
          },
        },
      },
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle FailGetPage', () => {
    const data = {
      error: new Error(),
    };
    const action: I.FailGetPage = {
      type: PagesEnum.FailGetPage,
      data,
    };
    const state = pagesReducer(initialState, action);
    const expectedState: PagesStateInterface = {
      ...initialState,
      error: data.error,
      alertType: AlertTypes.ServerError,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle InitGetPage', () => {
    const action: I.InitGetPage = {
      type: PagesEnum.InitGetPage,
    };
    const state = pagesReducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });
});
