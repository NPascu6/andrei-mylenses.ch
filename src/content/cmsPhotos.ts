export type CmsPhotoCategory =
    | 'Travel'
    | 'Nature'
    | 'Street'
    | 'Wildlife'
    | 'Canvas'
    | 'Instagram'
    | 'Portrait'
    | 'Architecture';

export interface CmsPhotoEntry {
    title: string;
    image: string;
    description?: string;
    location?: string;
    category?: CmsPhotoCategory;
    featured?: boolean;
    printReady?: boolean;
    permalink?: string;
    takenAt?: string;
    series?: string;
    orientation?: 'landscape' | 'portrait' | 'square' | 'panoramic';
    aspectRatio?: string;
    sizes?: string[];
    priceFrom?: string;
    edition?: string;
    availability?: string;
    roomMood?: string;
    hero?: boolean;
    seoTitle?: string;
    seoDescription?: string;
}

const cmsPhotoModules = import.meta.glob('./photos/*.json', {
    eager: true,
    import: 'default',
}) as Record<string, CmsPhotoEntry>;

const getFileName = (path: string) => path.split('/').pop() || '';

const getBaseName = (path: string) => getFileName(path).replace(/\.(jpg|jpeg|png|webp)$/i, '');

export const getCmsPhotoImageBaseName = (imagePath: string) => {
    const normalizedPath = imagePath.replace(/^\/+/, '');
    return getBaseName(normalizedPath);
};

export const cmsPhotoEntries = Object.values(cmsPhotoModules).sort((left, right) =>
    left.title.localeCompare(right.title)
);

export const cmsPhotoEntriesByBaseName = new Map(
    cmsPhotoEntries.map((entry) => [getCmsPhotoImageBaseName(entry.image), entry])
);
