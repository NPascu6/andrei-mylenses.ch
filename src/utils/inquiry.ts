import {contactEmail, whatsappHref} from '../config/site';
import type {AppCopy} from '../i18n/messages';

export interface InquiryDraft {
    inquiryType: string;
    artwork?: string;
    roomType?: string;
    budgetRange?: string;
    timeline?: string;
    location?: string;
    notes?: string;
}

export interface InquiryCopy {
    labels: AppCopy['inquiryEmail']['labels'];
    fallbacks: AppCopy['inquiryEmail']['fallbacks'];
    greeting: string;
    intro: string;
}

export const buildInquirySubject = ({
    inquiryType,
    artwork,
}: InquiryDraft) => artwork ? `${inquiryType} - ${artwork}` : inquiryType;

export const buildInquiryBody = ({
    inquiryType,
    artwork,
    roomType,
    budgetRange,
    timeline,
    location,
    notes,
}: InquiryDraft, copy: InquiryCopy) => {
    const lines = [
        `${copy.labels.inquiryType}: ${inquiryType}`,
        `${copy.labels.artwork}: ${artwork || copy.fallbacks.stillDeciding}`,
        `${copy.labels.roomOrSetting}: ${roomType || copy.fallbacks.stillDeciding}`,
        `${copy.labels.budgetComfort}: ${budgetRange || copy.fallbacks.openToGuidance}`,
        `${copy.labels.timeline}: ${timeline || copy.fallbacks.justExploring}`,
        location ? `${copy.labels.location}: ${location}` : '',
        notes ? `${copy.labels.notes}: ${notes}` : '',
        '',
        copy.greeting,
        copy.intro,
    ].filter(Boolean);

    return lines.join('\n');
};

export const buildGuidedInquiryHref = (draft: InquiryDraft, copy: InquiryCopy) => {
    const subject = buildInquirySubject(draft);
    const body = buildInquiryBody(draft, copy);

    return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

export const buildWhatsAppInquiryHref = (draft: InquiryDraft, copy: InquiryCopy) => {
    const subject = buildInquirySubject(draft);
    const body = buildInquiryBody(draft, copy);
    const message = `${subject}\n\n${body}`;

    return `${whatsappHref}?text=${encodeURIComponent(message)}`;
};
