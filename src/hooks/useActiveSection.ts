import {useEffect, useState} from 'react';

interface SectionNavigationItem {
    sectionId: string;
}

export const useActiveSection = <T extends SectionNavigationItem>(items: readonly T[]) => {
    const [activeSection, setActiveSection] = useState(items[0]?.sectionId || '');

    useEffect(() => {
        setActiveSection(items[0]?.sectionId || '');
    }, [items]);

    useEffect(() => {
        if (typeof document === 'undefined' || typeof IntersectionObserver === 'undefined') {
            return;
        }

        const sections = items
            .map((item) => document.getElementById(item.sectionId))
            .filter((section): section is HTMLElement => Boolean(section));

        if (!sections.length) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((left, right) => right.intersectionRatio - left.intersectionRatio);

                if (visibleEntries[0]?.target?.id) {
                    setActiveSection(visibleEntries[0].target.id);
                }
            },
            {
                rootMargin: '-20% 0px -55% 0px',
                threshold: [0.15, 0.35, 0.55, 0.75],
            },
        );

        sections.forEach((section) => observer.observe(section));

        return () => {
            observer.disconnect();
        };
    }, [items]);

    return activeSection;
};
