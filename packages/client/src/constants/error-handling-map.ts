import { Color } from '@material-ui/lab/Alert';
import i18n from '../settings/translation-settings';

import { PageTypes } from '../models/page-types';

interface ErrorHandlingMapInterface {
  message: string;
  header: string;
  severity: Color;
}

export const ErrorHandlingMap = new Map<PageTypes, ErrorHandlingMapInterface>();

i18n.on('languageChanged', (_language) => {
  ErrorHandlingMap.set(PageTypes.CategorySettings, {
    header: i18n.t('Fetching error'),
    message: i18n.t('Sorry but we cannot fetch categories'),
    severity: 'error',
  });
});
