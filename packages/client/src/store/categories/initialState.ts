import { CategoriesStateInterface } from './initialState.interface';

export const categoriesInitialState: CategoriesStateInterface = {
  categories: { preferences: null, gender: null, places: null, levels: null },
  loading: false,
  allCatsMap: null,
};
