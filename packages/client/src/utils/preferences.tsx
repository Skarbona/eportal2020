import React from 'react';

import { CategoryInterface } from '../store/categories/initialState.interface';

export interface CatsStateInterface {
  status: boolean;
  name: string;
  id: string;
  indeterminate: boolean;
  child: CatsStateInterface[];
}

export const nestedCategoriesToState = (
  cats: CategoryInterface,
  defaults: string[],
): CatsStateInterface[] => {
  if (!cats.children || !cats.children.length) return null;
  return cats.children.map((cat) => {
    const isEveryChildTrue =
      defaults.includes(cat.id) ||
      !!(
        cat.children &&
        cat.children.length > 0 &&
        cat.children.every((child) => defaults.includes(child.id))
      );
    const isSomeChildTrue =
      defaults.includes(cat.id) ||
      !!(
        cat.children &&
        cat.children.length > 0 &&
        cat.children.some((child) => defaults.includes(child.id))
      );

    const parent: CatsStateInterface = {
      status: isEveryChildTrue,
      name: cat.name,
      id: cat.id,
      indeterminate: !isEveryChildTrue && isSomeChildTrue,
      child: [],
    };
    const child = nestedCategoriesToState(cat, defaults);
    if (child) {
      parent.child = child;
    }
    return parent;
  });
};

export const selectCatsIds = (preferencesState: CatsStateInterface[]): string[][] =>
  preferencesState.reduce(
    (result, preference) => {
      const preferenceChild = preference.child.reduce(
        (childResult, childPreference) => {
          if (childPreference.status) {
            childResult[0].push(childPreference.id);
            return childResult;
          }
          childResult[1].push(childPreference.id);
          return childResult;
        },
        [[], []],
      );

      result[0].push(...preferenceChild[0]);
      result[1].push(...preferenceChild[1]);
      return result;
    },
    [[], []],
  );

export const setCheckboxesStatus = (
  id: string,
  parentIndex: number,
  prevState: CatsStateInterface[],
): CatsStateInterface[] => {
  const preference = { ...prevState[parentIndex] };
  // Check if it is parent checked action
  if (preference.id === id) {
    preference.indeterminate = false;
    preference.status = !preference.status;
    preference.child.forEach((child) => {
      child.status = preference.status;
    });
  } else {
    // Set status for checked child
    preference.child.forEach((child, childIndex) => {
      if (child.id === id) {
        child.status = !preference.child[childIndex].status;
      }
    });

    if (preference.child.every((child) => child.status)) {
      // Check if every child is checked
      preference.indeterminate = false;
      preference.status = true;
    } else if (preference.child.some((child) => child.status)) {
      // Check if only some child is checked
      preference.indeterminate = true;
      preference.status = false;
    } else {
      // Rule if not even 1 child is checked
      preference.indeterminate = false;
      preference.status = false;
    }
  }
  const stateToReturn = [...prevState];
  stateToReturn[parentIndex] = preference;
  return stateToReturn;
};
