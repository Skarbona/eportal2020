import { Grid } from '@material-ui/core';
import { Apps } from '@material-ui/icons';
import React, { FC, memo, useCallback, useEffect, useState } from 'react';

import { CategoryInterface } from '../../../../store/categories/initialState.interface';
import * as CatsHandler from '../../../../utils/nested-cats-handlers';
import ExpansionPanelComponent from '../../../Shared/UIElements/ExpansionPanel/ExpansionPanel';

interface Props {
  preferences: CategoryInterface;
}

export const PreferencesComponent: FC<Props> = ({ preferences }) => {
  const [preferencesState, setPreferencesState] = useState<CatsHandler.CatsStateInterface[]>(null);
  const [numberOfSelection, setNumberOfSelection] = useState<number>(0);

  const preferenceStateHandler = useCallback(
    (id: string, parentIndex: number) => {
      setPreferencesState(prevState => {
        const preference = { ...preferencesState[parentIndex] };
        const prevStateToSet = prevState[parentIndex];
        if (preference.id === id) {
          preference.indeterminate = false;
          preference.status = !prevStateToSet.status;
          preference.child.forEach(child => {
            child.status = prevStateToSet.status;
          });
        } else {
          preference.child.forEach((child, childIndex) => {
            if (child.id === id) {
              child.status = !prevStateToSet.child[childIndex].status;
            }
          });

          if (preference.child.every(child => child.status)) {
            preference.indeterminate = false;
            preference.status = true;
          } else if (preference.child.some(child => child.status)) {
            preference.indeterminate = true;
            preference.status = false;
          } else {
            preference.indeterminate = false;
            preference.status = false;
          }
        }
        const stateToReturn = [...prevState];
        stateToReturn[parentIndex] = preference;
        return stateToReturn;
      });
    },
    [preferencesState],
  );

  useEffect(() => {
    if (preferences) {
      setPreferencesState(CatsHandler.mapNestedCatsNames(preferences));
    }
  }, [preferences]);

  useEffect(() => {
    if (preferencesState) {
      const amountOfSelectedCats = preferencesState.reduce((amount, preference) => {
        const childSelection = preference.child.reduce((result, preferenceChild) => {
          if (preferenceChild.status) {
            return result + 1;
          }
          return result;
        }, 0);
        return amount + childSelection;
      }, 0);
      setNumberOfSelection(amountOfSelectedCats);
    }
  }, [preferencesState]);

  if (!preferencesState) return null;

  return (
    <ExpansionPanelComponent
      subtitle={`(Wybrano ${numberOfSelection} kategorii)`}
      className="game__preferences"
      title={preferences.name}
      icon={<Apps />}
    >
      <Grid container spacing={1}>
        {CatsHandler.renderNestedCatsWithCheckbox(preferencesState, preferenceStateHandler)}
      </Grid>
    </ExpansionPanelComponent>
  );
};

export default memo(PreferencesComponent);
