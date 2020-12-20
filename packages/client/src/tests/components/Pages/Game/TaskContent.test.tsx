import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Chip } from '@material-ui/core';
import * as redux from 'react-redux';

import { TaskContentComponent } from '../../../../components/Pages/Game/Levels/TaskContent';
import { PropsTaskContentSelector } from '../../../../components/Pages/Game/Levels/selector-hooks';
import { mockedStore, mockPost } from '../../../../mocks/store';

describe('<TaskContent > component', () => {
  let wrapper: ShallowWrapper;
  let selectorProps: PropsTaskContentSelector;
  let spyStore: any;

  beforeEach(() => {
    spyStore = jest.spyOn(redux, 'useSelector');
    const { game, categories } = mockedStore();
    const currentTask = mockPost();
    selectorProps = {
      id: '',
      allCatsMap: categories.allCatsMap,
      categories: currentTask.categories,
      content: currentTask.content,
      image: currentTask.image,
      she: game.config?.names.she,
      he: game.config?.names.he,
    };
    spyStore.mockReturnValue(selectorProps);
  });

  afterEach(() => {
    spyStore.mockRestore();
  });

  it('should render all required items', () => {
    wrapper = shallow(<TaskContentComponent />);
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find(Chip)).toHaveLength(3);
    expect(wrapper.find('.task-title')).toHaveLength(1);
  });
});
