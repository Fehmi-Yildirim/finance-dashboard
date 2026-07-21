import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import nl from "./locales/nl.json";
import en from "./locales/en.json";

const savedLanguage = localStorage.getItem("language");

const supportedLanguages = ["nl", "en"];

const browserLanguage = navigator.language.split("-")[0];

const defaultLanguage = supportedLanguages.includes(browserLanguage)
    ? browserLanguage
    : "en";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            nl: {
                translation: nl,
            },
            en: {
                translation: en,
            },
            // Later:
            // de: { translation: de },
            // fr: { translation: fr },
        },

        lng: savedLanguage || defaultLanguage,
        fallbackLng: "en",

        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;