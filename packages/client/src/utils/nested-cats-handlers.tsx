import { Checkbox, FormControlLabel, FormGroup, Grid } from '@material-ui/core';
import React, { ReactNode } from 'react';

import { CategoryInterface } from '../store/categories/initialState.interface';

export interface CatsStateInterface {
  status: boolean;
  name: string;
  id: string;
  indeterminate: boolean;
  child: CatsStateInterface[];
}
export const renderNestedCatsWithCheckbox = (
  cats: CatsStateInterface[],
  setState: (id: string, parentIndex: number) => void,
  parentIndex?: number,
): ReactNode => {
  return cats.map((cat, i) => {
    const mainIndex = parentIndex >= 0 ? parentIndex : i;
    const setStateHandler = (): void => setState(cat.id, mainIndex);
    return (
      <Grid item xs={12} md={6} className="nested-cats" key={cat.name}>
        <FormGroup className="nested-cats__form-group">
          <FormControlLabel
            control={
              <Checkbox
                checked={cat.status}
                onChange={setStateHandler}
                name={cat.id}
                color="primary"
                indeterminate={cat.indeterminate}
              />
            }
            label={cat.name}
          />
          {cat.child && renderNestedCatsWithCheckbox(cat.child, setState, mainIndex)}
        </FormGroup>
      </Grid>
    );
  });
};

export const mapNestedCatsNames = (cats: CategoryInterface): CatsStateInterface[] => {
  if (!cats.children || !cats.children.length) return null;
  return cats.children.map(cat => {
    const parent = {
      status: false,
      name: cat.name,
      id: cat.id,
      indeterminate: false,
      child: null,
    } as CatsStateInterface;
    const child = mapNestedCatsNames(cat);
    if (child) {
      parent.child = child;
    }
    return parent;
  });
};
