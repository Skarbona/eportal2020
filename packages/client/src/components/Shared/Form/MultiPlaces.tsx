import React, { FC, memo, useCallback } from 'react';
import { FormControl, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';

import { CategoryInterface } from '../../../store/categories/initialState.interface';
import { CheckboxChangeEvent, SelectChangeEvent } from '../../../models/typescript-events';
import { InputKeys } from '../../../hooks/form/state/interface';

export const MultiPlacesComponent: FC<Props> = ({ places, place, inputChanged }) => {
  const inputChangedHandler = useCallback(
    ({ target: { id, name } }: CheckboxChangeEvent) => {
      if (place.find((el) => el === id)) {
        const event = {
          target: {
            value: place.filter((el) => el !== id),
            name,
          },
        } as unknown as SelectChangeEvent;
        inputChanged(event);
      } else {
        const event = {
          target: {
            value: [...place, id],
            name,
          },
        } as unknown as SelectChangeEvent;
        inputChanged(event);
      }
    },
    [place, inputChanged],
  );

  return (
    <FormControl variant="filled" className="form-element__default-width">
      <FormGroup>
        {places.children.map(({ id, name }) => (
          <FormControlLabel
            key={id}
            control={
              <Checkbox
                checked={place.includes(id)}
                onChange={inputChangedHandler}
                color="primary"
                name={InputKeys.Place}
                id={id}
              />
            }
            label={name}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export interface Props {
  places: CategoryInterface;
  place: string[];
  inputChanged: (event: SelectChangeEvent) => void;
}

export default memo(MultiPlacesComponent);
