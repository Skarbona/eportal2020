import React, { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Container } from '@material-ui/core';

import './PageHeading.scss';
import { ReactComponent as WaveSVG } from '../../../../media/svg/wave1.svg';
import Breadcrumbs from '../BreadCrumbs/BreadCrumbs';

export interface Props {
  title: string;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
}

export const PageHeadingComponent: FC<Props> = ({
  title,
  variant = 'h2',
  component = 'h1',
  className = '',
}) => {
  const { t } = useTranslation();
  return (
    <Container maxWidth={false} disableGutters className={`page-heading ${className}`}>
      <div className="page-heading__title">
        <Container>
          <Typography variant={variant} component={component}>
            {t(title)}
            <Breadcrumbs />
          </Typography>
        </Container>
      </div>
      <WaveSVG />
    </Container>
  );
};

export default memo(PageHeadingComponent);
