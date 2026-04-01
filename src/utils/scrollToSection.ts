const getStickyHeaderOffset = () => {
    const header = document.querySelector('header');

    if (!(header instanceof HTMLElement)) {
        return 24;
    }

    return header.getBoundingClientRect().height + 16;
};

export const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);

    if (!element) {
        return;
    }

    const top = Math.max(
        0,
        window.scrollY + element.getBoundingClientRect().top - getStickyHeaderOffset()
    );

    window.scrollTo({
        top,
        behavior: 'smooth',
    });
};
