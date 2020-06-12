import React from 'react';
import { shallow } from 'enzyme';
import ReCAPTCHA from 'react-google-recaptcha';

import PrivacyPolicy from '../../../components/Shared/Form/PrivacyPolicy';
import LoadingButton from '../../../components/Shared/Form/LoadingButton';
import Dialog from '../../../components/Shared/UIElements/Dialog/Dialog';

import { ContactFormComponent as ContactForm } from '../../../components/Shared/PageElements/ContactForm/ContactForm';

describe('<ContactForm /> component', () => {
  it('should have all required items', () => {
    const wrapper = shallow(<ContactForm />);
    expect(wrapper.find(Dialog)).toHaveLength(1);
    expect(wrapper.find(ReCAPTCHA)).toHaveLength(1);
    expect(wrapper.find(PrivacyPolicy)).toHaveLength(1);
    expect(wrapper.find(LoadingButton)).toHaveLength(1);
  });
});
