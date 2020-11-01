import { Color } from '@material-ui/lab/Alert';
import i18n from '../settings/translation-settings';

export interface NetworkError extends Error {
  response?: {
    status: number;
    data: {
      message: string;
    };
  };
}

export enum AlertTypes {
  FetchingCategories = 'FetchingCategories',
  FetchingPosts = 'FetchingPosts',
  WrongLoginInputs = 'WrongLoginInputs',
  WrongRegisterInputs = 'WrongRegisterInputs',
  ValidationError = 'ValidationError',
  ServerError = 'ServerError',
  CannotSetUserDataWarning = 'CannotSetUserDataWarning',
  UnAuthorized = 'UnAuthorized',
  UnAuthorizedWarning = 'UnAuthorizedWarning',
  UserDoesNotExist = 'UserDoesNotExist',
  CheckYourEmail = 'CheckYourEmail',
  NewUserDataSet = 'NewUserDataSet',
  ServerErrorSnackBar = 'ServerErrorSnackBar',
  Success = 'Success',
  SuccessEmail = 'SuccessEmail',
  SavePost = 'SavePost',
}

export enum AlertSizes {
  Big = 'big',
  Snackbar = 'snackbar',
}

interface AlertHandlingMapInterface {
  message: string;
  header: string;
  severity: Color;
  size: AlertSizes;
}

export const AlertMap = new Map<AlertTypes, AlertHandlingMapInterface>();

export const setAlertMap = (): void => {
  AlertMap.set(AlertTypes.SuccessEmail, {
    header: i18n.t('Success! Your message were send'),
    message: i18n.t('Please wait for our feedback'),
    size: AlertSizes.Big,
    severity: 'success',
  });

  AlertMap.set(AlertTypes.Success, {
    header: i18n.t('Success'),
    message: i18n.t('Action was succesfull'),
    size: AlertSizes.Big,
    severity: 'success',
  });

  AlertMap.set(AlertTypes.NewUserDataSet, {
    header: i18n.t('Success'),
    message: i18n.t('New user data was set successfully'),
    size: AlertSizes.Big,
    severity: 'success',
  });

  AlertMap.set(AlertTypes.CheckYourEmail, {
    header: i18n.t('We got your request'),
    message: i18n.t('Please check your email for the next steps'),
    size: AlertSizes.Big,
    severity: 'success',
  });

  AlertMap.set(AlertTypes.UserDoesNotExist, {
    header: i18n.t('User does not exist'),
    message: i18n.t('Please check your email field'),
    size: AlertSizes.Big,
    severity: 'error',
  });

  AlertMap.set(AlertTypes.FetchingCategories, {
    header: i18n.t('Fetching error'),
    message: i18n.t('Sorry but we cannot fetch categories'),
    size: AlertSizes.Big,
    severity: 'error',
  });

  AlertMap.set(AlertTypes.FetchingPosts, {
    header: i18n.t('Fetching error'),
    message: i18n.t('Sorry but we cannot fetch posts'),
    size: AlertSizes.Big,
    severity: 'error',
  });

  AlertMap.set(AlertTypes.WrongLoginInputs, {
    header: i18n.t('Wrong Inputs'),
    message: i18n.t('Your email or password are incorrect'),
    size: AlertSizes.Big,
    severity: 'error',
  });

  AlertMap.set(AlertTypes.WrongRegisterInputs, {
    header: i18n.t('User exist'),
    message: i18n.t('User with this email or userName already exist'),
    size: AlertSizes.Big,
    severity: 'error',
  });

  AlertMap.set(AlertTypes.ValidationError, {
    header: i18n.t('Validation error'),
    message: i18n.t('If you use form website this error should not appear'),
    size: AlertSizes.Big,
    severity: 'error',
  });

  AlertMap.set(AlertTypes.ServerError, {
    header: i18n.t('Server cannot response'),
    message: i18n.t('This is probably issue with Internet connection or server'),
    size: AlertSizes.Big,
    severity: 'error',
  });

  AlertMap.set(AlertTypes.ServerErrorSnackBar, {
    header: i18n.t('Server cannot response'),
    message: i18n.t('This is probably issue with Internet connection or server'),
    size: AlertSizes.Snackbar,
    severity: 'error',
  });

  AlertMap.set(AlertTypes.SavePost, {
    header: i18n.t('Success'),
    message: i18n.t('Your post was saved'),
    size: AlertSizes.Snackbar,
    severity: 'success',
  });

  AlertMap.set(AlertTypes.CannotSetUserDataWarning, {
    header: i18n.t('We cannot save user data'),
    message: i18n.t('This is probably issue with Internet connection or server'),
    size: AlertSizes.Snackbar,
    severity: 'warning',
  });

  AlertMap.set(AlertTypes.UnAuthorized, {
    header: i18n.t('Your permissions are not valid'),
    message: i18n.t('Please login again'),
    size: AlertSizes.Big,
    severity: 'error',
  });

  AlertMap.set(AlertTypes.UnAuthorizedWarning, {
    header: i18n.t('Your permissions are not valid'),
    message: i18n.t('Some features may be not available'),
    size: AlertSizes.Snackbar,
    severity: 'warning',
  });
};

i18n.on('initialized', () => {
  setAlertMap();
});

i18n.on('languageChanged', () => {
  if (!i18n.isInitialized) return;
  setAlertMap();
});
