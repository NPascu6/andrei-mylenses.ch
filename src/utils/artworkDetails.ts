import {messages} from '../i18n/messages';
import {intlLocaleByAppLocale, type AppLocale} from '../i18n/types';
import type {PortfolioCategory, PortfolioOrientation} from '../types/portfolio';

export const formatTakenAt = (takenAt: string | undefined, locale: AppLocale) => {
    if (!takenAt) {
        return null;
    }

    const next = new Date(takenAt);
    if (Number.isNaN(next.getTime())) {
        return null;
    }

    return new Intl.DateTimeFormat(intlLocaleByAppLocale[locale], {year: 'numeric', month: 'long'}).format(next);
};

export const getPresentationGuidance = (
    category: PortfolioCategory,
    orientation: PortfolioOrientation | undefined,
    locale: AppLocale
) => {
    const presentationCopy = messages[locale].artworkDetails.presentation;

    if (orientation === 'portrait') {
        return presentationCopy.portrait;
    }

    if (category === 'Architecture') {
        return presentationCopy.architecture;
    }

    if (category === 'Nature') {
        return presentationCopy.nature;
    }

    return presentationCopy.fallback;
};

export const buildArtworkSizeGuidance = (
    sizes: string[],
    recommendedSize: string,
    priceFrom: string | undefined,
    locale: AppLocale
) => {
    const copy = messages[locale].artworkDetails;
    const inferredSizes = recommendedSize.includes(' or ')
        ? recommendedSize.split(' or ').map((entry) => entry.trim())
        : [recommendedSize];
    const uniqueSizes = Array.from(new Set([...sizes, ...inferredSizes, copy.customConsultation])).slice(0, 3);

    return uniqueSizes.map((size, index) => ({
        size,
        note: copy.sizeNotes[index] || copy.sizeNotes[copy.sizeNotes.length - 1],
        priceLabel: index === 0 ? priceFrom || copy.priceFromFallback : copy.priceOnRequest,
    }));
};
