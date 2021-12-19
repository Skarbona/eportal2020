import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Button } from '@material-ui/core';
import * as redux from 'react-redux';

import {
  Props,
  SaveTaskFormComponent as SaveTaskForm,
} from '../../../../components/Pages/WaitingRoom/SaveTaskForm';
import * as createPostThunk from '../../../../store/waitingRoom/thunks/createPost';
import Levels from '../../../../components/Shared/Form/Levels';
import Title from '../../../../components/Shared/Form/Title';
import Message from '../../../../components/Shared/Form/Message';
import MultiPlaces from '../../../../components/Shared/Form/MultiPlaces';
import NewCategory from '../../../../components/Shared/Form/NewCategory';
import NestedCategories from '../../../../components/Shared/Form/NestedCategories';
import Gender from '../../../../components/Shared/Form/Gender';
import { mockedEvent } from '../../../../mocks/event';
import { mockedStore } from '../../../../mocks/store';

describe('<SaveTaskForm > component', () => {
  let wrapper: ShallowWrapper;
  let createPostSpy: any;
  let spyStore: any;
  let props: Props;

  beforeEach(() => {
    spyStore = jest.spyOn(redux, 'useSelector');
    createPostSpy = jest.spyOn(createPostThunk, 'createPost');
    props = {
      setShowAddPost: jest.fn(),
    };
  });

  afterEach(() => {
    spyStore.mockClear();
    createPostSpy.mockClear();
  });

  it('should have all required elements', () => {
    const { categories } = mockedStore();
    spyStore.mockReturnValue({
      cats: categories.categories,
    });
    wrapper = shallow(<SaveTaskForm {...props} />);
    expect(wrapper.find('form')).toHaveLength(1);
    expect(wrapper.find(Title)).toHaveLength(1);
    expect(wrapper.find(Message)).toHaveLength(1);
    expect(wrapper.find(MultiPlaces)).toHaveLength(1);
    expect(wrapper.find(Levels)).toHaveLength(1);
    expect(wrapper.find(NestedCategories)).toHaveLength(1);
    expect(wrapper.find(NewCategory)).toHaveLength(1);
    expect(wrapper.find(Gender)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(2);
  });

  it('should call createPost onSubmit', async () => {
    const { categories } = mockedStore();
    spyStore.mockReturnValue({
      cats: categories.categories,
    });
    wrapper = shallow(<SaveTaskForm {...props} />);
    wrapper.find('form').simulate('submit', mockedEvent);
    await expect(createPostSpy).toHaveBeenCalledTimes(1);
  });
});
