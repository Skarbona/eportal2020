import * as I from '../../../hooks/form/state/interface';
import * as A from '../../../hooks/form/state/actions';
import { InputChangeEvent } from '../../../models/typescript-events';

describe('Form State: actions', () => {
  it('should create InputChanged action for confirmedEmail', () => {
    const event = {
      target: { value: 'test@test.pl', name: I.InputKeys.ConfirmedEmail },
    } as InputChangeEvent;
    const expectedAction: I.InputChanged = {
      type: I.FormActionsEnum.InputChanged,
      data: {
        inputKey: I.InputKeys.ConfirmedEmail,
        value: 'test@test.pl',
        blurred: true,
      },
    };

    const action = A.inputChanged(event, true);
    expect(action).toEqual(expectedAction);
  });

  it('should create InputChanged action for password', () => {
    const event = { target: { value: 'aaAA1111', name: I.InputKeys.Password } } as InputChangeEvent;
    const expectedAction: I.InputChanged = {
      type: I.FormActionsEnum.InputChanged,
      data: {
        inputKey: I.InputKeys.Password,
        value: 'aaAA1111',
        blurred: true,
      },
    };

    const action = A.inputChanged(event, true);
    expect(action).toEqual(expectedAction);
  });

  it('should create InputChanged action for Email', () => {
    const event = {
      target: { value: 'test@test.pl', name: I.InputKeys.Email },
    } as InputChangeEvent;
    const expectedAction: I.InputChanged = {
      type: I.FormActionsEnum.InputChanged,
      data: {
        inputKey: I.InputKeys.Email,
        value: 'test@test.pl',
        blurred: true,
      },
    };

    const action = A.inputChanged(event, true);
    expect(action).toEqual(expectedAction);
  });

  it('should create InputChanged action for UserName', () => {
    const event = { target: { value: 'userName', name: I.InputKeys.Username } } as InputChangeEvent;
    const expectedAction: I.InputChanged = {
      type: I.FormActionsEnum.InputChanged,
      data: {
        inputKey: I.InputKeys.Username,
        value: 'userName',
        blurred: true,
      },
    };

    const action = A.inputChanged(event, true);
    expect(action).toEqual(expectedAction);
  });

  it('should create setVisibleInputs action', () => {
    const payload = [I.InputKeys.Recaptcha];
    const expectedAction: I.SetVisibleInputs = {
      type: I.FormActionsEnum.SetVisibleInputs,
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
      type: I.FormActionsEnum.RecaptchaChanged,
      data: {
        value: payload,
      },
    };

    const action = A.recaptchaChanged(payload);
    expect(action).toEqual(expectedAction);
  });
});
