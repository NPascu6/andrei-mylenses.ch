import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import artistImage from '../assets/portrait.jpg';
import {canvasPreviewImages, featuredPortfolioPhotos, heroPortfolioPhoto, portfolioStats, printReadyPortfolioPhotos, recentPortfolioPhotos} from '../content/portfolioLibrary';
import ArtworkTile from '../components/site/ArtworkTile';
import SectionHeading from '../components/site/SectionHeading';

const MainPage = () => {
    const heroPhoto = heroPortfolioPhoto;
    const collectorPicks = featuredPortfolioPhotos.slice(0, 4);
    const recentPicks = recentPortfolioPhotos.slice(0, 4);
    const printHighlights = printReadyPortfolioPhotos.slice(0, 3);
    const canvasHero = canvasPreviewImages[0];

    useEffect(() => {
        document.title = 'My Lenses | Fine art photography by Andrei Pascu';
    }, []);

    return (
        <main className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 pb-16 pt-5 md:gap-6 md:px-6">
            {heroPhoto ? (
                <section id="top" className="surface-panel relative scroll-mt-24 overflow-hidden rounded-[2.25rem] p-6 md:scroll-mt-28 md:p-8 lg:p-10">
                    <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top_left,_rgba(var(--accent-color),0.24),_transparent_62%)]"/>
                    <div className="relative grid gap-7 lg:grid-cols-[0.94fr_1.06fr] lg:items-end lg:gap-8">
                        <div className="space-y-6">
                            <p className="eyebrow-text text-[11px] uppercase tracking-[0.34em]">
                                Fine art photography for collectors, interiors, and meaningful gifts
                            </p>
                            <h1 className="font-display max-w-[11.5ch] text-[clamp(3.2rem,7vw,6.2rem)] leading-[0.88] tracking-[-0.04em] text-appText md:max-w-[12ch]">
                                A quieter, more premium way to discover Andrei&apos;s work.
                            </h1>
                            <p className="max-w-2xl text-base leading-8 text-muted-token md:text-[1.05rem]">
                                The site now leads with curation before volume: stronger hero imagery, clearer print guidance, and a more direct path into inquiry around the photographs that hold the best wall presence.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Link
                                    to="/collection"
                                    className="theme-action inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.2em]"
                                >
                                    Explore the collection
                                </Link>
                                <Link
                                    to="/prints"
                                    className="theme-action-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.2em]"
                                >
                                    View print guidance
                                </Link>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-3">
                                <div className="surface-panel-soft rounded-[1.35rem] p-4">
                                    <p className="font-display text-3xl text-appText">{portfolioStats.total}+</p>
                                    <p className="mt-2 text-[10px] uppercase tracking-[0.24em] text-nav-token">curated works</p>
                                </div>
                                <div className="surface-panel-soft rounded-[1.35rem] p-4">
                                    <p className="font-display text-3xl text-appText">{portfolioStats.printReady}+</p>
                                    <p className="mt-2 text-[10px] uppercase tracking-[0.24em] text-nav-token">collector-ready pieces</p>
                                </div>
                                <div className="surface-panel-soft rounded-[1.35rem] p-4">
                                    <p className="font-display text-3xl text-appText">{portfolioStats.locations}+</p>
                                    <p className="mt-2 text-[10px] uppercase tracking-[0.24em] text-nav-token">locations and stories</p>
                                </div>
                            </div>
                        </div>

                        <ArtworkTile
                            photo={heroPhoto}
                            priority
                            badge="Hero work"
                            className="min-h-[34rem]"
                            imageClassName="h-[34rem] md:h-[46rem]"
                            imageStyle={{objectPosition: 'center 42%'}}
                        />
                    </div>
                </section>
            ) : null}

            <section className="grid gap-4 md:grid-cols-3">
                <div className="surface-panel-soft rounded-[1.6rem] p-5 md:p-6">
                    <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">Collector-first flow</p>
                    <p className="mt-3 text-base leading-7 text-muted-token">The strongest works surface first, so first impressions feel edited, not overwhelming.</p>
                </div>
                <div className="surface-panel-soft rounded-[1.6rem] p-5 md:p-6">
                    <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">Print credibility</p>
                    <p className="mt-3 text-base leading-7 text-muted-token">The app now frames the photographs as objects for space, scale, and atmosphere, not only screen browsing.</p>
                </div>
                <div className="surface-panel-soft rounded-[1.6rem] p-5 md:p-6">
                    <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">Direct inquiry</p>
                    <p className="mt-3 text-base leading-7 text-muted-token">A guided conversation replaces passive social links as the main commercial next step.</p>
                </div>
            </section>

            <section id="collector-selection" className="scroll-mt-24 space-y-5 pt-3 md:scroll-mt-28">
                <SectionHeading
                    eyebrow="Collector selection"
                    title="A smaller entry point into the strongest wall-ready works."
                    description="These are the photographs to lead with when the goal is print discovery, interior fit, and stronger commercial intent."
                    action={(
                        <Link
                            to="/collection"
                            className="theme-action-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.2em]"
                        >
                            See all works
                        </Link>
                    )}
                />

                <div className="grid gap-4 lg:grid-cols-[1.12fr_0.88fr]">
                    {collectorPicks[0] ? (
                        <ArtworkTile
                            photo={collectorPicks[0]}
                            badge="Collector favorite"
                            className="min-h-[30rem]"
                            imageClassName="h-[30rem] md:h-[36rem]"
                            imageStyle={{objectPosition: 'center 45%'}}
                        />
                    ) : null}

                    <div className="grid gap-4">
                        {collectorPicks.slice(1, 4).map((photo) => (
                            <ArtworkTile
                                key={photo.slug}
                                photo={photo}
                                showDescription={false}
                                imageClassName="h-[16rem] md:h-[17rem]"
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section id="print-experience" className="scroll-mt-24 grid gap-4 lg:grid-cols-[0.95fr_1.05fr] md:scroll-mt-28">
                <div className="surface-panel rounded-[2rem] p-6 md:p-8">
                    <p className="eyebrow-text text-[11px] uppercase tracking-[0.3em]">Print experience</p>
                    <h2 className="mt-3 font-display text-3xl text-appText md:text-5xl">
                        The photographs now sell as spaces, moods, and collector pieces.
                    </h2>
                    <p className="mt-4 max-w-2xl text-base leading-8 text-muted-token">
                        The new print layer frames the work around presence on a wall: archival canvas, size guidance, and direct consultation instead of generic product copy.
                    </p>
                    <div className="mt-6 grid gap-3 md:grid-cols-3">
                        <div className="rounded-[1.25rem] border p-4" style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface-soft)'}}>
                            <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">Format</p>
                            <p className="mt-2 text-appText">Archival Giclee canvas</p>
                        </div>
                        <div className="rounded-[1.25rem] border p-4" style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface-soft)'}}>
                            <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">Sizing</p>
                            <p className="mt-2 text-appText">Room-aware recommendations</p>
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
                        From Transylvania to Switzerland, Andrei photographs presence, stillness, and lived atmosphere.
                    </h2>
                    <p className="mt-4 text-base leading-8 text-muted-token">
                        The new about flow gives the work more context without pulling focus away from the images. It supports trust, taste, and artistic credibility.
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
                            <p className="text-appText">{'Andrei Pascu'}</p>
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

                <div className="grid gap-4 md:grid-cols-2">
                    {recentPicks.map((photo, index) => (
                        <ArtworkTile
                            key={photo.slug}
                            photo={photo}
                            badge={index === 0 ? 'Newer work' : undefined}
                            imageClassName="h-[18rem] md:h-[20rem]"
                        />
                    ))}
                </div>
            </section>

            <section className="space-y-5 pt-3">
                <SectionHeading
                    eyebrow="Print-forward works"
                    title="A final pass through the images with the strongest commercial fit."
                    description="These are already positioned for larger walls, calmer interiors, and direct inquiry."
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
}

export default MainPage;
