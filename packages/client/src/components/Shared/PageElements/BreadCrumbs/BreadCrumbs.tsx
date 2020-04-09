import React, { FC, memo } from 'react';
import { Typography, Breadcrumbs as MaterialBreadcrumbs } from '@material-ui/core';

import { Link as RouterLink, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './BreadCrumbs.scss';

interface LocationProps {
  location: {
    pathname: string;
  };
}

export const Breadcrumbs: FC = () => {
  const { t } = useTranslation();
  return (
    <Route>
      {({ location }: LocationProps) => {
        const pathnames = location.pathname.split('/').filter((x: string) => x);
        return (
          <MaterialBreadcrumbs aria-label="Breadcrumb" className="breadcrumb">
            <RouterLink color="inherit" to="/">
              {t('Home')}
            </RouterLink>
            {pathnames.map((value: string, index: number) => {
              const pathName = value.charAt(0).toUpperCase() + value.slice(1);
              const last = index === pathnames.length - 1;
              const to = `/${pathnames.slice(0, index + 1).join('/')}`;

              return last ? (
                <Typography color="inherit" key={to}>
                  {pathName}
                </Typography>
              ) : (
                <RouterLink color="inherit" to={to} key={to}>
                  {pathName}
                </RouterLink>
              );
            })}
          </MaterialBreadcrumbs>
        );
      }}
    </Route>
  );
};

export default memo(Breadcrumbs);
