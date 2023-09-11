import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Elements } from '@stripe/react-stripe-js';
import * as redux from 'react-redux';
import { PremiumUserSection } from '../../../../components/Pages/Premium/PremiumUserSection';
import { ONE_DAY, ONE_MONTH, premiumUser } from '../../../helpers';
import { Payment } from '../../../../components/Pages/Premium/Premium';
import { getDateWithTime } from '../../../../utils/date';
import * as getUserTransactionsThunk from '../../../../store/payments/thunks/getUserTransactions';
import * as cancelSubscriptionThunk from '../../../../store/payments/thunks/cancelSubscription';

describe('<PremiumUserSection > component', () => {
  let wrapper: ShallowWrapper;
  let spyStore: any;
  let getUserTransactionsSpy: any;
  let cancelSubscriptionSpy: any;

  beforeEach(() => {
    spyStore = jest.spyOn(redux, 'useSelector');
    getUserTransactionsSpy = jest.spyOn(getUserTransactionsThunk, 'getUserTransactions');
    cancelSubscriptionSpy = jest.spyOn(cancelSubscriptionThunk, 'cancelSubscription');
    spyStore.mockReturnValue({});
  });

  afterEach(() => {
    spyStore.mockRestore();
    getUserTransactionsSpy.mockClear();
    cancelSubscriptionSpy.mockClear();
  });

  it('should show all required items for 1 month user', () => {
    spyStore.mockReturnValue({
      ...premiumUser(),
    });
    wrapper = shallow(<PremiumUserSection />);

    expect(wrapper.find('[data-test="premium-type"]').text()).toBe('Monthly Subscription');
    expect(wrapper.find('[data-test="active-to"]').text()).toBe(
      `Active to: ${getDateWithTime(new Date(new Date().getTime() + ONE_MONTH))}`,
    );
    expect(wrapper.find('[data-test="cancel-button"]')).toHaveLength(1);
    expect(wrapper.find('[data-test="cancel-description"]')).toHaveLength(1);
    expect(getUserTransactionsSpy).toHaveBeenCalledTimes(1);
  });

  it('should cancel transaction', () => {
    spyStore.mockReturnValue({
      ...premiumUser(),
    });
    wrapper = shallow(<PremiumUserSection />);

    wrapper.find('[data-test="cancel-button"]').simulate('click');
    expect(cancelSubscriptionSpy).toHaveBeenCalledTimes(1);
  });

  it('should show all required items for 1 day user', () => {
    spyStore.mockReturnValue({
      ...premiumUser('24h'),
    });
    wrapper = shallow(<PremiumUserSection />);

    expect(wrapper.find('[data-test="premium-type"]').text()).toBe('24h Subscription');
    expect(wrapper.find('[data-test="active-to"]').text()).toBe(
      `Active to: ${getDateWithTime(new Date(new Date().getTime() + ONE_DAY))}`,
    );
    expect(wrapper.find('[data-test="cancel-button"]')).toHaveLength(0);
    expect(wrapper.find('[data-test="cancel-description"]')).toHaveLength(0);
    expect(getUserTransactionsSpy).toHaveBeenCalledTimes(1);
  });

  it('should show all required items for 1 month user with cancelled subscription', () => {
    spyStore.mockReturnValue({
      ...premiumUser('1 month', true),
    });
    wrapper = shallow(<PremiumUserSection />);

    expect(wrapper.find('[data-test="premium-type"]').text()).toBe('');
    expect(wrapper.find('[data-test="active-to"]').text()).toBe(
      `Active to: ${getDateWithTime(new Date(new Date().getTime() + ONE_MONTH))}`,
    );
    expect(wrapper.find('[data-test="cancel-button"]')).toHaveLength(0);
    expect(wrapper.find('[data-test="cancel-description"]')).toHaveLength(0);
    expect(wrapper.find('[data-test="canceled-subscription-title"]').text()).toBe(
      'Subscription is cancelled',
    );
    expect(wrapper.find('[data-test="canceled-subscription-description"]').text()).toBe(
      'You can use this subscription to the end of period',
    );
    expect(getUserTransactionsSpy).toHaveBeenCalledTimes(1);
  });
});
