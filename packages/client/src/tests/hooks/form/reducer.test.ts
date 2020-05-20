import {
  InputChanged,
  RecaptchaChanged,
  SetVisibleInputs,
  InputKeys,
  FormActionsEnum,
  FormState,
  CheckBoxChanged,
} from '../../../hooks/form/state/interface';
import { initialState } from '../../../hooks/form/state/initialState';
import { formReducer } from '../../../hooks/form/state/reducer';

describe('AuthPage State: reducer', () => {
  let state: FormState;
  beforeEach(() => {
    state = { ...initialState };
  });

  it('should return default state', () => {
    const reducer = formReducer(state, {} as any);
    expect(reducer).toEqual(state);
  });

  it('should handle email input', () => {
    const action: InputChanged = {
      type: FormActionsEnum.InputChanged,
      data: {
        inputKey: InputKeys.Email,
        value: 'test@test.pl',
        blurred: false,
      },
    };
    const expectedState = {
      ...state,
      inputs: {
        ...state.inputs,
        email: {
          value: 'test@test.pl',
          error: false,
          valid: true,
          required: false,
          visible: true,
          blurred: false,
          errorMsg: '',
        },
      },
    };
    const reducer = formReducer(state, action);
    expect(reducer).toEqual(expectedState);
  });

  it('should handle confirmedEmail input', () => {
    const action: InputChanged = {
      type: FormActionsEnum.InputChanged,
      data: {
        inputKey: InputKeys.ConfirmedEmail,
        value: 'test@test.pl',
        blurred: false,
      },
    };

    const stateWithEmail = {
      ...state,
      inputs: {
        ...state.inputs,
        email: {
          ...state.inputs.email,
          valid: true,
          value: 'test@test.pl',
        },
      },
    };

    const expectedState = {
      ...stateWithEmail,
      inputs: {
        ...stateWithEmail.inputs,
        confirmedEmail: {
          value: 'test@test.pl',
          error: false,
          valid: true,
          required: false,
          visible: true,
          blurred: false,
          errorMsg: '',
        },
      },
    };

    const reducer = formReducer(stateWithEmail, action);
    expect(reducer).toEqual(expectedState);
  });

  it('should handle password input', () => {
    const action: InputChanged = {
      type: FormActionsEnum.InputChanged,
      data: {
        inputKey: InputKeys.Password,
        value: 'aaAA1111',
        blurred: false,
      },
    };
    const expectedState = {
      ...state,
      inputs: {
        ...state.inputs,
        password: {
          value: 'aaAA1111',
          error: false,
          valid: true,
          required: false,
          visible: true,
          blurred: false,
          errorMsg: '',
        },
      },
    };
    const reducer = formReducer(state, action);
    expect(reducer).toEqual(expectedState);
  });

  it('should handle userName input', () => {
    const action: InputChanged = {
      type: FormActionsEnum.InputChanged,
      data: {
        inputKey: InputKeys.Username,
        value: 'AAAA',
        blurred: false,
      },
    };
    const expectedState = {
      ...state,
      inputs: {
        ...state.inputs,
        userName: {
          value: 'AAAA',
          error: false,
          valid: true,
          required: false,
          visible: true,
          blurred: false,
          errorMsg: 'Username can be visible for all users',
        },
      },
    };
    const reducer = formReducer(state, action);
    expect(reducer).toEqual(expectedState);
  });

  it('should handle checkbox input', () => {
    const action: CheckBoxChanged = {
      type: FormActionsEnum.CheckBoxChanged,
      data: {
        inputKey: InputKeys.PrivacyPolicy,
        value: true,
      },
    };
    const expectedState = {
      ...state,
      inputs: {
        ...state.inputs,
        privacyPolicy: {
          value: true,
          valid: true,
          required: true,
          visible: true,
        },
      },
    };
    const reducer = formReducer(state, action);
    expect(reducer).toEqual(expectedState);
  });

  it('should handle SetVisibleInputs', () => {
    const action: SetVisibleInputs = {
      type: FormActionsEnum.SetVisibleInputs,
      data: {
        inputKeys: [InputKeys.Password, InputKeys.Email, InputKeys.Recaptcha],
      },
    };
    const expectedState = {
      ...state,
      inputs: {
        email: {
          ...state.inputs.email,
          visible: true,
        },
        password: {
          ...state.inputs.password,
          visible: true,
        },
        recaptcha: {
          ...state.inputs.recaptcha,
          visible: true,
        },
        userName: {
          ...state.inputs.userName,
          visible: false,
        },
        confirmedEmail: {
          ...state.inputs.confirmedEmail,
          visible: false,
        },
        confirmAccountDelete: {
          ...state.inputs.confirmAccountDelete,
          visible: false,
        },
        privacyPolicy: {
          ...state.inputs.privacyPolicy,
          visible: false,
        },
      },
    };
    const reducer = formReducer(state, action);
    expect(reducer).toEqual(expectedState);
  });

  it('should handle RecaptchaChanged', () => {
    const action: RecaptchaChanged = {
      type: FormActionsEnum.RecaptchaChanged,
      data: {
        value: 'RECAPTCHA',
      },
    };
    const expectedState = {
      ...state,
      inputs: {
        ...state.inputs,
        recaptcha: {
          value: 'RECAPTCHA',
          error: false,
          valid: true,
          required: false,
          visible: true,
          blurred: false,
          errorMsg: '',
        },
      },
    };
    const reducer = formReducer(state, action);
    expect(reducer).toEqual(expectedState);
  });
});
