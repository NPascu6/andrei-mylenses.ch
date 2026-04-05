import React from 'react';
import {Link} from 'react-router-dom';
import ExpandableImage from '../common/ExpandableImage';
import {getPhotoObjectPosition} from '../../content/portfolioLibrary';
import {useI18n} from '../../i18n/I18nProvider';
import {surfaceBorderStyle, surfaceSoftStyle, surfaceStyle} from '../../styles/surfaces';
import type {LocalizedPortfolioPhoto} from '../../types/portfolio';
import {resolveImageAspectRatio} from '../../utils/imagePresentation';

type ArtworkTileVariant = 'feature' | 'compact';

interface ArtworkTileProps {
    photo: LocalizedPortfolioPhoto;
    className?: string;
    imageClassName?: string;
    priority?: boolean;
    badge?: string;
    variant?: ArtworkTileVariant;
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
    variant,
    showDescription = true,
    imageStyle,
    responsiveSizes = '(min-width: 1536px) 22vw, (min-width: 1280px) 28vw, (min-width: 768px) 45vw, 100vw',
}) => {
    const {copy} = useI18n();
    const objectPosition = getPhotoObjectPosition(photo);
    const effectiveVariant = variant || (showDescription ? 'feature' : 'compact');
    const isCompact = effectiveVariant === 'compact';
    const imageAspectRatio = resolveImageAspectRatio(
        photo.aspectRatio,
        photo.orientation,
        isCompact ? '4 / 5' : '5 / 4',
    );
    const badgeLabel = badge || (photo.printReady ? copy.artworkTile.collectorPrint : photo.category);
    const footerLabel = photo.printReady ? copy.artworkTile.collectorPrint : photo.category;
    const locationLabel = photo.location || photo.category;

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
                <div className={`pointer-events-none absolute inset-x-0 bottom-0 ${isCompact ? 'h-20' : 'h-24'} bg-linear-to-t from-black/30 via-black/8 to-transparent`}/>
                <div className="absolute left-4 top-4 rounded-full border border-white/12 bg-black/42 px-3 py-2 text-[10px] uppercase tracking-[0.24em] text-white/78 backdrop-blur-sm">
                    {badgeLabel}
                </div>
            </ExpandableImage>

            <div
                className={`flex flex-1 flex-col border-t ${isCompact ? 'gap-3 p-4 md:p-5' : 'gap-5 p-5 md:p-6 lg:p-7'}`}
                style={isCompact ? surfaceBorderStyle : surfaceSoftStyle}
            >
                <div className={isCompact ? 'space-y-2.5' : 'space-y-3.5'}>
                    <div className="flex flex-wrap items-center gap-2">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-nav-token">
                            {locationLabel}
                        </p>
                        {!isCompact ? (
                            <span
                                aria-hidden="true"
                                className="h-1 w-1 rounded-full"
                                style={{backgroundColor: 'var(--color-line)'}}
                            />
                        ) : null}
                        {!isCompact ? (
                            <p className="text-[10px] uppercase tracking-[0.22em] text-nav-token">
                                {footerLabel}
                            </p>
                        ) : null}
                    </div>
                    <h3
                        className={`font-display leading-[0.92] text-appText ${
                            isCompact
                                ? 'text-[clamp(1.75rem,3.2vw,2.3rem)]'
                                : 'max-w-[13ch] text-[clamp(2.2rem,4.4vw,3.4rem)]'
                        }`}
                    >
                        {photo.title}
                    </h3>
                    {showDescription ? (
                        <p className={`max-w-2xl text-sm text-muted-token ${isCompact ? 'line-clamp-2 leading-6' : 'line-clamp-3 leading-7'}`}>
                            {photo.description}
                        </p>
                    ) : null}
                </div>

                <div className="mt-auto flex items-end justify-between gap-3 pt-1">
                    {isCompact ? (
                        <p className="text-[10px] uppercase tracking-[0.22em] text-nav-token">
                            {footerLabel}
                        </p>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {photo.printReady ? (
                                <span className="theme-chip rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.18em]">
                                    {copy.artworkTile.collectorPrint}
                                </span>
                            ) : null}
                        </div>
                    )}
                    <p className="text-[10px] uppercase tracking-[0.24em] text-nav-token transition-colors duration-300 group-hover:text-appText">
                        {copy.artworkTile.viewArtwork}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default ArtworkTile;
