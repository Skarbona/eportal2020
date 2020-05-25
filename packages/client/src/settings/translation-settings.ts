import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';

import { setAlertMap } from '../models/alerts';

const fallbackLng = ['en'];
const availableLanguages = ['en', 'pl'];

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: 'pl',
    fallbackLng,
    debug: process.env.NODE_ENV === 'development',
    whitelist: availableLanguages,
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on('initialized', () => {
  setAlertMap();
});

i18n.on('languageChanged', () => {
  if (!i18n.isInitialized) return;
  setAlertMap();
});

export default i18n;
