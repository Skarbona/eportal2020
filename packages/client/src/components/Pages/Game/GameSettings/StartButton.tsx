import React, { FC, memo } from 'react';
import { Grid } from '@material-ui/core';
import { PlayArrow, Info } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

import LoadingButton from '../../../Shared/Form/LoadingButton';
import { FormValidation } from './GameSettings';

export interface Props {
  formValidation: FormValidation;
  isLoading: boolean;
}

export const StartButtonComponent: FC<Props> = ({ formValidation, isLoading }) => {
  const { t } = useTranslation();
  const isFormValid = Object.values(formValidation).every((el) => el);
  return (
    <Grid container className="start-button">
      <LoadingButton
        size="large"
        disabled={!isFormValid}
        isLoading={isLoading}
        startIcon={isFormValid ? <PlayArrow /> : <Info />}
      >
        {t('Start a Game!')}
      </LoadingButton>
      {!formValidation.preferences && (
        <Grid item xs={12}>
          {t('You have to select at least 10 categories')}
        </Grid>
      )}
      {!formValidation.taskPerLevel && (
        <Grid item xs={12}>
          {t('Every level need at last 1 task')}
        </Grid>
      )}
    </Grid>
  );
};

export default memo(StartButtonComponent);
