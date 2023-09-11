import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';
import PageContainer from '../../Shared/PageElements/PageContainer/PageContainer';
import PageHeading from '../../Shared/PageElements/PageHeading/PageHeading';

export const Failed: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageHeading title={t('Failed')} className="single-page-heading" />
      <PageContainer className="single-page payment_failed inputs-for-light-bg" maxWidth="lg">
        <Typography color="primary">{t('Payment was failed')}</Typography>
      </PageContainer>
    </>
  );
};
