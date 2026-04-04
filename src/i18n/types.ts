export const supportedLocales = ['en', 'de', 'fr', 'it', 'ro', 'hu'] as const;

export type AppLocale = typeof supportedLocales[number];

export const localeStorageKey = 'my-lenses-locale';

export const intlLocaleByAppLocale: Record<AppLocale, string> = {
    en: 'en-US',
    de: 'de-CH',
    fr: 'fr-CH',
    it: 'it-IT',
    ro: 'ro-RO',
    hu: 'hu-HU',
};

export const localeLabelByAppLocale: Record<AppLocale, string> = {
    en: 'EN',
    de: 'DE',
    fr: 'FR',
    it: 'IT',
    ro: 'RO',
    hu: 'HU',
};

export const isAppLocale = (value: string): value is AppLocale =>
    supportedLocales.includes(value as AppLocale);
