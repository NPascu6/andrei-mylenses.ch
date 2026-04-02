import React, {useEffect, useRef} from "react";
import {scrollToSection} from "../../utils/scrollToSection";
import {getPrintRecommendation} from "../../utils/printRecommendations";

const ChevronLeft = React.lazy(() => import('../../assets/icons/ChevronLeft'));
const ChevronRight = React.lazy(() => import('../../assets/icons/ChevronRight'));
const CloseIcon = React.lazy(() => import('../../assets/icons/CloseIcon'));

interface GalleryImage {
    src: string;
    fullSrc?: string;
    title: string;
    slug?: string;
    description?: string;
    location?: string;
    category?: string;
    featured?: boolean;
    permalink?: string;
    takenAt?: string;
}

interface SelectedPhotoProps {
    images: GalleryImage[];
    index: number;
    setIndex: React.Dispatch<React.SetStateAction<number | null>>;
    onClose: () => void;
}

const SelectedPhoto = ({images, index, setIndex, onClose}: SelectedPhotoProps) => {
    const touchStartX = useRef<number | null>(null);
    const selectedImage = images[index];

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }

            if (event.key === 'ArrowLeft') {
                setIndex((index - 1 + images.length) % images.length);
            }

            if (event.key === 'ArrowRight') {
                setIndex((index + 1) % images.length);
            }
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKeyDown);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [images.length, index, onClose, setIndex]);

    if (!selectedImage) {
        return null;
    }

    const goPrev = () => setIndex((index - 1 + images.length) % images.length);
    const goNext = () => setIndex((index + 1) % images.length);
    const recommendation = getPrintRecommendation({
        title: selectedImage.title,
        category: selectedImage.category,
        location: selectedImage.location,
    });
    const handleScrollToPrints = () => {
        onClose();
        window.setTimeout(() => scrollToSection('prints'), 20);
    };

    const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
        touchStartX.current = event.touches[0].clientX;
    };

    const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
        if (touchStartX.current === null) {
            return;
        }

        const delta = event.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;

        if (delta > 40) {
            goPrev();
        } else if (delta < -40) {
            goNext();
        }
    };

    return (
        <div
            className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-black/88 px-4 py-4 backdrop-blur-md md:px-5 md:py-6 lg:items-center"
            onClick={onClose}
        >
            <div
                className="relative grid w-full max-w-7xl gap-4 overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0f13] p-3 shadow-2xl shadow-black/60 max-lg:min-h-[min(100%,calc(100vh-2rem))] lg:h-[min(92vh,980px)] lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)] lg:p-5"
                onClick={(event) => event.stopPropagation()}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <button
                    onClick={onClose}
                    className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white transition-colors hover:border-white/30 hover:bg-black/60"
                    aria-label="Close image"
                >
                    <CloseIcon/>
                </button>

                <div className="relative flex min-h-[44vh] items-center justify-center overflow-hidden rounded-[1.5rem] bg-white/5 lg:min-h-0">
                    <img
                        loading="lazy"
                        src={selectedImage.fullSrc || selectedImage.src}
                        alt={selectedImage.title}
                        className="max-h-[60vh] w-full rounded-[1.5rem] object-contain lg:h-full lg:max-h-[calc(92vh-3rem)]"
                    />

                    <button
                        onClick={goPrev}
                        className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white transition-colors hover:border-white/30 hover:bg-black/65"
                        aria-label="Previous image"
                    >
                        <ChevronLeft/>
                    </button>

                    <button
                        onClick={goNext}
                        className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white transition-colors hover:border-white/30 hover:bg-black/65"
                        aria-label="Next image"
                    >
                        <ChevronRight/>
                    </button>
                </div>

                <aside className="flex min-h-0 flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-white md:p-6 lg:h-full">
                    <div className="min-h-0 flex-1 space-y-5 overflow-y-auto pr-1 pb-1 lg:pr-2">
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-white/72">
                                {selectedImage.category || 'Portfolio'} / {String(index + 1).padStart(2, '0')}
                            </p>
                            <h2 className="mt-3 font-display text-3xl md:text-4xl">
                                {selectedImage.title}
                            </h2>
                            {selectedImage.featured && (
                                <div className="mt-3 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-white/74">
                                    Curated as a wall-ready canvas candidate
                                </div>
                            )}
                            {selectedImage.location && (
                                <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/55">
                                    {selectedImage.location}
                                </p>
                            )}
                        </div>

                        <p className="text-base leading-7 text-white/78">
                            {selectedImage.description || 'Selected portfolio work.'}
                        </p>
                    </div>

                    <div className="mt-6 space-y-4 border-t border-white/10 pt-5">
                        <div className="grid grid-cols-2 gap-3 text-sm text-white/72">
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <p className="uppercase tracking-[0.18em] text-white/45">Best Format</p>
                                <p className="mt-2 text-lg text-white">{recommendation.bestFit}</p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <p className="uppercase tracking-[0.18em] text-white/45">Recommended Size</p>
                                <p className="mt-2 text-lg text-white">{recommendation.recommendedSize}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm text-white/72">
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <p className="uppercase tracking-[0.18em] text-white/45">Collector Fit</p>
                                <p className="mt-2 text-white">
                                    {selectedImage.featured ? 'High wall presence' : 'Available by inquiry'}
                                </p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <p className="uppercase tracking-[0.18em] text-white/45">Inquiry Style</p>
                                <p className="mt-2 text-white">Personal sizing and room guidance</p>
                            </div>
                        </div>

                        <div className="rounded-[1.35rem] border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/78">
                            <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">Ideal Setting</p>
                            <p className="mt-2 text-white/92">{recommendation.idealSetting}</p>
                            <p className="mt-3">{recommendation.collectorNote}</p>
                        </div>

                        <div className="grid gap-3">
                            <a
                                href={`mailto:andrei.pascu86@yahoo.com?subject=${encodeURIComponent(`Print Inquiry - ${selectedImage.title}`)}`}
                                className="theme-action inline-flex w-full items-center justify-center rounded-full px-5 py-4 text-sm uppercase tracking-[0.22em]"
                            >
                                Request this canvas
                            </a>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                <button
                                    type="button"
                                    onClick={handleScrollToPrints}
                                    className="theme-action-secondary inline-flex items-center justify-center rounded-full px-4 py-3 text-xs uppercase tracking-[0.2em]"
                                >
                                    Print options
                                </button>
                                {selectedImage.permalink ? (
                                    <a
                                        href={selectedImage.permalink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="theme-action-secondary inline-flex items-center justify-center rounded-full px-4 py-3 text-xs uppercase tracking-[0.2em]"
                                    >
                                        Original post
                                    </a>
                                ) : (
                                    <a
                                        href="mailto:andrei.pascu86@yahoo.com?subject=Artwork%20Availability"
                                        className="theme-action-secondary inline-flex items-center justify-center rounded-full px-4 py-3 text-xs uppercase tracking-[0.2em]"
                                    >
                                        Availability
                                    </a>
                                )}
                                <a
                                    href="https://www.instagram.com/andrei_mylenses/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="theme-action-secondary inline-flex items-center justify-center rounded-full px-4 py-3 text-xs uppercase tracking-[0.2em]"
                                >
                                    Instagram
                                </a>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default SelectedPhoto;
