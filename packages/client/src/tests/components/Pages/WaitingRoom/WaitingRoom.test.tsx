import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Button } from '@material-ui/core';
import * as redux from 'react-redux';
import { Pagination } from '@material-ui/lab';

import { WaitingRoomComponent as WaitingRoom } from '../../../../components/Pages/WaitingRoom/WaitingRoom';
import SaveTaskForm from '../../../../components/Pages/WaitingRoom/SaveTaskForm';
import Posts from '../../../../components/Pages/WaitingRoom/Posts';
import * as getPostsThunk from '../../../../store/waitingRoom/thunks/getPosts';
import * as fetchCategoriesThunk from '../../../../store/categories/thunks/fetchCategories';
import PageHeading from '../../../../components/Shared/PageElements/PageHeading/PageHeading';
import PageContainer from '../../../../components/Shared/PageElements/PageContainer/PageContainer';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn(() => ({
    push: (path: string) => {},
  })),
  useParams: jest.fn(() => ({
    page: 1,
  })),
}));

describe('<WaitingRoom > component', () => {
  let wrapper: ShallowWrapper;
  let getPostsSpy: any;
  let fetchCategoriesSpy: any;
  let spyStore: any;

  beforeEach(() => {
    spyStore = jest.spyOn(redux, 'useSelector');
    getPostsSpy = jest.spyOn(getPostsThunk, 'getPosts');
    fetchCategoriesSpy = jest.spyOn(fetchCategoriesThunk, 'fetchCategories');
  });

  afterEach(() => {
    spyStore.mockClear();
    getPostsSpy.mockClear();
    fetchCategoriesSpy.mockClear();
  });

  it('should have all required elements', () => {
    wrapper = shallow(<WaitingRoom />);
    expect(wrapper.find(PageHeading)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(PageContainer)).toHaveLength(1);
    expect(wrapper.find(Posts)).toHaveLength(1);
    expect(wrapper.find(SaveTaskForm)).toHaveLength(0);
    expect(wrapper.find(Pagination)).toHaveLength(0);
  });

  it('should have all required elements for proper props', () => {
    spyStore.mockReturnValue({
      totalPages: 2,
      catsLoaded: true,
    });
    wrapper = shallow(<WaitingRoom />);
    expect(wrapper.find(PageHeading)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(PageContainer)).toHaveLength(1);
    expect(wrapper.find(Posts)).toHaveLength(1);
    expect(wrapper.find(SaveTaskForm)).toHaveLength(0);
    expect(wrapper.find(Pagination)).toHaveLength(1);
  });

  it('should show SaveTaskForm on button click', () => {
    spyStore.mockReturnValue({
      totalPages: 2,
      catsLoaded: true,
    });
    wrapper = shallow(<WaitingRoom />);
    wrapper.find(Button).simulate('click');
    expect(wrapper.find(SaveTaskForm)).toHaveLength(1);
  });

  it('should calls all required endpoints', () => {
    wrapper = shallow(<WaitingRoom />);
    expect(getPostsSpy).toHaveBeenCalledTimes(1);
    expect(fetchCategoriesSpy).toHaveBeenCalledTimes(1);
  });
});
