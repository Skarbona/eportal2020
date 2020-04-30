import {
  CategoriesStateInterface,
  CategoryInterface,
} from '../store/categories/initialState.interface';

export const setCatsMap = (cats: CategoryInterface[]): CategoriesStateInterface['allCatsMap'] => {
  const listOfCats = (categories: CategoryInterface[]): { id: string; name: string }[] =>
    categories
      .map((cat) => {
        if (cat.children?.length) {
          return listOfCats(cat.children);
        }
        return { id: cat.id, name: cat.name };
      })
      .flat(1);
  return new Map(listOfCats(cats).map((cat) => [cat.id, cat.name]));
};
