import { Grid } from '@material-ui/core';
import { Apps } from '@material-ui/icons';
import React, { FC, memo, useCallback, useEffect, useState } from 'react';

import { CategoryInterface } from '../../../../store/categories/initialState.interface';
import { FormValues } from '../../../../../../service/src/models/shared-interfaces/user';

import {
  nestedCategoriesToState,
  setCheckboxesStatus,
  renderNestedCatsWithCheckbox,
  selectCatsIds,
  CatsStateInterface,
} from '../../../../utils/preferences';
import ExpansionPanelComponent from '../../../Shared/UIElements/ExpansionPanel/ExpansionPanel';
import { useReduxDispatch } from '../../../../store/helpers';
import { setFormValues } from '../../../../store/game/action';

export interface Props {
  preferences: CategoryInterface;
  setFormValidation(valid: boolean): void;
  defaults: string[];
}

export const PreferencesComponent: FC<Props> = ({ preferences, setFormValidation, defaults }) => {
  const dispatch = useReduxDispatch();
  const [preferencesState, setPreferencesState] = useState<CatsStateInterface[]>([]);
  const [numberOfSelection, setNumberOfSelection] = useState<number>(0);

  useEffect(() => {
    setFormValidation(numberOfSelection >= 10);
  }, [numberOfSelection, setFormValidation]);

  const preferenceStateHandler = useCallback((id: string, parentIndex: number) => {
    setPreferencesState(prevState => setCheckboxesStatus(id, parentIndex, prevState));
  }, []);

  useEffect(() => {
    if (preferences) {
      setPreferencesState(nestedCategoriesToState(preferences, defaults));
    }
  }, [preferences, defaults]);

  useEffect(
    () => {
      if (preferencesState) {
        const selectedIds = selectCatsIds(preferencesState);
        setNumberOfSelection(selectedIds[0].length);
        const payload: Partial<FormValues> = {
          catsQuery: {
            catsInclude: selectedIds[0],
            catsExclude: selectedIds[1],
          },
        };
        dispatch(setFormValues(payload));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [preferencesState],
  );

  return (
    <ExpansionPanelComponent
      subtitle={`(Wybrano ${numberOfSelection} kategorii)`}
      className="game__preferences"
      title={preferences && preferences.name}
      icon={<Apps />}
    >
      <Grid container spacing={1}>
        {preferencesState && renderNestedCatsWithCheckbox(preferencesState, preferenceStateHandler)}
      </Grid>
    </ExpansionPanelComponent>
  );
};

export default memo(PreferencesComponent);
