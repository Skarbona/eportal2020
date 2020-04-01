import React, { FC, memo } from 'react';
import { Button, Grid } from '@material-ui/core';
import { PlayArrow, Info } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

export interface Props {
  isFormValid: boolean;
}

export const StartButtonComponent: FC<Props> = ({ isFormValid }) => {
  const { t } = useTranslation();
  return (
    <Grid container className="start-button">
      <Button
        size="large"
        color="primary"
        type="submit"
        variant="contained"
        disabled={!isFormValid}
        startIcon={isFormValid ? <PlayArrow /> : <Info />}
      >
        {isFormValid ? t('Start a Game!') : t('You have to select at least 10 categories')}
      </Button>
    </Grid>
  );
};

export default memo(StartButtonComponent);
