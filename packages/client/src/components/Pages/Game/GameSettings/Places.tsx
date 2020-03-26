import { FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import { Place } from '@material-ui/icons';
import React, { FC, memo, useEffect, useState, useCallback } from 'react';

import { SelectChangeEvent } from '../../../../models/typescript-events';
import { CategoryInterface } from '../../../../store/categories/initialState.interface';
import { FormValues } from '../../../../../../service/src/models/shared-interfaces/user';

import ExpansionPanelComponent from '../../../Shared/UIElements/ExpansionPanel/ExpansionPanel';
import { useReduxDispatch } from '../../../../store/helpers';
import { setFormValues } from '../../../../store/game/action';

export interface Props {
  places: CategoryInterface;
  defaults: string;
}

export const PlacesComponent: FC<Props> = ({ places, defaults }) => {
  const dispatch = useReduxDispatch();
  const [selectedPlace, setSelectedPlace] = useState<string>(null);
  const [subtitle, setSubtitle] = useState<string>('(Ładuje lokalizacje...)');

  useEffect(
    () => {
      if (places && places.children) {
        const findDefaultPlace = places.children.find(place => place.id === defaults);
        setSelectedPlace(findDefaultPlace ? findDefaultPlace.id : places.children[0].id);
        setSubtitle(`(${findDefaultPlace ? findDefaultPlace.name : places.children[0].name})`);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [places],
  );

  useEffect(
    () => {
      const payload: Partial<FormValues> = { place: selectedPlace };
      dispatch(setFormValues(payload));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedPlace],
  );

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const handleOnChange = useCallback((event: SelectChangeEvent, value: any): void => {
    setSelectedPlace(event.target.value as string);
    setSubtitle(`(${value.props.children})`);
  }, []);

  return (
    <ExpansionPanelComponent
      icon={<Place />}
      subtitle={subtitle}
      title="Miejsce Gry"
      className="game__places"
    >
      <Grid container spacing={1}>
        {selectedPlace && (
          <FormControl variant="filled" className="form-element__default-width">
            <InputLabel id="game_label">Miejsce gry</InputLabel>
            <Select
              labelId="game_label"
              id="game_select"
              value={selectedPlace}
              onChange={handleOnChange}
            >
              {places.children.map(place => (
                <MenuItem value={place.id} key={place.id}>
                  {place.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Grid>
    </ExpansionPanelComponent>
  );
};

export default memo(PlacesComponent);
