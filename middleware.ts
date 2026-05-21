import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ["tr", "en", "ar", "es", "fr", "zh", "de"],
  defaultLocale: "tr",
  localePrefix: 'always'
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
