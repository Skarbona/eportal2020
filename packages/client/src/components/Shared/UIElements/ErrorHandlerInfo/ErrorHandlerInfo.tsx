import React, { FC, memo } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Grid } from '@material-ui/core';

import './ErrorHandlers.scss';
import { ErrorHandlingMap, ErrorTypes, ErrorsSize } from '../../../../models/errors';

export interface Props {
  type: ErrorTypes;
  error: Error | boolean;
}

export const ErrorHandlerComponent: FC<Props> = ({ type, error }) => {
  if (!error && ErrorHandlingMap) return null;
  const { message, severity, header, size } = ErrorHandlingMap.get(type);

  return (
    size === ErrorsSize.Big && (
      <Grid container justify="center">
        <Alert severity={severity} className="errors-handler">
          <AlertTitle>{header}</AlertTitle>
          {message}
        </Alert>
      </Grid>
    )
  );
};

export default memo(ErrorHandlerComponent);
