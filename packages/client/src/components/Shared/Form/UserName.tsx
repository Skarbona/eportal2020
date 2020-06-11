import React, { FC, memo } from 'react';
import { TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { FormState } from '../../../hooks/form/state/interface';
import { InputChangeEvent } from '../../../models/typescript-events';

interface Props {
  inputChanged(value: InputChangeEvent, blurred?: boolean): void;
  userName: FormState['inputs']['userName'];
}

export const UserNameComponent: FC<Props> = ({ userName, inputChanged }) => {
  const { t } = useTranslation();
  return (
    <TextField
      variant="filled"
      margin="normal"
      required
      fullWidth
      id="username"
      label={t('Username')}
      name="userName"
      value={userName?.value}
      error={userName?.error}
      helperText={userName?.errorMsg}
      onChange={inputChanged}
      onBlur={(e): void => inputChanged(e, true)}
    />
  );
};

export default memo(UserNameComponent);
