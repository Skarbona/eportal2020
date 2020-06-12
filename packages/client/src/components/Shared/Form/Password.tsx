import React, { FC, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import { FormState } from '../../../hooks/form/state/interface';
import { InputChangeEvent } from '../../../models/typescript-events';

export interface Props {
  inputChanged(value: InputChangeEvent, blurred?: boolean): void;
  password: FormState['inputs']['password'];
}

export const PasswordComponent: FC<Props> = ({ password, inputChanged }) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const setShowPasswordHandler = (): void => setShowPassword((prevProps) => !prevProps);

  const showPasswordIcon = (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={setShowPasswordHandler}
        color="primary"
      >
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );
  return (
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
      value={password?.value}
      error={password?.error}
      helperText={password?.errorMsg}
      onChange={inputChanged}
      onBlur={(e): void => inputChanged(e, true)}
      InputProps={{
        endAdornment: showPasswordIcon,
      }}
    />
  );
};

export default memo(PasswordComponent);
