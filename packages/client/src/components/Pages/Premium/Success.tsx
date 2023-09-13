import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { StarBorderSharp } from '@material-ui/icons';
import PageContainer from '../../Shared/PageElements/PageContainer/PageContainer';
import PageHeading from '../../Shared/PageElements/PageHeading/PageHeading';
import { PageParams } from '../../../models/page-types';

export const Success: FC = () => {
  const { t } = useTranslation();

  const location = useLocation();

  const code = location.search.split('=')[1];

  return (
    <>
      <PageHeading title={t('Success')} className="single-page-heading" />
      <PageContainer className="single-page payment_success inputs-for-light-bg" maxWidth="lg">
        <Typography color="primary">{t('Payment was successful')}:</Typography>
        <Typography variant="caption" color="primary">
          {code}
        </Typography>
        <Button
          component={Link}
          to={PageParams.Game}
          size="large"
          color="primary"
          variant="contained"
        >
          {t('Play!')}
        </Button>
      </PageContainer>
    </>
  );
};
