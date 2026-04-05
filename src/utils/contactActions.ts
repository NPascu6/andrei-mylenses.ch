import {contactEmail, instagramUrl, whatsappHref} from '../config/site';

export const buildMailtoHref = (subject?: string, body?: string) => {
    const params: string[] = [];

    if (subject) {
        params.push(`subject=${encodeURIComponent(subject)}`);
    }

    if (body) {
        params.push(`body=${encodeURIComponent(body)}`);
    }

    return `mailto:${contactEmail}${params.length ? `?${params.join('&')}` : ''}`;
};

export const buildWhatsAppShareHref = (message: string) =>
    `${whatsappHref}?text=${encodeURIComponent(message)}`;

export const contactActions = {
    email: buildMailtoHref(),
    whatsapp: whatsappHref,
    instagram: instagramUrl,
};
