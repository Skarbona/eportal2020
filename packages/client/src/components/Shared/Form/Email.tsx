import React, { FC, memo } from 'react';
import { TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { FormState } from '../../../hooks/form/state/interface';
import { InputChangeEvent } from '../../../models/typescript-events';

export interface Props {
  inputChanged(value: InputChangeEvent, blurred?: boolean): void;
  email: FormState['inputs']['email'];
}

export const EmailComponent: FC<Props> = ({ email, inputChanged }) => {
  const { t } = useTranslation();
  return (
    <TextField
      variant="filled"
      margin="normal"
      required
      fullWidth
      id="email"
      label={t('Email')}
      name="email"
      autoComplete="email"
      value={email?.value}
      error={email?.error}
      helperText={email?.errorMsg}
      onChange={inputChanged}
      onBlur={(e): void => inputChanged(e, true)}
    />
  );
};

export default memo(EmailComponent);
