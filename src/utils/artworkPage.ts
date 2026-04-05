import {
    findPortfolioPhotoBySlug,
    getPhotoObjectPosition,
    getRelatedPortfolioPhotos,
} from '../content/portfolioLibrary';
import type {AppCopy} from '../i18n/messages';
import type {AppLocale} from '../i18n/types';
import {localizePortfolioPhoto} from '../i18n/portfolio';
import {
    buildArtworkSizeGuidance,
    formatTakenAt,
    getPresentationGuidance,
} from './artworkDetails';
import {buildGuidedInquiryHref} from './inquiry';
import {localizePortfolioPhotos} from './localizedPortfolio';
import {buildArtworkPageTitle} from './pageMetadata';
import {getPrintRecommendation} from './printRecommendations';

export const getArtworkPageViewModel = ({
    slug,
    locale,
    copy,
}: {
    slug?: string;
    locale: AppLocale;
    copy: AppCopy;
}) => {
    const photo = findPortfolioPhotoBySlug(slug);

    if (!photo) {
        return null;
    }

    const localizedPhoto = localizePortfolioPhoto(photo, locale);
    const recommendation = getPrintRecommendation({
        title: photo.title,
        category: photo.category,
        location: photo.location,
        locale,
    });
    const relatedPhotos = localizePortfolioPhotos(getRelatedPortfolioPhotos(photo, 4), locale);
    const inquiryHref = buildGuidedInquiryHref(
        {
            inquiryType: copy.guidedInquiry.inquiryOptions.artworkAvailability.label,
            artwork: localizedPhoto.title,
            roomType: copy.guidedInquiry.roomOptions.stillDeciding,
            budgetRange: localizedPhoto.priceFrom || copy.guidedInquiry.budget.openToGuidance,
            timeline: copy.guidedInquiry.timeline.nextMonth,
            location: localizedPhoto.location,
            notes: localizedPhoto.description,
        },
        copy.inquiryEmail,
    );
    const priceLabel = localizedPhoto.priceFrom || copy.artworkPage.priceFallback;

    return {
        photo,
        localizedPhoto,
        recommendation,
        relatedPhotos,
        inquiryHref,
        metaTitle: buildArtworkPageTitle(localizedPhoto.title),
        takenAtLabel: formatTakenAt(photo.takenAt, locale),
        availabilityLabel: localizedPhoto.availability || copy.artworkPage.availabilityFallback,
        editionLabel: localizedPhoto.edition || copy.artworkPage.editionFallback,
        priceLabel,
        presentationGuidance: getPresentationGuidance(photo.category, photo.orientation, locale),
        sizeGuidance: buildArtworkSizeGuidance(photo.sizes, recommendation.recommendedSize, priceLabel, locale),
        collectorMood: localizedPhoto.roomMood || recommendation.idealSetting,
        imageObjectPosition: getPhotoObjectPosition(photo),
    };
};
