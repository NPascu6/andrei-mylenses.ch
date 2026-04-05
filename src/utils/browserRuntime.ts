export const isBrowser = () => typeof window !== 'undefined';

export const readLocalStorageItem = (key: string) => {
    if (!isBrowser()) {
        return null;
    }

    try {
        return window.localStorage.getItem(key);
    } catch {
        return null;
    }
};

export const writeLocalStorageItem = (key: string, value: string) => {
    if (!isBrowser()) {
        return;
    }

    try {
        window.localStorage.setItem(key, value);
    } catch {
        // Storage access should not break the app shell.
    }
};

export const getPreferredBrowserLocales = () => {
    if (typeof navigator === 'undefined') {
        return [];
    }

    if (Array.isArray(navigator.languages) && navigator.languages.length > 0) {
        return navigator.languages;
    }

    return navigator.language ? [navigator.language] : [];
};

export const setDocumentLanguage = (locale: string) => {
    if (typeof document === 'undefined') {
        return;
    }

    document.documentElement.lang = locale;
};

export const setDocumentTitle = (title: string) => {
    if (typeof document === 'undefined') {
        return;
    }

    document.title = title;
};
