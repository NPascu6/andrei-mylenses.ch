import {
    readLocalStorageItem,
    writeLocalStorageItem,
} from './browserRuntime';

export type ThemePresetId =
    | 'alabaster'
    | 'editorial'
    | 'solstice'
    | 'noir'
    | 'ember'
    | 'cyanotype';

export interface ThemePreset {
    value: ThemePresetId;
    label: string;
    mode: 'light' | 'dark';
}

export interface ThemePreferences {
    themePreset: ThemePresetId;
}

export const themePresets: ThemePreset[] = [
    {value: 'alabaster', label: 'Alabaster', mode: 'light'},
    {value: 'editorial', label: 'Editorial', mode: 'light'},
    {value: 'solstice', label: 'Solstice', mode: 'light'},
    {value: 'noir', label: 'Noir', mode: 'dark'},
    {value: 'ember', label: 'Ember', mode: 'dark'},
    {value: 'cyanotype', label: 'Cyanotype', mode: 'dark'},
];

const DEFAULT_THEME_PREFERENCES: ThemePreferences = {
    themePreset: 'noir',
};

export const getThemePreset = (themePreset: ThemePresetId) =>
    themePresets.find((preset) => preset.value === themePreset) || themePresets[0];

export const isThemePresetId = (value: string | null): value is ThemePresetId =>
    Boolean(value && themePresets.some((preset) => preset.value === value));

export const getThemePresetForMode = (mode: 'light' | 'dark'): ThemePresetId =>
    themePresets.find((preset) => preset.mode === mode)?.value || DEFAULT_THEME_PREFERENCES.themePreset;

export const applyThemePreferences = (preferences: ThemePreferences) => {
    if (typeof document === 'undefined') {
        return;
    }

    const preset = getThemePreset(preferences.themePreset);
    document.documentElement.setAttribute('data-theme', preset.mode);
    document.documentElement.setAttribute('data-theme-preset', preset.value);
};

export const persistThemePreferences = (preferences: ThemePreferences) => {
    writeLocalStorageItem('themePreset', preferences.themePreset);
};

export const loadThemePreferences = (): ThemePreferences => ({
    themePreset: (readLocalStorageItem('themePreset') as ThemePresetId) || DEFAULT_THEME_PREFERENCES.themePreset,
});

export const loadThemePreferencesFromLocation = (search: string): ThemePreferences => {
    const params = new URLSearchParams(search);
    const themePreset = params.get('themePreset');
    if (isThemePresetId(themePreset)) {
        return {themePreset};
    }

    const previewTheme = params.get('previewTheme');
    if (previewTheme === 'light' || previewTheme === 'dark') {
        return {themePreset: getThemePresetForMode(previewTheme)};
    }

    return loadThemePreferences();
};

export const getNextThemePreset = (currentThemePreset: ThemePresetId): ThemePresetId => {
    const currentIndex = themePresets.findIndex((preset) => preset.value === currentThemePreset);
    const nextIndex = (currentIndex + 1) % themePresets.length;
    return themePresets[nextIndex].value;
};
