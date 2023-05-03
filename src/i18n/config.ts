import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import translationFR from './locales/fr/translation.json';


export const resources = {
    en: {
        ...translationEN,
    },
    fr: {
        ...translationFR,
    },
} as const;

if (!i18next.isInitialized) {
    i18next
        .use(initReactI18next)
        .use(Backend)
        .use(LanguageDetector)
        .init({
            debug: true,
            resources,
        });
}

export default i18next