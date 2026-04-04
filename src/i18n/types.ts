export const supportedLocales = ['en', 'de', 'fr'] as const;

export type AppLocale = typeof supportedLocales[number];

export const localeStorageKey = 'my-lenses-locale';

export const intlLocaleByAppLocale: Record<AppLocale, string> = {
    en: 'en-US',
    de: 'de-CH',
    fr: 'fr-CH',
};

export const localeLabelByAppLocale: Record<AppLocale, string> = {
    en: 'EN',
    de: 'DE',
    fr: 'FR',
};

export const isAppLocale = (value: string): value is AppLocale =>
    supportedLocales.includes(value as AppLocale);
