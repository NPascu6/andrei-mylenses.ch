import {canvasImages, images} from '../config/images';
import {importedInstagramPhotos} from '../config/instagram.generated';
import type {
    CanvasPreviewImage,
    PortfolioCollectionView,
    PortfolioPhoto,
} from '../types/portfolio';
import {
    clampFocusValue,
    deriveCollectionTags,
    formatFallbackTitle,
    getPortfolioTimestamp,
    normalizePortfolioCategory,
    orderByCuratedTitles,
    portfolioCategoryValues,
    scoreRelatedPortfolioPhoto,
    slugify,
    sortPortfolioPhotosByCuration,
} from '../utils/portfolioCuration';
import {cmsPhotoEntriesByBaseName} from './cmsPhotos';
import {curationContent} from './siteContent';

const instagramMetadataByFile = new Map(
    importedInstagramPhotos.map((photo) => [photo.fileName, photo])
);

const curatedCollectionDefinitions = [
    {
        label: 'Best for large walls',
        slug: 'best-for-large-walls',
        description: 'Images with the strongest statement scale and architectural wall presence.',
    },
    {
        label: 'Collector starters',
        slug: 'collector-starters',
        description: 'The easiest first group to begin a print conversation around.',
    },
    {
        label: 'Quiet interiors',
        slug: 'quiet-interiors',
        description: 'Work selected for calm spaces, softer light, and slower atmosphere.',
    },
    {
        label: 'Black and white',
        slug: 'black-and-white',
        description: 'Monochrome studies with strong tonal depth and cleaner presentation.',
    },
    {
        label: 'Zurich',
        slug: 'zurich',
        description: 'A city-led view for Swiss buyers and local collectors.',
    },
    {
        label: 'Romania',
        slug: 'romania',
        description: 'Images rooted in origin, memory, and Eastern European atmosphere.',
    },
    {
        label: 'Giftable prints',
        slug: 'giftable-prints',
        description: 'A softer shortlist for thoughtful gifts and smaller collector purchases.',
    },
    {
        label: 'New work',
        slug: 'new-work',
        description: 'More recent additions and fresher image directions.',
    },
] as const;

export const portfolioPhotos: PortfolioPhoto[] = images
    .map((image) => {
        const baseName = image.baseName;
        const cmsMetadata = cmsPhotoEntriesByBaseName.get(baseName);
        const instagramMetadata =
            instagramMetadataByFile.get(`${baseName}.jpg`) ||
            instagramMetadataByFile.get(`${baseName}.jpeg`) ||
            instagramMetadataByFile.get(`${baseName}.png`) ||
            instagramMetadataByFile.get(`${baseName}.webp`);
        const metadata = cmsMetadata || instagramMetadata;
        const title = cmsMetadata?.title || instagramMetadata?.title || formatFallbackTitle(baseName);
        const category = normalizePortfolioCategory(metadata?.category);
        const featured = Boolean(cmsMetadata?.featured);
        const printReady = Boolean(cmsMetadata?.printReady);

        return {
            id: baseName,
            baseName,
            src: image.src,
            mediumSrc: image.mediumSrc,
            fullSrc: image.fullSrc,
            srcSet: image.srcSet,
            title,
            slug: slugify(title || baseName),
            description: metadata?.description || 'Selected portfolio work.',
            location: metadata?.location || '',
            category,
            featured,
            printReady,
            permalink: cmsMetadata?.permalink || instagramMetadata?.permalink || '',
            takenAt: cmsMetadata?.takenAt || instagramMetadata?.takenAt || '',
            series: cmsMetadata?.series,
            orientation: cmsMetadata?.orientation,
            aspectRatio: cmsMetadata?.aspectRatio,
            sizes: cmsMetadata?.sizes || [],
            priceFrom: cmsMetadata?.priceFrom,
            edition: cmsMetadata?.edition,
            availability: cmsMetadata?.availability,
            roomMood: cmsMetadata?.roomMood,
            hero: Boolean(cmsMetadata?.hero),
            seoTitle: cmsMetadata?.seoTitle,
            seoDescription: cmsMetadata?.seoDescription,
            focusX: clampFocusValue(cmsMetadata?.focusX),
            focusY: clampFocusValue(cmsMetadata?.focusY),
            collectionTags: deriveCollectionTags({
                baseName,
                title,
                description: metadata?.description,
                location: metadata?.location,
                category,
                featured,
                printReady,
                roomMood: cmsMetadata?.roomMood,
                orientation: cmsMetadata?.orientation,
                takenAt: cmsMetadata?.takenAt || instagramMetadata?.takenAt,
                collectionTags: cmsMetadata?.collectionTags,
            }),
        } satisfies PortfolioPhoto;
    })
    .sort(sortPortfolioPhotosByCuration);

export const canvasPreviewImages: CanvasPreviewImage[] = canvasImages.map((image) => ({
    ...image,
    fullSrc: image.src,
}));

export const featuredPortfolioPhotos = orderByCuratedTitles(
    portfolioPhotos.filter((photo) => photo.hero || photo.featured),
    curationContent.featuredArchiveTitles
);

export const printReadyPortfolioPhotos = orderByCuratedTitles(
    portfolioPhotos.filter((photo) => photo.printReady || photo.featured),
    curationContent.featuredPrintTitles
);

export const recentPortfolioPhotos = [...portfolioPhotos]
    .sort((left, right) => {
        const dateDiff = getPortfolioTimestamp(right.takenAt) - getPortfolioTimestamp(left.takenAt);
        if (dateDiff !== 0) {
            return dateDiff;
        }

        return sortPortfolioPhotosByCuration(left, right);
    });

export const heroPortfolioPhoto =
    portfolioPhotos.find((photo) => photo.hero) ||
    featuredPortfolioPhotos[0] ||
    printReadyPortfolioPhotos[0] ||
    portfolioPhotos[0];

export const curatedCollectionViews: PortfolioCollectionView[] = curatedCollectionDefinitions
    .map((view) => ({
        ...view,
        photos: portfolioPhotos.filter((photo) => photo.collectionTags.includes(view.label)),
    }))
    .filter((view) => view.photos.length > 0);

export const portfolioCategories = Array.from(
    new Set(portfolioPhotos.map((photo) => photo.category).filter(Boolean))
) as typeof portfolioCategoryValues;

export const portfolioStats = {
    total: portfolioPhotos.length,
    printReady: printReadyPortfolioPhotos.length,
    featured: featuredPortfolioPhotos.length,
    locations: new Set(portfolioPhotos.map((photo) => photo.location).filter(Boolean)).size,
};

export const portfolioPhotoBySlug = new Map(
    portfolioPhotos.map((photo) => [photo.slug, photo])
);

const curatedCollectionViewByLabel = new Map(
    curatedCollectionViews.map((view) => [view.label, view])
);

export const findPortfolioPhotoBySlug = (slug?: string) => {
    if (!slug) {
        return undefined;
    }

    return portfolioPhotoBySlug.get(slug);
};

export const findCuratedCollectionView = (label?: string) => {
    if (!label) {
        return undefined;
    }

    return curatedCollectionViewByLabel.get(label);
};

export const getPhotoObjectPosition = (
    photo: Pick<PortfolioPhoto, 'focusX' | 'focusY'>,
    fallback = 'center center'
) => {
    if (typeof photo.focusX !== 'number' && typeof photo.focusY !== 'number') {
        return fallback;
    }

    return `${photo.focusX ?? 50}% ${photo.focusY ?? 50}%`;
};

export const getRelatedPortfolioPhotos = (photo: PortfolioPhoto, limit = 4) =>
    portfolioPhotos
        .filter((candidate) => candidate.slug !== photo.slug)
        .sort((left, right) => {
            const leftScore = scoreRelatedPortfolioPhoto(photo, left);
            const rightScore = scoreRelatedPortfolioPhoto(photo, right);

            if (leftScore !== rightScore) {
                return rightScore - leftScore;
            }

            return sortPortfolioPhotosByCuration(left, right);
        })
        .slice(0, limit);
