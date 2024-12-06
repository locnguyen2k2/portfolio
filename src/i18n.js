import i18n from 'i18next';
import i18nBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

export const savedLanguage = localStorage.getItem('language') || 'vi';

export const languages = {
    en: { name: "English", flag: "en_flag.png" }, // Quốc kỳ Anh
    vi: { name: "Tiếng Việt", flag: "vn_flag.png" }, // Quốc kỳ Việt Nam
};

i18n
    .use(i18nBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'vi',
        lng: savedLanguage,
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: 'locales/{{lng}}/{{ns}}.json',
        },
        // have a common namespace used around the full app
        ns: ['translations'],
        defaultNS: 'translations',
        // debug: false,
        react: {
            wait: false,
            useSuspense: false
        }
    });


export default i18n;
