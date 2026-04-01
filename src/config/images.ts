const photoThumbModules = import.meta.glob('../assets/photos/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
    query: '?w=720&format=webp',
}) as Record<string, string>;

const photoDisplayModules = import.meta.glob('../assets/photos/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
    query: '?w=1440&format=webp',
}) as Record<string, string>;

const canvasDisplayModules = import.meta.glob('../assets/canvas/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
    query: '?w=1600&format=webp',
}) as Record<string, string>;

export interface ImportedImageAsset {
    fileName: string;
    baseName: string;
    src: string;
    fullSrc: string;
}

const getFileName = (path: string) => path.split('/').pop() || '';

const getBaseName = (path: string) =>
    getFileName(path).replace(/\.(jpg|jpeg|png|webp)$/i, '');

const buildImageAssets = (
    thumbSources: Record<string, string>,
    displaySources: Record<string, string>
): ImportedImageAsset[] =>
    Object.keys(thumbSources)
        .sort((left, right) => getBaseName(left).localeCompare(getBaseName(right)))
        .map((path) => ({
            fileName: getFileName(path),
            baseName: getBaseName(path),
            src: thumbSources[path],
            fullSrc: displaySources[path] || thumbSources[path],
        }));

export const images = buildImageAssets(photoThumbModules, photoDisplayModules);

export const canvaseImages = Object.keys(canvasDisplayModules)
    .sort((left, right) => getBaseName(left).localeCompare(getBaseName(right)))
    .map((path) => ({
        fileName: getFileName(path),
        title: getBaseName(path),
        src: canvasDisplayModules[path],
    }));

export type PhotoCategory = 'Travel' | 'Nature' | 'Street' | 'Wildlife' | 'Canvas' | 'Instagram' | 'Portrait' | 'Architecture';

export interface PhotoMeta {
    title: string;
    displayTitle: string;
    description: string;
    location: string;
    category: PhotoCategory;
    featured?: boolean;
    year?: string;
}

export const photoMetadata: PhotoMeta[] = [
    {
        title: 'Angel frame',
        displayTitle: 'Angel Frame',
        location: 'Phu Quoc, Vietnam',
        category: 'Travel',
        featured: true,
        description:
            'Representing a beautiful sunset I witnessed on the beautiful island of Phu Quoc, Vietnam.',
    },
    {
        title: 'Angels of Oradea',
        displayTitle: 'Angels of Oradea',
        location: 'Oradea, Romania',
        category: 'Street',
        featured: true,
        description:
            'Decorations for Christmas in Oradea, Romania, taken during a midnight photoshooting in the city, with no people, just colors and shadows.',
    },
    {
        title: 'Artist on street v1',
        displayTitle: 'Street Artist I',
        location: 'Hoi An, Vietnam',
        category: 'Street',
        description:
            'An artist working its craft on the streets of Hoi Ann, Vietnam. A beautiful shot of the focus and concentration of the artist, working uninterupted, while laying on the street.',
    },
    {
        title: 'Artist on street v2',
        displayTitle: 'Street Artist II',
        location: 'Hoi An, Vietnam',
        category: 'Street',
        featured: true,
        description:
            'An artist working its craft on the streets of Hoi Ann, Vietnam. A beautiful shot of the focus and concentration of the artist, working uninterupted, while laying on the street, with people passing by in the foreground.',
    },
    {
        title: 'Busy winter in Zurich',
        displayTitle: 'Busy Winter in Zurich',
        location: 'Zurich, Switzerland',
        category: 'Street',
        description:
            'People are in a hurry in front of Tram 13, during Christmas shopping spree.',
    },
    {
        title: 'Croix domini',
        displayTitle: 'Croce Domini',
        location: 'Croce Domini Pass, Italy',
        category: 'Travel',
        description:
            'Caption take on the top of Croce Domini Pass, around 1900m above sea level, in the Lombardy area during a motorcycle trip. The Pass has large curves with beautiful and peaceful views of the Alps.',
    },
    {
        title: 'Cubanito Fat Bob',
        displayTitle: 'Cubanito Fat Bob',
        location: 'Stelvio Pass, Italy',
        category: 'Travel',
        description:
            'A mixture of an old Cantonal House and the rough lines of a Harley Davidson, model Fat Bob, with the nickname "Don Diego", taken on top of Stelvio Pass.',
    },
    {
        title: 'Fisherman preparing',
        displayTitle: 'Fisherman Preparing',
        location: 'Halong Bay, Vietnam',
        category: 'Travel',
        description:
            'Vietnamese fisherman cleaning his fishing net after the overnight fishing captures have been taken in. Photo is taken in a small floating fishing village in Halong Bay.',
    },
    {
        title: 'Fisherman sillhouette',
        displayTitle: 'Fisherman Silhouette',
        location: 'Vietnam',
        category: 'Travel',
        description: 'Silhouette of a fisherman in Vietnam.',
    },
    {
        title: 'Fishing village',
        displayTitle: 'Fishing Village',
        location: 'Halong Bay, Vietnam',
        category: 'Travel',
        description:
            'Vietnamesse woman from a floating fishing village in Halong Bay, watching us pass by with the boat. She was emptiying the basket full of fish.',
    },
    {
        title: 'Gulf of Poets',
        displayTitle: 'Gulf of Poets',
        location: 'Liguria, Italy',
        category: 'Nature',
        featured: true,
        description:
            'Immersing yourself in the charm of the Ligurian coast also means immersing yourself in the enchanting charm of the Gulf of Poets (Golfo dei Poeti). A beautiful view of the gulf that inspired poets and writers through history.',
    },
    {
        title: 'Halong Bay Rock',
        displayTitle: 'Halong Bay Rock',
        location: 'Halong Bay, Vietnam',
        category: 'Nature',
        description:
            'Huge rock formation, which makes an interesting experience to visit in Vietnam. Halong Bay is famous for the unique formation of nearly 2,000 thousand limestone islands and islets on the emerald ocean.',
    },
    {
        title: 'Kid over sunset',
        displayTitle: 'Kid Over Sunset',
        location: 'Phu Quoc, Vietnam',
        category: 'Travel',
        description:
            'Phu Quoc sunset from the beach, with a passing by kid in the foreground. Beautiful colors are playing among the tree branches, in a peaceful setting of calm ocean.',
    },
    {
        title: 'Lonely boat',
        displayTitle: 'Lonely Boat',
        location: 'Hue, Vietnam',
        category: 'Travel',
        featured: true,
        description:
            'Stormy and cloudy morning on the beach next to the Imperial city of Hue, Vietnam, where I found the beauty of this old fishing boat making the trip to the beach worthwhile.',
    },
    {
        title: 'Lonely stork',
        displayTitle: 'Lonely Stork',
        location: 'Uznach, Switzerland',
        category: 'Wildlife',
        description:
            'The silhouette of a lonely stork, over blue skies, during an evening sunset. Storks are special birds, as every year they return to the same breeding nest. In this case, the photo was taken in Uznach, Switzerland, a small village that hosts more than 100 storks every year.',
    },
    {
        title: 'One legged bird',
        displayTitle: 'One-Legged Bird',
        location: 'Limmat, Zurich',
        category: 'Wildlife',
        description:
            'Cold winter day next to the Limmat, with the caption of a seagull. Standing on one leg is typical resting behavior for birds. In cold weather, they will tuck one leg up under their feathers, then switch legs after a while to let the standing leg get warm.',
    },
    {
        title: 'Palm tree sunset',
        displayTitle: 'Palm Tree Sunset',
        location: 'Phu Quoc, Vietnam',
        category: 'Nature',
        featured: true,
        description:
            'Sunset in Phu Quoc island, one of the peaceful and hidden treasures of Vietnam. Long and sandy beaches, with towering palm trees can be seen throug-out the island.',
    },
    {
        title: 'Palm tree sunset2',
        displayTitle: 'Palm Tree Sunset II',
        location: 'Phu Quoc, Vietnam',
        category: 'Nature',
        description:
            'Sunset in Phu Quoc island, one of the peaceful and hidden treasures of Vietnam. Long and sandy beaches, with towering palm trees can be seen throug-out the island.',
    },
    {
        title: 'Passing life',
        displayTitle: 'Passing Life',
        location: 'Vietnam',
        category: 'Street',
        description:
            'Caption of an old man smokes peacefully in the background, while in the foreground a busy road is crossed by hundreds of scooters. Life in Vietnam unfolds in front of your eyes without stopping, and yet something you find a caption that brings together continous movement with the beauty of the stilness.',
    },
    {
        title: 'Stelvio pass v2',
        displayTitle: 'Stelvio Pass II',
        location: 'Stelvio Pass, Italy',
        category: 'Nature',
        description:
            'The Stelvio Pass is a spectacular depression in the Rhaetian Alps, at a dizzying 2,758 metres above sea level. It is famous for being the highest car pass in Italy and the second highest in Europe. It once connected Milan and Vienna, the two great cities of the Habsburg Empire. Today, however, it joins the Valtellina to the Val Venosta, along a road that features 88 hairpin bends, which made it an amazing experience for a motorcycle ride.',
    },
    {
        title: 'Stelvio pass',
        displayTitle: 'Stelvio Pass',
        location: 'Stelvio Pass, Italy',
        category: 'Nature',
        featured: true,
        description:
            'The Stelvio Pass is a spectacular depression in the Rhaetian Alps, at a dizzying 2,758 metres above sea level. It is famous for being the highest car pass in Italy and the second highest in Europe. It once connected Milan and Vienna, the two great cities of the Habsburg Empire. Today, however, it joins the Valtellina to the Val Venosta, along a road that features 88 hairpin bends, which made it an amazing experience for a motorcycle ride.',
    },
    {
        title: 'Stork over houses',
        displayTitle: 'Stork Over Houses',
        location: 'Uznach, Switzerland',
        category: 'Wildlife',
        description:
            'Storks are special birds, as every year they return to the same breeding nest. In this case, the photo was taken in Uznach, Switzerland, a small village that hosts more than 100 storks every year.',
    },
    {
        title: 'Story family',
        displayTitle: 'Stork Family',
        location: 'Uznach, Switzerland',
        category: 'Wildlife',
        description:
            'Stork families like to build their nests on top of houses, as it protects them predators as well as give them vantage points. Storks are special birds, as every year they return to the same breeding nest. In this case, the photo was taken in Uznach, Switzerland, a small village that hosts more than 100 storks every year.',
    },
    {
        title: 'Sunset between trees',
        displayTitle: 'Sunset Between Trees',
        location: 'Ligurian Coast, Italy',
        category: 'Nature',
        description:
            'Beautiful sunset on the Ligurian coast. Caption was taken after a long day at the beach, before climbing the hill over the Gulf of Poets.',
    },
];

export const imageDescriptions = photoMetadata.map(({title, description}) => ({
    title,
    description,
}));

export const getPhotoMetadata = (title: string) =>
    photoMetadata.find((photo) => photo.title === title);
