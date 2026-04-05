import {describe, expect, it} from 'vitest';
import {messages} from '../i18n/messages';
import {
    createGuidedInquiryFormState,
    getGuidedInquiryBudgetRange,
    getGuidedInquiryDerivedValues,
    getGuidedInquirySummaryArtwork,
    getGuidedInquiryTimeline,
    syncGuidedInquiryFormState,
} from './guidedInquiry';

const {guidedInquiry, inquiryEmail} = messages.en;

describe('guidedInquiry utilities', () => {
    it('creates artwork-focused defaults when an initial artwork is provided', () => {
        expect(createGuidedInquiryFormState('halong-bay-rock')).toEqual({
            selectedArtworkSlug: 'halong-bay-rock',
            inquiryType: 'artworkAvailability',
            roomType: 'stillDeciding',
            location: '',
            notes: '',
        });
    });

    it('syncs form state to a newly selected initial artwork without dropping freeform fields', () => {
        expect(
            syncGuidedInquiryFormState(
                {
                    selectedArtworkSlug: '',
                    inquiryType: 'giftGuidance',
                    roomType: 'gift',
                    location: 'Zurich',
                    notes: 'Warm tones',
                },
                'halong-bay-rock',
            ),
        ).toEqual({
            selectedArtworkSlug: 'halong-bay-rock',
            inquiryType: 'artworkAvailability',
            roomType: 'stillDeciding',
            location: 'Zurich',
            notes: 'Warm tones',
        });
    });

    it('derives budget and timeline from the inquiry intent', () => {
        expect(getGuidedInquiryBudgetRange(guidedInquiry, 'commissionRequest')).toBe('Custom project budget');
        expect(getGuidedInquiryTimeline(guidedInquiry, 'giftGuidance', false)).toBe('For a gift or special date');
        expect(getGuidedInquiryTimeline(guidedInquiry, 'printConsultation', true)).toBe('Within the next month');
    });

    it('builds summary and href-ready draft values', () => {
        const derived = getGuidedInquiryDerivedValues({
            guidedInquiry,
            inquiryEmail,
            form: {
                selectedArtworkSlug: 'halong-bay-rock',
                inquiryType: 'curatedSelection',
                roomType: 'office',
                location: 'Zurich',
                notes: 'Looking for a calmer wall piece',
            },
            selectedArtworkTitle: '',
            hasArtworkFocus: false,
        });

        expect(getGuidedInquirySummaryArtwork(guidedInquiry, 'curatedSelection', '')).toBe('Curated recommendation');
        expect(derived.summaryArtwork).toBe('Curated recommendation');
        expect(derived.draft.roomType).toBe('Office');
        expect(derived.guidedInquiryHref).toContain('Curated%20selection');
        expect(derived.directEmailHref).toContain('Private%20Inquiry');
    });
});
