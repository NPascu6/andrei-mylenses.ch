import {contactEmail} from '../config/site';

export interface InquiryDraft {
    inquiryType: string;
    artwork?: string;
    roomType?: string;
    budgetRange?: string;
    timeline?: string;
    location?: string;
    notes?: string;
}

export const buildGuidedInquiryHref = ({
    inquiryType,
    artwork,
    roomType,
    budgetRange,
    timeline,
    location,
    notes,
}: InquiryDraft) => {
    const subject = artwork ? `${inquiryType} - ${artwork}` : inquiryType;
    const lines = [
        `Inquiry type: ${inquiryType}`,
        `Artwork: ${artwork || 'Still deciding'}`,
        `Room or setting: ${roomType || 'Still deciding'}`,
        `Budget comfort: ${budgetRange || 'Open to guidance'}`,
        `Timeline: ${timeline || 'Just exploring'}`,
        location ? `Location: ${location}` : '',
        notes ? `Notes: ${notes}` : '',
        '',
        'Hello Andrei,',
        'I would like to discuss a possible photographic piece for my space.',
    ].filter(Boolean);

    return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
};
