import { Grid } from '@material-ui/core';
import { Apps } from '@material-ui/icons';
import React, { FC, memo, useCallback, useEffect, useState } from 'react';

import { CategoryInterface } from '../../../../store/categories/initialState.interface';
import * as CatsHandler from '../../../../utils/nested-cats-handlers';
import ExpansionPanelComponent from '../../../Shared/UIElements/ExpansionPanel/ExpansionPanel';
import { useReduxDispatch } from '../../../../store/helpers';
import { setFormValues } from '../../../../store/game/action';

interface Props {
  preferences: CategoryInterface;
  setFormValidation(valid: boolean): void;
}

export const PreferencesComponent: FC<Props> = ({ preferences, setFormValidation }) => {
  const dispatch = useReduxDispatch();
  const [preferencesState, setPreferencesState] = useState<CatsHandler.CatsStateInterface[]>(null);
  const [numberOfSelection, setNumberOfSelection] = useState<number>(0);

  useEffect(
    () => {
      setFormValidation(numberOfSelection >= 10);
    },
    [numberOfSelection, setFormValidation],
  );

  const preferenceStateHandler = useCallback(
    (id: string, parentIndex: number) => {
      setPreferencesState(prevState => {
        const preference = preferencesState[parentIndex];
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

  useEffect(
    () => {
      if (preferences) {
        setPreferencesState(CatsHandler.mapNestedCatsNames(preferences));
      }
    },
    [preferences],
  );

  useEffect(
    () => {
      if (preferencesState) {
        const selectedCatsIds = preferencesState.reduce((result, preference): any => {
          const preferenceChild = preference.child.reduce((childResult, childPreference): any => {
            if (childPreference.status) {
              childResult.push(childPreference.id);
              return childResult;
            }
            return childResult;
          }, []);

          if (preferenceChild.length > 0) {
            result.push(...preferenceChild);
            return result;
          }
          return result;
        }, []);

        setNumberOfSelection(selectedCatsIds.length);
        const payload = { cats: selectedCatsIds };
        dispatch(setFormValues(payload));
      }
    },
    [preferencesState],
  );

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
