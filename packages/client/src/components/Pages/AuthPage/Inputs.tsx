import React, { FC, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  TextField,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Link,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

import { FormState } from '../../../hooks/form/state/interface';
import { CheckboxChangeEvent, InputChangeEvent } from '../../../models/typescript-events';
import { PageParams } from '../../../models/page-types';

export interface Props {
  inputChanged(value: InputChangeEvent, blurred?: boolean): void;
  checkBoxChanged(value: CheckboxChangeEvent): void;
  inputs: FormState['inputs'];
  isRegisterMode: boolean;
}

export const InputsComponent: FC<Props> = ({
  inputChanged,
  checkBoxChanged,
  inputs,
  isRegisterMode,
}) => {
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

  const privacyPolicyLabel = (
    <>
      {t('I accept')}{' '}
      {
        <Link to={PageParams.PrivacyPolice} component={RouterLink} color="inherit" target="_blank">
          {t('Privacy Policy')}
        </Link>
      }{' '}
      *
    </>
  );

  return (
    <>
      <TextField
        variant="filled"
        margin="normal"
        required
        fullWidth
        id="email"
        label={t('Email')}
        name="email"
        autoComplete="email"
        value={inputs.email?.value}
        error={inputs.email?.error}
        helperText={inputs.email?.errorMsg}
        onChange={inputChanged}
        onBlur={(e): void => inputChanged(e, true)}
      />
      {isRegisterMode && (
        <TextField
          variant="filled"
          margin="normal"
          required
          fullWidth
          id="confirmed-email"
          label={t('Confirm Email')}
          name="confirmedEmail"
          value={inputs.confirmedEmail?.value}
          error={inputs.confirmedEmail?.error}
          helperText={inputs.confirmedEmail?.errorMsg}
          onChange={inputChanged}
          onBlur={(e): void => inputChanged(e, true)}
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
          name="userName"
          value={inputs.userName?.value}
          error={inputs.userName?.error}
          helperText={inputs.userName?.errorMsg}
          onChange={inputChanged}
          onBlur={(e): void => inputChanged(e, true)}
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
        value={inputs.password?.value}
        error={inputs.password?.error}
        helperText={inputs.password?.errorMsg}
        onChange={inputChanged}
        onBlur={(e): void => inputChanged(e, true)}
        InputProps={{
          endAdornment: showPasswordIcon,
        }}
      />
      {isRegisterMode && (
        <FormControlLabel
          className="primary-checkbox privacy-policy__checkbox"
          control={
            <Checkbox
              checked={inputs.privacyPolicy?.value}
              onChange={checkBoxChanged}
              name="privacyPolicy"
              color="primary"
            />
          }
          label={privacyPolicyLabel}
        />
      )}
    </>
  );
};

export default memo(InputsComponent);
