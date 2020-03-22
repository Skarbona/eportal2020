import React, { FC, memo, useEffect, useState } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { FormatListNumbered } from '@material-ui/icons';

import { InputChangeEvent } from '../../../../models/typescript-events';
import { CategoryInterface } from '../../../../store/categories/initialState.interface';
import ExpansionPanelComponent from '../../../Shared/UIElements/ExpansionPanel/ExpansionPanel';
import { useReduxDispatch } from '../../../../store/helpers';
import { setFormValues } from '../../../../store/game/action';

interface Props {
  levels: CategoryInterface;
}

interface State {
  value: number;
  id: string;
  name: string;
}

export const NumberOfTasksPerLevelComponent: FC<Props> = ({ levels }) => {
  const dispatch = useReduxDispatch();
  const [selectedAmounts, setSelectedAmounts] = useState<State[]>(null);
  useEffect(
    () => {
      if (levels && levels.children) {
        setSelectedAmounts(
          levels.children.map(level => ({ value: 10, id: level.id, name: level.name })),
        );
      }
    },
    [levels],
  );

  useEffect(
    () => {
      if (selectedAmounts) {
        const payload = {
          levels: {
            level1: selectedAmounts[0].value,
            level2: selectedAmounts[1].value,
            level3: selectedAmounts[2].value,
          },
        };
        dispatch(setFormValues(payload));
      }
    },
    [selectedAmounts, setFormValues],
  );

  const onChangeHandler = (event: InputChangeEvent, index: number): void => {
    const newState = [...selectedAmounts];
    const value = parseInt(event.target.value, 10);
    const numberToSet = value >= 1 ? value : 1;
    newState[index].value = numberToSet;
    setSelectedAmounts(newState);
  };

  if (!selectedAmounts) return null;

  const subtitle = `(${selectedAmounts.map(level => level.value)})`;
  return (
    <ExpansionPanelComponent
      icon={<FormatListNumbered />}
      subtitle={subtitle}
      title="Liczba zadań na poziom"
      className="game__levels"
    >
      <Grid container spacing={1}>
        {selectedAmounts &&
          selectedAmounts.map((level, index) => (
            <Grid item xs={12} md={4} key={level.id}>
              <TextField
                label={level.name}
                id={level.id}
                onChange={(e): void => onChangeHandler(e, index)}
                value={level.value}
                className="form-element__default-width number-input"
                variant="filled"
                type="number"
              />
            </Grid>
          ))}
      </Grid>
    </ExpansionPanelComponent>
  );
};

export default memo(NumberOfTasksPerLevelComponent);
