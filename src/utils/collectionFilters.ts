import {
    curatedCollectionViews,
    findCuratedCollectionView,
    featuredPortfolioPhotos,
    portfolioCategories,
    portfolioPhotos,
    printReadyPortfolioPhotos,
    recentPortfolioPhotos,
} from '../content/portfolioLibrary';
import type {PortfolioCollectionView} from '../types/portfolio';

export const defaultCollectionFilters = [
    'All',
    'Collector starters',
    'Print-ready',
    'Recent',
] as const;

export const availableCollectionFilters = [
    ...defaultCollectionFilters,
    ...curatedCollectionViews
        .map((view) => view.label)
        .filter((label) => !defaultCollectionFilters.includes(label as typeof defaultCollectionFilters[number])),
    ...portfolioCategories,
];

export const getActiveCollectionFilter = (requestedFilter?: string) =>
    requestedFilter && availableCollectionFilters.includes(requestedFilter)
        ? requestedFilter
        : 'All';

export const getCollectionView = (filter: string) =>
    findCuratedCollectionView(filter);

export const getVisiblePortfolioPhotos = (
    filter: string,
    activeCollectionView?: PortfolioCollectionView
) => {
    if (filter === 'Collector starters') {
        return featuredPortfolioPhotos;
    }

    if (filter === 'Print-ready') {
        return printReadyPortfolioPhotos;
    }

    if (filter === 'Recent') {
        return recentPortfolioPhotos;
    }

    if (activeCollectionView) {
        return activeCollectionView.photos;
    }

    if (filter !== 'All') {
        return portfolioPhotos.filter((photo) => photo.category === filter);
    }

    return portfolioPhotos;
};
