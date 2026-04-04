import {canvasImages, images} from '../config/images';
import {importedInstagramPhotos} from '../config/instagram.generated';
import type {
    CanvasPreviewImage,
    PortfolioCategory,
    PortfolioCollectionView,
    PortfolioPhoto,
} from '../types/portfolio';
import {cmsPhotoEntriesByBaseName} from './cmsPhotos';
import {curationContent} from './siteContent';

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

const normalizedCollectionTags = new Map([
    ['best for large walls', 'Best for large walls'],
    ['large walls', 'Best for large walls'],
    ['collector starters', 'Collector starters'],
    ['quiet interiors', 'Quiet interiors'],
    ['black and white', 'Black and white'],
    ['monochrome', 'Black and white'],
    ['zurich', 'Zurich'],
    ['romania', 'Romania'],
    ['giftable prints', 'Giftable prints'],
    ['giftable', 'Giftable prints'],
    ['new work', 'New work'],
]);

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

const normalizeCollectionTag = (value: string) => {
    const normalizedValue = value.trim().toLowerCase();
    return normalizedCollectionTags.get(normalizedValue) || value.trim();
};

const deriveCollectionTags = ({
    baseName,
    title,
    description,
    location,
    category,
    featured,
    printReady,
    roomMood,
    orientation,
    takenAt,
    collectionTags,
}: {
    baseName: string;
    title: string;
    description?: string;
    location?: string;
    category: PortfolioCategory;
    featured: boolean;
    printReady: boolean;
    roomMood?: string;
    orientation?: string;
    takenAt?: string;
    collectionTags?: string[];
}) => {
    const tags = new Set((collectionTags || []).map(normalizeCollectionTag).filter(Boolean));
    const content = [baseName, title, description, roomMood].filter(Boolean).join(' ').toLowerCase();
    const normalizedLocation = (location || '').toLowerCase();

    if (featured || printReady) {
        tags.add('Collector starters');
    }

    if (
        printReady ||
        orientation === 'panoramic' ||
        ['Travel', 'Nature', 'Architecture'].includes(category)
    ) {
        tags.add('Best for large walls');
    }

    if (/(monochrome|black and white|\bbw\b|noir)/.test(content)) {
        tags.add('Black and white');
    }

    if (normalizedLocation.includes('zurich')) {
        tags.add('Zurich');
    }

    if (
        /(romania|oradea|transylvania|cluj|sibiu|brasov)/.test(normalizedLocation) ||
        /(romania|oradea|transylvania)/.test(content)
    ) {
        tags.add('Romania');
    }

    if (
        /(quiet|calm|still|minimal|soft|atmosphere|peaceful)/.test(content) ||
        ['Nature', 'Architecture'].includes(category)
    ) {
        tags.add('Quiet interiors');
    }

    if (
        printReady &&
        ['Street', 'Wildlife', 'Portrait', 'Travel'].includes(category) &&
        orientation !== 'panoramic'
    ) {
        tags.add('Giftable prints');
    }

    if (getTimestamp(takenAt) >= Date.parse('2024-01-01')) {
        tags.add('New work');
    }

    return Array.from(tags);
};

const orderByCuratedTitles = (photos: PortfolioPhoto[], titles: string[]) => {
    if (!titles.length) {
        return photos;
    }

    const normalizedTitles = titles.map((title) => title.trim().toLowerCase()).filter(Boolean);
    const used = new Set<string>();
    const curatedPhotos = normalizedTitles
        .map((title) =>
            photos.find((photo) => photo.title.trim().toLowerCase() === title)
        )
        .filter((photo): photo is PortfolioPhoto => Boolean(photo))
        .filter((photo) => {
            if (used.has(photo.slug)) {
                return false;
            }

            used.add(photo.slug);
            return true;
        });

    const remainingPhotos = photos.filter((photo) => !used.has(photo.slug));
    return [...curatedPhotos, ...remainingPhotos];
};

const clampFocusValue = (value?: number) => {
    if (typeof value !== 'number' || Number.isNaN(value)) {
        return undefined;
    }

    return Math.min(100, Math.max(0, value));
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
        const category = normalizeCategory(metadata?.category);
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
    .sort(sortByCuration);

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

export const curatedCollectionViews: PortfolioCollectionView[] = curatedCollectionDefinitions
    .map((view) => ({
        ...view,
        photos: portfolioPhotos.filter((photo) => photo.collectionTags.includes(view.label)),
    }))
    .filter((view) => view.photos.length > 0);

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
            const leftScore =
                Number(left.category === photo.category) * 4 +
                Number(Boolean(left.location) && left.location === photo.location) * 2 +
                Number(left.printReady) +
                Number(left.featured) +
                left.collectionTags.filter((tag) => photo.collectionTags.includes(tag)).length;
            const rightScore =
                Number(right.category === photo.category) * 4 +
                Number(Boolean(right.location) && right.location === photo.location) * 2 +
                Number(right.printReady) +
                Number(right.featured) +
                right.collectionTags.filter((tag) => photo.collectionTags.includes(tag)).length;

            if (leftScore !== rightScore) {
                return rightScore - leftScore;
            }

            return sortByCuration(left, right);
        })
        .slice(0, limit);
