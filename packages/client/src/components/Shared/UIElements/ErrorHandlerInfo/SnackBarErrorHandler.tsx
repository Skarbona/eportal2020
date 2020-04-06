import React, { FC, memo, useState, useCallback, useEffect } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Snackbar } from '@material-ui/core';

import './ErrorHandlers.scss';
import { useSelector } from 'react-redux';
import { ErrorHandlingMap, ErrorTypes, ErrorsSize } from '../../../../models/errors';
import { RootState } from '../../../../store/store.interface';

export interface Props {
  type: ErrorTypes;
  error: Error | boolean;
}

export const SnackBarErrorHandlerComponent: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { error, type } = useSelector<RootState, Props>(({ user }) => ({
    error: user?.error,
    type: user?.errorType,
  }));

  useEffect(() => {
    if (error) setIsOpen(true);
  }, [error]);

  const closeHandler = useCallback(() => setIsOpen(false), []);

  if (!error && ErrorHandlingMap) return null;
  const { message, severity, header, size } = ErrorHandlingMap.get(type);
  return (
    size === ErrorsSize.Snackbar && (
      <Snackbar autoHideDuration={6000} open={isOpen} onClose={closeHandler}>
        <Alert severity={severity} onClose={closeHandler}>
          <AlertTitle>{header}</AlertTitle>
          {message}
        </Alert>
      </Snackbar>
    )
  );
};

export default memo(SnackBarErrorHandlerComponent);
