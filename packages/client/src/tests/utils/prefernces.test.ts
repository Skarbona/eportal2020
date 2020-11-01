import {
  nestedCategoriesToState,
  selectCatsIds,
  setCheckboxesStatus,
} from '../../utils/preferences';
import { mockedStore } from '../../mocks/store';
import { categoryResponseMock } from '../../mocks/responses';

describe('nestedCategoriesToState utility function', () => {
  it('should map nested cats properly', () => {
    const { user, categories } = mockedStore();
    const nestedCategories = nestedCategoriesToState(
      categories.categories.preferences,
      user.userData.gameDefaults.catsQuery.catsInclude,
    );
    expect(nestedCategories[0].child).toHaveLength(3);
    expect(nestedCategories[0].child[0]).toEqual({
      status: false,
      name: 'children1',
      id: 'children1',
      indeterminate: false,
      child: [],
    });
  });

  it('should set status on true if all child are default', () => {
    const nestedCategories = nestedCategoriesToState(categoryResponseMock(), ['child1', 'child2']);
    expect(nestedCategories[0].indeterminate).toEqual(false);
    expect(nestedCategories[0].status).toEqual(true);
  });

  it('should set status on false if at least 1 child is not default', () => {
    const nestedCategories = nestedCategoriesToState(categoryResponseMock(), ['child1']);
    expect(nestedCategories[0].indeterminate).toEqual(true);
    expect(nestedCategories[0].status).toEqual(false);
  });

  describe('selectCatsIds utility function', () => {
    it('should select all childs as included', () => {
      const nestedCategories = nestedCategoriesToState(categoryResponseMock(), [
        'child1',
        'child2',
      ]);
      const selectedCategories = selectCatsIds(nestedCategories);
      expect(selectedCategories).toHaveLength(2);
      expect(selectedCategories[0]).toHaveLength(2);
      expect(selectedCategories[1]).toHaveLength(0);
      expect(selectedCategories[0][0]).toEqual('child1');
      expect(selectedCategories[0][1]).toEqual('child2');
    });

    it('should select 1 child as included, 1 child as excluded', () => {
      const nestedCategories = nestedCategoriesToState(categoryResponseMock(), ['child1']);
      const selectedCategories = selectCatsIds(nestedCategories);
      expect(selectedCategories).toHaveLength(2);
      expect(selectedCategories[0]).toHaveLength(1);
      expect(selectedCategories[1]).toHaveLength(1);
      expect(selectedCategories[0][0]).toEqual('child1');
      expect(selectedCategories[1][0]).toEqual('child2');
    });

    it('should select all childs as excluded', () => {
      const nestedCategories = nestedCategoriesToState(categoryResponseMock(), []);
      const selectedCategories = selectCatsIds(nestedCategories);
      expect(selectedCategories).toHaveLength(2);
      expect(selectedCategories[0]).toHaveLength(0);
      expect(selectedCategories[1]).toHaveLength(2);
      expect(selectedCategories[1][0]).toEqual('child1');
      expect(selectedCategories[1][1]).toEqual('child2');
    });
  });
});

describe('setCheckboxesStatus utility function', () => {
  it('should set true status on parent and childs', () => {
    // prevState is equal to status=FALSE for parent and childs
    const prevState = nestedCategoriesToState(categoryResponseMock(), []);
    const idOfSelectedCheckbox = 'category1';
    const indexOfSelectedCheckbox = 0;

    const newState = setCheckboxesStatus(idOfSelectedCheckbox, indexOfSelectedCheckbox, prevState);
    expect(newState[0].status).toEqual(true);
    expect(newState[0].indeterminate).toEqual(false);
    newState[0].child.forEach((cat) => {
      expect(cat.status).toEqual(true);
    });
  });

  it('should set false status on parent and childs', () => {
    // prevState is equal to status=TRUE for parent and childs
    const prevState = nestedCategoriesToState(categoryResponseMock(), ['child1', 'child2']);
    const idOfSelectedCheckbox = 'category1';
    const indexOfSelectedCheckbox = 0;

    const newState = setCheckboxesStatus(idOfSelectedCheckbox, indexOfSelectedCheckbox, prevState);
    expect(newState[0].status).toEqual(false);
    expect(newState[0].indeterminate).toEqual(false);
    newState[0].child.forEach((cat) => {
      expect(cat.status).toEqual(false);
    });
  });

  it('should set indeterminate status on parent', () => {
    // prevState status=TRUE and indeterminate=FALSE for parent
    const prevState = nestedCategoriesToState(categoryResponseMock(), ['child1', 'child2']);
    const idOfSelectedCheckbox = 'child1';
    const indexOfSelectedCheckbox = 0;

    const newState = setCheckboxesStatus(idOfSelectedCheckbox, indexOfSelectedCheckbox, prevState);
    expect(newState[0].status).toEqual(false);
    expect(newState[0].indeterminate).toEqual(true);
  });

  it('should set child status on true', () => {
    // prevState status=FALSE and indeterminate=TRUE for parent
    const prevState = nestedCategoriesToState(categoryResponseMock(), ['child2']);
    const idOfSelectedCheckbox = 'child1';
    const indexOfSelectedCheckbox = 0;

    const newState = setCheckboxesStatus(idOfSelectedCheckbox, indexOfSelectedCheckbox, prevState);
    expect(newState[0].status).toEqual(true);
    expect(newState[0].indeterminate).toEqual(false);
    newState[0].child.forEach((cat) => {
      expect(cat.status).toEqual(true);
    });
  });

  it('should set child status on true', () => {
    // prevState status=FALSE and indeterminate=FALSE for parent
    const prevState = nestedCategoriesToState(categoryResponseMock(), []);
    const idOfSelectedCheckbox = 'child1';
    const indexOfSelectedCheckbox = 0;

    const newState = setCheckboxesStatus(idOfSelectedCheckbox, indexOfSelectedCheckbox, prevState);
    expect(newState[0].status).toEqual(false);
    expect(newState[0].indeterminate).toEqual(true);
    expect(newState[0].child[0].status).toEqual(true);
    expect(newState[0].child[1].status).toEqual(false);
  });
});
