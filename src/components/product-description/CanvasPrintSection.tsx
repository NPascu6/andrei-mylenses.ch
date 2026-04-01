import React, {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import GallerySection from "./GallerySection";
import SelectedPhoto from "../main-page/SelectedPhoto";
import {scrollToSection} from "../../utils/scrollToSection";

interface CanvasPrintSectionProps {
    loadedCanvasImages: Array<{ src: string; title?: string; fullSrc?: string }>;
}

const CanvasPrintSection: React.FC<CanvasPrintSectionProps> = ({loadedCanvasImages}) => {
    const photos = useSelector((state: RootState) => state.app.photos);
    const [selectedCanvasIndex, setSelectedCanvasIndex] = useState<number | null>(null);
    const [selectedPortfolioIndex, setSelectedPortfolioIndex] = useState<number | null>(null);
    const featuredTitles = photos.slice(0, 4).map((photo) => photo.title).join(', ');
    const canvasHero = loadedCanvasImages[0]?.src || photos[0]?.src;
    const wallReadySelections = photos.filter((photo: {featured?: boolean}) => photo.featured).slice(0, 3);

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
                            The portfolio blends travel, street, wildlife, and landscape work into one continuous visual journey. Each image is composed not only to be seen on screen, but to live with presence on a wall.
                        </p>
                    </div>
                    <div className="surface-panel-soft rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-muted-token">
                        Featured selection: {featuredTitles}
                    </div>
                </div>

                {wallReadySelections.length > 0 && (
                    <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
                        <div className="surface-panel-soft rounded-[1.75rem] p-5 md:p-6">
                            <p className="eyebrow-text text-sm uppercase">Wall-ready favorites</p>
                            <h3 className="mt-3 font-display text-3xl text-appText md:text-4xl">
                                Curated works with the strongest presence as Giclee canvas pieces.
                            </h3>
                            <p className="mt-4 text-base leading-8 text-muted-token">
                                These selections are especially suited for larger presentation, where light, texture, and atmosphere can unfold with more depth. They work beautifully in living spaces, offices, boutique interiors, and collector-led settings.
                            </p>
                            <div className="mt-5 flex flex-wrap gap-3">
                                <button
                                    type="button"
                                    onClick={() => scrollToSection('prints')}
                                    className="theme-action inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.2em]"
                                >
                                    Explore print options
                                </button>
                                <a
                                    href="mailto:andrei.pascu86@yahoo.com?subject=Curated%20Print%20Selection"
                                    className="theme-action-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.2em]"
                                >
                                    Request a curated selection
                                </a>
                            </div>
                        </div>

                        <div className="grid gap-3 md:grid-cols-3">
                            {wallReadySelections.map((photo: any) => (
                                <button
                                    key={photo.title}
                                    type="button"
                                    onClick={() => {
                                        const nextIndex = photos.findIndex((item: {title: string}) => item.title === photo.title);
                                        if (nextIndex >= 0) {
                                            setSelectedPortfolioIndex(nextIndex);
                                        }
                                    }}
                                    className="group relative overflow-hidden rounded-[1.5rem] bg-black text-left"
                                    style={{border: '1px solid var(--color-line)'}}
                                >
                                    <img
                                        loading="lazy"
                                        src={photo.src}
                                        alt={photo.title}
                                        className="h-60 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent"/>
                                    <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                                        <p className="text-[10px] uppercase tracking-[0.24em] text-white/60">
                                            Recommended for canvas
                                        </p>
                                        <h4 className="mt-2 font-display text-2xl">{photo.title}</h4>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

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
                                Rich tonal depth, archival quality, museum-grade texture, and a gallery-ready finish.
                            </p>
                        </article>

                        <article className="surface-panel-soft rounded-[1.5rem] p-4">
                            <p className="text-nav-token text-xs uppercase tracking-[0.22em]">Presentation</p>
                            <h4 className="mt-3 font-display text-2xl text-appText">50x30 / 90x60</h4>
                            <p className="text-muted-token mt-3 text-sm leading-6">
                                Curated size options for intimate spaces, offices, and statement walls, with custom requests available.
                            </p>
                        </article>

                        <article className="surface-panel-soft rounded-[1.5rem] p-4">
                            <p className="text-nav-token text-xs uppercase tracking-[0.22em]">Collector Offer</p>
                            <h4 className="mt-3 font-display text-2xl text-appText">40 CHF+</h4>
                            <p className="text-muted-token mt-3 text-sm leading-6">
                                Entry pricing begins at 40 CHF, with scale, subject, and bespoke requests discussed personally.
                            </p>
                        </article>
                    </div>

                    <div className="surface-panel-soft rounded-[1.75rem] p-5 md:p-6">
                        <p className="eyebrow-text text-sm uppercase">What collectors receive</p>
                        <div className="mt-5 grid gap-4 md:grid-cols-2">
                            <p className="text-muted-token text-base leading-8">
                                Each canvas is chosen for its ability to hold atmosphere, tonal nuance, and emotional weight beyond the screen, turning the image into a lasting physical piece.
                            </p>
                            <p className="text-muted-token text-base leading-8">
                                Whether you are starting your collection or looking for one meaningful statement work, the experience is tailored around scale, subject, and the feeling you want the room to carry.
                            </p>
                        </div>

                        <div className="mt-6 grid gap-3 md:grid-cols-3">
                            <div className="rounded-[1.35rem] border p-4" style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}>
                                <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Archival quality</p>
                                <p className="mt-2 text-sm leading-6 text-muted-token">Built to preserve color depth and subtle tonal transitions over time.</p>
                            </div>
                            <div className="rounded-[1.35rem] border p-4" style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}>
                                <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Room-aware selection</p>
                                <p className="mt-2 text-sm leading-6 text-muted-token">Guidance based on mood, scale, and the kind of wall presence you want.</p>
                            </div>
                            <div className="rounded-[1.35rem] border p-4" style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}>
                                <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Direct artist inquiry</p>
                                <p className="mt-2 text-sm leading-6 text-muted-token">A personal conversation rather than an impersonal checkout flow.</p>
                            </div>
                        </div>

                        <div className="mt-6 grid gap-3 md:grid-cols-3">
                            <div className="surface-panel rounded-[1.35rem] p-4">
                                <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">For collectors</p>
                                <p className="mt-3 text-sm leading-6 text-muted-token">Ideal if you want one atmospheric statement piece with strong emotional calm and visual depth.</p>
                            </div>
                            <div className="surface-panel rounded-[1.35rem] p-4">
                                <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">For interiors</p>
                                <p className="mt-3 text-sm leading-6 text-muted-token">Helpful for homes, offices, and hospitality spaces that need a quieter, more refined focal point.</p>
                            </div>
                            <div className="surface-panel rounded-[1.35rem] p-4">
                                <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">For gifts</p>
                                <p className="mt-3 text-sm leading-6 text-muted-token">A meaningful option when you want a travel memory, a place-led story, or a personal commissioned gesture.</p>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <a
                                href="mailto:andrei.pascu86@yahoo.com?subject=Canvas%20Print%20Inquiry"
                                className="theme-action inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.2em]"
                            >
                                Request a print consultation
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

            {selectedPortfolioIndex !== null && photos.length > 0 && (
                <SelectedPhoto
                    images={photos}
                    index={selectedPortfolioIndex}
                    setIndex={setSelectedPortfolioIndex}
                    onClose={() => setSelectedPortfolioIndex(null)}
                />
            )}
        </div>
    );
};

export default CanvasPrintSection;
