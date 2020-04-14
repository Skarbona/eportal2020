import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { ProfileComponent } from '../../../../components/Pages/Profile/Profile';
import Settings from '../../../../components/Pages/Profile/Settings/Settings';
import CardInfo from '../../../../components/Pages/Profile/CardInfo';
import PageHeading from '../../../../components/Shared/PageElements/PageHeading/PageHeading';
import PageContainer from '../../../../components/Shared/PageElements/PageContainer/PageContainer';

describe('<Profile > component', () => {
  let wrapper: ShallowWrapper;

  it('should have all required elements', () => {
    wrapper = shallow(<ProfileComponent />);
    expect(wrapper.find(Settings)).toHaveLength(1);
    expect(wrapper.find(CardInfo)).toHaveLength(1);
    expect(wrapper.find(PageContainer)).toHaveLength(1);
    expect(wrapper.find(PageHeading)).toHaveLength(1);
  });
});
