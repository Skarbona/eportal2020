import React, { FC, memo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Checkbox, FormControlLabel, FormGroup, Grid } from '@material-ui/core';

import { FormValues } from '../../../../../../service/src/models/shared-interfaces/user';

import { useReduxDispatch } from '../../../../store/helpers';
import { setFormValues } from '../../../../store/game/action';

export const DefaultSettingsComponent: FC = () => {
  const { t } = useTranslation();
  const dispatch = useReduxDispatch();
  const [checkboxState, setCheckboxState] = useState<boolean>(false);
  const setCheckboxStateHandler = (): void => setCheckboxState((prevState) => !prevState);

  useEffect(
    () => {
      const payload: Partial<FormValues> = {
        saveAsDefault: checkboxState,
      };
      dispatch(setFormValues(payload));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [checkboxState],
  );

  return (
    <Grid container className="default-settings">
      <FormGroup>
        <FormControlLabel
          color="primary"
          className="primary-checkbox"
          control={
            <Checkbox
              id="default-option"
              checked={checkboxState}
              onChange={setCheckboxStateHandler}
              color="primary"
            />
          }
          label={t('Save as default')}
        />
      </FormGroup>
    </Grid>
  );
};

export default memo(DefaultSettingsComponent);
