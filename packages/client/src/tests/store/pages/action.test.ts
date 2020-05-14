import * as I from '../../../store/pages/action.interface';
import { PagesEnum } from '../../../store/pages/enum';
import * as A from '../../../store/pages/action';

describe('Actions: Pages', () => {
  it('should create InitGetPage action', () => {
    const expectedAction: I.InitGetPage = {
      type: PagesEnum.InitGetPage,
    };

    const action = A.initGetPage();
    expect(action).toEqual(expectedAction);
  });

  it('should create failGetPage action', () => {
    const error = new Error();
    const expectedAction: I.FailGetPage = {
      type: PagesEnum.FailGetPage,
      data: {
        error,
      },
    };

    const action = A.failGetPage(error);
    expect(action).toEqual(expectedAction);
  });

  it('should create SuccessGetPage action', () => {
    const page = {
      content: {
        title: '',
        content: '',
      },
      slug: '',
    };
    const expectedAction: I.SuccessGetPage = {
      type: PagesEnum.SuccessGetPage,
      data: {
        page,
      },
    };
    const action = A.successGetPage(page);
    expect(action).toEqual(expectedAction);
  });
});
