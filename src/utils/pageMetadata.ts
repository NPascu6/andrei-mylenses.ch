import {siteTitle} from '../config/site';

export const buildPageTitle = (title: string) => `${title} | ${siteTitle}`;

export const buildArtworkPageTitle = (artworkTitle: string) =>
    buildPageTitle(artworkTitle);

export const resolvePageTitle = (explicitTitle?: string, fallbackTitle?: string) => {
    if (explicitTitle) {
        return explicitTitle;
    }

    if (fallbackTitle) {
        return buildPageTitle(fallbackTitle);
    }

    return siteTitle;
};
