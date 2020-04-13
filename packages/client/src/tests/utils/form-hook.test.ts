import {
  isConfirmedEmailValidHandler,
  isEmailValidHandler,
  isFormValidHandler,
  isPasswordValidHandler,
  isUserNameValidHandler,
  setVisibleInputsHandler,
  setInitialInputsHandler,
  isRecaptchaValidHandler,
} from '../../utils/form-hook';
import { initialState } from '../../hooks/form/state/initialState';
import { InputKeys } from '../../hooks/form/state/interface';
import { chance } from '../../mocks/chance';

describe('isFormValidHandler utility function', () => {
  it('should return false if all fields are invalid', () => {
    const inputs = { ...initialState.inputs };
    const isFormValid = isFormValidHandler(inputs);
    expect(isFormValid).toEqual(false);
  });

  it('should return false if some fields are valid', () => {
    const inputs = { ...initialState.inputs, email: { ...initialState.inputs.email, valid: true } };
    const isFormValid = isFormValidHandler(inputs);
    expect(isFormValid).toEqual(false);
  });

  it('should return true if all fields are valid', () => {
    const inputs = {
      ...initialState.inputs,
      email: { ...initialState.inputs.email, valid: true },
      confirmedEmail: { ...initialState.inputs.confirmedEmail, valid: true },
      password: { ...initialState.inputs.password, valid: true },
      userName: { ...initialState.inputs.userName, valid: true },
      recaptcha: { ...initialState.inputs.recaptcha, valid: true },
      confirmAccountDelete: { ...initialState.inputs.confirmAccountDelete, valid: true },
    };
    const isFormValid = isFormValidHandler(inputs);
    expect(isFormValid).toEqual(true);
  });

  it('should ignore field check if not visible even if field is not valid', () => {
    const inputs = {
      ...initialState.inputs,
      email: { ...initialState.inputs.email, valid: false, visible: false }, // IGNORED FIELD
      confirmedEmail: { ...initialState.inputs.confirmedEmail, valid: true },
      password: { ...initialState.inputs.password, valid: true },
      userName: { ...initialState.inputs.userName, valid: true },
      recaptcha: { ...initialState.inputs.recaptcha, valid: true },
      confirmAccountDelete: { ...initialState.inputs.confirmAccountDelete, valid: true },
    };
    const isFormValid = isFormValidHandler(inputs);
    expect(isFormValid).toEqual(true);
  });
});

describe('isRecaptchaValidHandler utility function', () => {
  it('should return proper object if recaptcha is valid', () => {
    const recaptchaValue = chance.word();
    const recaptcha = isRecaptchaValidHandler(recaptchaValue);
    const expectedState = {
      value: recaptchaValue,
      valid: true,
    };
    expect(recaptcha).toEqual(expectedState);
  });
  it('should return proper object if recaptcha is NOT valid', () => {
    const recaptchaValue = '';
    const recaptcha = isRecaptchaValidHandler(recaptchaValue);
    const expectedState = {
      value: recaptchaValue,
      valid: false,
    };
    expect(recaptcha).toEqual(expectedState);
  });
});

describe('isPasswordValidHandler utility function', () => {
  it('should return proper object if password is valid', () => {
    const password = isPasswordValidHandler('aaAA1111', true);
    const expectedState = {
      value: 'aaAA1111',
      error: false,
      valid: true,
      blurred: true,
      errorMsg: '',
    };
    expect(password).toEqual(expectedState);
  });

  it('should NOT return error if user has not blurred input (if password is not valid)', () => {
    const password = isPasswordValidHandler('aaAAAAAA', false);
    expect(password.error).toEqual(false);
    expect(password.valid).toEqual(false);
  });

  it('should return error if password not contain numbers ', () => {
    const password = isPasswordValidHandler('aaAAAAAA', true);
    expect(password.error).toEqual(true);
    expect(password.valid).toEqual(false);
  });

  it('should return error if password not contain big letters ', () => {
    const password = isPasswordValidHandler('aa11111', true);
    expect(password.error).toEqual(true);
    expect(password.valid).toEqual(false);
  });

  it('should return error if password not contain small letters ', () => {
    const password = isPasswordValidHandler('AA11111', true);
    expect(password.error).toEqual(true);
    expect(password.valid).toEqual(false);
  });

  it('should return error if password is too short ', () => {
    const password = isPasswordValidHandler('aaAA111', true);
    expect(password.error).toEqual(true);
    expect(password.valid).toEqual(false);
  });
});

describe('isUserNameValidHandler utility function', () => {
  it('should return proper object if userName is valid', () => {
    const userName = isUserNameValidHandler('username', true);
    const expectedState = {
      value: 'username',
      error: false,
      valid: true,
      blurred: true,
      errorMsg: 'Username can be visible for all users',
    };
    expect(userName).toEqual(expectedState);
  });

  it('should NOT return error if user has not blurred input (if userName is not valid)', () => {
    const userName = isUserNameValidHandler('username()', false);
    expect(userName.error).toEqual(false);
    expect(userName.valid).toEqual(false);
  });

  it('should return error if userName is too short ', () => {
    const userName = isUserNameValidHandler('use', true);
    expect(userName.error).toEqual(true);
    expect(userName.valid).toEqual(false);
  });

  it('should return error if userName contain some of special chars ', () => {
    const userName = isUserNameValidHandler('{username()}', true);
    expect(userName.error).toEqual(true);
    expect(userName.valid).toEqual(false);
  });

  it('should return error if userName is too long', () => {
    const userName = isUserNameValidHandler('username username username', true);
    expect(userName.error).toEqual(true);
    expect(userName.valid).toEqual(false);
  });
});

describe('isEmailValidHandler utility function', () => {
  it('should return proper object if email is valid', () => {
    const email = isEmailValidHandler('test@test.pl', true);
    const expectedState = {
      value: 'test@test.pl',
      error: false,
      valid: true,
      blurred: true,
      errorMsg: '',
    };
    expect(email).toEqual(expectedState);
  });

  it('should NOT return error if user has not blurred input (if email is not valid)', () => {
    const email = isEmailValidHandler('test@test', false);
    expect(email.error).toEqual(false);
    expect(email.valid).toEqual(false);
  });

  it('should return error if email is invalid', () => {
    const email = isEmailValidHandler('test@test', true);
    expect(email.error).toEqual(true);
    expect(email.valid).toEqual(false);
  });
});

describe('isConfirmedEmailValidHandler utility function', () => {
  it('should return proper object if confirmedEmail is valid', () => {
    const email = isConfirmedEmailValidHandler('test@test.pl', true, 'test@test.pl');
    const expectedState = {
      value: 'test@test.pl',
      error: false,
      valid: true,
      blurred: true,
      errorMsg: '',
    };
    expect(email).toEqual(expectedState);
  });

  it('should NOT return error if user has not blurred input (if confirmedEmail is not valid)', () => {
    const confirmedEmail = isConfirmedEmailValidHandler('test@test', false, 'test@test.pl');
    expect(confirmedEmail.error).toEqual(false);
    expect(confirmedEmail.valid).toEqual(false);
  });

  it('should return error if confirmedEmail is invalid', () => {
    const confirmedEmail = isConfirmedEmailValidHandler('test@test', true, 'test@test.pl');
    expect(confirmedEmail.error).toEqual(true);
    expect(confirmedEmail.valid).toEqual(false);
  });

  it('should return error if confirmedEmail is not the same', () => {
    const confirmedEmail = isConfirmedEmailValidHandler('test@test.com', true, 'test@test.pl');
    expect(confirmedEmail.error).toEqual(true);
    expect(confirmedEmail.valid).toEqual(false);
  });
});

describe('setVisibleInputsHandler utility function', () => {
  it('should set visibility for provided inputs', () => {
    const state = {
      ...initialState,
    };
    const newState = setVisibleInputsHandler(state.inputs, [InputKeys.Recaptcha, InputKeys.Email]);

    expect(newState.recaptcha.visible).toEqual(true);
    expect(newState.email.visible).toEqual(true);

    expect(newState.password.visible).toEqual(false);
    expect(newState.confirmedEmail.visible).toEqual(false);
    expect(newState.userName.visible).toEqual(false);
  });
});

describe('setInitialInputsHandler utility function', () => {
  it('should set visibility for provided inputs', () => {
    const state = {
      ...initialState,
    };
    const newState = setInitialInputsHandler(state.inputs, [InputKeys.Recaptcha, InputKeys.Email]);

    expect(newState.recaptcha).toBeTruthy();
    expect(newState.email).toBeTruthy();

    expect(newState.password).toBeFalsy();
    expect(newState.confirmedEmail).toBeFalsy();
    expect(newState.userName).toBeFalsy();
  });
});
