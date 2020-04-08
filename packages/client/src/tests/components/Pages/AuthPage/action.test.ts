import * as I from '../../../../components/Pages/AuthPage/state/interface';
import * as A from '../../../../components/Pages/AuthPage/state/actions';
import { InputChangeEvent } from '../../../../models/typescript-events';

describe('AuthPage State: actions', () => {
  it('should create confirmedEmailChanged action', () => {
    const event = { target: { value: 'test@test.pl' } } as InputChangeEvent;
    const expectedAction: I.ConfirmedEmailChanged = {
      type: I.AuthPageActionsEnum.ConfirmedEmailChanged,
      data: {
        value: 'test@test.pl',
        blurred: true,
      },
    };

    const action = A.confirmedEmailChanged(event, true);
    expect(action).toEqual(expectedAction);
  });

  it('should create emailChanged action', () => {
    const event = { target: { value: 'test@test.pl' } } as InputChangeEvent;
    const expectedAction: I.EmailChanged = {
      type: I.AuthPageActionsEnum.EmailChanged,
      data: {
        value: 'test@test.pl',
        blurred: true,
      },
    };

    const action = A.emailChanged(event, true);
    expect(action).toEqual(expectedAction);
  });

  it('should create userNameChanged action', () => {
    const event = { target: { value: 'userName' } } as InputChangeEvent;
    const expectedAction: I.UserNameChanged = {
      type: I.AuthPageActionsEnum.UserNameChanged,
      data: {
        value: 'userName',
        blurred: true,
      },
    };

    const action = A.userNameChanged(event, true);
    expect(action).toEqual(expectedAction);
  });

  it('should create setVisibleInputs action', () => {
    const payload = [I.InputKeys.Recaptcha];
    const expectedAction: I.SetVisibleInputs = {
      type: I.AuthPageActionsEnum.SetVisibleInputs,
      data: {
        inputKeys: payload,
      },
    };

    const action = A.setVisibleInputs(payload);
    expect(action).toEqual(expectedAction);
  });

  it('should create recaptchaChanged action', () => {
    const payload = 'RECAPTCHA';
    const expectedAction: I.RecaptchaChanged = {
      type: I.AuthPageActionsEnum.RecaptchaChanged,
      data: {
        value: payload,
      },
    };

    const action = A.recaptchaChanged(payload);
    expect(action).toEqual(expectedAction);
  });
});
