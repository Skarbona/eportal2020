import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Elements } from '@stripe/react-stripe-js';
import * as redux from 'react-redux';
import { PremiumUserSection } from '../../../../components/Pages/Premium/PremiumUserSection';
import { premiumUser } from '../../../helpers';
import { Payment } from '../../../../components/Pages/Premium/Premium';

describe('<Premium > component', () => {
  let wrapper: ShallowWrapper;
  let spyStore: any;

  beforeEach(() => {
    spyStore = jest.spyOn(redux, 'useSelector');
    spyStore.mockReturnValue({});
  });

  afterEach(() => {
    spyStore.mockRestore();
  });

  it('should show form for NONE Premium users', () => {
    wrapper = shallow(<Payment />);
    expect(wrapper.find(Elements)).toHaveLength(1);
    expect(wrapper.find(PremiumUserSection)).toHaveLength(0);
  });
  it('should show <PremiumUserSection /> component for Premium users', () => {
    spyStore.mockReturnValue({
      ...premiumUser(),
    });
    wrapper = shallow(<Payment />);
    expect(wrapper.find(Elements)).toHaveLength(0);
    expect(wrapper.find(PremiumUserSection)).toHaveLength(1);
  });
});
