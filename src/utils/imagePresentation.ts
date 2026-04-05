import type {CSSProperties} from 'react';
import type {PortfolioOrientation} from '../types/portfolio';

const orientationAspectRatioMap: Record<PortfolioOrientation, string> = {
    landscape: '4 / 3',
    portrait: '4 / 5',
    square: '1 / 1',
    panoramic: '16 / 9',
};

export const normalizeAspectRatio = (aspectRatio?: string) => {
    if (!aspectRatio) {
        return undefined;
    }

    const match = aspectRatio.trim().match(/^(\d+(?:\.\d+)?)\s*[:/]\s*(\d+(?:\.\d+)?)$/);
    if (!match) {
        return undefined;
    }

    return `${match[1]} / ${match[2]}`;
};

export const resolveImageAspectRatio = (
    aspectRatio?: string,
    orientation?: PortfolioOrientation,
    fallback = '4 / 5',
) => normalizeAspectRatio(aspectRatio) || (orientation ? orientationAspectRatioMap[orientation] : fallback);

export const getLayeredBackgroundPosition = (
    imageStyle?: CSSProperties,
    backgroundStyle?: CSSProperties,
) => {
    if (typeof backgroundStyle?.backgroundPosition === 'string') {
        return backgroundStyle.backgroundPosition;
    }

    if (typeof imageStyle?.objectPosition === 'string') {
        return imageStyle.objectPosition;
    }

    return 'center';
};
