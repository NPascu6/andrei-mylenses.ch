const photoThumbModules = import.meta.glob('../assets/photos/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
    query: '?w=480&format=webp&quality=68&effort=4',
}) as Record<string, string>;

const photoMediumModules = import.meta.glob('../assets/photos/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
    query: '?w=768&format=webp&quality=72&effort=4',
}) as Record<string, string>;

const photoDisplayModules = import.meta.glob('../assets/photos/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
    query: '?w=1280&format=webp&quality=74&effort=4',
}) as Record<string, string>;

const photoFullModules = import.meta.glob('../assets/photos/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
    query: '?w=1920&format=webp&quality=80&effort=4',
}) as Record<string, string>;

const canvasPreviewModules = import.meta.glob('../assets/canvas/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
    query: '?w=1280&format=webp&quality=74&effort=4',
}) as Record<string, string>;

const canvasFullModules = import.meta.glob('../assets/canvas/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
    query: '?w=1920&format=webp&quality=80&effort=4',
}) as Record<string, string>;

export interface ImportedImageAsset {
    fileName: string;
    baseName: string;
    src: string;
    mediumSrc: string;
    fullSrc: string;
    srcSet: string;
}

const getFileName = (path: string) => path.split('/').pop() || '';

const getBaseName = (path: string) =>
    getFileName(path).replace(/\.(jpg|jpeg|png|webp)$/i, '');

const buildSrcSet = (entries: Array<{src: string; width: number}>) => {
    const uniqueEntries = entries.filter(
        (entry, index, array) => array.findIndex((candidate) => candidate.src === entry.src) === index
    );

    return uniqueEntries
        .map((entry) => `${entry.src} ${entry.width}w`)
        .join(', ');
};

const buildImageAssets = (
    thumbSources: Record<string, string>,
    mediumSources: Record<string, string>,
    displaySources: Record<string, string>,
    fullSources: Record<string, string>,
): ImportedImageAsset[] =>
    Object.keys(thumbSources)
        .sort((left, right) => getBaseName(left).localeCompare(getBaseName(right)))
        .map((path) => {
            const src = thumbSources[path];
            const mediumSrc = mediumSources[path] || src;
            const displaySrc = displaySources[path] || mediumSrc;
            const fullSrc = fullSources[path] || displaySrc;

            return {
                fileName: getFileName(path),
                baseName: getBaseName(path),
                src,
                mediumSrc,
                fullSrc,
                srcSet: buildSrcSet([
                    {src, width: 480},
                    {src: mediumSrc, width: 768},
                    {src: displaySrc, width: 1280},
                ]),
            };
        });

export const images = buildImageAssets(
    photoThumbModules,
    photoMediumModules,
    photoDisplayModules,
    photoFullModules,
);

export const canvasImages = Object.keys(canvasPreviewModules)
    .sort((left, right) => getBaseName(left).localeCompare(getBaseName(right)))
    .map((path) => ({
        fileName: getFileName(path),
        title: getBaseName(path),
        src: canvasPreviewModules[path],
        fullSrc: canvasFullModules[path] || canvasPreviewModules[path],
    }));
