import { CatsStateInterface } from '../utils/preferences';
import { chance } from './chance';

export const mockedCatStateForNestedCats = (): CatsStateInterface[] => {
  const names = [chance.string(), chance.string(), chance.string()];
  return names.map((name, index) => ({
    name,
    id: name,
    status: true,
    indeterminate: false,
    child: [
      {
        name: `${name}_child_${index}`,
        id: `${name}_child_${index}`,
        status: true,
        indeterminate: false,
        child: null,
      },
    ],
  }));
};
