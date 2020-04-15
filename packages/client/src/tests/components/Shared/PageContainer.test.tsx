import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { PageContainerComponent } from '../../../components/Shared/PageElements/PageContainer/PageContainer';

describe('<PageContainer > component', () => {
  let wrapper: ShallowWrapper;

  it('should have all required elements', () => {
    wrapper = shallow(
      <PageContainerComponent className="className">
        <div />
      </PageContainerComponent>,
    );
    expect(wrapper.find('.page-container.className')).toHaveLength(1);
  });
});
