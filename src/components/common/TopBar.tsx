import React, {useState} from 'react';
import Favicon32 from '../../assets/favicon-32x32.png';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {setThemePreset} from '../../store/appSlice';
import {applyThemePreferences, persistThemePreferences, themePresets} from '../../utils/themePreferences';
import {scrollToSection} from '../../utils/scrollToSection';

const TopBar = () => {
    const dispatch = useDispatch();
    const themePreset = useSelector((state: RootState) => state.app.themePreset);
    const [isThemePanelOpen, setIsThemePanelOpen] = useState(false);

    const updateThemePreferences = (nextThemePreset: typeof themePresets[number]['value']) => {
        const preferences = {themePreset: nextThemePreset};
        applyThemePreferences(preferences);
        persistThemePreferences(preferences);
        dispatch(setThemePreset(nextThemePreset));
    };

    return (
        <header className="sticky top-0 z-50 border-b backdrop-blur-2xl" style={{borderColor: 'var(--color-line)', backgroundColor: 'color-mix(in srgb, var(--color-bg) 76%, transparent)'}}>
            <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-6 md:py-4">
                <button
                    type="button"
                    onClick={() => scrollToSection('top')}
                    className="flex min-w-0 flex-1 items-center gap-4 text-left"
                >
                    <img
                        loading="lazy"
                        className="h-12 w-12 rounded-full object-cover shadow-lg shadow-black/10 md:h-14 md:w-14"
                        style={{border: '1px solid var(--color-line)'}}
                        src={Favicon32}
                        alt="My Lenses"
                    />
                    <div className="min-w-0">
                        <p className="font-display text-[1.15rem] uppercase tracking-[0.22em] text-appText md:text-[1.7rem]">
                            My Lenses
                        </p>
                        <p className="text-[9px] uppercase tracking-[0.26em] md:text-[0.72rem]" style={{color: 'var(--color-nav)'}}>
                            Fine art photography by Andrei Pascu
                        </p>
                    </div>
                </button>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsThemePanelOpen((open) => !open)}
                        className={`theme-chip inline-flex h-10 items-center justify-center rounded-full px-4 text-[10px] uppercase tracking-[0.2em] md:h-11 md:px-5 md:text-[11px] ${isThemePanelOpen ? 'theme-chip-active' : ''}`}
                        aria-label="Open theme controls"
                        aria-expanded={isThemePanelOpen}
                    >
                        Theme
                    </button>
                </div>
            </div>

            {isThemePanelOpen && (
                <div className="mx-auto max-w-7xl px-4 pb-4 md:px-6">
                    <div className="surface-panel rounded-[1.65rem] p-4 md:p-5">
                        <div>
                            <p className="text-nav-token text-[11px] uppercase tracking-[0.28em]">
                                Themes
                            </p>
                            <div className="mt-3 grid gap-2 md:grid-cols-3">
                                {themePresets.map((preset) => (
                                    <button
                                        key={preset.value}
                                        onClick={() => updateThemePreferences(preset.value)}
                                        className={`theme-chip rounded-[1rem] px-4 py-3 text-left text-[11px] uppercase tracking-[0.18em] ${themePreset === preset.value ? 'theme-chip-active' : ''}`}
                                    >
                                        <span className="block text-appText">{preset.label}</span>
                                        <span className="text-subtle-token mt-1 block text-[10px] tracking-[0.22em]">
                                            {preset.mode}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default TopBar;
