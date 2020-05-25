import React, { FC, memo, useState, useCallback, useEffect } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Snackbar } from '@material-ui/core';

import './AlertHandlers.scss';
import { useSelector } from 'react-redux';
import { AlertMap, AlertTypes, AlertSizes } from '../../../../models/alerts';
import { RootState } from '../../../../store/store.interface';

export interface Props {
  type: AlertTypes;
  error: Error | boolean;
}

export const SnackBarAlertHandlerComponent: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { error, type } = useSelector<RootState, Props>(({ user, app }) => ({
    error: user.error || app.error,
    type: user.alertType || app.alertType,
  }));

  useEffect(() => {
    if (error) setIsOpen(true);
  }, [error]);

  const closeHandler = useCallback(() => setIsOpen(false), []);

  if (!error || !type) return null;
  const alertValues = AlertMap?.get(type || AlertTypes.ServerError);
  if (!alertValues) return null;
  const { message, severity, header, size } = alertValues;
  return (
    size === AlertSizes.Snackbar && (
      <Snackbar autoHideDuration={6000} open={isOpen} onClose={closeHandler}>
        <Alert severity={severity} onClose={closeHandler}>
          <AlertTitle>{header}</AlertTitle>
          {message}
        </Alert>
      </Snackbar>
    )
  );
};

export default memo(SnackBarAlertHandlerComponent);
