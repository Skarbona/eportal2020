import React, { FC, memo, ReactNode } from 'react';
import { Container } from '@material-ui/core';

import './PageContainer.scss';

export interface Props {
  className: string;
  children: ReactNode;
  maxWidth?: false | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const PageContainerComponent: FC<Props> = ({ children, className = '', maxWidth }) => {
  return (
    <Container maxWidth={maxWidth || false} className={`page-container ${className}`}>
      <>{children}</>
    </Container>
  );
};

export default memo(PageContainerComponent);
