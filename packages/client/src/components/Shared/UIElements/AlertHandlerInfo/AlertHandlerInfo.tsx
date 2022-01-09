import React, { FC, memo } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Grid } from '@material-ui/core';

import './AlertHandlers.scss';

import { useTranslation } from 'react-i18next';
import { AlertMap, AlertTypes, AlertSizes } from '../../../../models/alerts';
import ExpansionPanel from '../ExpansionPanel/ExpansionPanel';

export interface Props {
  type: AlertTypes;
  alert?: boolean;
  error?: Error | boolean;
}

export const AlertHandlerComponent: FC<Props> = ({ type, error, alert }) => {
  const { t } = useTranslation();

  if ((!type && !error) || (!type && !alert)) return null;
  const alertValues = AlertMap?.get(type || AlertTypes.ServerError);
  if (!alertValues) return null;
  const { message, severity, header, size } = alertValues;

  return (
    size === AlertSizes.Big && (
      <Grid container justify="center">
        <Alert severity={severity} className="alert-handler">
          <AlertTitle>{header}</AlertTitle>
          {message}
          {error && (
            <ExpansionPanel title={t('More info')} className="alert-handler__more-info">
              {error?.toString()}
            </ExpansionPanel>
          )}
        </Alert>
      </Grid>
    )
  );
};

export default memo(AlertHandlerComponent);
