import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {messages, type AppCopy} from './messages';
import {
    intlLocaleByAppLocale,
    isAppLocale,
    localeLabelByAppLocale,
    localeStorageKey,
    supportedLocales,
    type AppLocale,
} from './types';

interface I18nContextValue {
    locale: AppLocale;
    setLocale: (locale: AppLocale) => void;
    copy: AppCopy;
    intlLocale: string;
    localeLabels: typeof localeLabelByAppLocale;
    supportedLocales: readonly AppLocale[];
}

const I18nContext = createContext<I18nContextValue | null>(null);

const getInitialLocale = (): AppLocale => {
    if (typeof window === 'undefined') {
        return 'en';
    }

    const stored = window.localStorage.getItem(localeStorageKey);
    if (stored && isAppLocale(stored)) {
        return stored;
    }

    const browserLocales = navigator.languages || [navigator.language];
    for (const browserLocale of browserLocales) {
        const baseLocale = browserLocale.toLowerCase().split('-')[0];
        if (isAppLocale(baseLocale)) {
            return baseLocale;
        }
    }

    return 'en';
};

export const I18nProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [locale, setLocale] = useState<AppLocale>(getInitialLocale);

    useEffect(() => {
        window.localStorage.setItem(localeStorageKey, locale);
        document.documentElement.lang = locale;
    }, [locale]);

    const value = useMemo<I18nContextValue>(
        () => ({
            locale,
            setLocale,
            copy: messages[locale] as AppCopy,
            intlLocale: intlLocaleByAppLocale[locale],
            localeLabels: localeLabelByAppLocale,
            supportedLocales,
        }),
        [locale]
    );

    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
    const context = useContext(I18nContext);

    if (!context) {
        throw new Error('useI18n must be used within an I18nProvider');
    }

    return context;
};
