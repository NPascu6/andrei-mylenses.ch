import React, {useMemo, useState} from 'react';
import SelectedPhoto from './SelectedPhoto';

interface GalleryImage {
    src: string;
    fullSrc?: string;
    title: string;
    description?: string;
    location?: string;
    category?: string;
}

interface PhotoGalleryProps {
    images: GalleryImage[];
}

const categoryOrder = ['All', 'Instagram', 'Travel', 'Nature', 'Street', 'Wildlife', 'Portrait', 'Architecture'];

const PhotoGallery = ({images}: PhotoGalleryProps) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>('All');

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
            return images;
        }

        return images.filter((image) => image.category === activeCategory);
    }, [activeCategory, images]);

    return (
        <div className="space-y-8">
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

            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
                {filteredImages.map((image, idx) => (
                    <button
                        key={`${image.title}-${idx}`}
                        onClick={() => setSelectedIndex(idx)}
                        className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-[1.55rem] text-left shadow-xl shadow-black/5 transition-transform duration-500 hover:-translate-y-1"
                        style={{border: '1px solid var(--color-line)', backgroundColor: 'var(--color-surface)'}}
                    >
                        <div className="relative overflow-hidden">
                            <img
                                loading="lazy"
                                src={image.src}
                                alt={image.title}
                                className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent opacity-85"/>
                            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                                <p className="text-[10px] uppercase tracking-[0.28em] text-white/60">
                                    {image.category} {image.location ? ` / ${image.location}` : ''}
                                </p>
                                <h3 className="mt-2 font-display text-2xl">{image.title}</h3>
                                <p className="mt-2 line-clamp-3 text-sm leading-6 text-white/74">
                                    {image.description}
                                </p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            {selectedIndex !== null && filteredImages.length > 0 && (
                <SelectedPhoto
                    images={filteredImages}
                    index={selectedIndex}
                    setIndex={setSelectedIndex}
                    onClose={() => setSelectedIndex(null)}
                />
            )}
        </div>
    );
};

export default React.memo(PhotoGallery);
