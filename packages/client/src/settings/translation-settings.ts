import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';

const fallbackLng = ['en'];
const availableLanguages = ['en', 'pl'];

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: 'pl',
    fallbackLng,
    debug: true,
    whitelist: availableLanguages,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
