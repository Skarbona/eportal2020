import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Typography, Breadcrumbs as MaterialBreadcrumbs } from '@material-ui/core';

import { BreadcrumbsComponent } from '../../../components/Shared/PageElements/BreadCrumbs/BreadCrumbs';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(() => ({ pathname: '/profile' })),
}));

describe('<Breadcrumbs > component', () => {
  let wrapper: ShallowWrapper;

  it('should have all required elements', () => {
    wrapper = shallow(<BreadcrumbsComponent />);
    expect(wrapper.find(Typography)).toHaveLength(1);
    expect(wrapper.find(MaterialBreadcrumbs)).toHaveLength(1);
  });
});
