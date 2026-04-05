import React from 'react';
import {Link} from 'react-router-dom';
import ExpandableImage from '../common/ExpandableImage';
import {getPhotoObjectPosition} from '../../content/portfolioLibrary';
import {useI18n} from '../../i18n/I18nProvider';
import {surfaceStyle} from '../../styles/surfaces';
import type {LocalizedPortfolioPhoto} from '../../types/portfolio';
import {resolveImageAspectRatio} from '../../utils/imagePresentation';

interface ArtworkTileProps {
    photo: LocalizedPortfolioPhoto;
    className?: string;
    imageClassName?: string;
    priority?: boolean;
    badge?: string;
    showDescription?: boolean;
    imageStyle?: React.CSSProperties;
    responsiveSizes?: string;
}

const ArtworkTile: React.FC<ArtworkTileProps> = ({
    photo,
    className = '',
    imageClassName = 'h-96',
    priority = false,
    badge,
    showDescription = true,
    imageStyle,
    responsiveSizes = '(min-width: 1536px) 22vw, (min-width: 1280px) 28vw, (min-width: 768px) 45vw, 100vw',
}) => {
    const {copy} = useI18n();
    const objectPosition = getPhotoObjectPosition(photo);
    const imageAspectRatio = resolveImageAspectRatio(
        photo.aspectRatio,
        photo.orientation,
        showDescription ? '5 / 4' : '4 / 5',
    );
    const badgeLabel = badge || (photo.printReady ? copy.artworkTile.collectorPrint : photo.category);
    const footerLabel = photo.printReady ? copy.artworkTile.collectorPrint : photo.category;

    return (
        <Link
            to={`/artwork/${photo.slug}`}
            className={`group relative flex w-full self-start flex-col overflow-hidden rounded-[1.75rem] border shadow-[0_20px_50px_rgba(0,0,0,0.18)] transition-transform duration-500 hover:-translate-y-0.5 ${className}`}
            style={surfaceStyle}
        >
            <ExpandableImage
                loading={priority ? 'eager' : 'lazy'}
                decoding="async"
                src={photo.src}
                modalSrc={photo.fullSrc}
                srcSet={photo.srcSet}
                sizes={responsiveSizes}
                alt={photo.title}
                containerClassName={`w-full overflow-hidden bg-black/5 ${imageClassName}`.trim()}
                containerStyle={{aspectRatio: imageAspectRatio}}
                imgClassName="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                imgStyle={{objectPosition, ...imageStyle}}
                orderDetails={{
                    title: photo.title,
                    category: photo.category,
                    location: photo.location,
                    notes: photo.description,
                    permalink: photo.permalink,
                }}
            >
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/30 via-black/8 to-transparent"/>
                <div className="absolute left-4 top-4 rounded-full border border-white/12 bg-black/42 px-3 py-2 text-[10px] uppercase tracking-[0.24em] text-white/78 backdrop-blur-sm">
                    {badgeLabel}
                </div>
            </ExpandableImage>

            <div className={`flex flex-1 flex-col ${showDescription ? 'gap-4 p-5 md:p-6' : 'gap-3 p-4 md:p-5'}`}>
                <div className="space-y-3">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-nav-token">
                        {photo.location || photo.category}
                    </p>
                    <h3
                        className={`font-display leading-[0.92] text-appText ${
                            showDescription
                                ? 'text-[clamp(2.15rem,4.8vw,3.35rem)]'
                                : 'text-[clamp(1.95rem,3.6vw,2.55rem)]'
                        }`}
                    >
                        {photo.title}
                    </h3>
                    {showDescription ? (
                        <p className="line-clamp-3 max-w-2xl text-sm leading-7 text-muted-token">
                            {photo.description}
                        </p>
                    ) : null}
                </div>

                <div className="mt-auto flex items-end justify-between gap-3 pt-1">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-nav-token">
                        {footerLabel}
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-nav-token transition-colors duration-300 group-hover:text-appText">
                        {copy.artworkTile.viewArtwork}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default ArtworkTile;
