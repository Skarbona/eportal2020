import React, { FC, memo } from 'react';
import { Grid } from '@material-ui/core';
import { PlayArrow, Info } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

import LoadingButton from '../../../Shared/Form/LoadingButton';

export interface Props {
  isFormValid: boolean;
  isLoading: boolean;
}

export const StartButtonComponent: FC<Props> = ({ isFormValid, isLoading }) => {
  const { t } = useTranslation();
  return (
    <Grid container className="start-button">
      <LoadingButton
        size="large"
        disabled={!isFormValid}
        isLoading={isLoading}
        startIcon={isFormValid ? <PlayArrow /> : <Info />}
      >
        {isFormValid ? t('Start a Game!') : t('You have to select at least 10 categories')}
      </LoadingButton>
    </Grid>
  );
};

export default memo(StartButtonComponent);
