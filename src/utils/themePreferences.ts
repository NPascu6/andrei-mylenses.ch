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

export const applyThemePreferences = (preferences: ThemePreferences) => {
    const preset = getThemePreset(preferences.themePreset);
    document.documentElement.setAttribute('data-theme', preset.mode);
    document.documentElement.setAttribute('data-theme-preset', preset.value);
};

export const persistThemePreferences = (preferences: ThemePreferences) => {
    localStorage.setItem('themePreset', preferences.themePreset);
};

export const loadThemePreferences = (): ThemePreferences => ({
    themePreset: (localStorage.getItem('themePreset') as ThemePresetId) || DEFAULT_THEME_PREFERENCES.themePreset,
});

export const getNextThemePreset = (currentThemePreset: ThemePresetId): ThemePresetId => {
    const currentIndex = themePresets.findIndex((preset) => preset.value === currentThemePreset);
    const nextIndex = (currentIndex + 1) % themePresets.length;
    return themePresets[nextIndex].value;
};
