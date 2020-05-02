import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { CSSTransition } from 'react-transition-group';

import { FadeComponent } from '../../../components/Shared/UIElements/Animations/Fade';

describe('<Fade > component', () => {
  let wrapper: ShallowWrapper;

  it('should render without errors', () => {
    wrapper = shallow(
      <FadeComponent show={true}>
        <div />
      </FadeComponent>,
    );
    expect(wrapper.find(CSSTransition)).toHaveLength(1);
  });
});
