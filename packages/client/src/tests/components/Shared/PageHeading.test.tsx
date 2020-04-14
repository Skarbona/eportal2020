import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Typography } from '@material-ui/core';

import { PageHeadingComponent } from '../../../components/Shared/PageElements/PageHeading/PageHeading';
import { ReactComponent as WaveSVG } from '../../../media/svg/wave1.svg';
import Breadcrumbs from '../../../components/Shared/PageElements/BreadCrumbs/BreadCrumbs';

describe('<PageHeading > component', () => {
  let wrapper: ShallowWrapper;

  it('should have all required elements', () => {
    wrapper = shallow(<PageHeadingComponent title="title" />);
    expect(wrapper.find(Breadcrumbs)).toHaveLength(1);
    expect(wrapper.find(Typography)).toHaveLength(1);
    expect(wrapper.find(WaveSVG)).toHaveLength(1);
  });
});
