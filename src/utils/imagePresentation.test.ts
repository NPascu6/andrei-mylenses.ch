import {describe, expect, it} from 'vitest';
import {
    getLayeredBackgroundPosition,
    normalizeAspectRatio,
    resolveImageAspectRatio,
} from './imagePresentation';

describe('imagePresentation utilities', () => {
    it('normalizes aspect ratio strings', () => {
        expect(normalizeAspectRatio('4:5')).toBe('4 / 5');
        expect(normalizeAspectRatio('16 / 9')).toBe('16 / 9');
        expect(normalizeAspectRatio('bad-value')).toBeUndefined();
    });

    it('falls back to orientation-based aspect ratios', () => {
        expect(resolveImageAspectRatio(undefined, 'portrait')).toBe('4 / 5');
        expect(resolveImageAspectRatio(undefined, 'panoramic')).toBe('16 / 9');
        expect(resolveImageAspectRatio(undefined, undefined, '3 / 2')).toBe('3 / 2');
    });

    it('derives layered background position from image or background styles', () => {
        expect(
            getLayeredBackgroundPosition(
                {objectPosition: 'center 22%'},
                undefined,
            ),
        ).toBe('center 22%');
        expect(
            getLayeredBackgroundPosition(
                {objectPosition: 'center 22%'},
                {backgroundPosition: 'right top'},
            ),
        ).toBe('right top');
    });
});
