import React, { FC, memo, ReactNode } from 'react';
import { Button, CircularProgress } from '@material-ui/core';

import './LoadingButton.scss';

interface Props {
  disabled: boolean;
  isLoading: boolean;
  children: ReactNode;
  size?: 'large' | 'medium' | 'small';
  startIcon?: ReactNode;
}

export const LoadingButtonComponent: FC<Props> = ({
  size = 'medium',
  disabled,
  isLoading,
  children,
  startIcon,
}) => {
  return (
    <div className="loading-button">
      <Button
        disabled={disabled || isLoading}
        size={size}
        startIcon={startIcon}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
      >
        {children}
      </Button>
      {isLoading && <CircularProgress size={24} className="loading-button__progress" />}
    </div>
  );
};

export default memo(LoadingButtonComponent);
