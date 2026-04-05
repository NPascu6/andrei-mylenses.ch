import {describe, expect, it} from 'vitest';
import {
    buildCollectionArchiveBlocks,
    getCollectionArchiveResponsiveSizes,
    getCollectionArchiveTileImageClassName,
} from './collectionArchive';
import type {LocalizedPortfolioPhoto} from '../types/portfolio';

const createPhoto = (slug: string, orientation: LocalizedPortfolioPhoto['orientation']): LocalizedPortfolioPhoto => ({
    id: slug,
    baseName: slug,
    src: '/thumb.webp',
    mediumSrc: '/medium.webp',
    fullSrc: '/full.webp',
    srcSet: '',
    title: slug,
    slug,
    description: 'Photo description',
    location: 'Zurich',
    category: 'Travel',
    featured: false,
    printReady: false,
    permalink: '',
    takenAt: '2024-01-01',
    orientation,
    aspectRatio: undefined,
    sizes: [],
    collectionTags: [],
});

describe('collectionArchive utilities', () => {
    it('chunks photos into alternating archive blocks', () => {
        const photos = Array.from({length: 7}, (_, index) => createPhoto(`photo-${index + 1}`, 'landscape'));

        const blocks = buildCollectionArchiveBlocks(photos);

        expect(blocks).toHaveLength(2);
        expect(blocks[0].lead.slug).toBe('photo-1');
        expect(blocks[0].supporting).toHaveLength(4);
        expect(blocks[0].reverse).toBe(false);
        expect(blocks[1].lead.slug).toBe('photo-6');
        expect(blocks[1].supporting).toHaveLength(1);
        expect(blocks[1].reverse).toBe(true);
    });

    it('returns taller compact image classes for portrait-like work', () => {
        expect(getCollectionArchiveTileImageClassName(createPhoto('portrait', 'portrait'), 'compact')).toContain('min-h-[16rem]');
        expect(getCollectionArchiveTileImageClassName(createPhoto('landscape', 'landscape'), 'compact')).toContain('min-h-[14rem]');
    });

    it('returns tighter responsive sizes for supporting cards', () => {
        expect(getCollectionArchiveResponsiveSizes('feature')).toContain('39vw');
        expect(getCollectionArchiveResponsiveSizes('compact')).toContain('22vw');
    });
});
