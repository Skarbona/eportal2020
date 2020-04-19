import React, { memo, FC, ReactNode } from 'react';
import { Dialog, DialogContent, DialogActions } from '@material-ui/core';

import './Dialog.scss';
import DialogTitle from './DialogTitle';

interface Props {
  onClose(): void;
  title: string;
  children: ReactNode;
  className?: string;
  actions?: ReactNode;
}

export const DialogComponent: FC<Props> = ({
  onClose,
  title,
  children,
  className = '',
  actions,
}) => {
  return (
    <Dialog
      className={`dialog ${className}`}
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={true}
    >
      <DialogTitle id="customized-dialog-title" onClose={onClose} className="dialog__title">
        {title}
      </DialogTitle>
      <DialogContent dividers>
        <>{children}</>
      </DialogContent>
      {actions && (
        <DialogActions>
          <>{actions}</>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default memo(DialogComponent);
