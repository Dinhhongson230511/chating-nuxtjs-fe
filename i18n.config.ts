import en from "~/locales/en";
import ja from "~/locales/ja";

export default defineI18nConfig(() => ({
  defaultLocale: "ja",
  legacy: false,
  locale: "ja",
  locales: [
    {
      code: "en",
      name: "English",
    },
    {
      code: "ja",
      name: "日本語",
    },
  ],
  strategy: "prefix",
  messages: {
    en,
    ja,
  },
}));
