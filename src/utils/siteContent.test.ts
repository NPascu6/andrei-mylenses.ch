import {describe, expect, it} from 'vitest';
import {
    normalizeJourneySteps,
    normalizeStringList,
    normalizeTitleList,
} from './contentNormalization';

describe('contentNormalization', () => {
    it('normalizes string lists from strings and keyed objects', () => {
        expect(normalizeStringList([' one ', {point: ' two '}])).toEqual(['one', 'two']);
        expect(normalizeTitleList([{artworkTitle: ' Halong Bay Rock '}])).toEqual(['Halong Bay Rock']);
    });

    it('drops invalid journey steps', () => {
        expect(
            normalizeJourneySteps([
                {title: 'Start', description: 'Choose a shortlist'},
                {title: '', description: 'Missing title'},
                'invalid',
            ]),
        ).toEqual([
            {title: 'Start', description: 'Choose a shortlist'},
        ]);
    });
});
