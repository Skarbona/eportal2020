import React, { FC, memo } from 'react';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './404.scss';
import PageContainer from '../../Shared/PageElements/PageContainer/PageContainer';

export const NotFoundComponent: FC = () => {
  const { t } = useTranslation();
  return (
    <PageContainer className="page-404">
      <>
        <Typography variant="h1" color="primary">
          404
        </Typography>
        <Typography color="primary">{t('Sorry but we cannot found this page')}</Typography>
        <Link to="/">{t('Home')}</Link>
      </>
    </PageContainer>
  );
};

export default memo(NotFoundComponent);
