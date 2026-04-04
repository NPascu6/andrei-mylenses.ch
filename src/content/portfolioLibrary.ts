import {canvaseImages, images} from '../config/images';
import {importedInstagramPhotos} from '../config/instagram.generated';
import {cmsPhotoEntriesByBaseName} from './cmsPhotos';
import type {CanvasPreviewImage, PortfolioCategory, PortfolioPhoto} from '../types/portfolio';

const instagramMetadataByFile = new Map(
    importedInstagramPhotos.map((photo) => [photo.fileName, photo])
);

const formatFallbackTitle = (rawTitle: string) =>
    decodeURIComponent(rawTitle)
        .replace(/\b(v\d+)\b/gi, '')
        .replace(/[-_]+/g, ' ')
        .replace(/\s{2,}/g, ' ')
        .trim()
        .replace(/\b\w/g, (char) => char.toUpperCase());

const slugify = (value: string) =>
    value
        .toLowerCase()
        .normalize('NFKD')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

const allowedPortfolioCategories: PortfolioCategory[] = [
    'Travel',
    'Nature',
    'Street',
    'Wildlife',
    'Canvas',
    'Instagram',
    'Portrait',
    'Architecture',
];

const normalizeCategory = (value?: string): PortfolioCategory =>
    allowedPortfolioCategories.find((category) => category === value) || 'Travel';

const getTimestamp = (takenAt?: string) => {
    if (!takenAt) {
        return 0;
    }

    const next = Date.parse(takenAt);
    return Number.isFinite(next) ? next : 0;
};

const sortByCuration = (left: PortfolioPhoto, right: PortfolioPhoto) => {
    if (Boolean(left.hero) !== Boolean(right.hero)) {
        return left.hero ? -1 : 1;
    }

    if (Boolean(left.featured) !== Boolean(right.featured)) {
        return left.featured ? -1 : 1;
    }

    if (Boolean(left.printReady) !== Boolean(right.printReady)) {
        return left.printReady ? -1 : 1;
    }

    const dateDiff = getTimestamp(right.takenAt) - getTimestamp(left.takenAt);
    if (dateDiff !== 0) {
        return dateDiff;
    }

    return left.title.localeCompare(right.title);
};

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

        return {
            id: baseName,
            baseName,
            src: image.src,
            fullSrc: image.fullSrc,
            title,
            slug: slugify(title || baseName),
            description: metadata?.description || 'Selected portfolio work.',
            location: metadata?.location || '',
            category: normalizeCategory(metadata?.category),
            featured: Boolean(cmsMetadata?.featured),
            printReady: Boolean(cmsMetadata?.printReady),
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
        } satisfies PortfolioPhoto;
    })
    .sort(sortByCuration);

export const canvasPreviewImages: CanvasPreviewImage[] = canvaseImages.map((image) => ({
    ...image,
    fullSrc: image.src,
}));

export const featuredPortfolioPhotos = portfolioPhotos.filter((photo) => photo.hero || photo.featured);

export const printReadyPortfolioPhotos = portfolioPhotos.filter(
    (photo) => photo.printReady || photo.featured
);

export const recentPortfolioPhotos = [...portfolioPhotos]
    .sort((left, right) => {
        const dateDiff = getTimestamp(right.takenAt) - getTimestamp(left.takenAt);
        if (dateDiff !== 0) {
            return dateDiff;
        }

        return sortByCuration(left, right);
    });

export const heroPortfolioPhoto =
    portfolioPhotos.find((photo) => photo.hero) ||
    featuredPortfolioPhotos[0] ||
    printReadyPortfolioPhotos[0] ||
    portfolioPhotos[0];

export const portfolioCategories = Array.from(
    new Set(portfolioPhotos.map((photo) => photo.category).filter(Boolean))
);

export const portfolioStats = {
    total: portfolioPhotos.length,
    printReady: printReadyPortfolioPhotos.length,
    featured: featuredPortfolioPhotos.length,
    locations: new Set(portfolioPhotos.map((photo) => photo.location).filter(Boolean)).size,
};

export const portfolioPhotoBySlug = new Map(
    portfolioPhotos.map((photo) => [photo.slug, photo])
);

export const findPortfolioPhotoBySlug = (slug?: string) => {
    if (!slug) {
        return undefined;
    }

    return portfolioPhotoBySlug.get(slug);
};

export const getRelatedPortfolioPhotos = (photo: PortfolioPhoto, limit = 4) =>
    portfolioPhotos
        .filter((candidate) => candidate.slug !== photo.slug)
        .sort((left, right) => {
            const leftScore =
                Number(left.category === photo.category) * 4 +
                Number(Boolean(left.location) && left.location === photo.location) * 2 +
                Number(left.printReady) +
                Number(left.featured);
            const rightScore =
                Number(right.category === photo.category) * 4 +
                Number(Boolean(right.location) && right.location === photo.location) * 2 +
                Number(right.printReady) +
                Number(right.featured);

            if (leftScore !== rightScore) {
                return rightScore - leftScore;
            }

            return sortByCuration(left, right);
        })
        .slice(0, limit);
