import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams, useRouteMatch } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import PageContainer from '../../Shared/PageElements/PageContainer/PageContainer';
import PageHeading from '../../Shared/PageElements/PageHeading/PageHeading';

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
      </PageContainer>
    </>
  );
};
