import type {PortfolioCategory, PortfolioPhoto} from '../types/portfolio';

export const portfolioCategoryValues: PortfolioCategory[] = [
    'Travel',
    'Nature',
    'Street',
    'Wildlife',
    'Canvas',
    'Instagram',
    'Portrait',
    'Architecture',
];

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

export const formatFallbackTitle = (rawTitle: string) =>
    decodeURIComponent(rawTitle)
        .replace(/\b(v\d+)\b/gi, '')
        .replace(/[-_]+/g, ' ')
        .replace(/\s{2,}/g, ' ')
        .trim()
        .replace(/\b\w/g, (char) => char.toUpperCase());

export const slugify = (value: string) =>
    value
        .toLowerCase()
        .normalize('NFKD')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

export const normalizePortfolioCategory = (value?: string): PortfolioCategory =>
    portfolioCategoryValues.find((category) => category === value) || 'Travel';

export const getPortfolioTimestamp = (takenAt?: string) => {
    if (!takenAt) {
        return 0;
    }

    const next = Date.parse(takenAt);
    return Number.isFinite(next) ? next : 0;
};

export const sortPortfolioPhotosByCuration = (left: PortfolioPhoto, right: PortfolioPhoto) => {
    if (Boolean(left.hero) !== Boolean(right.hero)) {
        return left.hero ? -1 : 1;
    }

    if (Boolean(left.featured) !== Boolean(right.featured)) {
        return left.featured ? -1 : 1;
    }

    if (Boolean(left.printReady) !== Boolean(right.printReady)) {
        return left.printReady ? -1 : 1;
    }

    const dateDiff = getPortfolioTimestamp(right.takenAt) - getPortfolioTimestamp(left.takenAt);
    if (dateDiff !== 0) {
        return dateDiff;
    }

    return left.title.localeCompare(right.title);
};

export const normalizeCollectionTag = (value: string) => {
    const normalizedValue = value.trim().toLowerCase();
    return normalizedCollectionTags.get(normalizedValue) || value.trim();
};

export const deriveCollectionTags = ({
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
        printReady
        || orientation === 'panoramic'
        || ['Travel', 'Nature', 'Architecture'].includes(category)
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
        /(romania|oradea|transylvania|cluj|sibiu|brasov)/.test(normalizedLocation)
        || /(romania|oradea|transylvania)/.test(content)
    ) {
        tags.add('Romania');
    }

    if (
        /(quiet|calm|still|minimal|soft|atmosphere|peaceful)/.test(content)
        || ['Nature', 'Architecture'].includes(category)
    ) {
        tags.add('Quiet interiors');
    }

    if (
        printReady
        && ['Street', 'Wildlife', 'Portrait', 'Travel'].includes(category)
        && orientation !== 'panoramic'
    ) {
        tags.add('Giftable prints');
    }

    if (getPortfolioTimestamp(takenAt) >= Date.parse('2024-01-01')) {
        tags.add('New work');
    }

    return Array.from(tags);
};

export const orderByCuratedTitles = (photos: PortfolioPhoto[], titles: string[]) => {
    if (!titles.length) {
        return photos;
    }

    const normalizedTitles = titles.map((title) => title.trim().toLowerCase()).filter(Boolean);
    const used = new Set<string>();
    const curatedPhotos = normalizedTitles
        .map((title) =>
            photos.find((photo) => photo.title.trim().toLowerCase() === title),
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

export const clampFocusValue = (value?: number) => {
    if (typeof value !== 'number' || Number.isNaN(value)) {
        return undefined;
    }

    return Math.min(100, Math.max(0, value));
};

export const scoreRelatedPortfolioPhoto = (
    basePhoto: PortfolioPhoto,
    candidate: PortfolioPhoto,
) =>
    Number(candidate.category === basePhoto.category) * 4
    + Number(Boolean(candidate.location) && candidate.location === basePhoto.location) * 2
    + Number(candidate.printReady)
    + Number(candidate.featured)
    + candidate.collectionTags.filter((tag) => basePhoto.collectionTags.includes(tag)).length;
