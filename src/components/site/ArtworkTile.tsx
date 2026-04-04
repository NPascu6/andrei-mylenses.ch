import React from 'react';
import {Link} from 'react-router-dom';
import {getPhotoObjectPosition} from '../../content/portfolioLibrary';
import type {PortfolioPhoto} from '../../types/portfolio';

interface ArtworkTileProps {
    photo: PortfolioPhoto;
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
    imageClassName = 'h-[24rem]',
    priority = false,
    badge,
    showDescription = true,
    imageStyle,
    responsiveSizes = '(min-width: 1536px) 22vw, (min-width: 1280px) 28vw, (min-width: 768px) 45vw, 100vw',
}) => (
    <Link
        to={`/artwork/${photo.slug}`}
        className={`group relative block overflow-hidden rounded-[1.75rem] bg-black shadow-2xl shadow-black/20 transition-transform duration-500 hover:-translate-y-0.5 ${className}`}
        style={{border: '1px solid var(--color-line)'}}
    >
        <img
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            src={photo.src}
            srcSet={photo.srcSet}
            sizes={responsiveSizes}
            alt={photo.title}
            className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${imageClassName}`}
            style={{objectPosition: getPhotoObjectPosition(photo), ...imageStyle}}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/20 to-transparent"/>
        <div className="absolute left-4 top-4 rounded-full border border-white/12 bg-black/42 px-3 py-2 text-[10px] uppercase tracking-[0.24em] text-white/78 backdrop-blur-sm">
            {badge || (photo.printReady ? 'Collector print' : photo.category)}
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/58">
                {photo.location || photo.category}
            </p>
            <h3 className="mt-2 font-display text-[2rem] leading-none md:text-[2.25rem]">
                {photo.title}
            </h3>
            {showDescription ? (
                <p className="mt-3 line-clamp-3 max-w-2xl text-sm leading-6 text-white/72">
                    {photo.description}
                </p>
            ) : null}
            <p className="mt-4 text-[10px] uppercase tracking-[0.24em] text-white/56 transition-colors duration-300 group-hover:text-white/82">
                View artwork
            </p>
        </div>
    </Link>
);

export default ArtworkTile;
