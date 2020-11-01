import React, { FC, memo } from 'react';
import { TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { FormState } from '../../../hooks/form/state/interface';
import { InputChangeEvent } from '../../../models/typescript-events';

export const NewCategoryComponent: FC<Props> = ({
  newCategory,
  inputChanged,
  className,
  required = false,
}) => {
  const { t } = useTranslation();
  return (
    <TextField
      variant="filled"
      margin="normal"
      required={required}
      fullWidth
      id="newCategory"
      label={t('Proposal of new preference')}
      name="newCategory"
      value={newCategory?.value}
      error={newCategory?.error}
      helperText={newCategory?.errorMsg}
      onChange={inputChanged}
      className={className}
      onBlur={(e): void => inputChanged(e, true)}
    />
  );
};

export interface Props {
  inputChanged(value: InputChangeEvent, blurred?: boolean): void;
  newCategory: FormState['inputs']['newCategory'];
  className?: string;
  required?: boolean;
}

export default memo(NewCategoryComponent);
