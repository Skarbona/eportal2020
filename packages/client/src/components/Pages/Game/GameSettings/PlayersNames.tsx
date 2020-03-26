import React, { FC, memo, useState, useEffect, useCallback } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { People } from '@material-ui/icons';

import { InputChangeEvent } from '../../../../models/typescript-events';
import { FormValues } from '../../../../../../service/src/models/shared-interfaces/user';

import ExpansionPanelComponent from '../../../Shared/UIElements/ExpansionPanel/ExpansionPanel';
import { useReduxDispatch } from '../../../../store/helpers';
import { setFormValues } from '../../../../store/game/action';

export interface Props {
  defaults: {
    she: string;
    he: string;
  };
}

export const PlayersNamesComponent: FC<Props> = ({ defaults }) => {
  const dispatch = useReduxDispatch();
  const [womanName, setWomanName] = useState<string>(defaults.she);
  const [manName, setManName] = useState<string>(defaults.he);

  useEffect(
    () => {
      const payload: Partial<FormValues> = {
        names: { she: womanName || defaults.she, he: manName || defaults.he },
      };
      dispatch(setFormValues(payload));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [womanName, manName],
  );

  const setWomanNameHandler = useCallback(
    (event: InputChangeEvent): void => setWomanName(event.target.value),
    [],
  );
  const setManNameHandler = useCallback(
    (event: InputChangeEvent): void => setManName(event.target.value),
    [],
  );

  const subtitle = `(${womanName || defaults.she}, ${manName || defaults.he})`;
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
