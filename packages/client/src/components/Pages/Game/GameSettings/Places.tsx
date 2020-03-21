import React, { FC, memo, useState, useEffect } from 'react';
import { Grid, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { Place } from '@material-ui/icons';

import ExpansionPanelComponent from '../../../Shared/UIElements/ExpansionPanel/ExpansionPanel';
import { CategoryInterface } from '../../../../store/categories/initialState.interface';
import { SelectChangeEvent } from '../../../../models/typescript-events';

interface Props {
  places: CategoryInterface;
}

export const PlacesComponent: FC<Props> = ({ places }) => {
  const [selectedPlace, setSelectedPlace] = useState<string>(null);
  const [subtitle, setSubtitle] = useState<string>(null);

  useEffect(() => {
    if (places && places.children) {
      setSelectedPlace(places.children[0].id);
      setSubtitle(`(${places.children[0].name})`);
    }
  }, [places]);

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const handleOnChange = (event: SelectChangeEvent, value: any): void => {
    setSelectedPlace(event.target.value as string);
    setSubtitle(`(${value.props.children})`);
  };

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
