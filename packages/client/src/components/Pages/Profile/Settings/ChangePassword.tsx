import React, { FC, memo, useCallback } from 'react';
import { Button, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';
import { useForm } from '../../../../hooks/form/form-hook';
import { InputKeys } from '../../../../hooks/form/state/interface';
import { changePassword } from '../../../../store/user/thunks/changePassword';
import { useReduxDispatch } from '../../../../store/helpers';
import AlertHandler from '../../../Shared/UIElements/AlertHandlerInfo/AlertHandlerInfo';
import { RootState } from '../../../../store/store.interface';
import { AlertTypes } from '../../../../models/alerts';
import Password from '../../../Shared/Form/Password';

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
  const { error, type } = useSelector<RootState, ChangePasswordProp>(({ user }) => ({
    error: user.error,
    type: user.alertType,
  }));

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
      <Password inputChanged={inputChanged} password={inputs.password} />
      <AlertHandler error={error} type={type} />
      <Button disabled={!isFormValid} type="submit" fullWidth variant="contained" color="primary">
        {t('Change password')}
      </Button>
    </form>
  );
};

export default memo(ChangePasswordComponent);
