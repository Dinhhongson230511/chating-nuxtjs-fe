import { createI18n } from "vue-i18n";
import en from "~/locales/en";
import ja from "~/locales/ja";
export const localeJa = "ja";
export const localeEn = "en";

const i18n = createI18n({
  defaultLocale: localeJa,
  legacy: false,
  globalInjection: true,
  locale: localeJa,
  locales: [
    {
      code: localeEn,
      name: "English",
    },
    {
      code: localeJa,
      name: "日本語",
    },
  ],
  strategy: "prefix",
  messages: {
    en,
    ja,
  },
});
export default i18n;
