import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import artistImage from '../assets/portrait.jpg';
import {
    canvasPreviewImages,
    curatedCollectionViews,
    featuredPortfolioPhotos,
    heroPortfolioPhoto,
    portfolioStats,
    printReadyPortfolioPhotos,
    recentPortfolioPhotos,
} from '../content/portfolioLibrary';
import ArtworkTile from '../components/site/ArtworkTile';
import SectionHeading from '../components/site/SectionHeading';

const MainPage = () => {
    const heroPhoto = heroPortfolioPhoto;
    const collectorPicks = featuredPortfolioPhotos.slice(0, 3);
    const recentPicks = recentPortfolioPhotos.slice(0, 3);
    const printHighlights = printReadyPortfolioPhotos.slice(0, 3);
    const collectionStarts = curatedCollectionViews.slice(0, 6);
    const canvasHero = canvasPreviewImages[0];

    useEffect(() => {
        document.title = 'My Lenses | Fine art photography by Andrei Pascu';
    }, []);

    return (
        <main className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 pb-16 pt-5 md:gap-6 md:px-6">
            {heroPhoto ? (
                <section id="top" className="surface-panel relative scroll-mt-24 overflow-hidden rounded-[2.25rem] p-6 md:scroll-mt-28 md:p-8 lg:p-10">
                    <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top_left,_rgba(var(--accent-color),0.24),_transparent_62%)]"/>
                    <div className="relative grid gap-7 lg:grid-cols-[0.86fr_1.14fr] lg:items-start lg:gap-8">
                        <div className="space-y-6">
                            <p className="eyebrow-text text-[11px] uppercase tracking-[0.34em]">
                                Limited collector selection
                            </p>
                            <h1 className="font-display max-w-[10.8ch] text-[clamp(3rem,6.6vw,5.8rem)] leading-[0.88] tracking-[-0.04em] text-appText">
                                Photography shaped for slower, better choices.
                            </h1>
                            <p className="max-w-xl text-base leading-8 text-muted-token md:text-[1.02rem]">
                                Start with a smaller edit of Andrei&apos;s strongest wall-ready works, then move into prints, placement, and a more private inquiry when a piece feels right.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Link
                                    to="/collection?filter=Collector%20starters"
                                    className="theme-action inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.2em]"
                                >
                                    Explore collector picks
                                </Link>
                                <Link
                                    to="/prints"
                                    className="theme-action-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.2em]"
                                >
                                    View print guidance
                                </Link>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-2">
                                <div className="surface-panel-soft rounded-[1.35rem] p-4">
                                    <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">Collection</p>
                                    <p className="mt-2 font-display text-3xl text-appText">{portfolioStats.total}+</p>
                                    <p className="mt-2 text-sm leading-6 text-muted-token">Curated works across travel, stillness, street life, and atmosphere.</p>
                                </div>
                                <div className="surface-panel-soft rounded-[1.35rem] p-4">
                                    <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">Print-ready</p>
                                    <p className="mt-2 font-display text-3xl text-appText">{portfolioStats.printReady}+</p>
                                    <p className="mt-2 text-sm leading-6 text-muted-token">Wall-led pieces already framed for scale, mood, and collector fit.</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {collectionStarts.map((view) => (
                                    <Link
                                        key={view.slug}
                                        to={`/collection?filter=${encodeURIComponent(view.label)}`}
                                        className="theme-chip rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.18em]"
                                    >
                                        {view.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <ArtworkTile
                            photo={heroPhoto}
                            priority
                            badge="Featured work"
                            className="min-h-[34rem]"
                            imageClassName="h-[34rem] md:h-[46rem]"
                            responsiveSizes="(min-width: 1280px) 52vw, 100vw"
                        />
                    </div>
                </section>
            ) : null}

            <section id="collector-selection" className="scroll-mt-24 space-y-5 pt-1 md:scroll-mt-28">
                <SectionHeading
                    eyebrow="Collector selection"
                    title="A smaller starting point into the work with the clearest wall presence."
                    description="Built to feel edited before it feels large, with stronger routes by room, location, and collector intent."
                    action={(
                        <Link
                            to="/collection"
                            className="theme-action-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.2em]"
                        >
                            View full collection
                        </Link>
                    )}
                />

                <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
                    {collectorPicks[0] ? (
                        <ArtworkTile
                            photo={collectorPicks[0]}
                            badge="Collector favorite"
                            className="min-h-[30rem]"
                            imageClassName="h-[30rem] md:h-[38rem]"
                            responsiveSizes="(min-width: 1280px) 44vw, 100vw"
                        />
                    ) : null}

                    <div className="grid gap-4">
                        <div className="surface-panel-soft rounded-[1.75rem] p-5 md:p-6">
                            <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">Curated starting points</p>
                            <div className="mt-4 grid gap-3 md:grid-cols-2">
                                {collectionStarts.slice(0, 4).map((view) => (
                                    <Link
                                        key={view.slug}
                                        to={`/collection?filter=${encodeURIComponent(view.label)}`}
                                        className="rounded-[1.2rem] border px-4 py-4 transition-all duration-300 hover:-translate-y-0.5"
                                        style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}
                                    >
                                        <p className="text-[10px] uppercase tracking-[0.22em] text-nav-token">{view.photos.length} works</p>
                                        <p className="mt-2 text-appText">{view.label}</p>
                                        <p className="mt-2 text-sm leading-6 text-muted-token">{view.description}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            {collectorPicks.slice(1, 3).map((photo) => (
                                <ArtworkTile
                                    key={photo.slug}
                                    photo={photo}
                                    showDescription={false}
                                    imageClassName="h-[17rem] md:h-[18rem]"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section id="print-experience" className="scroll-mt-24 grid gap-4 lg:grid-cols-[0.95fr_1.05fr] md:scroll-mt-28">
                <div className="surface-panel rounded-[2rem] p-6 md:p-8">
                    <p className="eyebrow-text text-[11px] uppercase tracking-[0.3em]">Print experience</p>
                    <h2 className="mt-3 font-display text-3xl text-appText md:text-5xl">
                        The photographs now sell through room fit, scale, and atmosphere.
                    </h2>
                    <p className="mt-4 max-w-2xl text-base leading-8 text-muted-token">
                        The print layer is framed for private inquiries: archival Giclee canvas, clearer size guidance, and a more thoughtful first conversation.
                    </p>
                    <div className="mt-6 grid gap-3 md:grid-cols-3">
                        <div className="rounded-[1.25rem] border p-4" style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface-soft)'}}>
                            <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">Material</p>
                            <p className="mt-2 text-appText">Archival Giclee canvas</p>
                        </div>
                        <div className="rounded-[1.25rem] border p-4" style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface-soft)'}}>
                            <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">Presentation</p>
                            <p className="mt-2 text-appText">Framed or unframed guidance</p>
                        </div>
                        <div className="rounded-[1.25rem] border p-4" style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface-soft)'}}>
                            <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">Process</p>
                            <p className="mt-2 text-appText">Direct artist inquiry</p>
                        </div>
                    </div>
                    <div className="mt-6">
                        <Link
                            to="/prints"
                            className="theme-action inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.2em]"
                        >
                            Enter the print page
                        </Link>
                    </div>
                </div>

                {canvasHero ? (
                    <div className="overflow-hidden rounded-[2rem]" style={{border: '1px solid var(--color-line)'}}>
                        <img
                            loading="lazy"
                            src={canvasHero.src}
                            alt={canvasHero.title}
                            className="h-full min-h-[26rem] w-full object-cover"
                            style={{objectPosition: 'center 58%'}}
                        />
                    </div>
                ) : null}
            </section>

            <section id="artist-story" className="scroll-mt-24 grid gap-4 lg:grid-cols-[0.72fr_1.28fr] md:scroll-mt-28">
                <div className="surface-panel rounded-[2rem] p-6 md:p-8">
                    <p className="eyebrow-text text-[11px] uppercase tracking-[0.3em]">Artist</p>
                    <h2 className="mt-3 font-display text-3xl text-appText md:text-4xl">
                        From Transylvania to Switzerland, Andrei photographs stillness, atmosphere, and lived memory.
                    </h2>
                    <p className="mt-4 text-base leading-8 text-muted-token">
                        The context is quieter now too: enough story to build trust and taste, without pulling attention away from the images.
                    </p>
                    <div className="mt-6 flex items-center gap-4">
                        <img
                            loading="lazy"
                            src={artistImage}
                            alt="Andrei Pascu portrait"
                            className="h-20 w-20 rounded-full object-cover"
                            style={{border: '1px solid var(--color-line)'}}
                        />
                        <div>
                            <p className="text-appText">Andrei Pascu</p>
                            <p className="mt-1 text-sm uppercase tracking-[0.22em] text-nav-token">Fine art and travel photography</p>
                        </div>
                    </div>
                    <div className="mt-6">
                        <Link
                            to="/about"
                            className="theme-action-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.2em]"
                        >
                            Read the story
                        </Link>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {recentPicks.map((photo, index) => (
                        <ArtworkTile
                            key={photo.slug}
                            photo={photo}
                            badge={index === 0 ? 'Newer work' : undefined}
                            showDescription={false}
                            imageClassName="h-[19rem] md:h-[23rem]"
                        />
                    ))}
                </div>
            </section>

            <section className="space-y-5 pt-2">
                <SectionHeading
                    eyebrow="Print-forward works"
                    title="A final pass through the pieces with the strongest commercial fit."
                    description="Selected for larger walls, quieter interiors, and more confident print conversations."
                />
                <div className="grid gap-4 md:grid-cols-3">
                    {printHighlights.map((photo) => (
                        <ArtworkTile
                            key={photo.slug}
                            photo={photo}
                            badge="Print-ready"
                            imageClassName="h-[19rem] md:h-[22rem]"
                        />
                    ))}
                </div>
            </section>
        </main>
    );
};

export default MainPage;
