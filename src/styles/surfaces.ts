export const surfaceBorderStyle = {
    borderColor: 'var(--color-line)',
} as const;

export const surfaceStyle = {
    borderColor: 'var(--color-line)',
    backgroundColor: 'var(--color-surface)',
} as const;

export const surfaceSoftStyle = {
    borderColor: 'var(--color-line)',
    backgroundColor: 'var(--color-surface-soft)',
} as const;

export const surfaceStrongStyle = {
    borderColor: 'var(--color-line)',
    backgroundColor: 'var(--color-surface-strong)',
} as const;

export const surfaceDividerStyle = {
    backgroundColor: 'var(--color-line)',
} as const;

export const borderedSurfaceStyle = {
    border: '1px solid var(--color-line)',
} as const;

export const getSelectableSurfaceStyle = (selected: boolean) => (
    selected ? surfaceStrongStyle : surfaceStyle
);
