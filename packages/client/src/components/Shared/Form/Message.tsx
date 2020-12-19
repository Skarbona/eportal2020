import React, { FC, memo } from 'react';
import { TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { FormState } from '../../../hooks/form/state/interface';
import { InputChangeEvent } from '../../../models/typescript-events';

export interface Props {
  inputChanged(value: InputChangeEvent, blurred?: boolean): void;
  message: FormState['inputs']['message'];
  label?: string;
}

export const MessageComponent: FC<Props> = ({ message, inputChanged, label }) => {
  const { t } = useTranslation();
  return (
    <TextField
      variant="filled"
      margin="normal"
      required
      rowsMax={Infinity}
      fullWidth
      id="message"
      label={label || t('Message')}
      name="message"
      multiline
      rows={4}
      value={message?.value}
      error={message?.error}
      helperText={message?.errorMsg}
      onChange={inputChanged}
      onBlur={(e): void => inputChanged(e, true)}
    />
  );
};

export default memo(MessageComponent);
