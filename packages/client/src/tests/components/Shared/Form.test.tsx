import React from 'react';
import { shallow } from 'enzyme';
import { TextField, FormControlLabel, Button, CircularProgress, Select } from '@material-ui/core';

import {
  ConfirmAccountDeleteComponent as ConfirmAccountDelete,
  Props as DeleteProps,
} from '../../../components/Shared/Form/ConfirmAccountDelete';
import {
  ConfirmEmailComponent as ConfirmEmail,
  Props as ConfirmEmailProps,
} from '../../../components/Shared/Form/ConfirmEmail';
import {
  EmailComponent as Email,
  Props as EmailProps,
} from '../../../components/Shared/Form/Email';
import {
  UserNameComponent as UserName,
  Props as UserNameProps,
} from '../../../components/Shared/Form/UserName';
import {
  MessageComponent as Message,
  Props as MessageProps,
} from '../../../components/Shared/Form/Message';
import {
  PrivacyPolicyComponent as PrivacyPolicy,
  Props as PrivacyPolicyProps,
} from '../../../components/Shared/Form/PrivacyPolicy';
import {
  PasswordComponent as Password,
  Props as PasswordProps,
} from '../../../components/Shared/Form/Password';
import {
  LoadingButtonComponent as LoadingButton,
  Props as LoadingButtonProps,
} from '../../../components/Shared/Form/LoadingButton';
import {
  TitleComponent as Title,
  Props as TitleProps,
} from '../../../components/Shared/Form/Title';
import {
  NewCategoryComponent as NewCategory,
  Props as NewCategoryProps,
} from '../../../components/Shared/Form/NewCategory';
import {
  LevelsComponent as Levels,
  Props as LevelsProps,
} from '../../../components/Shared/Form/Levels';
import {
  PlacesComponent as Places,
  Props as PlacesProps,
} from '../../../components/Shared/Form/Places';
import {
  GenderComponent as Gender,
  Props as GenderProps,
} from '../../../components/Shared/Form/Gender';
import {
  NestedCategoriesComponent as NestedCategories,
  Props as NestedCategoriesProps,
} from '../../../components/Shared/Form/NestedCategories';
import { chance } from '../../../mocks/chance';
import { MockedEventWithValues } from '../../../mocks/event';
import { mockedCategory } from '../../../mocks/store';
import { mockedCatStateForNestedCats } from '../../../mocks/catState';

describe('Form components', () => {
  describe('<ConfirmAccountDelete /> component', () => {
    let props: DeleteProps;
    beforeEach(() => {
      props = {
        email: chance.email(),
        confirmAccountDelete: null,
        confirmAccountDeleteChanged: jest.fn(),
      };
    });
    it('should render all required items', () => {
      const wrapper = shallow(<ConfirmAccountDelete {...props} />);
      expect(wrapper.find(TextField)).toHaveLength(1);
      expect(wrapper.find(TextField).props().id).toEqual('confirmAccountDelete');
      expect(wrapper.find(TextField).props().name).toEqual('confirmAccountDelete');
    });

    it('should call on Change function', () => {
      const wrapper = shallow(<ConfirmAccountDelete {...props} />);
      wrapper.find(TextField).simulate('change', MockedEventWithValues());
      expect(props.confirmAccountDeleteChanged).toHaveBeenCalled();
    });
  });
  describe('<ConfirmEmail /> component', () => {
    let props: ConfirmEmailProps;
    beforeEach(() => {
      props = {
        confirmedEmail: null,
        inputChanged: jest.fn(),
      };
    });
    it('should render all required items', () => {
      const wrapper = shallow(<ConfirmEmail {...props} />);
      expect(wrapper.find(TextField)).toHaveLength(1);
      expect(wrapper.find(TextField).props().id).toEqual('confirmedEmail');
      expect(wrapper.find(TextField).props().name).toEqual('confirmedEmail');
    });

    it('should call on Change and Blur function', () => {
      const wrapper = shallow(<ConfirmEmail {...props} />);
      wrapper.find(TextField).simulate('change', MockedEventWithValues());
      wrapper.find(TextField).simulate('blur', MockedEventWithValues());
      expect(props.inputChanged).toHaveBeenCalledTimes(2);
    });
  });
  describe('<Email /> component', () => {
    let props: EmailProps;
    beforeEach(() => {
      props = {
        email: null,
        inputChanged: jest.fn(),
      };
    });
    it('should render all required items', () => {
      const wrapper = shallow(<Email {...props} />);
      expect(wrapper.find(TextField)).toHaveLength(1);
      expect(wrapper.find(TextField).props().id).toEqual('email');
      expect(wrapper.find(TextField).props().name).toEqual('email');
    });

    it('should call on Change and Blur function', () => {
      const wrapper = shallow(<Email {...props} />);
      wrapper.find(TextField).simulate('change', MockedEventWithValues());
      wrapper.find(TextField).simulate('blur', MockedEventWithValues());
      expect(props.inputChanged).toHaveBeenCalledTimes(2);
    });
  });
  describe('<UserName /> component', () => {
    let props: UserNameProps;
    beforeEach(() => {
      props = {
        userName: null,
        inputChanged: jest.fn(),
      };
    });
    it('should render all required items', () => {
      const wrapper = shallow(<UserName {...props} />);
      expect(wrapper.find(TextField)).toHaveLength(1);
      expect(wrapper.find(TextField).props().id).toEqual('userName');
      expect(wrapper.find(TextField).props().name).toEqual('userName');
    });

    it('should call on Change and Blur function', () => {
      const wrapper = shallow(<UserName {...props} />);
      wrapper.find(TextField).simulate('change', MockedEventWithValues());
      wrapper.find(TextField).simulate('blur', MockedEventWithValues());
      expect(props.inputChanged).toHaveBeenCalledTimes(2);
    });
  });
  describe('<Title /> component', () => {
    let props: TitleProps;
    beforeEach(() => {
      props = {
        title: null,
        inputChanged: jest.fn(),
      };
    });
    it('should render all required items', () => {
      const wrapper = shallow(<Title {...props} />);
      expect(wrapper.find(TextField)).toHaveLength(1);
      expect(wrapper.find(TextField).props().id).toEqual('title');
      expect(wrapper.find(TextField).props().name).toEqual('title');
    });

    it('should call on Change and Blur function', () => {
      const wrapper = shallow(<Title {...props} />);
      wrapper.find(TextField).simulate('change', MockedEventWithValues());
      wrapper.find(TextField).simulate('blur', MockedEventWithValues());
      expect(props.inputChanged).toHaveBeenCalledTimes(2);
    });
  });
  describe('<Levels /> component', () => {
    let props: LevelsProps;
    beforeEach(() => {
      props = {
        level: null,
        levels: mockedCategory('Levels'),
        inputChanged: jest.fn(),
      };
    });
    it('should render all required items', () => {
      const wrapper = shallow(<Levels {...props} />);
      expect(wrapper.find(Select)).toHaveLength(1);
      expect(wrapper.find(Select).props().id).toEqual('levels');
      expect(wrapper.find(Select).props().name).toEqual('levels');
    });

    it('should call on Change and Blur function', () => {
      const wrapper = shallow(<Levels {...props} />);
      wrapper.find(Select).simulate('change', MockedEventWithValues());
      expect(props.inputChanged).toHaveBeenCalledTimes(1);
    });
  });
  describe('<Gender /> component', () => {
    let props: GenderProps;
    beforeEach(() => {
      props = {
        gender: null,
        genders: mockedCategory('Genders'),
        inputChanged: jest.fn(),
      };
    });
    it('should render all required items', () => {
      const wrapper = shallow(<Gender {...props} />);
      expect(wrapper.find(Select)).toHaveLength(1);
      expect(wrapper.find(Select).props().id).toEqual('gender');
      expect(wrapper.find(Select).props().name).toEqual('gender');
    });

    it('should call on Change and Blur function', () => {
      const wrapper = shallow(<Gender {...props} />);
      wrapper.find(Select).simulate('change', MockedEventWithValues());
      expect(props.inputChanged).toHaveBeenCalledTimes(1);
    });
  });
  describe('<Places /> component', () => {
    let props: PlacesProps;
    beforeEach(() => {
      props = {
        place: null,
        places: mockedCategory('Places'),
        inputChanged: jest.fn(),
      };
    });
    it('should render all required items', () => {
      const wrapper = shallow(<Places {...props} />);
      expect(wrapper.find(Select)).toHaveLength(1);
      expect(wrapper.find(Select).props().id).toEqual('place');
      expect(wrapper.find(Select).props().name).toEqual('place');
    });

    it('should call on Change and Blur function', () => {
      const wrapper = shallow(<Places {...props} />);
      wrapper.find(Select).simulate('change', MockedEventWithValues());
      expect(props.inputChanged).toHaveBeenCalledTimes(1);
    });
  });
  describe('<NestedCategories /> component', () => {
    let props: NestedCategoriesProps;
    beforeEach(() => {
      const categories = mockedCatStateForNestedCats();
      props = {
        cats: categories,
        inputChanged: jest.fn(),
      };
    });

    it('should render all required items', () => {
      const wrapper = shallow(<NestedCategories {...props} />);
      expect(wrapper.find(NestedCategories)).toHaveLength(3);
    });
  });
  describe('<NewCategory /> component', () => {
    let props: NewCategoryProps;
    beforeEach(() => {
      props = {
        newCategory: null,
        inputChanged: jest.fn(),
      };
    });
    it('should render all required items', () => {
      const wrapper = shallow(<NewCategory {...props} />);
      expect(wrapper.find(TextField)).toHaveLength(1);
      expect(wrapper.find(TextField).props().id).toEqual('newCategory');
      expect(wrapper.find(TextField).props().name).toEqual('newCategory');
    });

    it('should call on Change and Blur function', () => {
      const wrapper = shallow(<NewCategory {...props} />);
      wrapper.find(TextField).simulate('change', MockedEventWithValues());
      wrapper.find(TextField).simulate('blur', MockedEventWithValues());
      expect(props.inputChanged).toHaveBeenCalledTimes(2);
    });
  });
  describe('<Message /> component', () => {
    let props: MessageProps;
    beforeEach(() => {
      props = {
        message: null,
        inputChanged: jest.fn(),
      };
    });
    it('should render all required items', () => {
      const wrapper = shallow(<Message {...props} />);
      expect(wrapper.find(TextField)).toHaveLength(1);
      expect(wrapper.find(TextField).props().id).toEqual('message');
      expect(wrapper.find(TextField).props().name).toEqual('message');
    });

    it('should call on Change and Blur function', () => {
      const wrapper = shallow(<Message {...props} />);
      wrapper.find(TextField).simulate('change', MockedEventWithValues());
      wrapper.find(TextField).simulate('blur', MockedEventWithValues());
      expect(props.inputChanged).toHaveBeenCalledTimes(2);
    });
  });
  describe('<PrivacyPolicy /> component', () => {
    let props: PrivacyPolicyProps;
    beforeEach(() => {
      props = {
        privacyPolicy: null,
        checkBoxChanged: jest.fn(),
      };
    });
    it('should render all required items', () => {
      const wrapper = shallow(<PrivacyPolicy {...props} />);
      expect(wrapper.find(FormControlLabel)).toHaveLength(1);
      expect(wrapper.find(FormControlLabel).props().id).toEqual('privacy-policy');
    });

    it('should call on Change function', () => {
      const wrapper = shallow(<PrivacyPolicy {...props} />);
      const checkbox = wrapper.find('#privacy-policy') as any;
      checkbox.prop('control').props.onChange({ target: { checked: true }, persist: jest.fn() });

      expect(props.checkBoxChanged).toHaveBeenCalled();
    });
  });
  describe('<Password /> component', () => {
    let props: PasswordProps;
    beforeEach(() => {
      props = {
        password: null,
        inputChanged: jest.fn(),
      };
    });
    it('should render all required items', () => {
      const wrapper = shallow(<Password {...props} />);
      expect(wrapper.find(TextField)).toHaveLength(1);
      expect(wrapper.find(TextField).props().id).toEqual('password');
      expect(wrapper.find(TextField).props().name).toEqual('password');
    });

    it('should call on Change and Blur function', () => {
      const wrapper = shallow(<Password {...props} />);
      wrapper.find(TextField).simulate('change', MockedEventWithValues());
      wrapper.find(TextField).simulate('blur', MockedEventWithValues());
      expect(props.inputChanged).toHaveBeenCalledTimes(2);
    });
  });
  describe('<LoadingButton /> component', () => {
    let props: LoadingButtonProps;
    beforeEach(() => {
      props = {
        disabled: false,
        isLoading: true,
        children: 'hello',
      };
    });
    it('should render all required items', () => {
      const wrapper = shallow(<LoadingButton {...props} />);
      expect(wrapper.find(Button)).toHaveLength(1);
      expect(wrapper.find(Button).prop('disabled')).toEqual(true);
      expect(wrapper.find(CircularProgress)).toHaveLength(1);
      expect(wrapper.find(Button).text()).toEqual('hello');
    });
  });
});
