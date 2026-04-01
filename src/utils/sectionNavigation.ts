export const sectionNavigationItems = [
    {label: 'Top', sectionId: 'top'},
    {label: 'Portfolio', sectionId: 'portfolio'},
    {label: 'Story', sectionId: 'story'},
    {label: 'Prints', sectionId: 'prints'},
    {label: 'Contact', sectionId: 'contact'},
] as const;

export type SectionNavigationId = typeof sectionNavigationItems[number]['sectionId'];
