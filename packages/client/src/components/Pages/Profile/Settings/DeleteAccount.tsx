import React, { FC, memo, useCallback } from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';
import { useForm } from '../../../../hooks/form/form-hook';
import { InputKeys } from '../../../../hooks/form/state/interface';
import { RootState } from '../../../../store/store.interface';
import ErrorHandler from '../../../Shared/UIElements/ErrorHandlerInfo/ErrorHandlerInfo';
import { deleteUser } from '../../../../store/user/thunks/deleteUser';
import { useReduxDispatch } from '../../../../store/helpers';
import { ErrorTypes } from '../../../../models/errors';

interface DeleteAccountSelectorProps {
  email: string;
  error: Error;
  type: ErrorTypes;
}

export const DeleteAccountComponent: FC = () => {
  const { t } = useTranslation();
  const dispatch = useReduxDispatch();
  const { email, error, type } = useSelector<RootState, DeleteAccountSelectorProps>(({ user }) => ({
    email: user.userData.email,
    error: user.error,
    type: user.errorType,
  }));
  const {
    state: { inputs, isFormValid },
    handlers: { confirmAccountDeleteChanged },
  } = useForm([InputKeys.ConfirmAccountDelete]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(deleteUser());
    },
    [dispatch],
  );

  return (
    <form onSubmit={handleSubmit}>
      <Typography>{t('Please confirm account deletion by typing your email')}</Typography>
      <TextField
        variant="filled"
        margin="normal"
        required
        fullWidth
        id="confirmAccountDelete"
        label={t('Type your email')}
        name="confirmAccountDelete"
        value={inputs.confirmAccountDelete?.value}
        onChange={(e) => confirmAccountDeleteChanged(e.target.value, email)}
      />
      <ErrorHandler error={error} type={type} />
      <Button
        disabled={!isFormValid}
        type="submit"
        fullWidth
        variant="contained"
        className="delete-button"
      >
        {t('Delete an Account')}
      </Button>
    </form>
  );
};

export default memo(DeleteAccountComponent);
