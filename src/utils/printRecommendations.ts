interface PrintRecommendationInput {
    title: string;
    category?: string;
    location?: string;
}

export interface PrintRecommendation {
    recommendedSize: string;
    bestFit: string;
    idealSetting: string;
    collectorNote: string;
}

const defaultRecommendation: PrintRecommendation = {
    recommendedSize: '50 x 30 cm or custom',
    bestFit: 'Fine art Giclee canvas',
    idealSetting: 'Quiet interiors, creative studios, and collected living spaces',
    collectorNote: 'A versatile piece designed to hold atmosphere, detail, and emotional presence on the wall.',
};

const categoryRecommendations: Record<string, PrintRecommendation> = {
    Nature: {
        recommendedSize: '90 x 60 cm statement canvas',
        bestFit: 'Large-format Giclee canvas',
        idealSetting: 'Living rooms, lounges, and calm hospitality spaces',
        collectorNote: 'Landscape work opens up beautifully at larger scale, where texture, light, and distance can breathe.',
    },
    Travel: {
        recommendedSize: '90 x 60 cm statement canvas',
        bestFit: 'Gallery-scale canvas or custom format',
        idealSetting: 'Open-plan homes, offices, and feature walls',
        collectorNote: 'Travel images carry a strong sense of place and become immersive when printed with generous presence.',
    },
    Street: {
        recommendedSize: '50 x 30 cm editorial canvas',
        bestFit: 'Medium-format Giclee canvas',
        idealSetting: 'Hallways, studies, and modern urban interiors',
        collectorNote: 'Street photographs feel especially compelling as intimate, conversation-starting pieces.',
    },
    Wildlife: {
        recommendedSize: '50 x 30 cm collector canvas',
        bestFit: 'Museum-grade canvas with rich tonal depth',
        idealSetting: 'Reading corners, offices, and personal collections',
        collectorNote: 'Wildlife work rewards close viewing, where gesture, stillness, and fine detail take over.',
    },
    Portrait: {
        recommendedSize: '50 x 30 cm portrait-led canvas',
        bestFit: 'Medium-format fine art canvas',
        idealSetting: 'Studios, dressing spaces, and intimate interiors',
        collectorNote: 'Portrait pieces hold attention best when printed with enough scale to preserve expression and texture.',
    },
    Architecture: {
        recommendedSize: '90 x 60 cm architectural canvas',
        bestFit: 'Large-format Giclee canvas',
        idealSetting: 'Minimal interiors, offices, and design-led spaces',
        collectorNote: 'Architectural compositions gain strength on the wall through scale, structure, and clean presentation.',
    },
    Canvas: {
        recommendedSize: 'Custom consultation',
        bestFit: 'Giclee canvas preview',
        idealSetting: 'Sized to the room and viewing distance',
        collectorNote: 'Each canvas can be discussed individually to match format, scale, and placement.',
    },
};

export const getPrintRecommendation = ({
    title,
    category,
    location,
}: PrintRecommendationInput): PrintRecommendation => {
    const recommendation = category && categoryRecommendations[category]
        ? categoryRecommendations[category]
        : defaultRecommendation;

    if (title.toLowerCase().includes('skyline') || title.toLowerCase().includes('bridge')) {
        return {
            ...recommendation,
            recommendedSize: '90 x 60 cm panoramic canvas',
            idealSetting: 'Living rooms, offices, and entry statements',
        };
    }

    if ((location || '').toLowerCase().includes('switzerland')) {
        return {
            ...recommendation,
            collectorNote: 'This piece carries a calm alpine clarity that works beautifully in refined, light-filled interiors.',
        };
    }

    return recommendation;
};
