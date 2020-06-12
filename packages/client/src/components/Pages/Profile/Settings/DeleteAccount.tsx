import React, { FC, memo, useCallback } from 'react';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';
import { useForm } from '../../../../hooks/form/form-hook';
import { InputKeys } from '../../../../hooks/form/state/interface';
import { RootState } from '../../../../store/store.interface';
import AlertHandler from '../../../Shared/UIElements/AlertHandlerInfo/AlertHandlerInfo';
import { deleteUser } from '../../../../store/user/thunks/deleteUser';
import { useReduxDispatch } from '../../../../store/helpers';
import { AlertTypes } from '../../../../models/alerts';
import ConfirmAccountDelete from '../../../Shared/Form/ConfirmAccountDelete';
import LoadingButton from '../../../Shared/Form/LoadingButton';

interface DeleteAccountSelectorProps {
  email: string;
  error: Error;
  type: AlertTypes;
  isLoading: boolean;
}

export const DeleteAccountComponent: FC = () => {
  const { t } = useTranslation();
  const dispatch = useReduxDispatch();
  const { email, error, type, isLoading } = useSelector<RootState, DeleteAccountSelectorProps>(
    ({ user }) => ({
      email: user.userData.email,
      error: user.error,
      type: user.alertType,
      isLoading: user.loading,
    }),
  );
  const {
    state: { inputs, isFormValid },
    handlers: { confirmAccountDeleteChanged },
  } = useForm([InputKeys.ConfirmAccountDelete]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    dispatch(deleteUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Typography>{t('Please confirm account deletion by typing your email')}</Typography>
      <ConfirmAccountDelete
        confirmAccountDelete={inputs.confirmAccountDelete}
        confirmAccountDeleteChanged={confirmAccountDeleteChanged}
        email={email}
      />
      <AlertHandler error={error} type={type} />
      <LoadingButton disabled={!isFormValid} isLoading={isLoading}>
        {t('Delete an Account')}
      </LoadingButton>
    </form>
  );
};

export default memo(DeleteAccountComponent);
