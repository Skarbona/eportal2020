import React, { FC, memo, useState, useCallback } from 'react';
import { TextField, Button, Typography, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';
import { useForm } from '../../../../hooks/form/form-hook';
import { InputKeys } from '../../../../hooks/form/state/interface';
import { changePassword } from '../../../../store/user/thunks/changePassword';
import { useReduxDispatch } from '../../../../store/helpers';
import AlertHandler from '../../../Shared/UIElements/AlertHandlerInfo/AlertHandlerInfo';
import { RootState } from '../../../../store/store.interface';
import { AlertTypes } from '../../../../models/alerts';

interface ChangePasswordProp {
  error: Error;
  type: AlertTypes;
}

export const ChangePasswordComponent: FC = () => {
  const { t } = useTranslation();
  const dispatch = useReduxDispatch();

  const {
    state: { inputs, isFormValid },
    handlers: { inputChanged },
  } = useForm([InputKeys.Password], false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { error, type } = useSelector<RootState, ChangePasswordProp>(({ user }) => ({
    error: user.error,
    type: user.alertType,
  }));

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

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(changePassword(inputs.password.value));
    },
    [dispatch, inputs.password.value],
  );

  return (
    <form onSubmit={handleSubmit}>
      <Typography>{t('After password changed you will be log off')}</Typography>
      <TextField
        variant="filled"
        margin="normal"
        required
        fullWidth
        name="password"
        label={t('New password')}
        type={showPassword ? 'text' : 'password'}
        id="password"
        value={inputs.password?.value}
        error={inputs.password?.error}
        helperText={inputs.password?.errorMsg}
        onChange={inputChanged}
        onBlur={(e): void => inputChanged(e, true)}
        InputProps={{
          endAdornment: showPasswordIcon,
        }}
      />
      <AlertHandler error={error} type={type} />
      <Button disabled={!isFormValid} type="submit" fullWidth variant="contained" color="primary">
        {t('Change password')}
      </Button>
    </form>
  );
};

export default memo(ChangePasswordComponent);
