import React, {useEffect, useMemo, useRef, useState} from 'react';
import Favicon32 from '../../assets/favicon-32x32.png';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {setThemePreset} from '../../store/appSlice';
import {applyThemePreferences, getThemePreset, persistThemePreferences, themePresets} from '../../utils/themePreferences';
import {scrollToSection} from '../../utils/scrollToSection';

const TopBar = () => {
    const dispatch = useDispatch();
    const themePreset = useSelector((state: RootState) => state.app.themePreset);
    const [isThemePanelOpen, setIsThemePanelOpen] = useState(false);
    const themePanelRef = useRef<HTMLDivElement | null>(null);
    const activePreset = getThemePreset(themePreset);
    const presetsByMode = useMemo(() => ({
        light: themePresets.filter((preset) => preset.mode === 'light'),
        dark: themePresets.filter((preset) => preset.mode === 'dark'),
    }), []);

    const updateThemePreferences = (nextThemePreset: typeof themePresets[number]['value']) => {
        const preferences = {themePreset: nextThemePreset};
        applyThemePreferences(preferences);
        persistThemePreferences(preferences);
        dispatch(setThemePreset(nextThemePreset));
        setIsThemePanelOpen(false);
    };

    useEffect(() => {
        if (!isThemePanelOpen) {
            return;
        }

        const handlePointerDown = (event: MouseEvent) => {
            if (themePanelRef.current && !themePanelRef.current.contains(event.target as Node)) {
                setIsThemePanelOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsThemePanelOpen(false);
            }
        };

        document.addEventListener('mousedown', handlePointerDown);
        window.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handlePointerDown);
            window.removeEventListener('keydown', handleEscape);
        };
    }, [isThemePanelOpen]);

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
                <div ref={themePanelRef} className="relative flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setIsThemePanelOpen((open) => !open)}
                        className={`inline-flex items-center gap-2.5 rounded-full border px-3 py-2 text-left transition-all duration-300 md:px-4 md:py-2.5 ${isThemePanelOpen ? 'theme-chip-active' : 'theme-chip'}`}
                        aria-label="Open theme controls"
                        aria-expanded={isThemePanelOpen}
                    >
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border" style={{borderColor: 'var(--color-line)', background: 'linear-gradient(135deg, color-mix(in srgb, var(--color-surface-strong) 78%, rgba(var(--accent-color), 0.18)), var(--color-surface))'}}>
                            <span className="h-3 w-3 rounded-full" style={{backgroundColor: 'var(--color-accent-text)'}}/>
                        </span>
                        <span className="min-w-0">
                            <span className="block text-[9px] uppercase tracking-[0.24em] text-subtle-token md:text-[10px]">
                                Theme
                            </span>
                            <span className="block text-[11px] uppercase tracking-[0.18em] text-appText md:text-[12px]">
                                {activePreset.label}
                            </span>
                        </span>
                    </button>

                    {isThemePanelOpen && (
                        <div className="surface-panel absolute right-0 top-[calc(100%+0.75rem)] w-[min(26rem,calc(100vw-2rem))] rounded-[1.65rem] p-4 shadow-2xl md:p-5">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-nav-token text-[11px] uppercase tracking-[0.28em]">
                                        Theme Studio
                                    </p>
                                    <p className="mt-2 max-w-xs text-sm leading-6 text-muted-token">
                                        Choose a full visual mood for the site. Each preset changes palette, contrast, and typography together.
                                    </p>
                                </div>
                                <div className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-appText" style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface-soft)'}}>
                                    {activePreset.label}
                                </div>
                            </div>

                            <div className="mt-4 grid gap-4 md:grid-cols-2">
                                {(['light', 'dark'] as const).map((mode) => (
                                    <div key={mode} className="surface-panel-soft rounded-[1.25rem] p-3">
                                        <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">
                                            {mode} themes
                                        </p>
                                        <div className="mt-3 grid gap-2">
                                            {presetsByMode[mode].map((preset) => {
                                                const active = themePreset === preset.value;

                                                return (
                                                    <button
                                                        key={preset.value}
                                                        type="button"
                                                        onClick={() => updateThemePreferences(preset.value)}
                                                        className={`rounded-[1rem] border px-4 py-3 text-left transition-all duration-300 ${active ? 'theme-chip-active' : 'theme-chip'}`}
                                                    >
                                                        <span className="flex items-center justify-between gap-3">
                                                            <span>
                                                                <span className="block text-[11px] uppercase tracking-[0.18em] text-appText">
                                                                    {preset.label}
                                                                </span>
                                                                <span className="mt-1 block text-[10px] uppercase tracking-[0.22em] text-subtle-token">
                                                                    Complete preset
                                                                </span>
                                                            </span>
                                                            <span className="flex gap-1.5">
                                                                <span className="h-2.5 w-2.5 rounded-full border" style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-bg)'}}/>
                                                                <span className="h-2.5 w-2.5 rounded-full border" style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface-strong)'}}/>
                                                                <span className="h-2.5 w-2.5 rounded-full border" style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-accent-text)'}}/>
                                                            </span>
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default TopBar;
