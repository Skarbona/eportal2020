import { Grid, TextField } from '@material-ui/core';
import { People } from '@material-ui/icons';
import React, { FC, memo, useState } from 'react';

import { InputChangeEvent } from '../../../../models/typescript-events';
import ExpansionPanelComponent from '../../../Shared/UIElements/ExpansionPanel/ExpansionPanel';

export const PlayersNamesComponent: FC<{}> = () => {
  const [womanName, setWomanName] = useState<string>('');
  const [manName, setManName] = useState<string>('');

  const setWomanNameHandler = (event: InputChangeEvent): void => setWomanName(event.target.value);
  const setManNameHandler = (event: InputChangeEvent): void => setManName(event.target.value);

  const subtitle = `(${womanName || 'Ona'}, ${manName || 'On'})`;
  return (
    <ExpansionPanelComponent
      icon={<People />}
      title="Imiona Graczy"
      subtitle={subtitle}
      className="game__names"
    >
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Ona"
            className="form-element__default-width"
            variant="filled"
            helperText="Wybierz imię dla Partnerki"
            value={womanName}
            onChange={setWomanNameHandler}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="On"
            className="form-element__default-width"
            variant="filled"
            helperText="Wybierz imię dla Partnera"
            value={manName}
            onChange={setManNameHandler}
          />
        </Grid>
      </Grid>
    </ExpansionPanelComponent>
  );
};

export default memo(PlayersNamesComponent);
