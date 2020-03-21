import { Alert, AlertTitle } from '@material-ui/lab';
import React, { FC, memo } from 'react';

import { ErrorHandlingMap } from '../../../../constants/error-handling-map';
import { ErrorHandlerInterface } from './ErrorHandler.interface';

export const ErrorHandlerComponent: FC<ErrorHandlerInterface> = ({ type, error }) => {
  if (!error) return null;
  const { message, severity, header } = ErrorHandlingMap.get(type);
  return (
    <Alert severity={severity}>
      <AlertTitle>{header}</AlertTitle>
      {message}
    </Alert>
  );
};

export default memo(ErrorHandlerComponent);
