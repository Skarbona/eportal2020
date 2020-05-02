import React, { memo, FC, ReactNode } from 'react';
import { DialogTitle, IconButton, Typography } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

export interface Props {
  id: string;
  children: ReactNode;
  onClose: () => void;
  className: string;
}

export const DialogTitleComponent: FC<Props> = ({ children, onClose, id, className }) => {
  return (
    <DialogTitle disableTypography id={id} className={className}>
      <Typography variant="h6">{children}</Typography>
      {onClose && (
        <IconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      )}
    </DialogTitle>
  );
};

export default memo(DialogTitleComponent);
