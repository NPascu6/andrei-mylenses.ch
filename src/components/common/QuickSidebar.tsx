import React, {useMemo} from 'react';
import {Link, NavLink, useLocation} from 'react-router-dom';
import {useActiveSection} from '../../hooks/useActiveSection';
import {useI18n} from '../../i18n/I18nProvider';
import {surfaceDividerStyle} from '../../styles/surfaces';
import {contactActions} from '../../utils/contactActions';
import {scrollToSection} from '../../utils/scrollToSection';
import {getPageNavigationItems, getQuickSidebarPageLabel, getSectionNavigationItems} from '../../utils/sectionNavigation';

const getSidebarPillClasses = (active: boolean, emphasize = false) =>
    `sidebar-pill rounded-full px-3.5 py-2 text-[10px] uppercase tracking-[0.2em] ${
        active ? 'sidebar-pill-active' : ''
    } ${emphasize ? 'text-appText' : ''}`;

const QuickSidebar = () => {
    const location = useLocation();
    const {copy} = useI18n();

    const pageNavigationItems = useMemo(
        () => getPageNavigationItems(copy.quickSidebar),
        [copy.quickSidebar]
    );

    const toolLinks = useMemo(
        () => [
            {label: copy.bottomBar.instagram, href: contactActions.instagram, external: true},
            {label: copy.bottomBar.email, href: contactActions.email, external: false},
            {label: copy.bottomBar.whatsapp, href: contactActions.whatsapp, external: true},
        ],
        [copy]
    );

    const sectionNavigationItems = useMemo(() => {
        return getSectionNavigationItems(location.pathname, copy.quickSidebar);
    }, [copy.quickSidebar, location.pathname]);

    const activePageLabel = useMemo(() => {
        return getQuickSidebarPageLabel(location.pathname, copy.quickSidebar, pageNavigationItems);
    }, [copy.quickSidebar, location.pathname, pageNavigationItems]);

    const activeSection = useActiveSection(sectionNavigationItems);

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

                    <div className="h-px" style={surfaceDividerStyle}/>

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

                    <div className="h-px" style={surfaceDividerStyle}/>

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

                    <div className="h-px" style={surfaceDividerStyle}/>

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
                <div className="surface-panel rounded-3xl px-3 py-3">
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
