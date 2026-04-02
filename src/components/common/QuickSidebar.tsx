import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {setThemePreset} from '../../store/appSlice';
import {applyThemePreferences, getNextThemePreset, persistThemePreferences} from '../../utils/themePreferences';
import {scrollToSection} from '../../utils/scrollToSection';
import {sectionNavigationItems} from '../../utils/sectionNavigation';

const toolLinks = [
    {label: 'Instagram', href: 'https://www.instagram.com/andrei_mylenses/', external: true},
    {label: 'Email', href: 'mailto:andrei.pascu86@yahoo.com', external: false},
];

const QuickSidebar = () => {
    const dispatch = useDispatch();
    const themePreset = useSelector((state: RootState) => state.app.themePreset);
    const [activeSection, setActiveSection] = useState<string>('top');

    const switchTheme = () => {
        const nextThemePreset = getNextThemePreset(themePreset);
        const nextPreferences = {themePreset: nextThemePreset};

        applyThemePreferences(nextPreferences);
        persistThemePreferences(nextPreferences);
        dispatch(setThemePreset(nextThemePreset));
    };

    useEffect(() => {
        const sections = sectionNavigationItems
            .map((item) => document.getElementById(item.sectionId))
            .filter((section): section is HTMLElement => Boolean(section));

        if (!sections.length) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((left, right) => right.intersectionRatio - left.intersectionRatio);

                if (visibleEntries[0]?.target?.id) {
                    setActiveSection(visibleEntries[0].target.id);
                }
            },
            {
                rootMargin: '-20% 0px -55% 0px',
                threshold: [0.15, 0.35, 0.55, 0.75],
            }
        );

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <aside className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
                <div className="surface-panel flex w-[168px] flex-col gap-4 rounded-[1.6rem] p-4">
                    <div>
                        <p className="text-nav-token text-[10px] uppercase tracking-[0.28em]">Quick Nav</p>
                        <div className="mt-3 grid gap-2">
                            {sectionNavigationItems.slice(1).map((item) => (
                                <button
                                    key={item.sectionId}
                                    type="button"
                                    onClick={() => scrollToSection(item.sectionId)}
                                    className={`rounded-full px-3 py-2 text-center text-[11px] uppercase tracking-[0.18em] ${
                                        activeSection === item.sectionId ? 'theme-chip theme-chip-active text-appText' : 'theme-chip'
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="h-px" style={{backgroundColor: 'var(--color-line)'}}/>

                    <div>
                        <p className="text-nav-token text-[10px] uppercase tracking-[0.28em]">Quick Tools</p>
                        <div className="mt-3 grid gap-2">
                            <button
                                onClick={switchTheme}
                                className="theme-chip theme-chip-active rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.18em]"
                            >
                                Next Theme
                            </button>

                            <button
                                type="button"
                                onClick={() => scrollToSection('top')}
                                className="theme-chip rounded-full px-3 py-2 text-center text-[11px] uppercase tracking-[0.18em]"
                            >
                                Back to Top
                            </button>

                            {toolLinks.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    target={item.external ? '_blank' : undefined}
                                    rel={item.external ? 'noopener noreferrer' : undefined}
                                    className="theme-chip rounded-full px-3 py-2 text-center text-[11px] uppercase tracking-[0.18em]"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            <div className="fixed inset-x-3 bottom-3 z-40 xl:hidden">
                <div className="surface-panel rounded-[1.5rem] px-3 py-3">
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                        {sectionNavigationItems.map((item) => (
                            <button
                                key={item.sectionId}
                                type="button"
                                onClick={() => scrollToSection(item.sectionId)}
                                className={`shrink-0 rounded-full px-3 py-2 text-[10px] uppercase tracking-[0.18em] ${
                                    activeSection === item.sectionId ? 'theme-chip theme-chip-active text-appText' : 'theme-chip'
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                        <button
                            type="button"
                            onClick={switchTheme}
                            className="theme-chip theme-chip-active shrink-0 rounded-full px-3 py-2 text-[10px] uppercase tracking-[0.18em]"
                        >
                            Theme
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default QuickSidebar;
