import React, {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import Favicon32 from '../../assets/favicon-32x32.png';
import {artistName, siteTitle} from '../../config/site';
import {useI18n} from '../../i18n/I18nProvider';
import {getThemePreset, themePresets, type ThemePresetId} from '../../utils/themePreferences';

interface TopBarProps {
    themePreset: ThemePresetId;
    onThemePresetChange: (themePreset: ThemePresetId) => void;
}

const lightThemePresets = themePresets.filter((preset) => preset.mode === 'light');
const darkThemePresets = themePresets.filter((preset) => preset.mode === 'dark');

const TopBar = ({
    themePreset,
    onThemePresetChange,
}: TopBarProps) => {
    const {copy, locale, setLocale, supportedLocales, localeLabels} = useI18n();
    const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
    const preferencesPanelRef = useRef<HTMLDivElement | null>(null);
    const activePreset = getThemePreset(themePreset);

    useEffect(() => {
        if (!isPreferencesOpen) {
            return;
        }

        const handlePointerDown = (event: MouseEvent) => {
            if (preferencesPanelRef.current && !preferencesPanelRef.current.contains(event.target as Node)) {
                setIsPreferencesOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsPreferencesOpen(false);
            }
        };

        document.addEventListener('mousedown', handlePointerDown);
        window.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handlePointerDown);
            window.removeEventListener('keydown', handleEscape);
        };
    }, [isPreferencesOpen]);

    return (
        <header className="sticky top-0 z-50 border-b backdrop-blur-2xl" style={{borderColor: 'var(--color-line)', backgroundColor: 'color-mix(in srgb, var(--color-bg) 76%, transparent)'}}>
            <div className="flex w-full items-center justify-between gap-4 px-4 py-3 md:px-6 md:py-4">
                <Link to="/" className="flex min-w-0 flex-1 items-center gap-4 text-left">
                    <img
                        loading="eager"
                        className="h-12 w-12 shrink-0 rounded-full object-cover shadow-lg shadow-black/10 md:h-14 md:w-14"
                        style={{border: '1px solid var(--color-line)'}}
                        src={Favicon32}
                        alt={siteTitle}
                    />
                    <div className="min-w-0">
                        <p className="font-display text-[1.15rem] uppercase tracking-[0.22em] text-appText md:text-[1.7rem]">
                            {siteTitle}
                        </p>
                        <p className="text-[9px] uppercase tracking-[0.26em] md:text-[0.72rem]" style={{color: 'var(--color-nav)'}}>
                            {copy.topBar.tagline.replace('Andrei Pascu', artistName)}
                        </p>
                    </div>
                </Link>
                <div className="ml-auto shrink-0">
                    <div ref={preferencesPanelRef} className="relative">
                        <button
                            type="button"
                            onClick={() => setIsPreferencesOpen((open) => !open)}
                            className={`inline-flex items-center gap-2.5 rounded-full border px-3 py-2 text-left transition-all duration-300 md:px-4 md:py-2.5 ${isPreferencesOpen ? 'theme-chip-active' : 'theme-chip'}`}
                            aria-label={copy.topBar.preferencesLabel}
                            aria-expanded={isPreferencesOpen}
                            aria-haspopup="menu"
                        >
                            <span className="flex h-8 w-8 items-center justify-center rounded-full border" style={{borderColor: 'var(--color-line)', background: 'linear-gradient(135deg, color-mix(in srgb, var(--color-surface-strong) 78%, rgba(var(--accent-color), 0.18)), var(--color-surface))'}}>
                                <span className="h-3 w-3 rounded-full" style={{backgroundColor: 'var(--color-accent-text)'}}/>
                            </span>
                            <span className="min-w-0">
                                <span className="block text-[9px] uppercase tracking-[0.24em] text-subtle-token md:text-[10px]">
                                    {copy.topBar.preferencesLabel}
                                </span>
                                <span className="block text-[11px] uppercase tracking-[0.18em] text-appText md:text-[12px]">
                                    {localeLabels[locale]} / {activePreset.label}
                                </span>
                            </span>
                        </button>

                        {isPreferencesOpen ? (
                            <div className="surface-panel absolute right-0 top-[calc(100%+0.75rem)] z-20 w-[min(28rem,calc(100vw-2rem))] rounded-[1.65rem] p-4 shadow-2xl md:p-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-nav-token text-[11px] uppercase tracking-[0.28em]">
                                            {copy.topBar.preferencesTitle}
                                        </p>
                                        <p className="mt-2 max-w-xs text-sm leading-6 text-muted-token">
                                            {copy.topBar.preferencesDescription}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap justify-end gap-2">
                                        <div className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-appText" style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface-soft)'}}>
                                            {localeLabels[locale]}
                                        </div>
                                        <div className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-appText" style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface-soft)'}}>
                                            {activePreset.label}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 space-y-4">
                                    <div className="surface-panel-soft rounded-[1.25rem] p-3">
                                        <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">
                                            {copy.topBar.languageLabel}
                                        </p>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {supportedLocales.map((nextLocale) => (
                                                <button
                                                    key={nextLocale}
                                                    type="button"
                                                    onClick={() => setLocale(nextLocale)}
                                                    className={`rounded-full px-3 py-2 text-[10px] uppercase tracking-[0.2em] ${
                                                        locale === nextLocale ? 'theme-chip theme-chip-active text-appText' : 'theme-chip'
                                                    }`}
                                                >
                                                    {localeLabels[nextLocale]}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        {[
                                            {label: copy.topBar.lightThemesLabel, presets: lightThemePresets},
                                            {label: copy.topBar.darkThemesLabel, presets: darkThemePresets},
                                        ].map((group) => (
                                            <div key={group.label} className="surface-panel-soft rounded-[1.25rem] p-3">
                                                <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">
                                                    {group.label}
                                                </p>
                                                <div className="mt-3 grid gap-2">
                                                    {group.presets.map((preset) => {
                                                        const isActive = themePreset === preset.value;

                                                        return (
                                                            <button
                                                                key={preset.value}
                                                                type="button"
                                                                onClick={() => {
                                                                    onThemePresetChange(preset.value);
                                                                    setIsPreferencesOpen(false);
                                                                }}
                                                                className={`rounded-[1rem] border px-4 py-3 text-left transition-all duration-300 ${isActive ? 'theme-chip-active' : 'theme-chip'}`}
                                                            >
                                                                <span className="flex items-center justify-between gap-3">
                                                                    <span>
                                                                        <span className="block text-[11px] uppercase tracking-[0.18em] text-appText">
                                                                            {preset.label}
                                                                        </span>
                                                                        <span className="mt-1 block text-[10px] uppercase tracking-[0.22em] text-subtle-token">
                                                                            {copy.topBar.completePresetLabel}
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
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopBar;
