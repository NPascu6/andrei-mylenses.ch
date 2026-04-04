import React, {useMemo, useState} from "react";
import {useSelector} from "react-redux";
import ExpandableImage from "../common/ExpandableImage";
import {RootState} from "../../store/store";
import GallerySection from "./GallerySection";
import SelectedPhoto from "../main-page/SelectedPhoto";
import {scrollToSection} from "../../utils/scrollToSection";
import {
    collectorExperienceContent,
    curationContent,
} from "../../content/siteContent";

interface CanvasImage {
    src: string;
    title?: string;
    fullSrc?: string;
}

interface PortfolioPhoto {
    src: string;
    fullSrc?: string;
    title: string;
    description?: string;
    location?: string;
    category?: string;
    featured?: boolean;
    printReady?: boolean;
    permalink?: string;
}

interface CanvasPrintSectionProps {
    loadedCanvasImages: CanvasImage[];
}

const CanvasPrintSection: React.FC<CanvasPrintSectionProps> = ({loadedCanvasImages}) => {
    const photos = useSelector((state: RootState) => state.app.photos as PortfolioPhoto[]);
    const [selectedCanvasIndex, setSelectedCanvasIndex] = useState<number | null>(null);
    const [selectedPortfolioIndex, setSelectedPortfolioIndex] = useState<number | null>(null);

    const featuredTitles = useMemo(
        () => photos.slice(0, 4).map((photo) => photo.title).join(', '),
        [photos]
    );

    const canvasHero = loadedCanvasImages[0]?.src || photos[0]?.src;

    const curatedFeaturedPrints = useMemo(
        () => curationContent.featuredPrintTitles
            .map((title) => photos.find((photo) => photo.title === title))
            .filter((photo): photo is PortfolioPhoto => Boolean(photo)),
        [photos]
    );

    const wallReadySelections = useMemo(
        () => (
            curatedFeaturedPrints.length > 0
                ? curatedFeaturedPrints
                : photos.filter((photo) => photo.featured || photo.printReady)
        ).slice(0, 6),
        [curatedFeaturedPrints, photos]
    );

    const openPortfolioImage = (title: string) => {
        const nextIndex = photos.findIndex((item) => item.title === title);
        if (nextIndex >= 0) {
            setSelectedPortfolioIndex(nextIndex);
        }
    };

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
                    <>
                        <div className="surface-panel rounded-[1.9rem] p-5 md:p-6">
                            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                                <div className="max-w-2xl space-y-3">
                                    <p className="eyebrow-text text-sm uppercase">{collectorExperienceContent.featuredEyebrow}</p>
                                    <h3 className="font-display text-3xl text-appText md:text-4xl">
                                        {collectorExperienceContent.featuredTitle}
                                    </h3>
                                    <p className="text-base leading-8 text-muted-token">
                                        {collectorExperienceContent.featuredDescription}
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        type="button"
                                        onClick={() => scrollToSection('contact')}
                                        className="theme-action inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.2em]"
                                    >
                                        {collectorExperienceContent.featuredCtaLabel}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => scrollToSection('prints')}
                                        className="theme-action-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.2em]"
                                    >
                                        {collectorExperienceContent.featuredSecondaryCtaLabel}
                                    </button>
                                </div>
                            </div>

                            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                {wallReadySelections.map((photo) => (
                                    <button
                                        key={`featured-print-${photo.title}`}
                                        type="button"
                                        onClick={() => openPortfolioImage(photo.title)}
                                        className="group relative overflow-hidden rounded-[1.6rem] bg-black text-left shadow-xl shadow-black/10"
                                        style={{border: '1px solid var(--color-line)'}}
                                    >
                                        <ExpandableImage
                                            src={photo.src}
                                            modalSrc={photo.fullSrc || photo.src}
                                            alt={photo.title}
                                            imgClassName="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                                            orderDetails={{
                                                title: photo.title,
                                                category: photo.category,
                                                location: photo.location,
                                                notes: photo.description,
                                                permalink: photo.permalink,
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"/>
                                        <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-white/85 backdrop-blur-sm">
                                            Featured print
                                        </div>
                                        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                                            <p className="text-[10px] uppercase tracking-[0.28em] text-white/60">
                                                {photo.location || 'Collector selection'}
                                            </p>
                                            <h4 className="mt-2 font-display text-[2rem] leading-none">{photo.title}</h4>
                                            <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/74">
                                                {photo.description || 'Selected for strong print presence and atmosphere.'}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
                            <div className="surface-panel-soft rounded-[1.75rem] p-5 md:p-6">
                                <p className="eyebrow-text text-sm uppercase">{collectorExperienceContent.assuranceEyebrow}</p>
                                <h3 className="mt-3 font-display text-3xl text-appText md:text-4xl">
                                    {collectorExperienceContent.assuranceTitle}
                                </h3>
                                <p className="mt-4 text-base leading-8 text-muted-token">
                                    {collectorExperienceContent.assuranceDescription}
                                </p>
                                <div className="mt-6 grid gap-3">
                                    {collectorExperienceContent.assurancePoints.map((point) => (
                                        <div
                                            key={point}
                                            className="rounded-[1.25rem] border px-4 py-4 text-sm leading-6 text-muted-token"
                                            style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}
                                        >
                                            <span className="text-appText">{point}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="surface-panel rounded-[1.75rem] p-5 md:p-6">
                                <p className="eyebrow-text text-sm uppercase">{collectorExperienceContent.journeyEyebrow}</p>
                                <h3 className="mt-3 font-display text-3xl text-appText md:text-4xl">
                                    {collectorExperienceContent.journeyTitle}
                                </h3>
                                <p className="mt-4 text-base leading-8 text-muted-token">
                                    {collectorExperienceContent.journeyDescription}
                                </p>
                                <div className="mt-6 grid gap-3">
                                    {collectorExperienceContent.journeySteps.map((step, index) => (
                                        <article
                                            key={step.title}
                                            className="rounded-[1.35rem] border p-4"
                                            style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}
                                        >
                                            <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Step {index + 1}</p>
                                            <h4 className="mt-2 font-display text-2xl text-appText">{step.title}</h4>
                                            <p className="mt-2 text-sm leading-6 text-muted-token">{step.description}</p>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
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
                            <ExpandableImage
                                src={canvasHero}
                                modalSrc={loadedCanvasImages[0]?.fullSrc || canvasHero}
                                alt="Canvas print preview"
                                containerClassName="absolute inset-0"
                                imgClassName="absolute inset-0 h-full w-full object-cover"
                                orderDetails={{
                                    title: loadedCanvasImages[0]?.title || 'Canvas print preview',
                                    category: 'Canvas',
                                    location: 'Print collection',
                                    notes: 'Interested in sizes, finish, and availability for this canvas preview.',
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent"/>
                        </>
                    )}

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

                        <div className="mt-6 flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={() => scrollToSection('contact')}
                                className="theme-action inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.2em]"
                            >
                                Request a print consultation
                            </button>
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
