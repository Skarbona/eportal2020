import { Checkbox, FormControlLabel, FormGroup, Grid } from '@material-ui/core';
import React, { FC, memo, useState } from 'react';

export const DefaultSettingsComponent: FC<{}> = () => {
  const [checkboxState, setCheckboxState] = useState<boolean>(false);
  const setCheckboxStateHandler = (): void => setCheckboxState(prevState => !prevState);
  return (
    <Grid container className="default-settings">
      <FormGroup>
        <FormControlLabel
          className="default-settings__label"
          control={
            <Checkbox checked={checkboxState} onChange={setCheckboxStateHandler} color="primary" />
          }
          label={'Zapisz jako domyślne ustawienia'}
        />
      </FormGroup>
    </Grid>
  );
};

export default memo(DefaultSettingsComponent);
