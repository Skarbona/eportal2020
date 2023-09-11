import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as getSessionIdThunk from '../../../../store/payments/thunks/getSessionId';
import { PaymentForm } from '../../../../components/Pages/Premium/PaymentForm';

jest.mock('@stripe/react-stripe-js', () => ({
  ...jest.requireActual('@stripe/react-stripe-js'),
  useStripe: jest.fn(() => ({
    redirectToCheckout: () => ({}),
  })),
  useElements: jest.fn(() => ({})),
}));

describe('<PaymentForm > component', () => {
  let wrapper: ShallowWrapper;
  let getSessionIdSpy: any;

  beforeEach(() => {
    getSessionIdSpy = jest.spyOn(getSessionIdThunk, 'getSessionId');
  });

  afterEach(() => {
    getSessionIdSpy.mockClear();
  });

  it('should have all required items', () => {
    wrapper = shallow(<PaymentForm />);
    expect(wrapper.find('[data-test="one-day-button"]')).toHaveLength(1);
    expect(wrapper.find('[data-test="one-month-button"]')).toHaveLength(1);
    expect(wrapper.find('[data-test="description"]')).toHaveLength(1);
    expect(wrapper.find('[data-test="checkout-button"]')).toHaveLength(1);
  });
  it('should show description and call correct callback for 24h', () => {
    wrapper = shallow(<PaymentForm />);
    expect(wrapper.find('[data-test="description"]').text()).toBe('1 month subscription');

    wrapper.find('[data-test="one-day-button"]').simulate('click');
    expect(wrapper.find('[data-test="description"]').text()).toBe('1 day access only');

    wrapper.find('[data-test="form"]').simulate('submit');
    expect(getSessionIdSpy).toHaveBeenCalledWith('1 day');
  });

  it('should show description and call correct callback for 1 month', () => {
    wrapper = shallow(<PaymentForm />);
    expect(wrapper.find('[data-test="description"]').text()).toBe('1 month subscription');

    wrapper.find('[data-test="form"]').simulate('submit');
    expect(getSessionIdSpy).toHaveBeenCalledWith('1 month');
  });
});
