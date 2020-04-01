import React, { FC, memo, Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import { AuthPageState } from './state/interface';
import { InputChangeEvent } from '../../../models/typescript-events';

interface Props {
  passwordHandler(value: InputChangeEvent, blurred?: boolean): void;
  userNameHandler(value: InputChangeEvent, blurred?: boolean): void;
  repeatedEmailHandler(value: InputChangeEvent, blurred?: boolean): void;
  emailHandler(value: InputChangeEvent, blurred?: boolean): void;
  inputs: AuthPageState['inputs'];
  isRegisterMode: boolean;
}

export const InputsComponent: FC<Props> = ({
  passwordHandler,
  inputs,
  isRegisterMode,
  userNameHandler,
  repeatedEmailHandler,
  emailHandler,
}) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const setShowPasswordHandler = () => setShowPassword(prevProps => !prevProps);

  const showPasswordIcon = (
    <InputAdornment position="end">
      <IconButton aria-label="toggle password visibility" onClick={setShowPasswordHandler}>
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <Fragment>
      <TextField
        variant="filled"
        margin="normal"
        required
        fullWidth
        id="email"
        label={t('Email')}
        name="email"
        autoComplete="email"
        autoFocus
        value={inputs.email.value}
        error={inputs.email.error}
        helperText={inputs.email.errorMsg}
        onChange={emailHandler}
        onBlur={e => emailHandler(e, true)}
      />
      {isRegisterMode && (
        <TextField
          variant="filled"
          margin="normal"
          required
          fullWidth
          id="repeat-email"
          label={t('Confirm Email')}
          name="repeat-email"
          value={inputs.repeatedEmail.value}
          error={inputs.repeatedEmail.error}
          helperText={inputs.repeatedEmail.errorMsg}
          onChange={repeatedEmailHandler}
          onBlur={e => repeatedEmailHandler(e, true)}
        />
      )}
      {isRegisterMode && (
        <TextField
          variant="filled"
          margin="normal"
          required
          fullWidth
          id="username"
          label={t('Username')}
          name="username"
          value={inputs.userName.value}
          error={inputs.userName.error}
          helperText={inputs.userName.errorMsg}
          onChange={userNameHandler}
          onBlur={e => userNameHandler(e, true)}
        />
      )}
      <TextField
        variant="filled"
        margin="normal"
        required
        fullWidth
        name="password"
        label={t('Password')}
        type={showPassword ? 'text' : 'password'}
        id="password"
        autoComplete="current-password"
        value={inputs.password.value}
        error={inputs.password.error}
        helperText={inputs.password.errorMsg}
        onChange={passwordHandler}
        onBlur={e => passwordHandler(e, true)}
        InputProps={{
          endAdornment: showPasswordIcon,
        }}
      />
    </Fragment>
  );
};

export default memo(InputsComponent);
