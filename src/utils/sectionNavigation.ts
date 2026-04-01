export const sectionNavigationItems = [
    {label: 'Top', sectionId: 'top'},
    {label: 'Story', sectionId: 'story'},
    {label: 'Portfolio', sectionId: 'portfolio'},
    {label: 'Prints', sectionId: 'prints'},
    {label: 'Contact', sectionId: 'contact'},
] as const;

export type SectionNavigationId = typeof sectionNavigationItems[number]['sectionId'];
