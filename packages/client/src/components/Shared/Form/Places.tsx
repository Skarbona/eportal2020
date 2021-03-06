import React, { FC, memo } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { CategoryInterface } from '../../../store/categories/initialState.interface';
import { SelectChangeEvent } from '../../../models/typescript-events';

export const PlacesComponent: FC<Props> = ({ places, place, inputChanged }) => {
  const { t } = useTranslation();
  return (
    <FormControl variant="filled" className="form-element__default-width">
      <InputLabel id="place_label">{t('Place of game')}</InputLabel>
      <Select labelId="place_label" id="place" value={place} onChange={inputChanged} name="place">
        {places.children.map((placeChild) => (
          <MenuItem value={placeChild.id} key={placeChild.id}>
            {placeChild.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export interface Props {
  places: CategoryInterface;
  place: string;
  inputChanged: (event: SelectChangeEvent) => void;
}

export default memo(PlacesComponent);
