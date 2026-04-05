import type {AppCopy} from '../i18n/messages';

export interface SectionNavigationItem {
    label: string;
    sectionId: string;
}

export interface PageNavigationItem {
    label: string;
    to: string;
}

const matchesPagePath = (pathname: string, to: string) =>
    to === '/' ? pathname === to : pathname.startsWith(to);

export const isArtworkPath = (pathname: string) => pathname.startsWith('/artwork/');

export const getPageNavigationItems = (quickSidebar: AppCopy['quickSidebar']): PageNavigationItem[] => [
    {label: quickSidebar.pageLabels.home, to: '/'},
    {label: quickSidebar.pageLabels.collection, to: '/collection'},
    {label: quickSidebar.pageLabels.prints, to: '/prints'},
    {label: quickSidebar.pageLabels.about, to: '/about'},
];

export const getSectionNavigationItems = (
    pathname: string,
    quickSidebar: AppCopy['quickSidebar'],
): SectionNavigationItem[] => {
    if (pathname === '/') {
        return [
            {label: quickSidebar.sections.home.top, sectionId: 'top'},
            {label: quickSidebar.sections.home.collection, sectionId: 'collector-selection'},
            {label: quickSidebar.sections.home.prints, sectionId: 'print-experience'},
            {label: quickSidebar.sections.home.story, sectionId: 'artist-story'},
            {label: quickSidebar.sections.home.contact, sectionId: 'contact'},
        ];
    }

    if (pathname === '/collection') {
        return [
            {label: quickSidebar.sections.collection.intro, sectionId: 'collection-intro'},
            {label: quickSidebar.sections.collection.archive, sectionId: 'collection-archive'},
            {label: quickSidebar.sections.collection.contact, sectionId: 'contact'},
        ];
    }

    if (pathname === '/prints') {
        return [
            {label: quickSidebar.sections.prints.intro, sectionId: 'prints-intro'},
            {label: quickSidebar.sections.prints.process, sectionId: 'print-journey'},
            {label: quickSidebar.sections.prints.highlights, sectionId: 'print-highlights'},
            {label: quickSidebar.sections.prints.inquiry, sectionId: 'print-consultation'},
            {label: quickSidebar.sections.prints.contact, sectionId: 'contact'},
        ];
    }

    if (pathname === '/about') {
        return [
            {label: quickSidebar.sections.about.intro, sectionId: 'about-intro'},
            {label: quickSidebar.sections.about.works, sectionId: 'about-selected-works'},
            {label: quickSidebar.sections.about.contact, sectionId: 'contact'},
        ];
    }

    if (isArtworkPath(pathname)) {
        return [
            {label: quickSidebar.sections.artwork.top, sectionId: 'artwork-top'},
            {label: quickSidebar.sections.artwork.inquiry, sectionId: 'artwork-inquiry'},
            {label: quickSidebar.sections.artwork.related, sectionId: 'artwork-related'},
            {label: quickSidebar.sections.artwork.contact, sectionId: 'contact'},
        ];
    }

    return [{label: quickSidebar.sections.home.contact, sectionId: 'contact'}];
};

export const getQuickSidebarPageLabel = (
    pathname: string,
    quickSidebar: AppCopy['quickSidebar'],
    pageNavigationItems: readonly PageNavigationItem[],
) => {
    if (isArtworkPath(pathname)) {
        return quickSidebar.pageLabels.artwork;
    }

    return pageNavigationItems.find((item) => matchesPagePath(pathname, item.to))?.label || quickSidebar.navigate;
};
