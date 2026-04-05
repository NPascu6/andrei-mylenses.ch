import {describe, expect, it} from 'vitest';
import {messages} from '../i18n/messages';
import {getArtworkPageViewModel} from './artworkPage';

describe('artworkPage view model', () => {
    it('builds artwork page data for a known slug', () => {
        const viewModel = getArtworkPageViewModel({
            slug: 'halong-bay-rock',
            locale: 'en',
            copy: messages.en,
        });

        expect(viewModel).not.toBeNull();
        expect(viewModel?.localizedPhoto.title).toBe('Halong Bay Rock');
        expect(viewModel?.metaTitle).toBe('Halong Bay Rock | My Lenses');
        expect(viewModel?.inquiryHref).toContain('Artwork%20availability');
        expect(viewModel?.relatedPhotos.length).toBeGreaterThan(0);
    });

    it('returns null for an unknown slug', () => {
        expect(
            getArtworkPageViewModel({
                slug: 'missing-slug',
                locale: 'en',
                copy: messages.en,
            }),
        ).toBeNull();
    });
});
