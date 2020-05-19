import React, { FC, memo } from 'react';
import { Typography, Breadcrumbs as MaterialBreadcrumbs } from '@material-ui/core';
import { Link as RouterLink, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './BreadCrumbs.scss';
import { PageParams } from '../../../../models/page-types';

export const BreadcrumbsComponent: FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const pathNames = location.pathname.split('/').filter((x: string) => x);
  const links = pathNames.map((value: string, index: number) => {
    const pathName = value.charAt(0).toUpperCase() + value.slice(1);
    const last = index === pathNames.length - 1;
    const to = `/${pathNames.slice(0, index + 1).join('/')}`;

    return last ? (
      <Typography color="inherit" key={to}>
        {pathName}
      </Typography>
    ) : (
      <RouterLink color="inherit" to={to} key={to}>
        {pathName}
      </RouterLink>
    );
  });

  return (
    <Route>
      <MaterialBreadcrumbs aria-label="Breadcrumb" className="breadcrumb">
        <RouterLink color="inherit" to={PageParams.Home}>
          {t('Home')}
        </RouterLink>
        {links}
      </MaterialBreadcrumbs>
    </Route>
  );
};

export default memo(BreadcrumbsComponent);
