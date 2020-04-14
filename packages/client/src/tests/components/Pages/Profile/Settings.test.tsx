import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { AppBar, Tab } from '@material-ui/core';

import { SettingsComponent } from '../../../../components/Pages/Profile/Settings/Settings';
import ChangePassword from '../../../../components/Pages/Profile/Settings/ChangePassword';
import DeleteAccount from '../../../../components/Pages/Profile/Settings/DeleteAccount';

describe('<Settings > component', () => {
  let wrapper: ShallowWrapper;

  it('should have all required elements', () => {
    wrapper = shallow(<SettingsComponent />);
    expect(wrapper.find(ChangePassword)).toHaveLength(1);
    expect(wrapper.find(DeleteAccount)).toHaveLength(1);
    expect(wrapper.find(Tab)).toHaveLength(2);
    expect(wrapper.find(AppBar)).toHaveLength(1);
  });
});
