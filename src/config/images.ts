const photoThumbModules = import.meta.glob('../assets/photos/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
    query: '?w=720&format=webp',
}) as Record<string, string>;

const photoDisplayModules = import.meta.glob('../assets/photos/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
    query: '?w=1440&format=webp',
}) as Record<string, string>;

const canvasDisplayModules = import.meta.glob('../assets/canvas/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
    query: '?w=1600&format=webp',
}) as Record<string, string>;

export interface ImportedImageAsset {
    fileName: string;
    baseName: string;
    src: string;
    fullSrc: string;
}

const getFileName = (path: string) => path.split('/').pop() || '';

const getBaseName = (path: string) =>
    getFileName(path).replace(/\.(jpg|jpeg|png|webp)$/i, '');

const buildImageAssets = (
    thumbSources: Record<string, string>,
    displaySources: Record<string, string>
): ImportedImageAsset[] =>
    Object.keys(thumbSources)
        .sort((left, right) => getBaseName(left).localeCompare(getBaseName(right)))
        .map((path) => ({
            fileName: getFileName(path),
            baseName: getBaseName(path),
            src: thumbSources[path],
            fullSrc: displaySources[path] || thumbSources[path],
        }));

export const images = buildImageAssets(photoThumbModules, photoDisplayModules);

export const canvaseImages = Object.keys(canvasDisplayModules)
    .sort((left, right) => getBaseName(left).localeCompare(getBaseName(right)))
    .map((path) => ({
        fileName: getFileName(path),
        title: getBaseName(path),
        src: canvasDisplayModules[path],
    }));
