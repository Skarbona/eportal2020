import React, { FC, memo, useState, useEffect } from 'react';
import { Checkbox, FormControlLabel, FormGroup, Grid } from '@material-ui/core';

import { useReduxDispatch } from '../../../../store/helpers';
import { setFormValues } from '../../../../store/game/action';

export const DefaultSettingsComponent: FC<{}> = () => {
  const dispatch = useReduxDispatch();
  const [checkboxState, setCheckboxState] = useState<boolean>(false);
  const setCheckboxStateHandler = (): void => setCheckboxState(prevState => !prevState);

  useEffect(
    () => {
      const payload = {
        saveAsDefault: checkboxState,
      };
      dispatch(setFormValues(payload));
    },
    [checkboxState, setFormValues],
  );

  return (
    <Grid container className="default-settings">
      <FormGroup>
        <FormControlLabel
          className="default-settings__label"
          control={
            <Checkbox checked={checkboxState} onChange={setCheckboxStateHandler} color="primary" />
          }
          label="Zapisz jako domyślne ustawienia"
        />
      </FormGroup>
    </Grid>
  );
};

export default memo(DefaultSettingsComponent);
