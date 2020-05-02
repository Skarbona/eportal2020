import { checkIfHasCategories, setCatsMap } from '../../utils/categories';
import { mockedStore } from '../../mocks/store';

describe('checkIfHasCategories utility function', () => {
  it('should return true if all categories exist', () => {
    const { categories } = mockedStore();
    const hasCategories = checkIfHasCategories(categories.categories);
    expect(hasCategories).toEqual(true);
  });

  it('should return not return true if not all categories exist', () => {
    const { categories } = mockedStore();
    categories.categories.levels = null;
    const hasCategories = checkIfHasCategories(categories.categories);
    expect(hasCategories).toEqual(false);
  });
});

describe('setCatsMap utility function', () => {
  it('should create new Map', () => {
    const { categories } = mockedStore();
    categories.categories.preferences.children[0].children = [
      { id: 'nestedCat', name: 'nestedCat' } as any,
    ];
    const categoryMap = setCatsMap(categories.categories.preferences.children);
    expect(categoryMap.get('children1')).toEqual('children1');
    expect(categoryMap.get('nestedCat')).toEqual('nestedCat');
  });
});
