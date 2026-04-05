import React from 'react';
import {getLayeredBackgroundPosition} from '../../utils/imagePresentation';

export type ImageStagePresentation = 'default' | 'balanced';

interface ImageStageProps {
    src: string;
    alt: string;
    srcSet?: string;
    sizes?: string;
    loading?: 'eager' | 'lazy';
    decoding?: 'async' | 'auto' | 'sync';
    presentation?: ImageStagePresentation;
    imgClassName?: string;
    imgStyle?: React.CSSProperties;
    backgroundClassName?: string;
    backgroundStyle?: React.CSSProperties;
    foregroundWrapperClassName?: string;
}

const ImageStage: React.FC<ImageStageProps> = ({
    src,
    alt,
    srcSet,
    sizes,
    loading = 'lazy',
    decoding = 'async',
    presentation = 'default',
    imgClassName = '',
    imgStyle,
    backgroundClassName = '',
    backgroundStyle,
    foregroundWrapperClassName = '',
}) => {
    if (presentation !== 'balanced') {
        return (
            <img
                loading={loading}
                decoding={decoding}
                src={src}
                srcSet={srcSet}
                sizes={sizes}
                alt={alt}
                className={imgClassName}
                style={imgStyle}
            />
        );
    }

    return (
        <>
            <div
                aria-hidden="true"
                className={`absolute inset-0 scale-[1.06] bg-cover bg-center opacity-40 blur-2xl saturate-[1.08] transition-transform duration-700 group-hover:scale-[1.1] ${backgroundClassName}`.trim()}
                style={{
                    backgroundImage: `url(${src})`,
                    backgroundPosition: getLayeredBackgroundPosition(imgStyle, backgroundStyle),
                    ...backgroundStyle,
                }}
            />
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_18%,rgba(0,0,0,0.18)_100%)]"
            />
            <div
                className={`relative z-10 flex h-full w-full items-center justify-center ${foregroundWrapperClassName}`.trim()}
            >
                <img
                    loading={loading}
                    decoding={decoding}
                    src={src}
                    srcSet={srcSet}
                    sizes={sizes}
                    alt={alt}
                    className={imgClassName}
                    style={imgStyle}
                />
            </div>
        </>
    );
};

export default ImageStage;
