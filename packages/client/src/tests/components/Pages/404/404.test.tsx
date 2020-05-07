import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { NotFoundComponent } from '../../../../components/Pages/404/404';
import PageContainer from '../../../../components/Shared/PageElements/PageContainer/PageContainer';

describe('<404 > component', () => {
  let wrapper: ShallowWrapper;

  it('should render all required items', () => {
    wrapper = shallow(<NotFoundComponent />);
    expect(wrapper.find(PageContainer)).toHaveLength(1);
    expect(wrapper.find(Typography)).toHaveLength(2);
    expect(wrapper.find(Link)).toHaveLength(1);
  });
});
