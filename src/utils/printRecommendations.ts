import {messages} from '../i18n/messages';
import type {AppLocale} from '../i18n/types';

interface PrintRecommendationInput {
    title: string;
    category?: string;
    location?: string;
    locale: AppLocale;
}

export interface PrintRecommendation {
    recommendedSize: string;
    bestFit: string;
    idealSetting: string;
    collectorNote: string;
}

export const getPrintRecommendation = ({
    title,
    category,
    location,
    locale,
}: PrintRecommendationInput): PrintRecommendation => {
    const copy = messages[locale].printRecommendations;
    const defaultRecommendation = copy.default;
    const categoryRecommendations = copy.byCategory as Record<string, PrintRecommendation>;
    const recommendation = category && categoryRecommendations[category]
        ? categoryRecommendations[category]
        : defaultRecommendation;

    if (title.toLowerCase().includes('skyline') || title.toLowerCase().includes('bridge')) {
        return {
            ...recommendation,
            recommendedSize: copy.skylineOrBridge.recommendedSize,
            idealSetting: copy.skylineOrBridge.idealSetting,
        };
    }

    if ((location || '').toLowerCase().includes('switzerland')) {
        return {
            ...recommendation,
            collectorNote: copy.switzerlandNote,
        };
    }

    return recommendation;
};
