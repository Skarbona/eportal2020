import React, { FC, memo, Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import { AuthPageState } from './state/interface';
import { InputChangeEvent } from '../../../models/typescript-events';

export interface Props {
  passwordHandler(value: InputChangeEvent, blurred?: boolean): void;
  userNameHandler(value: InputChangeEvent, blurred?: boolean): void;
  confirmedEmailHandler(value: InputChangeEvent, blurred?: boolean): void;
  emailHandler(value: InputChangeEvent, blurred?: boolean): void;
  inputs: AuthPageState['inputs'];
  isRegisterMode: boolean;
}

export const InputsComponent: FC<Props> = ({
  passwordHandler,
  inputs,
  isRegisterMode,
  userNameHandler,
  confirmedEmailHandler,
  emailHandler,
}) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const setShowPasswordHandler = (): void => setShowPassword((prevProps) => !prevProps);

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
        value={inputs.email.value}
        error={inputs.email.error}
        helperText={inputs.email.errorMsg}
        onChange={emailHandler}
        onBlur={(e): void => emailHandler(e, true)}
      />
      {isRegisterMode && (
        <TextField
          variant="filled"
          margin="normal"
          required
          fullWidth
          id="confirmed-email"
          label={t('Confirm Email')}
          name="confirmed-email"
          value={inputs.confirmedEmail.value}
          error={inputs.confirmedEmail.error}
          helperText={inputs.confirmedEmail.errorMsg}
          onChange={confirmedEmailHandler}
          onBlur={(e): void => confirmedEmailHandler(e, true)}
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
          onBlur={(e): void => userNameHandler(e, true)}
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
        onBlur={(e): void => passwordHandler(e, true)}
        InputProps={{
          endAdornment: showPasswordIcon,
        }}
      />
    </Fragment>
  );
};

export default memo(InputsComponent);
