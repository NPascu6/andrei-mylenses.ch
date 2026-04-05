import {describe, expect, it} from 'vitest';
import type {PortfolioPhoto} from '../types/portfolio';
import {
    deriveCollectionTags,
    orderByCuratedTitles,
    scoreRelatedPortfolioPhoto,
} from './portfolioCuration';

const createPhoto = (overrides: Partial<PortfolioPhoto>): PortfolioPhoto => ({
    id: 'photo',
    baseName: 'photo',
    src: '/photo.jpg',
    mediumSrc: '/photo-medium.jpg',
    fullSrc: '/photo-full.jpg',
    srcSet: '',
    title: 'Photo',
    slug: 'photo',
    description: 'Quiet monochrome city study in Zurich',
    location: 'Zurich, Switzerland',
    category: 'Street',
    featured: false,
    printReady: false,
    permalink: '',
    takenAt: '2024-02-01',
    sizes: [],
    collectionTags: ['Quiet interiors'],
    ...overrides,
});

describe('portfolioCuration', () => {
    it('derives collector-facing collection tags', () => {
        expect(
            deriveCollectionTags({
                baseName: 'zurich-monochrome',
                title: 'Zurich Monochrome',
                description: 'A quiet monochrome evening scene',
                location: 'Zurich, Switzerland',
                category: 'Street',
                featured: true,
                printReady: true,
                takenAt: '2024-02-10',
            }),
        ).toEqual(
            expect.arrayContaining([
                'Collector starters',
                'Black and white',
                'Zurich',
                'Giftable prints',
                'New work',
            ]),
        );
    });

    it('scores more closely related photos higher', () => {
        const basePhoto = createPhoto({collectionTags: ['Quiet interiors', 'Zurich']});
        const closeMatch = createPhoto({slug: 'close', featured: true, printReady: true});
        const distantMatch = createPhoto({
            slug: 'distant',
            category: 'Nature',
            location: 'Romania',
            featured: false,
            printReady: false,
            collectionTags: [],
        });

        expect(scoreRelatedPortfolioPhoto(basePhoto, closeMatch)).toBeGreaterThan(
            scoreRelatedPortfolioPhoto(basePhoto, distantMatch),
        );
    });

    it('honors curated title ordering before the remaining photos', () => {
        const first = createPhoto({title: 'First', slug: 'first'});
        const second = createPhoto({title: 'Second', slug: 'second'});
        const ordered = orderByCuratedTitles([first, second], ['Second']);

        expect(ordered.map((photo) => photo.slug)).toEqual(['second', 'first']);
    });
});
