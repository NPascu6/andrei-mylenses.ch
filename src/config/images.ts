const photoThumbModules = import.meta.glob('../assets/photos/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
    query: '?w=640&format=webp',
}) as Record<string, string>;

const photoMediumModules = import.meta.glob('../assets/photos/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
    query: '?w=960&format=webp',
}) as Record<string, string>;

const photoDisplayModules = import.meta.glob('../assets/photos/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
    query: '?w=1600&format=webp',
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
    displaySources: Record<string, string>
): ImportedImageAsset[] =>
    Object.keys(thumbSources)
        .sort((left, right) => getBaseName(left).localeCompare(getBaseName(right)))
        .map((path) => {
            const src = thumbSources[path];
            const mediumSrc = mediumSources[path] || src;
            const fullSrc = displaySources[path] || mediumSrc;

            return {
                fileName: getFileName(path),
                baseName: getBaseName(path),
                src,
                mediumSrc,
                fullSrc,
                srcSet: buildSrcSet([
                    {src, width: 640},
                    {src: mediumSrc, width: 960},
                    {src: fullSrc, width: 1600},
                ]),
            };
        });

export const images = buildImageAssets(photoThumbModules, photoMediumModules, photoDisplayModules);

export const canvaseImages = Object.keys(canvasDisplayModules)
    .sort((left, right) => getBaseName(left).localeCompare(getBaseName(right)))
    .map((path) => ({
        fileName: getFileName(path),
        title: getBaseName(path),
        src: canvasDisplayModules[path],
    }));
