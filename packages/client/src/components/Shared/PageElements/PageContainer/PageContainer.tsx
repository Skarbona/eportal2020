import React, { FC, memo, ReactNode, Fragment } from 'react';
import { Container } from '@material-ui/core';

export interface Props {
  className: string;
  children: ReactNode;
}

export const PageContainerComponent: FC<Props> = ({ children, className = '' }) => {
  return (
    <Container className={`page-container ${className}`}>
      <Fragment>{children}</Fragment>
    </Container>
  );
};

export default memo(PageContainerComponent);
