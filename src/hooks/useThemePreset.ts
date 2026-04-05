import {useCallback, useEffect, useMemo, useState} from 'react';
import {
    applyThemePreferences,
    getThemePreset,
    loadThemePreferencesFromLocation,
    persistThemePreferences,
    type ThemePresetId,
} from '../utils/themePreferences';
import {isBrowser} from '../utils/browserRuntime';

const getInitialThemePreset = (): ThemePresetId => {
    if (!isBrowser()) {
        return 'noir';
    }

    return loadThemePreferencesFromLocation(window.location.search).themePreset;
};

export const useThemePreset = () => {
    const [themePreset, setThemePresetState] = useState<ThemePresetId>(getInitialThemePreset);

    useEffect(() => {
        applyThemePreferences({themePreset});
    }, [themePreset]);

    const activeThemePreset = useMemo(
        () => getThemePreset(themePreset),
        [themePreset],
    );

    const setThemePreset = useCallback((nextThemePreset: ThemePresetId) => {
        persistThemePreferences({themePreset: nextThemePreset});
        setThemePresetState(nextThemePreset);
    }, []);

    return {
        themePreset,
        activeThemePreset,
        setThemePreset,
    };
};
