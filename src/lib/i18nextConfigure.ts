import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Cookies from "js-cookie";
import enTranslations from "../locales/enTranslation.json";
import esTranslations from "../locales/esTranslation.json";
import frTranslations from "../locales/frTranslation.json";

const languageCookie = Cookies.get("portfolio-AS-locale") || "en";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslations,
    },
    es: {
      translation: esTranslations,
    },
    fr: {
      translation: frTranslations,
    },
  },
  lng: languageCookie,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },

  detection: {
    order: ["cookie"],
    caches: ["cookie"],
  },
});

i18n.on("languageChanged", (lng) => {
  Cookies.set("portfolio-AS-locale", lng, { expires: 365 });
});

export default i18n;
