import portfolioExperience from './site/portfolioExperience.json';
import inquiryGuide from './site/inquiryGuide.json';
import curation from './site/curation.json';
import collectorExperience from './site/collectorExperience.json';
import consultationExperience from './site/consultationExperience.json';

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

export interface CollectorJourneyStep {
    title: string;
    description: string;
}

export interface CollectorExperienceContent {
    featuredEyebrow: string;
    featuredTitle: string;
    featuredDescription: string;
    featuredCtaLabel: string;
    featuredSecondaryCtaLabel: string;
    assuranceEyebrow: string;
    assuranceTitle: string;
    assuranceDescription: string;
    assurancePoints: string[];
    journeyEyebrow: string;
    journeyTitle: string;
    journeyDescription: string;
    journeySteps: CollectorJourneyStep[];
}

export interface ConsultationExperienceContent {
    eyebrow: string;
    title: string;
    description: string;
    guidedTitle: string;
    guidedDescription: string;
    assuranceTitle: string;
    assurancePoints: string[];
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

const normalizeStringList = (value: unknown): string[] => {
    if (!Array.isArray(value)) {
        return [];
    }

    return value
        .map((entry) => {
            if (typeof entry === 'string') {
                return entry;
            }

            if (entry && typeof entry === 'object' && 'point' in entry) {
                return String((entry as {point?: string}).point || '');
            }

            return String(entry || '');
        })
        .map((entry) => entry.trim())
        .filter(Boolean);
};

const normalizeJourneySteps = (value: unknown): CollectorJourneyStep[] => {
    if (!Array.isArray(value)) {
        return [];
    }

    return value
        .map((entry) => {
            if (!entry || typeof entry !== 'object') {
                return null;
            }

            const title = String((entry as {title?: string}).title || '').trim();
            const description = String((entry as {description?: string}).description || '').trim();

            if (!title || !description) {
                return null;
            }

            return {title, description};
        })
        .filter((entry): entry is CollectorJourneyStep => Boolean(entry));
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

export const collectorExperienceContent: CollectorExperienceContent = {
    featuredEyebrow: collectorExperience.featuredEyebrow || 'Featured prints',
    featuredTitle:
        collectorExperience.featuredTitle ||
        'Begin with the works that feel most natural as collector-led canvas pieces.',
    featuredDescription:
        collectorExperience.featuredDescription ||
        'Lead with a smaller, more resolved selection before moving into the full archive.',
    featuredCtaLabel: collectorExperience.featuredCtaLabel || 'Start a consultation',
    featuredSecondaryCtaLabel: collectorExperience.featuredSecondaryCtaLabel || 'See print details',
    assuranceEyebrow: collectorExperience.assuranceEyebrow || 'Why collectors begin here',
    assuranceTitle: collectorExperience.assuranceTitle || 'A quieter shortlist before the wider archive.',
    assuranceDescription:
        collectorExperience.assuranceDescription ||
        'This first edit is designed to reduce decision fatigue and make the print conversation easier.',
    assurancePoints:
        normalizeStringList(collectorExperience.assurancePoints).length > 0
            ? normalizeStringList(collectorExperience.assurancePoints)
            : [
                'Selected for scale, atmosphere, and tonal clarity.',
                'Suitable for interiors, gifts, and slower collector purchases.',
                'Easy to discuss by room, mood, and preferred presentation.',
            ],
    journeyEyebrow: collectorExperience.journeyEyebrow || 'Collector journey',
    journeyTitle:
        collectorExperience.journeyTitle || 'Move from discovery to a more confident print decision.',
    journeyDescription:
        collectorExperience.journeyDescription ||
        'The site follows a more professional rhythm: discover a focused selection, understand the print fit, then browse the wider archive.',
    journeySteps:
        normalizeJourneySteps(collectorExperience.journeySteps).length > 0
            ? normalizeJourneySteps(collectorExperience.journeySteps)
            : [
                {
                    title: 'Start with a shortlist',
                    description: 'The strongest print-ready works surface first, so your first impression feels curated instead of overwhelming.',
                },
                {
                    title: 'Understand the print fit',
                    description: 'Materials, room guidance, and presentation cues help you picture how the work can live beyond the screen.',
                },
                {
                    title: 'Browse the full archive',
                    description: 'Once you know the mood and direction you want, the larger collection becomes much easier to navigate.',
                },
            ],
};

export const consultationExperienceContent: ConsultationExperienceContent = {
    eyebrow: consultationExperience.eyebrow || 'Print consultation',
    title:
        consultationExperience.title ||
        'A better first conversation for collectors, interiors, and meaningful gifts.',
    description:
        consultationExperience.description ||
        'Use a few details to shape a more thoughtful inquiry around artwork, scale, and atmosphere.',
    guidedTitle: consultationExperience.guidedTitle || 'Build a more complete inquiry',
    guidedDescription:
        consultationExperience.guidedDescription ||
        'Share your setting, budget comfort, and preferred direction so the first reply can already feel tailored.',
    assuranceTitle: consultationExperience.assuranceTitle || 'What to expect next',
    assurancePoints:
        normalizeStringList(consultationExperience.assurancePoints).length > 0
            ? normalizeStringList(consultationExperience.assurancePoints)
            : [
                'A more focused recommendation based on mood, room type, and wall presence.',
                'A clear discussion around likely size, print suitability, and next steps.',
                'A direct artist conversation without marketplace friction or generic upsell.',
            ],
};
