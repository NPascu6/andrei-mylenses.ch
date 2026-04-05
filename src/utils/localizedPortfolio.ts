import {localizePortfolioPhoto} from '../i18n/portfolio';
import type {AppLocale} from '../i18n/types';
import type {LocalizedPortfolioPhoto, PortfolioPhoto} from '../types/portfolio';

export const localizeOptionalPortfolioPhoto = (
    photo: PortfolioPhoto | undefined,
    locale: AppLocale,
) => (photo ? localizePortfolioPhoto(photo, locale) : null);

export const localizePortfolioPhotos = (
    photos: readonly PortfolioPhoto[],
    locale: AppLocale,
) => photos.map((photo) => localizePortfolioPhoto(photo, locale));

export const localizePortfolioSlice = (
    photos: readonly PortfolioPhoto[],
    locale: AppLocale,
    limit: number,
): LocalizedPortfolioPhoto[] => localizePortfolioPhotos(photos.slice(0, limit), locale);
