import React, { FC, memo, useEffect, useState, useCallback, SetStateAction, Dispatch } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { FormatListNumbered } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

import { InputChangeEvent } from '../../../../models/typescript-events';
import { CategoryInterface } from '../../../../store/categories/initialState.interface';
import { FormValues } from '../../../../../../service/src/models/shared-interfaces/user';
import ExpansionPanelComponent from '../../../Shared/UIElements/ExpansionPanel/ExpansionPanel';
import { useReduxDispatch } from '../../../../store/helpers';
import { setFormValues } from '../../../../store/game/action';
import { FormValidation } from './Interfaces';

export interface Props {
  levels: CategoryInterface;
  setFormValidation: Dispatch<SetStateAction<FormValidation>>;
  defaults: FormValues['levels'];
}

interface State {
  value: number;
  id: string;
  name: string;
}

export const NumberOfTasksPerLevelComponent: FC<Props> = ({
  levels,
  defaults,
  setFormValidation,
}) => {
  const { t } = useTranslation();
  const dispatch = useReduxDispatch();
  const [selectedAmounts, setSelectedAmounts] = useState<State[]>(null);

  useEffect(() => {
    if (levels) {
      setSelectedAmounts(
        levels.children.map((level, i) => ({
          value: Object.values(defaults)[i],
          id: level.id,
          name: level.name,
        })),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levels]);

  useEffect(
    () => {
      if (selectedAmounts) {
        const payload: Partial<FormValues> = {
          levels: {
            level1: selectedAmounts[0].value || 10,
            level2: selectedAmounts[1].value || 10,
            level3: selectedAmounts[2].value || 10,
          },
        };
        dispatch(setFormValues(payload));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedAmounts],
  );

  const onChangeHandler = useCallback(
    (event: InputChangeEvent, index: number): void => {
      const newState: State[] = [...selectedAmounts];
      newState[index].value = parseInt(event.target.value, 10);
      setSelectedAmounts(newState);
      setFormValidation((prevState) => ({
        ...prevState,
        taskPerLevel: newState.every((state) => state.value && state.value > 0),
      }));
    },
    [selectedAmounts, setFormValidation],
  );

  const subtitle = `(${
    selectedAmounts ? selectedAmounts.map((level) => level.value || 0) : '10,10,10'
  })`;
  return (
    <ExpansionPanelComponent
      icon={<FormatListNumbered />}
      subtitle={subtitle}
      title={t('Number of tasks per level')}
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
                error={!level.value || level.value < 1}
                helperText={(!level.value || level.value < 1) && t('Value must be bigger than 0')}
              />
            </Grid>
          ))}
      </Grid>
    </ExpansionPanelComponent>
  );
};

export default memo(NumberOfTasksPerLevelComponent);
