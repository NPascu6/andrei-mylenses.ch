import {describe, expect, it} from 'vitest';
import {
    availableCollectionFilters,
    getActiveCollectionFilter,
    getCollectionView,
    getVisiblePortfolioPhotos,
} from './collectionFilters';
import {
    featuredPortfolioPhotos,
    portfolioPhotos,
    printReadyPortfolioPhotos,
    recentPortfolioPhotos,
} from '../content/portfolioLibrary';

describe('collectionFilters', () => {
    it('falls back to All for unknown filters', () => {
        expect(getActiveCollectionFilter('Unknown filter')).toBe('All');
    });

    it('returns built-in filter collections', () => {
        expect(getVisiblePortfolioPhotos('Collector starters')).toBe(featuredPortfolioPhotos);
        expect(getVisiblePortfolioPhotos('Print-ready')).toBe(printReadyPortfolioPhotos);
        expect(getVisiblePortfolioPhotos('Recent')).toBe(recentPortfolioPhotos);
    });

    it('supports curated collection views and All', () => {
        const curatedFilter = availableCollectionFilters.find((filter) => filter === 'Quiet interiors');
        expect(curatedFilter).toBe('Quiet interiors');
        expect(getVisiblePortfolioPhotos(curatedFilter || 'All', getCollectionView(curatedFilter || 'All'))).not.toHaveLength(0);
        expect(getVisiblePortfolioPhotos('All')).toBe(portfolioPhotos);
    });
});
