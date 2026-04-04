import React from 'react';
import ExpandIcon from '../../assets/icons/ExpandIcon';
import useFullScreenToggle from '../../hooks/useToggleFullscreen';
import FullScreenImage, {type FullScreenOrderDetails} from './FullScreenImage';

interface ExpandableImageProps {
    src: string;
    alt: string;
    modalSrc?: string;
    srcSet?: string;
    sizes?: string;
    loading?: 'eager' | 'lazy';
    decoding?: 'async' | 'auto' | 'sync';
    containerClassName?: string;
    containerStyle?: React.CSSProperties;
    imgClassName?: string;
    imgStyle?: React.CSSProperties;
    buttonClassName?: string;
    buttonLabel?: string;
    modalHandlePrevClick?: () => void;
    modalHandleNextClick?: () => void;
    modalOnTouchStart?: React.TouchEventHandler<HTMLDivElement>;
    modalOnTouchEnd?: React.TouchEventHandler<HTMLDivElement>;
    orderDetails?: FullScreenOrderDetails;
    children?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onTouchStart?: React.TouchEventHandler<HTMLDivElement>;
    onTouchEnd?: React.TouchEventHandler<HTMLDivElement>;
}

const ExpandableImage: React.FC<ExpandableImageProps> = ({
    src,
    alt,
    modalSrc,
    srcSet,
    sizes,
    loading = 'lazy',
    decoding = 'async',
    containerClassName = '',
    containerStyle,
    imgClassName = '',
    imgStyle,
    buttonClassName = '',
    buttonLabel = 'Expand image',
    modalHandlePrevClick,
    modalHandleNextClick,
    modalOnTouchStart,
    modalOnTouchEnd,
    orderDetails,
    children,
    onClick,
    onTouchStart,
    onTouchEnd,
}) => {
    const {isFullScreen, openFullScreen, closeFullScreen} = useFullScreenToggle();

    const handleOpen = (event: React.MouseEvent | React.KeyboardEvent) => {
        event.preventDefault();
        event.stopPropagation();
        openFullScreen();
    };

    return (
        <div
            className={`relative ${containerClassName}`.trim()}
            style={containerStyle}
            onClick={onClick}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
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
            {children}
            <span
                role="button"
                tabIndex={0}
                title={buttonLabel}
                aria-label={buttonLabel}
                className={`image-expand-button absolute right-3 top-3 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full md:right-4 md:top-4 ${buttonClassName}`.trim()}
                onClick={handleOpen}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        handleOpen(event);
                    }
                }}
            >
                <ExpandIcon className="h-3.5 w-3.5"/>
            </span>
            {isFullScreen ? (
                <FullScreenImage
                    handlePrevClick={modalHandlePrevClick}
                    handleNextClick={modalHandleNextClick}
                    toggleFullScreen={closeFullScreen}
                    selectedImage={modalSrc || src}
                    selectedImageAlt={alt}
                    orderDetails={orderDetails}
                    onTouchStart={modalOnTouchStart}
                    onTouchEnd={modalOnTouchEnd}
                />
            ) : null}
        </div>
    );
};

export default ExpandableImage;
