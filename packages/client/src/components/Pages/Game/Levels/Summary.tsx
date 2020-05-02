import React, { FC, memo } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

export const SummaryComponent: FC = () => {
  const { t } = useTranslation();
  return (
    <Grid container spacing={3} className="summary">
      <Typography variant="h3" color="primary">
        {t('Points above contain also points from the last level')}
      </Typography>
    </Grid>
  );
};

export default memo(SummaryComponent);
