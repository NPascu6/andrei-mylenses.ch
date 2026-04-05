import {describe, expect, it} from 'vitest';
import {messages} from '../i18n/messages';
import {
    getPageNavigationItems,
    getQuickSidebarPageLabel,
    getSectionNavigationItems,
    isArtworkPath,
} from './sectionNavigation';

const quickSidebar = messages.en.quickSidebar;

describe('sectionNavigation', () => {
    it('builds collection sections from the route', () => {
        expect(getSectionNavigationItems('/collection', quickSidebar)).toEqual([
            {label: 'Intro', sectionId: 'collection-intro'},
            {label: 'Archive', sectionId: 'collection-archive'},
            {label: 'Contact', sectionId: 'contact'},
        ]);
    });

    it('uses artwork navigation for artwork detail routes', () => {
        expect(isArtworkPath('/artwork/halong-bay-rock')).toBe(true);
        expect(getSectionNavigationItems('/artwork/halong-bay-rock', quickSidebar)).toEqual([
            {label: 'Artwork', sectionId: 'artwork-top'},
            {label: 'Inquiry', sectionId: 'artwork-inquiry'},
            {label: 'Related', sectionId: 'artwork-related'},
            {label: 'Contact', sectionId: 'contact'},
        ]);
    });

    it('derives the active page label from the route', () => {
        const pageNavigationItems = getPageNavigationItems(quickSidebar);

        expect(getQuickSidebarPageLabel('/', quickSidebar, pageNavigationItems)).toBe('Home');
        expect(getQuickSidebarPageLabel('/prints', quickSidebar, pageNavigationItems)).toBe('Prints');
        expect(getQuickSidebarPageLabel('/artwork/halong-bay-rock', quickSidebar, pageNavigationItems)).toBe('Artwork');
    });
});
