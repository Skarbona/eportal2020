import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import ReCAPTCHA from 'react-google-recaptcha';
import { Avatar } from '@material-ui/core';

import { AuthPageComponent } from '../../../../components/Pages/AuthPage/AuthPage';
import Inputs from '../../../../components/Pages/AuthPage/Inputs';
import AlertHandler from '../../../../components/Shared/UIElements/AlertHandlerInfo/AlertHandlerInfo';
import * as A from '../../../../hooks/form/state/actions';
import * as authorizeUserThunk from '../../../../store/user/thunks/authorizeUser';
import { mockedEvent } from '../../../../mocks/event';
import LoadingButton from '../../../../components/Shared/Form/LoadingButton';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(() => ({
    pathname: '/autentykacja/rejestracja',
  })),
  useHistory: jest.fn(() => ({
    push: (path: string) => {},
  })),
}));

describe('<AuthPage /> component', () => {
  let wrapper: ShallowWrapper;

  it('should render all required elements (Register Page)', () => {
    wrapper = shallow(<AuthPageComponent />);
    expect(wrapper.find('form')).toHaveLength(1);
    expect(wrapper.find(Avatar)).toHaveLength(1);
    expect(wrapper.find(Inputs)).toHaveLength(1);
    expect(wrapper.find(ReCAPTCHA)).toHaveLength(1);
    expect(wrapper.find(AlertHandler)).toHaveLength(1);
    expect(wrapper.find(LoadingButton)).toHaveLength(1);
    expect(wrapper.find('.link__switch-mode')).toHaveLength(1);
    expect(wrapper.find('.link__forgot-password')).toHaveLength(0);
  });

  it('should call setVisibleInputs Action', () => {
    const setVisibleInputsSpy = jest.spyOn(A, 'setVisibleInputs');
    wrapper = shallow(<AuthPageComponent />);
    expect(setVisibleInputsSpy).toHaveBeenCalled();
  });

  it('should handleSubmit', () => {
    const authorizeUserSpy = spyOn(authorizeUserThunk, 'authorizeUser');
    wrapper = shallow(<AuthPageComponent />);
    wrapper.find('form').simulate('submit', mockedEvent);
    expect(authorizeUserSpy).toHaveBeenCalled();
  });
});
