import {
  AuthPageActionsEnum,
  AuthPageState,
  EmailChanged,
  ConfirmedEmailChanged,
  PasswordChanged,
  RecaptchaChanged,
  SetVisibleInputs,
  UserNameChanged,
  InputKeys,
} from '../../../../components/Pages/AuthPage/state/interface';
import { initialState } from '../../../../components/Pages/AuthPage/state/initialState';
import { authPageReducer } from '../../../../components/Pages/AuthPage/state/reducer';

describe('AuthPage State: reducer', () => {
  let state: AuthPageState;
  beforeEach(() => {
    state = { ...initialState };
  });

  it('should return default state', () => {
    const reducer = authPageReducer(state, {} as any);
    expect(reducer).toEqual(state);
  });

  it('should handle EmailChanged', () => {
    const action: EmailChanged = {
      type: AuthPageActionsEnum.EmailChanged,
      data: {
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
    const reducer = authPageReducer(state, action);
    expect(reducer).toEqual(expectedState);
  });

  it('should handle RepeatEmailChanged', () => {
    const action: ConfirmedEmailChanged = {
      type: AuthPageActionsEnum.ConfirmedEmailChanged,
      data: {
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

    const reducer = authPageReducer(stateWithEmail, action);
    expect(reducer).toEqual(expectedState);
  });

  it('should handle PasswordChanged', () => {
    const action: PasswordChanged = {
      type: AuthPageActionsEnum.PasswordChanged,
      data: {
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
    const reducer = authPageReducer(state, action);
    expect(reducer).toEqual(expectedState);
  });

  it('should handle UserNameChanged', () => {
    const action: UserNameChanged = {
      type: AuthPageActionsEnum.UserNameChanged,
      data: {
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
    const reducer = authPageReducer(state, action);
    expect(reducer).toEqual(expectedState);
  });

  it('should handle SetVisibleInputs', () => {
    const action: SetVisibleInputs = {
      type: AuthPageActionsEnum.SetVisibleInputs,
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
      },
    };
    const reducer = authPageReducer(state, action);
    expect(reducer).toEqual(expectedState);
  });

  it('should handle RecaptchaChanged', () => {
    const action: RecaptchaChanged = {
      type: AuthPageActionsEnum.RecaptchaChanged,
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
    const reducer = authPageReducer(state, action);
    expect(reducer).toEqual(expectedState);
  });
});
