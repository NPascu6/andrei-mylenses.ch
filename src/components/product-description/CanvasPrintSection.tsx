import React, {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import GallerySection from "./GallerySection";
import SelectedPhoto from "../main-page/SelectedPhoto";

interface CanvasPrintSectionProps {
    loadedCanvasImages: Array<{ src: string; title?: string; fullSrc?: string }>;
}

const CanvasPrintSection: React.FC<CanvasPrintSectionProps> = ({loadedCanvasImages}) => {
    const photos = useSelector((state: RootState) => state.app.photos);
    const [selectedCanvasIndex, setSelectedCanvasIndex] = useState<number | null>(null);
    const featuredTitles = photos.slice(0, 4).map((photo) => photo.title).join(', ');
    const canvasHero = loadedCanvasImages[0]?.src || photos[0]?.src;

    return (
        <div className="mx-auto max-w-7xl space-y-7 px-4 py-4 md:px-6 md:py-6">
            <section id="portfolio" className="scroll-mt-24 space-y-5 md:scroll-mt-28">
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-2xl space-y-4">
                        <p className="eyebrow-text text-sm uppercase">Portfolio showcase</p>
                        <h2 className="font-display text-4xl text-appText md:text-5xl">
                            A slower, more tactile way to experience the collection.
                        </h2>
                        <p className="text-base leading-8" style={{color: 'var(--color-muted)'}}>
                            The portfolio blends travel, street, wildlife, and landscape work into one continuous visual journey. Each image is meant to feel lived-in, atmospheric, and deeply observed.
                        </p>
                    </div>
                    <div className="surface-panel-soft rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-muted-token">
                        Featured selection: {featuredTitles}
                    </div>
                </div>

                <GallerySection/>
            </section>

            <section
                id="prints"
                className="surface-panel scroll-mt-24 grid gap-5 overflow-hidden rounded-[2rem] p-4 md:scroll-mt-28 lg:grid-cols-[0.95fr_1.05fr] lg:p-6"
            >
                <button
                    type="button"
                    onClick={() => loadedCanvasImages.length > 0 && setSelectedCanvasIndex(0)}
                    className="group relative min-h-[420px] overflow-hidden rounded-[1.75rem] bg-black text-left"
                >
                    {canvasHero && (
                        <>
                            <img
                                loading="lazy"
                                src={canvasHero}
                                alt="Canvas print preview"
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent"/>
                        </>
                    )}

                    <div className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/35 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-white/80 backdrop-blur-sm transition-colors duration-300 group-hover:bg-black/55">
                        Maximize
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                        <p className="text-xs uppercase tracking-[0.3em] text-white/55">Fine art canvas prints</p>
                        <h3 className="mt-3 font-display text-4xl">Bring the work into your space.</h3>
                        <p className="mt-4 max-w-xl text-base leading-7 text-white/78">
                            Museum-quality Giclee canvas prints designed to preserve texture, atmosphere, and the emotional depth of each image.
                        </p>
                    </div>
                </button>

                <div className="grid gap-3">
                    <div className="grid gap-4 md:grid-cols-3">
                        <article className="surface-panel-soft rounded-[1.5rem] p-4">
                            <p className="text-nav-token text-xs uppercase tracking-[0.22em]">Format</p>
                            <h4 className="mt-3 font-display text-2xl text-appText">Giclee canvas</h4>
                            <p className="text-muted-token mt-3 text-sm leading-6">
                                Rich tonal depth, archival quality, and a gallery-ready finish.
                            </p>
                        </article>

                        <article className="surface-panel-soft rounded-[1.5rem] p-4">
                            <p className="text-nav-token text-xs uppercase tracking-[0.22em]">Sizes</p>
                            <h4 className="mt-3 font-display text-2xl text-appText">50x30 / 90x60</h4>
                            <p className="text-muted-token mt-3 text-sm leading-6">
                                Curated size options for homes, offices, and statement walls.
                            </p>
                        </article>

                        <article className="surface-panel-soft rounded-[1.5rem] p-4">
                            <p className="text-nav-token text-xs uppercase tracking-[0.22em]">Pricing</p>
                            <h4 className="mt-3 font-display text-2xl text-appText">40 CHF+</h4>
                            <p className="text-muted-token mt-3 text-sm leading-6">
                                Pricing varies by size and can be tailored for special requests.
                            </p>
                        </article>
                    </div>

                    <div className="surface-panel-soft rounded-[1.75rem] p-5 md:p-6">
                        <p className="eyebrow-text text-sm uppercase">What you can expect</p>
                        <div className="mt-5 grid gap-4 md:grid-cols-2">
                            <p className="text-muted-token text-base leading-8">
                                Indulge in timeless elegance with premium fine art prints crafted to transform your space into a captivating gallery of atmosphere and memory.
                            </p>
                            <p className="text-muted-token text-base leading-8">
                                Whether you are an experienced collector or simply looking for one meaningful piece, each print is prepared to preserve detail, emotion, and presence.
                            </p>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <a
                                href="mailto:andrei.pascu86@yahoo.com?subject=Canvas%20Print%20Inquiry"
                                className="theme-action inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.2em]"
                            >
                                Ask about canvas prints
                            </a>
                            <a
                                href="https://www.instagram.com/andrei_mylenses/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="theme-action-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.2em]"
                            >
                                View latest on Instagram
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {selectedCanvasIndex !== null && loadedCanvasImages.length > 0 && (
                <SelectedPhoto
                    images={loadedCanvasImages.map((image, index) => ({
                        src: image.src,
                        fullSrc: image.fullSrc || image.src,
                        title: image.title || `Canvas Preview ${index + 1}`,
                        description: 'Canvas print preview.',
                        category: 'Canvas',
                        location: 'Print collection',
                    }))}
                    index={selectedCanvasIndex}
                    setIndex={setSelectedCanvasIndex}
                    onClose={() => setSelectedCanvasIndex(null)}
                />
            )}
        </div>
    );
};

export default CanvasPrintSection;
