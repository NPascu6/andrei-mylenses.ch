import type {AppCopy} from '../i18n/messages';
import type {AppLocale} from '../i18n/types';
import {translateCollectionDescription, translateCollectionLabel} from '../i18n/portfolio';
import {
    canvasPreviewImages,
    curatedCollectionViews,
    featuredPortfolioPhotos,
    heroPortfolioPhoto,
    portfolioStats,
    printReadyPortfolioPhotos,
    recentPortfolioPhotos,
} from '../content/portfolioLibrary';
import {
    localizeOptionalPortfolioPhoto,
    localizePortfolioSlice,
} from './localizedPortfolio';

export const getMainPageViewModel = (
    locale: AppLocale,
    copy: AppCopy['mainPage'],
) => {
    const collectionStarts = curatedCollectionViews.slice(0, 6);

    return {
        heroPhoto: localizeOptionalPortfolioPhoto(heroPortfolioPhoto, locale),
        collectorPicks: localizePortfolioSlice(featuredPortfolioPhotos, locale, 3),
        recentPicks: localizePortfolioSlice(recentPortfolioPhotos, locale, 3),
        printHighlights: localizePortfolioSlice(printReadyPortfolioPhotos, locale, 3),
        canvasHero: canvasPreviewImages[0],
        collectionStarts: collectionStarts.map((view) => ({
            ...view,
            translatedLabel: translateCollectionLabel(view.label, locale),
            translatedDescription: translateCollectionDescription(view.label, view.description, locale),
            href: `/collection?filter=${encodeURIComponent(view.label)}`,
        })),
        statsCards: [
            {
                label: copy.stats.collectionLabel,
                value: `${portfolioStats.total}+`,
                description: copy.stats.collectionDescription,
            },
            {
                label: copy.stats.printReadyLabel,
                value: `${portfolioStats.printReady}+`,
                description: copy.stats.printReadyDescription,
            },
        ],
    };
};
