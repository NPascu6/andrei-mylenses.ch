export interface JourneyStepLike {
    title?: string;
    description?: string;
}

export const normalizeStringList = (
    value: unknown,
    entryKey = 'point',
): string[] => {
    if (!Array.isArray(value)) {
        return [];
    }

    return value
        .map((entry) => {
            if (typeof entry === 'string') {
                return entry;
            }

            if (entry && typeof entry === 'object' && entryKey in entry) {
                return String((entry as Record<string, unknown>)[entryKey] || '');
            }

            return String(entry || '');
        })
        .map((entry) => entry.trim())
        .filter(Boolean);
};

export const normalizeTitleList = (value: unknown) =>
    normalizeStringList(value, 'artworkTitle');

export const normalizeJourneySteps = <T extends JourneyStepLike>(value: unknown): T[] => {
    if (!Array.isArray(value)) {
        return [];
    }

    return value
        .map((entry) => {
            if (!entry || typeof entry !== 'object') {
                return null;
            }

            const title = String((entry as JourneyStepLike).title || '').trim();
            const description = String((entry as JourneyStepLike).description || '').trim();

            if (!title || !description) {
                return null;
            }

            return {title, description} as T;
        })
        .filter((entry): entry is T => Boolean(entry));
};
