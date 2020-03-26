import { Color } from '@material-ui/lab/Alert';

import { PageTypes } from '../models/page-types';

interface ErrorHandlingMapInterface {
  message: string;
  header: string;
  severity: Color;
}

export const ErrorHandlingMap = new Map<PageTypes, ErrorHandlingMapInterface>();

ErrorHandlingMap.set(PageTypes.CategorySettings, {
  header: 'Błąd ładowania',
  message:
    'Przepraszamy nie możemy załadować kategorii. Proszę sprawdzić połączenie internetowe lub skontaktować się z supportem',
  severity: 'error',
});
