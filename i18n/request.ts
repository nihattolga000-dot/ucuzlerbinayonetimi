import {getRequestConfig} from 'next-intl/server';

const locales = ["tr", "en", "ar", "es", "fr", "zh", "de"];

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;
  if (!locale || !locales.includes(locale)) {
    locale = 'tr';
  }

  return {
    locale,
    messages: (await import(`../locales/${locale}/common.json`)).default
  };
});
