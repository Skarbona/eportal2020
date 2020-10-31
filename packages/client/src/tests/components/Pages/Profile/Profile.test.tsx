import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as redux from 'react-redux';

import { ProfileComponent } from '../../../../components/Pages/Profile/Profile';
import Settings from '../../../../components/Pages/Profile/Settings/Settings';
import CardInfo from '../../../../components/Pages/Profile/CardInfo';
import PageHeading from '../../../../components/Shared/PageElements/PageHeading/PageHeading';
import PageContainer from '../../../../components/Shared/PageElements/PageContainer/PageContainer';

describe('<Profile > component', () => {
  let wrapper: ShallowWrapper;
  let spyStore: any;

  beforeEach(() => {
    spyStore = jest.spyOn(redux, 'useSelector');
  });

  afterEach(() => {
    spyStore.mockRestore();
  });

  it('should not render all items, if id not provided', () => {
    wrapper = shallow(<ProfileComponent />);
    expect(wrapper.find(Settings)).toHaveLength(1);
    expect(wrapper.find(CardInfo)).toHaveLength(0);
    expect(wrapper.find(PageContainer)).toHaveLength(1);
    expect(wrapper.find(PageHeading)).toHaveLength(1);
  });

  it('should have all required elements', () => {
    spyStore.mockReturnValue({
      id: 'User id',
    });
    wrapper = shallow(<ProfileComponent />);
    expect(wrapper.find(Settings)).toHaveLength(1);
    expect(wrapper.find(CardInfo)).toHaveLength(1);
    expect(wrapper.find(PageContainer)).toHaveLength(1);
    expect(wrapper.find(PageHeading)).toHaveLength(1);
  });
});
