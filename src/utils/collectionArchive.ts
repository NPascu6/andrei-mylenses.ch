import type {LocalizedPortfolioPhoto, PortfolioOrientation} from '../types/portfolio';

type CollectionArchiveTileVariant = 'feature' | 'compact';

export interface CollectionArchiveBlock {
    lead: LocalizedPortfolioPhoto;
    supporting: LocalizedPortfolioPhoto[];
    reverse: boolean;
}

const chunkSize = 5;

const isPortraitLike = (orientation?: PortfolioOrientation) =>
    orientation === 'portrait' || orientation === 'square';

export const buildCollectionArchiveBlocks = (photos: LocalizedPortfolioPhoto[]): CollectionArchiveBlock[] =>
    photos.reduce<CollectionArchiveBlock[]>((blocks, photo, index) => {
        if (index % chunkSize === 0) {
            blocks.push({
                lead: photo,
                supporting: [],
                reverse: blocks.length % 2 === 1,
            });

            return blocks;
        }

        const block = blocks[blocks.length - 1];
        block.supporting.push(photo);
        return blocks;
    }, []);

export const getCollectionArchiveTileImageClassName = (
    photo: Pick<LocalizedPortfolioPhoto, 'orientation'>,
    variant: CollectionArchiveTileVariant,
) => {
    if (variant === 'feature') {
        return isPortraitLike(photo.orientation)
            ? 'h-auto min-h-[22rem] max-h-[32rem] md:min-h-[24rem] md:max-h-[36rem]'
            : 'h-auto min-h-[18rem] max-h-[26rem] md:min-h-[20rem] md:max-h-[30rem]';
    }

    return isPortraitLike(photo.orientation)
        ? 'h-auto min-h-[16rem] max-h-[22rem] md:min-h-[17rem] md:max-h-[24rem]'
        : 'h-auto min-h-[14rem] max-h-[18rem] md:min-h-[15rem] md:max-h-[19.5rem]';
};

export const getCollectionArchiveResponsiveSizes = (variant: CollectionArchiveTileVariant) => (
    variant === 'feature'
        ? '(min-width: 1536px) 39vw, (min-width: 1280px) 41vw, (min-width: 768px) 92vw, 100vw'
        : '(min-width: 1536px) 19vw, (min-width: 1280px) 22vw, (min-width: 640px) 44vw, 100vw'
);
