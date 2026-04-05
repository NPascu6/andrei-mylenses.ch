import {beforeEach, describe, expect, it} from 'vitest';
import {
    getNextThemePreset,
    getThemePresetForMode,
    loadThemePreferences,
    loadThemePreferencesFromLocation,
    themePresets,
} from './themePreferences';

describe('themePreferences', () => {
    beforeEach(() => {
        localStorage.clear();
        document.documentElement.removeAttribute('data-theme');
        document.documentElement.removeAttribute('data-theme-preset');
    });

    it('loads a valid theme preset from the location query', () => {
        expect(loadThemePreferencesFromLocation('?themePreset=ember')).toEqual({
            themePreset: 'ember',
        });
    });

    it('maps preview theme mode to the first matching preset', () => {
        expect(loadThemePreferencesFromLocation('?previewTheme=light')).toEqual({
            themePreset: getThemePresetForMode('light'),
        });
    });

    it('falls back to persisted preferences when the query is invalid', () => {
        localStorage.setItem('themePreset', 'cyanotype');

        expect(loadThemePreferencesFromLocation('?themePreset=unknown')).toEqual({
            themePreset: 'cyanotype',
        });
        expect(loadThemePreferences()).toEqual({themePreset: 'cyanotype'});
    });

    it('cycles through the available theme presets', () => {
        const lastPreset = themePresets[themePresets.length - 1].value;

        expect(getNextThemePreset('noir')).toBe('ember');
        expect(getNextThemePreset(lastPreset)).toBe(themePresets[0].value);
    });
});
