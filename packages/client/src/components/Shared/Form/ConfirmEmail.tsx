import React, { FC, memo } from 'react';
import { TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { FormState } from '../../../hooks/form/state/interface';
import { InputChangeEvent } from '../../../models/typescript-events';

interface Props {
  inputChanged(value: InputChangeEvent, blurred?: boolean): void;
  confirmedEmail: FormState['inputs']['confirmedEmail'];
}

export const ConfirmEmailComponent: FC<Props> = ({ confirmedEmail, inputChanged }) => {
  const { t } = useTranslation();
  return (
    <TextField
      variant="filled"
      margin="normal"
      required
      fullWidth
      id="confirmed-email"
      label={t('Confirm Email')}
      name="confirmedEmail"
      value={confirmedEmail?.value}
      error={confirmedEmail?.error}
      helperText={confirmedEmail?.errorMsg}
      onChange={inputChanged}
      onBlur={(e): void => inputChanged(e, true)}
    />
  );
};

export default memo(ConfirmEmailComponent);
