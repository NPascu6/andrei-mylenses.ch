import type {AppCopy} from '../i18n/messages';
import {buildMailtoHref} from './contactActions';
import {buildGuidedInquiryHref, type InquiryDraft} from './inquiry';

type GuidedInquiryCopy = AppCopy['guidedInquiry'];
type InquiryEmailCopy = AppCopy['inquiryEmail'];

export type InquiryOptionId = keyof GuidedInquiryCopy['inquiryOptions'];
export type RoomOptionId = keyof GuidedInquiryCopy['roomOptions'];

export interface GuidedInquiryFormState {
    selectedArtworkSlug: string;
    roomType: RoomOptionId;
    inquiryType: InquiryOptionId;
    location: string;
    notes: string;
}

export interface GuidedInquiryDerivedValues {
    budgetRange: string;
    timeline: string;
    summaryArtwork: string;
    draft: InquiryDraft;
    guidedInquiryHref: string;
    directEmailHref: string;
}

export const inquiryOptionIds: InquiryOptionId[] = [
    'printConsultation',
    'artworkAvailability',
    'curatedSelection',
    'giftGuidance',
    'commissionRequest',
];

export const roomOptionIds: RoomOptionId[] = [
    'livingRoom',
    'bedroom',
    'office',
    'hospitality',
    'gift',
    'stillDeciding',
];

export const createGuidedInquiryFormState = (initialArtworkSlug = ''): GuidedInquiryFormState => ({
    selectedArtworkSlug: initialArtworkSlug,
    roomType: initialArtworkSlug ? 'stillDeciding' : 'livingRoom',
    inquiryType: initialArtworkSlug ? 'artworkAvailability' : 'printConsultation',
    location: '',
    notes: '',
});

export const syncGuidedInquiryFormState = (
    state: GuidedInquiryFormState,
    initialArtworkSlug: string,
): GuidedInquiryFormState => {
    if (!initialArtworkSlug) {
        return {
            ...state,
            selectedArtworkSlug: '',
        };
    }

    return {
        ...state,
        selectedArtworkSlug: initialArtworkSlug,
        inquiryType: 'artworkAvailability',
        roomType: 'stillDeciding',
    };
};

export const getGuidedInquiryBudgetRange = (
    guidedInquiry: GuidedInquiryCopy,
    inquiryType: InquiryOptionId,
) => {
    if (inquiryType === 'commissionRequest') {
        return guidedInquiry.budget.customProject;
    }

    if (inquiryType === 'giftGuidance') {
        return guidedInquiry.budget.giftGuidance;
    }

    return guidedInquiry.budget.openToGuidance;
};

export const getGuidedInquiryTimeline = (
    guidedInquiry: GuidedInquiryCopy,
    inquiryType: InquiryOptionId,
    hasArtworkFocus: boolean,
) => {
    if (inquiryType === 'giftGuidance') {
        return guidedInquiry.timeline.gift;
    }

    if (hasArtworkFocus || inquiryType === 'artworkAvailability') {
        return guidedInquiry.timeline.nextMonth;
    }

    return guidedInquiry.timeline.exploring;
};

export const getGuidedInquirySummaryArtwork = (
    guidedInquiry: GuidedInquiryCopy,
    inquiryType: InquiryOptionId,
    selectedArtworkTitle: string,
) => {
    if (selectedArtworkTitle) {
        return selectedArtworkTitle;
    }

    if (inquiryType === 'curatedSelection') {
        return guidedInquiry.curatedRecommendation;
    }

    return guidedInquiry.artworkPlaceholder;
};

export const getGuidedInquiryDerivedValues = ({
    guidedInquiry,
    inquiryEmail,
    form,
    selectedArtworkTitle,
    hasArtworkFocus,
}: {
    guidedInquiry: GuidedInquiryCopy;
    inquiryEmail: InquiryEmailCopy;
    form: GuidedInquiryFormState;
    selectedArtworkTitle: string;
    hasArtworkFocus: boolean;
}): GuidedInquiryDerivedValues => {
    const budgetRange = getGuidedInquiryBudgetRange(guidedInquiry, form.inquiryType);
    const timeline = getGuidedInquiryTimeline(guidedInquiry, form.inquiryType, hasArtworkFocus);
    const summaryArtwork = getGuidedInquirySummaryArtwork(
        guidedInquiry,
        form.inquiryType,
        selectedArtworkTitle,
    );

    const draft: InquiryDraft = {
        inquiryType: guidedInquiry.inquiryOptions[form.inquiryType].label,
        artwork: selectedArtworkTitle,
        roomType: guidedInquiry.roomOptions[form.roomType],
        budgetRange,
        timeline,
        location: form.location,
        notes: form.notes,
    };

    return {
        budgetRange,
        timeline,
        summaryArtwork,
        draft,
        guidedInquiryHref: buildGuidedInquiryHref(draft, inquiryEmail),
        directEmailHref: buildMailtoHref(guidedInquiry.directEmailSubject),
    };
};
