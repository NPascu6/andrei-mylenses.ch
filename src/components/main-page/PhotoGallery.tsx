import React, {useEffect, useMemo, useState} from 'react';
import SelectedPhoto from './SelectedPhoto';

interface GalleryImage {
    src: string;
    fullSrc?: string;
    title: string;
    description?: string;
    location?: string;
    category?: string;
    featured?: boolean;
    permalink?: string;
    takenAt?: string;
}

interface PhotoGalleryProps {
    images: GalleryImage[];
}

const categoryOrder = ['All', 'Wall-ready', 'Instagram', 'Travel', 'Nature', 'Street', 'Wildlife', 'Portrait', 'Architecture'];
const INITIAL_VISIBLE_COUNT = 12;
const LOAD_MORE_COUNT = 12;

const PhotoGallery = ({images}: PhotoGalleryProps) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [visibleCount, setVisibleCount] = useState<number>(INITIAL_VISIBLE_COUNT);

    const categories = useMemo(() => {
        const discovered = Array.from(
            new Set(images.map((image) => image.category).filter((category): category is string => Boolean(category)))
        );
        const ordered = categoryOrder.filter((category) => category === 'All' || discovered.includes(category));
        const extras = discovered.filter((category) => !categoryOrder.includes(category));
        return [...ordered, ...extras];
    }, [images]);

    const filteredImages = useMemo(() => {
        if (activeCategory === 'All') {
            return [...images].sort((left, right) => {
                if (Boolean(left.featured) !== Boolean(right.featured)) {
                    return left.featured ? -1 : 1;
                }

                return left.title.localeCompare(right.title);
            });
        }

        if (activeCategory === 'Wall-ready') {
            return images.filter((image) => image.featured);
        }

        return images.filter((image) => image.category === activeCategory);
    }, [activeCategory, images]);

    const featuredCount = useMemo(
        () => images.filter((image) => image.featured).length,
        [images]
    );

    useEffect(() => {
        setVisibleCount(INITIAL_VISIBLE_COUNT);
        setSelectedIndex(null);
    }, [activeCategory]);

    const visibleImages = useMemo(
        () => filteredImages.slice(0, visibleCount),
        [filteredImages, visibleCount]
    );

    const hasMoreImages = visibleImages.length < filteredImages.length;
    const nextBatchCount = Math.min(filteredImages.length - visibleImages.length, LOAD_MORE_COUNT);

    return (
        <div className="space-y-8">
            <div className="surface-panel-soft flex flex-col gap-3 rounded-[1.75rem] p-5 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl space-y-3">
                    <p className="eyebrow-text text-sm uppercase">Collector curation</p>
                    <h3 className="font-display text-3xl text-appText md:text-[2.5rem]">
                        Explore the full archive or move directly into the images with the strongest wall presence.
                    </h3>
                    <p className="text-base leading-7 text-muted-token">
                        The <span className="text-appText">Wall-ready</span> view highlights photographs that translate especially well into Giclee canvas, where scale, atmosphere, and tonal depth can fully open up.
                    </p>
                </div>
                <div className="rounded-[1.25rem] border px-4 py-3 text-sm leading-6 text-muted-token" style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}>
                    <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Canvas-ready selection</p>
                    <p className="mt-2 text-appText">{featuredCount} works currently highlighted for collectors and print inquiries.</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-3">
                {categories.map((category) => {
                    const active = activeCategory === category;

                    return (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.24em] transition-all duration-300 ${
                                active ? 'theme-chip theme-chip-active text-appText' : 'theme-chip'
                            }`}
                        >
                            {category}
                        </button>
                    );
                })}
            </div>

            <div className="surface-panel relative overflow-hidden rounded-[2rem] px-4 py-5 md:px-5 md:py-6">
                <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div className="space-y-2">
                        <p className="eyebrow-text text-[11px] uppercase">Archive flow</p>
                        <h4 className="font-display text-2xl text-appText md:text-[2.2rem]">
                            A quieter way to move through the collection.
                        </h4>
                    </div>
                    <p className="text-sm leading-6 text-muted-token">
                        Showing <span className="text-appText">{visibleImages.length}</span> of{' '}
                        <span className="text-appText">{filteredImages.length}</span> works in this view.
                    </p>
                </div>

                <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5">
                    {visibleImages.map((image, idx) => (
                        <button
                            key={`${image.title}-${idx}`}
                            onClick={() => setSelectedIndex(idx)}
                            className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-[1.4rem] text-left shadow-xl shadow-black/5 transition-transform duration-500 hover:-translate-y-1"
                            style={{border: '1px solid var(--color-line)', backgroundColor: 'var(--color-surface)'}}
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    loading="lazy"
                                    src={image.src}
                                    alt={image.title}
                                    className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90"/>
                                {image.featured && (
                                    <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/45 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-white/85 backdrop-blur-sm">
                                        Best for canvas
                                    </div>
                                )}
                                <div className="absolute inset-x-0 bottom-0 p-4 text-white md:p-5">
                                    <p className="text-[10px] uppercase tracking-[0.28em] text-white/60">
                                        {image.category} {image.location ? ` / ${image.location}` : ''}
                                    </p>
                                    <h3 className="mt-2 font-display text-[1.65rem] leading-none md:text-[1.8rem]">
                                        {image.title}
                                    </h3>
                                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/74">
                                        {image.description}
                                    </p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                {hasMoreImages && (
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--color-appBackground)] via-[color-mix(in_srgb,var(--color-appBackground)_76%,transparent)] to-transparent" />
                )}
            </div>

            {hasMoreImages && (
                <div className="flex flex-col items-center gap-4">
                    <div
                        className="pointer-events-none h-14 w-full max-w-4xl rounded-full blur-3xl"
                        style={{background: 'color-mix(in srgb, var(--color-accent) 16%, transparent)'}}
                    />
                    <button
                        type="button"
                        onClick={() => setVisibleCount((current) => current + LOAD_MORE_COUNT)}
                        className="theme-action inline-flex items-center justify-center rounded-full px-6 py-4 text-sm uppercase tracking-[0.24em]"
                    >
                        Show {nextBatchCount} more
                    </button>
                    <p className="text-sm text-muted-token">
                        {filteredImages.length - visibleImages.length - nextBatchCount > 0
                            ? `${filteredImages.length - visibleImages.length - nextBatchCount} more remain after this batch.`
                            : 'This next reveal completes the current selection.'}
                    </p>
                </div>
            )}

            {selectedIndex !== null && visibleImages.length > 0 && (
                <SelectedPhoto
                    images={visibleImages}
                    index={selectedIndex}
                    setIndex={setSelectedIndex}
                    onClose={() => setSelectedIndex(null)}
                />
            )}
        </div>
    );
};

export default React.memo(PhotoGallery);
