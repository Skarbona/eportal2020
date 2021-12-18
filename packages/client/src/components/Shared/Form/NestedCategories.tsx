import React, { FC, memo } from 'react';
import { Grid, FormGroup, FormControlLabel, Checkbox, Tooltip } from '@material-ui/core';
import { Help } from '@material-ui/icons';

import { CatsStateInterface } from '../../../utils/preferences';

export const NestedCategoriesComponent: FC<Props> = ({ cats, inputChanged, parentIndex }) => {
  return (
    <>
      {cats.map((cat, i) => {
        const mainIndex = parentIndex >= 0 ? parentIndex : i;
        const setStateHandler = (): void => inputChanged(cat.id, mainIndex);
        return (
          <Grid item xs={12} sm={6} className="nested-cats" key={cat.name}>
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
                label={
                  <div className="nested-cats__label">
                    {cat.name}{' '}
                    {cat.description && (
                      <Tooltip title={cat.description}>
                        <Help />
                      </Tooltip>
                    )}
                  </div>
                }
              />
              {cat.child && (
                <NestedCategoriesComponent
                  cats={cat.child}
                  inputChanged={inputChanged}
                  parentIndex={mainIndex}
                />
              )}
            </FormGroup>
          </Grid>
        );
      })}
    </>
  );
};

export interface Props {
  cats: CatsStateInterface[];
  inputChanged: (id: string, parentIndex: number) => void;
  parentIndex?: number;
}

export default memo(NestedCategoriesComponent);
