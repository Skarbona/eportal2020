import React, { FC, memo } from 'react';
import { TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { FormState } from '../../../hooks/form/state/interface';
import { InputChangeEvent } from '../../../models/typescript-events';

export interface Props {
  inputChanged(value: InputChangeEvent, blurred?: boolean): void;
  title: FormState['inputs']['title'];
}

export const TitleComponent: FC<Props> = ({ title, inputChanged }) => {
  const { t } = useTranslation();
  return (
    <TextField
      variant="filled"
      margin="normal"
      required
      fullWidth
      id="title"
      label={t('Title')}
      name="title"
      value={title?.value}
      error={title?.error}
      helperText={title?.errorMsg}
      onChange={inputChanged}
      onBlur={(e): void => inputChanged(e, true)}
    />
  );
};

export default memo(TitleComponent);
