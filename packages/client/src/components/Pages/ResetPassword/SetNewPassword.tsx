import React, { FC, memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, TextField, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useParams } from 'react-router-dom';

import PageHeading from '../../Shared/PageElements/PageHeading/PageHeading';
import PageContainer from '../../Shared/PageElements/PageContainer/PageContainer';
import AlertHandler from '../../Shared/UIElements/AlertHandlerInfo/AlertHandlerInfo';
import { RootState } from '../../../store/store.interface';
import { SubmitEvent } from '../../../models/typescript-events';
import { useReduxDispatch } from '../../../store/helpers';
import { useForm } from '../../../hooks/form/form-hook';
import { InputKeys } from '../../../hooks/form/state/interface';
import { changePassword } from '../../../store/user/thunks/changePassword';
import { AlertTypes } from '../../../models/alerts';

interface SelectorProp {
  error: Error;
  alert: boolean;
  type: AlertTypes;
}

export const SetNewPasswordComponent: FC = () => {
  const { t } = useTranslation();
  const dispatch = useReduxDispatch();
  const { token } = useParams();
  const { alert, error, type } = useSelector<RootState, SelectorProp>(({ user }) => ({
    error: user.error,
    alert: user.alert,
    type: user.alertType,
  }));
  const {
    state: { inputs, isFormValid },
    handlers: { inputChanged },
  } = useForm([InputKeys.Password], false);
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

  const handleSubmit = useCallback(
    (e: SubmitEvent) => {
      e.preventDefault();
      dispatch(changePassword(inputs.password.value, token));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputs.password.value],
  );

  return (
    <>
      <PageHeading
        title={t('Set New Password')}
        className="single-page-heading"
        disableBreadCrumbs
      />
      <PageContainer
        className="single-page page-set-new-password inputs-for-light-bg"
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit}>
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
          <AlertHandler error={error} alert={alert} type={type} />
          <Button
            disabled={!isFormValid}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            {t('Set New Password')}
          </Button>
        </form>
      </PageContainer>
    </>
  );
};

export default memo(SetNewPasswordComponent);
