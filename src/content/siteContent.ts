import portfolioExperience from './site/portfolioExperience.json';
import inquiryGuide from './site/inquiryGuide.json';
import curation from './site/curation.json';

export interface PortfolioExperienceContent {
    eyebrow: string;
    title: string;
    description: string;
    archiveEyebrow: string;
    archiveTitle: string;
}

export interface InquiryGuideContent {
    eyebrow: string;
    title: string;
    description: string;
    guidedTitle: string;
    guidedDescription: string;
}

export interface CurationContent {
    featuredPrintTitles: string[];
    featuredArchiveTitles: string[];
}

const normalizeTitleList = (value: unknown): string[] => {
    if (!Array.isArray(value)) {
        return [];
    }

    return value
        .map((entry) => {
            if (typeof entry === 'string') {
                return entry;
            }

            if (entry && typeof entry === 'object' && 'artworkTitle' in entry) {
                return String((entry as {artworkTitle?: string}).artworkTitle || '');
            }

            return '';
        })
        .map((entry) => entry.trim())
        .filter(Boolean);
};

export const portfolioExperienceContent: PortfolioExperienceContent = {
    eyebrow: portfolioExperience.eyebrow || 'Collector curation',
    title:
        portfolioExperience.title ||
        'Explore the full archive or move directly into the images with the strongest wall presence.',
    description:
        portfolioExperience.description ||
        'The Wall-ready view highlights photographs that translate especially well into Giclee canvas, where scale, atmosphere, and tonal depth can fully open up.',
    archiveEyebrow: portfolioExperience.archiveEyebrow || 'Archive flow',
    archiveTitle: portfolioExperience.archiveTitle || 'A quieter way to move through the collection.',
};

export const inquiryGuideContent: InquiryGuideContent = {
    eyebrow: inquiryGuide.eyebrow || 'Collector inquiries',
    title:
        inquiryGuide.title ||
        'Fine art photographs available as Giclee canvas pieces, private inquiries, and selected commissioned work.',
    description:
        inquiryGuide.description ||
        'If a work speaks to you, reach out and we can discuss the image, the right scale for your space, and whether a custom direction makes more sense for your wall.',
    guidedTitle: inquiryGuide.guidedTitle || 'Start with a guided inquiry',
    guidedDescription:
        inquiryGuide.guidedDescription ||
        'Use a few quick details to generate a richer email with artwork, room type, and your intention already included.',
};

export const curationContent: CurationContent = {
    featuredPrintTitles: normalizeTitleList(curation.featuredPrintTitles),
    featuredArchiveTitles: normalizeTitleList(curation.featuredArchiveTitles),
};
