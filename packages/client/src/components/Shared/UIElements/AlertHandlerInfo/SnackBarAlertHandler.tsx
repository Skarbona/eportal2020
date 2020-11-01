import React, { FC, memo, useState, useCallback, useEffect } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Snackbar } from '@material-ui/core';

import './AlertHandlers.scss';
import { useSelector } from 'react-redux';
import { AlertMap, AlertTypes, AlertSizes } from '../../../../models/alerts';
import { RootState } from '../../../../store/store.interface';

export const SnackBarAlertHandlerComponent: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { error, type, alert } = useSelector<RootState, Selector>(({ user, app, waitingRoom }) => ({
    error: user.error || app.error || waitingRoom.error,
    alert: waitingRoom.alert,
    type: user.alertType || app.alertType || waitingRoom.alertType,
  }));

  useEffect(() => {
    if (error) setIsOpen(true);
  }, [error]);

  const closeHandler = useCallback(() => setIsOpen(false), []);

  if ((!alert && !error) || !type) return null;
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

export interface Selector {
  type: AlertTypes;
  error: Error | boolean;
  alert: boolean;
}

export default memo(SnackBarAlertHandlerComponent);
