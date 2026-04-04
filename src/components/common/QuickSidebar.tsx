import React, {useEffect, useMemo, useState} from 'react';
import {Link, NavLink, useLocation} from 'react-router-dom';
import {contactEmailHref, instagramUrl, whatsappHref} from '../../config/site';
import {useI18n} from '../../i18n/I18nProvider';
import {scrollToSection} from '../../utils/scrollToSection';

const getSidebarPillClasses = (active: boolean, emphasize = false) =>
    `sidebar-pill rounded-full px-3.5 py-2 text-[10px] uppercase tracking-[0.2em] ${
        active ? 'sidebar-pill-active' : ''
    } ${emphasize ? 'text-appText' : ''}`;

const QuickSidebar = () => {
    const location = useLocation();
    const [activeSection, setActiveSection] = useState<string>('');
    const {copy} = useI18n();

    const pageNavigationItems = useMemo(
        () => [
            {label: copy.quickSidebar.pageLabels.home, to: '/'},
            {label: copy.quickSidebar.pageLabels.collection, to: '/collection'},
            {label: copy.quickSidebar.pageLabels.prints, to: '/prints'},
            {label: copy.quickSidebar.pageLabels.about, to: '/about'},
        ],
        [copy]
    );

    const toolLinks = useMemo(
        () => [
            {label: copy.bottomBar.instagram, href: instagramUrl, external: true},
            {label: copy.bottomBar.email, href: contactEmailHref, external: false},
            {label: copy.bottomBar.whatsapp, href: whatsappHref, external: true},
        ],
        [copy]
    );

    const sectionNavigationItems = useMemo(() => {
        if (location.pathname === '/') {
            return [
                {label: copy.quickSidebar.sections.home.top, sectionId: 'top'},
                {label: copy.quickSidebar.sections.home.collection, sectionId: 'collector-selection'},
                {label: copy.quickSidebar.sections.home.prints, sectionId: 'print-experience'},
                {label: copy.quickSidebar.sections.home.story, sectionId: 'artist-story'},
                {label: copy.quickSidebar.sections.home.contact, sectionId: 'contact'},
            ];
        }

        if (location.pathname === '/collection') {
            return [
                {label: copy.quickSidebar.sections.collection.intro, sectionId: 'collection-intro'},
                {label: copy.quickSidebar.sections.collection.archive, sectionId: 'collection-archive'},
                {label: copy.quickSidebar.sections.collection.contact, sectionId: 'contact'},
            ];
        }

        if (location.pathname === '/prints') {
            return [
                {label: copy.quickSidebar.sections.prints.intro, sectionId: 'prints-intro'},
                {label: copy.quickSidebar.sections.prints.process, sectionId: 'print-journey'},
                {label: copy.quickSidebar.sections.prints.highlights, sectionId: 'print-highlights'},
                {label: copy.quickSidebar.sections.prints.inquiry, sectionId: 'print-consultation'},
                {label: copy.quickSidebar.sections.prints.contact, sectionId: 'contact'},
            ];
        }

        if (location.pathname === '/about') {
            return [
                {label: copy.quickSidebar.sections.about.intro, sectionId: 'about-intro'},
                {label: copy.quickSidebar.sections.about.works, sectionId: 'about-selected-works'},
                {label: copy.quickSidebar.sections.about.contact, sectionId: 'contact'},
            ];
        }

        if (location.pathname.startsWith('/artwork/')) {
            return [
                {label: copy.quickSidebar.sections.artwork.top, sectionId: 'artwork-top'},
                {label: copy.quickSidebar.sections.artwork.inquiry, sectionId: 'artwork-inquiry'},
                {label: copy.quickSidebar.sections.artwork.related, sectionId: 'artwork-related'},
                {label: copy.quickSidebar.sections.artwork.contact, sectionId: 'contact'},
            ];
        }

        return [{label: copy.quickSidebar.sections.home.contact, sectionId: 'contact'}];
    }, [copy, location.pathname]);

    const activePageLabel = useMemo(() => {
        if (location.pathname.startsWith('/artwork/')) {
            return copy.quickSidebar.pageLabels.artwork;
        }

        return pageNavigationItems.find((item) =>
            item.to === '/'
                ? location.pathname === item.to
                : location.pathname.startsWith(item.to)
        )?.label || copy.quickSidebar.navigate;
    }, [copy.quickSidebar.navigate, copy.quickSidebar.pageLabels.artwork, location.pathname, pageNavigationItems]);

    useEffect(() => {
        setActiveSection(sectionNavigationItems[0]?.sectionId || '');
    }, [sectionNavigationItems]);

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
    }, [sectionNavigationItems]);

    return (
        <>
            <aside className="fixed right-4 top-24 z-40 hidden xl:block 2xl:right-6">
                <nav
                    aria-label={copy.quickSidebar.navigation}
                    className="sidebar-shell surface-panel flex max-h-[calc(100vh-7rem)] w-[216px] flex-col gap-4 overflow-y-auto rounded-[1.75rem] p-4"
                >
                    <div>
                        <p className="text-nav-token text-[10px] uppercase tracking-[0.28em]">{copy.quickSidebar.navigation}</p>
                        <p className="mt-2 font-display text-[1.9rem] leading-none text-appText">{activePageLabel}</p>
                        <div className="mt-3 grid gap-2">
                            {pageNavigationItems.map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    end={item.to === '/'}
                                    className={({isActive}) => getSidebarPillClasses(isActive)}
                                >
                                    <span>{item.label}</span>
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    <div className="h-px" style={{backgroundColor: 'var(--color-line)'}}/>

                    <div>
                        <p className="text-nav-token text-[10px] uppercase tracking-[0.28em]">{copy.quickSidebar.onThisPage}</p>
                        <div className="mt-3 grid gap-2">
                            {sectionNavigationItems.map((item) => (
                                <button
                                    key={item.sectionId}
                                    type="button"
                                    onClick={() => scrollToSection(item.sectionId)}
                                    className={getSidebarPillClasses(activeSection === item.sectionId)}
                                >
                                    <span>{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="h-px" style={{backgroundColor: 'var(--color-line)'}}/>

                    <div>
                        <p className="text-nav-token text-[10px] uppercase tracking-[0.28em]">{copy.quickSidebar.inquiry}</p>
                        <div className="mt-3 grid gap-2">
                            <Link
                                to="/prints"
                                className={getSidebarPillClasses(location.pathname === '/prints', true)}
                            >
                                <span>{copy.quickSidebar.printInquiry}</span>
                            </Link>
                            <button
                                type="button"
                                onClick={() => scrollToSection('contact')}
                                className={getSidebarPillClasses(activeSection === 'contact')}
                            >
                                <span>{copy.quickSidebar.contactFooter}</span>
                            </button>
                        </div>
                    </div>

                    <div className="h-px" style={{backgroundColor: 'var(--color-line)'}}/>

                    <div>
                        <p className="text-nav-token text-[10px] uppercase tracking-[0.28em]">{copy.quickSidebar.elsewhere}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {toolLinks.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    target={item.external ? '_blank' : undefined}
                                    rel={item.external ? 'noopener noreferrer' : undefined}
                                    className="theme-chip rounded-full px-3 py-2 text-center text-[10px] uppercase tracking-[0.18em]"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </nav>
            </aside>

            <div className="fixed inset-x-3 bottom-3 z-40 xl:hidden">
                <div className="surface-panel rounded-[1.5rem] px-3 py-3">
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                        {pageNavigationItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.to === '/'}
                                className={({isActive}) =>
                                    `shrink-0 rounded-full px-3 py-2 text-[10px] uppercase tracking-[0.18em] ${
                                        isActive ? 'theme-chip theme-chip-active text-appText' : 'theme-chip'
                                    }`
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}
                        {sectionNavigationItems.slice(0, 2).map((item) => (
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
                        <Link
                            to="/prints"
                            className="theme-chip theme-chip-active shrink-0 rounded-full px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-appText"
                        >
                            {copy.quickSidebar.inquire}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default QuickSidebar;
