import React, { FC, memo } from 'react';
import { TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { FormState } from '../../../hooks/form/state/interface';
import { InputChangeEvent } from '../../../models/typescript-events';

interface Props {
  confirmAccountDeleteChanged(value: string, userEmail: string): void;
  email: string;
  confirmAccountDelete: FormState['inputs']['confirmAccountDelete'];
}

export const ConfirmAccountDeleteComponent: FC<Props> = ({
  confirmAccountDelete,
  confirmAccountDeleteChanged,
  email,
}) => {
  const { t } = useTranslation();
  return (
    <TextField
      variant="filled"
      margin="normal"
      required
      fullWidth
      id="confirmAccountDelete"
      label={t('Type your email')}
      name="confirmAccountDelete"
      value={confirmAccountDelete?.value}
      onChange={(e: InputChangeEvent): void => confirmAccountDeleteChanged(e.target.value, email)}
    />
  );
};

export default memo(ConfirmAccountDeleteComponent);
