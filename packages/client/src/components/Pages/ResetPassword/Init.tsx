import React, { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, TextField } from '@material-ui/core';
import { useSelector } from 'react-redux';

import PageHeading from '../../Shared/PageElements/PageHeading/PageHeading';
import PageContainer from '../../Shared/PageElements/PageContainer/PageContainer';
import AlertHandler from '../../Shared/UIElements/AlertHandlerInfo/AlertHandlerInfo';
import { useForm } from '../../../hooks/form/form-hook';
import { InputKeys } from '../../../hooks/form/state/interface';
import { SubmitEvent } from '../../../models/typescript-events';
import { useReduxDispatch } from '../../../store/helpers';
import { getResetPasswordLink } from '../../../store/user/thunks/getResetPasswordLink';
import { RootState } from '../../../store/store.interface';
import { AlertTypes } from '../../../models/alerts';

interface SelectorProp {
  error: Error;
  alert: boolean;
  type: AlertTypes;
}

export const InitResetPasswordComponent: FC = () => {
  const { t } = useTranslation();
  const dispatch = useReduxDispatch();
  const { alert, error, type } = useSelector<RootState, SelectorProp>(({ user }) => ({
    error: user.error,
    alert: user.alert,
    type: user.alertType,
  }));
  const {
    state: { inputs, isFormValid },
    handlers: { inputChanged },
  } = useForm([InputKeys.Email], false);

  const handleSubmit = useCallback(
    (e: SubmitEvent) => {
      e.preventDefault();
      dispatch(getResetPasswordLink(inputs.email.value));
    },
    [dispatch, inputs.email.value],
  );

  return (
    <>
      <PageHeading title={t('Reset Password')} className="single-page-heading" />
      <PageContainer
        className="single-page page-reset-password__init inputs-for-light-bg"
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit}>
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
          <AlertHandler error={error} alert={alert} type={type} />
          <Button
            disabled={!isFormValid}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            {t('Reset Password')}
          </Button>
        </form>
      </PageContainer>
    </>
  );
};

export default memo(InitResetPasswordComponent);
